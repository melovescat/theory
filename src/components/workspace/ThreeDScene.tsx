import { useMemo } from 'react';
import { DoubleSide } from 'three';
import type { Board } from '../../types';
import { useSimulatorStore } from '../../state/simulatorStore';

interface ThreeDSceneProps {
  board: Board;
}

const SCALE = 0.5;

const BoardSurface = ({ board }: { board: Board }) => {
  const width = board.dimensions.width * SCALE;
  const depth = board.dimensions.height * SCALE;
  const thickness = Math.max(board.dimensions.thickness * SCALE * 0.1, 2);
  return (
    <group>
      <mesh receiveShadow position={[0, -thickness / 2 - 2, 0]}>
        <boxGeometry args={[width + 40, 4, depth + 40]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial color="#1e40af" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, thickness / 2 + 0.6, 0]}>
        <planeGeometry args={[width + 20, depth + 20]} />
        <meshStandardMaterial color="#0f172a" side={DoubleSide} transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, thickness / 2 + 0.2, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#1e293b" side={DoubleSide} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const ModuleBlock = ({
  width,
  height,
  depth,
  position,
  rotation
}: {
  width: number;
  height: number;
  depth: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}) => (
  <group position={[position.x * SCALE, depth * SCALE / 2 + 0.2, position.y * SCALE]} rotation={[rotation.x, rotation.y, rotation.z]}>
    <mesh castShadow receiveShadow>
      <boxGeometry args={[width * SCALE, depth * SCALE, height * SCALE]} />
      <meshStandardMaterial color="#38bdf8" opacity={0.85} transparent />
    </mesh>
    <mesh position={[0, (depth * SCALE) / 2 + 0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width * SCALE, height * SCALE]} />
      <meshStandardMaterial color="#0ea5e9" transparent opacity={0.12} />
    </mesh>
    <mesh position={[0, (depth * SCALE) / 2 + 1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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
        />
      ))}
    </group>
  );
};

export default ThreeDScene;
