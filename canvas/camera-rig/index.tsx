'use client';
import React, { FC, useRef } from 'react';
import { ICameraRigProps } from '@/canvas/camera-rig/camera-rig.types';
import { useSnapshot } from 'valtio';
import state from '@/store';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';

const CameraRig: FC<ICameraRigProps> = ({ children }) => {
  const group = useRef(null);
  const snap = useSnapshot(state);
  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    let targetPosition = [-0.4, 0, 2];

    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set model camera position
    // @ts-ignore
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);
    easing.dampE(
      // @ts-ignore
      group.current?.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};
export default CameraRig;
