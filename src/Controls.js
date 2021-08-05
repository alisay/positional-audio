import React, { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'


export default function Controls() {
    const { camera, gl } = useThree()
    const ref = useRef()
    useFrame(() => ref.current.update())
    return <orbitControls ref={ref} target={[0, 0, 0]} enableDamping args={[camera, gl.domElement]} />
  }
  