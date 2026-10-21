import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Stars, Sphere, QuadraticBezierLine, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { REL_TYPES, relationships, COUNTRY_BY_ID, countries } from "./data.js";

const FABRIC_SIZE = 120;
const FABRIC_RES = 80;
const FABRIC_Y = -18;
const HOME_CAMERA = new THREE.Vector3(0, 42, 78);
const HOME_TARGET = new THREE.Vector3(0, 0, 0);
/** Portrait screens need to sit further back to keep the whole map in frame. */
const homeCamera = (w, h) => HOME_CAMERA.clone().multiplyScalar(w / h < 1 ? 1.55 : 1);

// Always-on labels: chosen for screen separation at the home view. Everything else labels on hover,
// and a selected body's neighbours are labelled too.
const KEY_LABELS = new Set(["USA", "CHN", "RUS", "IND", "IRN", "KOR", "JPN", "PAK", "PRK", "FRA"]);

const XS = Float32Array.from(countries.map((c) => c.position[0]));
const ZS = Float32Array.from(countries.map((c) => c.position[2]));
const COL_DEEP = new THREE.Color("#0b2a4a");
const COL_WELL = new THREE.Color("#f59e0b");
const TMP = new THREE.Color();
const COL_BG = new THREE.Color("#030816");
const HALF = FABRIC_SIZE / 2;

/** Gravity fabric: one geometry, a solid surface (depth-coloured) plus a wireframe overlay. */
function Fabric({ masses, warp, reduced }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(FABRIC_SIZE, FABRIC_SIZE, FABRIC_RES, FABRIC_RES);
    g.rotateX(-Math.PI / 2); // lie flat in XZ so Y is the warp axis
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 3), 3));
    return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);

  const dirty = useRef(true);
  useEffect(() => { dirty.current = true; }, [masses, warp, reduced]);

  useFrame(({ clock }) => {
    if (!dirty.current && reduced) return;
    const pos = geo.attributes.position;
    const col = geo.attributes.color;
    const t = reduced ? 0 : clock.elapsedTime;
    const n = masses.length;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      let y = 0;
      for (let k = 0; k < n; k++) {
        const dx = x - XS[k], dz = z - ZS[k];
        y -= (masses[k] * 14 * warp) / (1 + (dx * dx + dz * dz) / 25);
      }
      y += Math.sin(t * 0.3 + x * 0.15) * 0.3 + Math.cos(t * 0.25 + z * 0.15) * 0.3;
      pos.setY(i, y);
      // radial edge fade so the sheet dissolves into space instead of ending in a hard square
      const r = Math.sqrt(x * x + z * z) / HALF;
      const e = Math.min(1, Math.max(0, (r - 0.55) / 0.45));
      const fade = 1 - e * e * (3 - 2 * e);
      TMP.copy(COL_DEEP).lerp(COL_WELL, Math.min(1, Math.max(0, -y / 14))).lerp(COL_BG, 1 - fade);
      col.setXYZ(i, TMP.r, TMP.g, TMP.b);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
    geo.computeVertexNormals();
    dirty.current = false;
  });

  return (
    <group position={[0, FABRIC_Y, 0]}>
      <mesh geometry={geo}>
        <meshBasicMaterial vertexColors transparent opacity={0.42} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh geometry={geo} position={[0, 0.05, 0]}>
        <meshBasicMaterial vertexColors wireframe transparent opacity={0.24} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

const Planet = memo(function Planet({ body, state, showRing, showLabel, dollar, isr, reduced, onSelect }) {
  const spin = useRef();
  const halo = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame(({ clock }) => {
    if (reduced) return;
    if (spin.current) spin.current.rotation.y += 0.002;
    if (halo.current && body.nuclearNow) {
      const s = 1 + Math.sin(clock.elapsedTime * 1.5) * 0.06;
      halo.current.scale.set(s, s, s);
    }
  });

  const r = body.size;
  const faded = state === "dim";
  return (
    <group
      position={body.position}
      onClick={(e) => { e.stopPropagation(); onSelect(body.id); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <Sphere ref={spin} args={[r, 32, 32]}>
        <meshStandardMaterial color={body.color} emissive={body.color} emissiveIntensity={faded ? 0.18 : 0.6} transparent={faded} opacity={faded ? 0.5 : 1} />
      </Sphere>

      {showRing && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r + 0.3, 0.06, 12, 80]} />
          <meshBasicMaterial color="#ffcc00" transparent opacity={body.usdDep * dollar * (faded ? 0.4 : 1)} />
        </mesh>
      )}

      {body.nuclearNow && body.haloColor && (
        <mesh ref={halo}>
          <sphereGeometry args={[r * 1.6, 24, 24]} />
          <meshBasicMaterial color={body.haloColor} transparent opacity={faded ? 0.08 : 0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      )}

      {body.latentGlow && (
        <mesh>
          <sphereGeometry args={[r * 1.3, 24, 24]} />
          <meshBasicMaterial color="#cc2200" transparent opacity={0.12 * isr} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      )}

      {state === "selected" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r * 1.9, r * 1.9 + 0.22, 64]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.9} />
        </mesh>
      )}

      {(showLabel || state === "selected") && !hovered && (
        <Html position={[0, r + 0.5, 0]} center zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
          <span className={`g-label${state === "selected" ? " sel" : ""}${faded ? " dim" : ""}`}>{body.name}</span>
        </Html>
      )}

      {hovered && (
        <Html position={[0, r + 0.6, 0]} center zIndexRange={[20, 10]} style={{ pointerEvents: "none" }}>
          <div className="g-tip">
            <b>{body.name}</b>
            <span>Mass {body.mass.toFixed(2)}{body.baseMass !== body.mass ? ` (base ${body.baseMass.toFixed(2)})` : ""}</span>
            <span>Threat {(body.threat * 100).toFixed(0)}% · USD integration {(body.usdDep * 100).toFixed(0)}%</span>
            {body.nuclearNow && <span>{body.nuclear > 0 ? `≈${body.nuclear.toLocaleString()} warheads` : "Nuclear (scenario)"}</span>}
          </div>
        </Html>
      )}
    </group>
  );
});

