import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, extend, useThree, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './styles.css'
// import Box from "./Box.js";
// import Sound from "./Sound.js";

extend({ OrbitControls })

const Controls = () => {
  const { camera, gl } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} target={[0, 0, 0]} enableDamping args={[camera, gl.domElement]} />
}

function Sound({ url }) {
  const sound = useRef()
  const { camera } = useThree()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, url)
  useEffect(() => {
    sound.current.setBuffer(buffer)
    sound.current.setRefDistance(1)
    sound.current.setLoop(true)
    sound.current.play()
    camera.add(listener)
    return () => camera.remove(listener)
  }, [])
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color="hotpink" />
      <positionalAudio ref={sound} args={[listener]} />
    </mesh>
  )
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


function App() {
  return (<>
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <Suspense fallback={null}>
        <Sound url="/zapsplat_musical_ice_cream_van_musical_chime_004_43592.mp3" />
      </Suspense>
      <Controls />
    </Canvas>
    <form onsubmit="console.log('You clicked start.'); return false">
      <button type="submit">Start</button>
    </form>
  </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

