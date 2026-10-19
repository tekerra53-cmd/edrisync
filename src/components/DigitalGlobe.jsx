import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Cloud, Code2, Server, ShieldCheck } from 'lucide-react';

const TAU = Math.PI * 2;

function sphericalPoint(radius, latitude, longitude) {
  const lat = THREE.MathUtils.degToRad(latitude);
  const lon = THREE.MathUtils.degToRad(longitude);
  return new THREE.Vector3(
    radius * Math.cos(lat) * Math.cos(lon),
    radius * Math.sin(lat),
    radius * Math.cos(lat) * Math.sin(lon),
  );
}

// Abstracted continent regions: recognisable data geography, rather than a flat map texture.
function isDigitalLand(lat, lon) {
  const africa = lat > -35 && lat < 35 && lon > -20 && lon < 52 && Math.abs(lon - 17) < 40 - Math.abs(lat) * 0.48;
  const europe = lat > 35 && lat < 72 && lon > -12 && lon < 60;
  const asia = lat > 7 && lat < 73 && lon > 55 && lon < 155 && (lat > 20 || lon < 118);
  const northAmerica = lat > 15 && lat < 70 && lon > -168 && lon < -52;
  const southAmerica = lat > -55 && lat < 14 && lon > -86 && lon < -34 && Math.abs(lon + 60) < 31 - Math.abs(lat + 18) * 0.24;
  const australia = lat > -43 && lat < -10 && lon > 110 && lon < 157;
  return africa || europe || asia || northAmerica || southAmerica || australia;
}

function buildSurfaceData() {
  const land = [];
  const network = [];
  const links = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < 1750; index += 1) {
    const y = 1 - (index / 1749) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;
    const point = new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius);
    const lat = THREE.MathUtils.radToDeg(Math.asin(y));
    const lon = THREE.MathUtils.radToDeg(Math.atan2(point.z, point.x));
    if (isDigitalLand(lat, lon)) land.push(...point.multiplyScalar(1.018).toArray());
  }

  for (let index = 0; index < 118; index += 1) {
    const lat = -62 + ((index * 29) % 124);
    const lon = -180 + ((index * 67) % 360);
    const point = sphericalPoint(1.032, lat, lon);
    network.push(point);
    if (index > 0) {
      const previous = network[index - 1];
      links.push(...previous.toArray(), ...point.toArray());
    }
    if (index > 9 && index % 3 === 0) {
      const crossLink = network[index - 9];
      links.push(...crossLink.toArray(), ...point.toArray());
    }
  }

  return {
    land: new Float32Array(land),
    nodes: new Float32Array(network.flatMap((point) => point.toArray())),
    links: new Float32Array(links),
  };
}

function PointsGeometry({ positions, size, opacity = 1 }) {
  const geometry = useMemo(() => {
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, [positions]);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#72eaff" size={size} sizeAttenuation transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function DigitalSphere({ reducedMotion }) {
  const globe = useRef();
  const data = useMemo(buildSurfaceData, []);
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(data.links, 3));
    return geometry;
  }, [data]);

  useFrame((_, delta) => {
    if (!reducedMotion && globe.current) globe.current.rotation.y += delta * 0.13;
  });

  return (
    <group ref={globe} rotation={[0.08, 1.25, 0]}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#0a3f8c" emissive="#041c58" emissiveIntensity={0.7} roughness={0.48} metalness={0.45} />
      </mesh>
      <mesh scale={1.018}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#0b74c9" transparent opacity={0.11} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <PointsGeometry positions={data.land} size={0.020} opacity={1} />
      <PointsGeometry positions={data.nodes} size={0.037} opacity={1} />
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#24bfff" transparent opacity={0.34} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <mesh scale={1.075}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#1aaeff" transparent opacity={0.06} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function makeEllipse(rx, ry) {
  const curve = new THREE.EllipseCurve(
    0,
    0,
    rx,
    ry,
    0,
    Math.PI * 2,
    false,
    0,
  );

  return new THREE.BufferGeometry().setFromPoints(
    curve.getPoints(192).map(
      (point) => new THREE.Vector3(point.x, point.y, 0),
    ),
  );
}

function Platform() {
  const ringOne = useMemo(() => makeEllipse(1.45, 0.3), []);
  const ringTwo = useMemo(() => makeEllipse(1.05, 0.19), []);
  return (
    <group position={[0, -1.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <line geometry={ringOne}><lineBasicMaterial color="#1479e4" transparent opacity={0.48} /></line>
      <line geometry={ringTwo}><lineBasicMaterial color="#47dcff" transparent opacity={0.72} /></line>
      <pointLight color="#0abfff" intensity={2.2} distance={2.8} />
    </group>
  );
}

function Scene({ reducedMotion }) {
  const particles = useMemo(() => {
    const points = [];
    for (let index = 0; index < 92; index += 1) {
      const theta = index * 2.41;
      const radius = 1.35 + ((index * 17) % 75) / 100;
      points.push(Math.cos(theta) * radius, ((index * 37) % 170) / 100 - 0.85, Math.sin(theta) * radius * 0.55);
    }
    return new Float32Array(points);
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[-2.6, 2.7, 3.6]} color="#7deeff" intensity={4.2} distance={8} />
      <pointLight position={[2.2, -1.2, 2.8]} color="#146eff" intensity={2.6} distance={6} />
      <DigitalSphere reducedMotion={reducedMotion} />
      <Platform />
      <PointsGeometry positions={particles} size={0.015} opacity={0.5} />
    </>
  );
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reducedMotion;
}

const markers = [
  { Icon: Server, className: 'digital-globe__marker--server' },
  { Icon: Cloud, className: 'digital-globe__marker--cloud' },
  { Icon: ShieldCheck, className: 'digital-globe__marker--shield' },
  { Icon: Code2, className: 'digital-globe__marker--code' },
];

export default function DigitalGlobe() {
  const reducedMotion = useReducedMotion();
  return (
    <div className="digital-globe" aria-hidden="true">
      <Canvas className="digital-globe__canvas" dpr={[1, 1.65]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} camera={{ position: [0, 0.05, 4.45], fov: 42 }}>
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
      <svg className="digital-globe__cloud-network" viewBox="0 0 100 100" aria-hidden="true">
        <path className="digital-globe__data-route digital-globe__data-route--one" d="M 18 49 Q 41 20, 66 25" />
        <path className="digital-globe__data-route digital-globe__data-route--two" d="M 68 25 Q 89 34, 85 53" />
        <path className="digital-globe__data-route digital-globe__data-route--three" d="M 83 55 Q 57 77, 29 80" />
      </svg>
      {markers.map(({ Icon, className }) => (
        <span className={`digital-globe__marker ${className}`} key={className}><Icon /></span>
      ))}
    </div>
  );
}