function Edge({ rel, from, to, dim, active, isr, reduced }) {
  const ref = useRef();
  const type = REL_TYPES[rel.type];
  const mid = useMemo(() => {
    const m = new THREE.Vector3(...from).add(new THREE.Vector3(...to)).multiplyScalar(0.5);
    m.y += new THREE.Vector3(...from).distanceTo(new THREE.Vector3(...to)) * 0.16;
    return m;
  }, [from, to]);
  const base = rel.type === "isr" ? 0.25 + 0.65 * isr : 0.85;
  const opacity = dim ? 0.12 : base;

  useFrame(({ clock }) => {
    const m = ref.current?.material;
    if (!m) return;
    m.opacity = rel.pulse && !reduced && !dim ? opacity * (0.65 + 0.35 * Math.sin(clock.elapsedTime * 2.5)) : opacity;
  });

  return (
    <QuadraticBezierLine
      ref={ref} start={from} end={to} mid={mid}
      color={type.color} lineWidth={active ? 3.2 : 2} transparent opacity={opacity}
      dashed={type.dashed} dashSize={1.1} gapSize={0.7}
    />
  );
}

function DollarSingularity({ dollar, reduced }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = reduced ? 0.8 : 0.8 + Math.sin(clock.elapsedTime * 0.5) * 0.15;
    ref.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.6, 24, 24]} />
      <meshBasicMaterial color="#FFD700" transparent opacity={0.4 * dollar} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

/** Eases the camera to a requested body or back to the home view; any user drag cancels it. */
function CameraRig({ request, controls, focusRef, bodiesById }) {
  const { camera, size } = useThree();
  useEffect(() => {
    if (!request) return;
    if (request.id === "__home") {
      focusRef.current = { target: HOME_TARGET.clone(), camera: homeCamera(size.width, size.height) };
      return;
    }
    const b = bodiesById[request.id];
    if (!b) return;
    const target = new THREE.Vector3(...b.position);
    const dir = camera.position.clone().sub(controls.current?.target ?? HOME_TARGET).normalize();
    focusRef.current = { target, camera: target.clone().add(dir.multiplyScalar(14 + b.size * 4)) };
  }, [request]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((_, dt) => {
    const f = focusRef.current, c = controls.current;
    if (!f || !c) return;
    const k = 1 - Math.exp(-dt * 4.5);
    c.target.lerp(f.target, k);
    camera.position.lerp(f.camera, k);
    c.update();
    if (c.target.distanceTo(f.target) < 0.05 && camera.position.distanceTo(f.camera) < 0.1) focusRef.current = null;
  });
  return null;
}

export default function GalaxyCanvas({
  bodies, masses, ctl, layers, hiddenTypes, selectedId, onSelect, focusRequest, reduced, onReady,
}) {
  const controls = useRef();
  const focusRef = useRef(null);
  const bodiesById = useMemo(() => Object.fromEntries(bodies.map((b) => [b.id, b])), [bodies]);

  const connected = useMemo(() => {
    if (!selectedId) return null;
    const s = new Set([selectedId]);
    relationships.forEach((r) => { if (r.from === selectedId) s.add(r.to); if (r.to === selectedId) s.add(r.from); });
    return s;
  }, [selectedId]);


  return (
    <Canvas
      camera={{ position: homeCamera(window.innerWidth, window.innerHeight).toArray(), fov: 62, near: 0.5, far: 600 }}
      dpr={[1, 2]}
      onCreated={onReady}
      onPointerMissed={() => onSelect(null)}
    >
      <color attach="background" args={["#030816"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[30, 30, 30]} intensity={1.4} />
      <pointLight position={[-25, -20, -15]} intensity={0.8} color="#60a5fa" />
      <OrbitControls
        ref={controls} makeDefault enableDamping dampingFactor={0.08}
        minDistance={8} maxDistance={200} autoRotate={layers.rotate && !reduced} autoRotateSpeed={0.5}
        onStart={() => { focusRef.current = null; }}
      />
      <CameraRig request={focusRequest} controls={controls} focusRef={focusRef} bodiesById={bodiesById} />
      <Stars radius={180} depth={60} count={5000} factor={5} saturation={0} fade speed={reduced ? 0 : 0.5} />

      {layers.fabric && <Fabric masses={masses} warp={ctl.warp} reduced={reduced} />}
      <DollarSingularity dollar={ctl.dollar} reduced={reduced} />

      {bodies.map((b) => (
        <Planet
          key={b.id} body={b}
          state={selectedId === b.id ? "selected" : connected && !connected.has(b.id) ? "dim" : "normal"}
          showRing={layers.rings} showLabel={layers.labels && (KEY_LABELS.has(b.id) || !!connected?.has(b.id))}
          dollar={ctl.dollar} isr={ctl.isr} reduced={reduced} onSelect={onSelect}
        />
      ))}

      {layers.lines && relationships.map((r, i) => {
        if (hiddenTypes.has(r.type)) return null;
        const incident = selectedId && (r.from === selectedId || r.to === selectedId);
        return (
          <Edge
            key={i} rel={r}
            from={COUNTRY_BY_ID[r.from].position} to={COUNTRY_BY_ID[r.to].position}
            dim={!!selectedId && !incident} active={!!incident} isr={ctl.isr} reduced={reduced}
          />
        );
      })}
    </Canvas>
  );
}
