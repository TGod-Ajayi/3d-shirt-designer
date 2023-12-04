'use client';
import React, { FC } from 'react';
import { useSnapshot } from 'valtio';
import state from '@/store';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const Shirt: FC = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) =>
    // @ts-ignore
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );
  const stateString = JSON.stringify(snap);
  return (
    <group key={stateString}>
      <mesh
        material={materials.lambert1}
        castShadow
        material-roughness={1}
        dispose={null}
        // @ts-ignore
        geometry={nodes.T_Shirt_male.geometry}>
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            /*        anisotropy={16}*/
            depthTest={false}

            // depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};
export default Shirt;
