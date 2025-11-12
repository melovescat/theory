import { useMemo } from 'react';
import { DoubleSide } from 'three';
import type { Board } from '../../types';
import { useSimulatorStore } from '../../state/simulatorStore';

interface ThreeDSceneProps {
  board: Board;
}

const SCALE = 0.6;

const BoardSurface = ({ board }: { board: Board }) => (
  <group>
    <mesh receiveShadow position={[0, -2, 0]}>
      <boxGeometry args={[220, 4, 140]} />
      <meshStandardMaterial color="#0f172a" />
    </mesh>
    <mesh receiveShadow position={[0, 0, 0]}>
      <boxGeometry args={[200, 2, 120]} />
      <meshStandardMaterial color="#1e40af" transparent opacity={0.35} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.1, 0]}>
      <planeGeometry args={[220, 220]} />
      <meshStandardMaterial color="#0f172a" side={DoubleSide} transparent opacity={0.4} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.8, 0]}>
      <planeGeometry args={[200, 120]} />
      <meshStandardMaterial color="#1e293b" side={DoubleSide} transparent opacity={0.7} />
    </mesh>
  </group>
);

const ModuleBlock = ({
  width,
  height,
  depth,
  position,
  rotation,
  name
}: {
  width: number;
  height: number;
  depth: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  name: string;
}) => (
  <group position={[position.x * SCALE, height * SCALE, position.y * SCALE]} rotation={[rotation.x, rotation.y, rotation.z]}>
    <mesh castShadow receiveShadow>
      <boxGeometry args={[width * SCALE, depth * SCALE, height * SCALE]} />
      <meshStandardMaterial color="#38bdf8" opacity={0.85} transparent />
    </mesh>
    <mesh position={[0, (depth * SCALE) / 2 + 1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width * SCALE, height * SCALE]} />
      <meshStandardMaterial color="#0ea5e9" transparent opacity={0.12} />
    </mesh>
    <mesh position={[0, (depth * SCALE) / 2 + 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width * SCALE, height * SCALE]} />
      <meshStandardMaterial color="#38bdf8" transparent opacity={0.08} />
    </mesh>
  </group>
);

const ThreeDScene = ({ board }: ThreeDSceneProps) => {
  const modules = useSimulatorStore((state) => state.placedModules);

  const transformedModules = useMemo(
    () =>
      modules.map((module) => ({
        ...module,
        dimensions: {
          width: module.dimensions.width || 25,
          height: module.dimensions.height || 25,
          depth: module.dimensions.depth || 10
        }
      })),
    [modules]
  );

  return (
    <group>
      <hemisphereLight args={[0x88c0ff, 0x0f172a, 0.55]} position={[0, 200, 0]} />
      <BoardSurface board={board} />
      {transformedModules.map((module) => (
        <ModuleBlock
          key={module.instanceId}
          width={module.dimensions.width}
          height={module.dimensions.height}
          depth={module.dimensions.depth}
          position={module.position}
          rotation={{
            x: (module.rotation.x * Math.PI) / 180,
            y: (module.rotation.y * Math.PI) / 180,
            z: (module.rotation.z * Math.PI) / 180
          }}
          name={module.name}
        />
      ))}
    </group>
  );
};

export default ThreeDScene;
