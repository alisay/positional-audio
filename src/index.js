import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, extend, useThree, useFrame, useLoader } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './styles.css'

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
  return <positionalAudio ref={sound} args={[listener]} />
}

function App() {
  return (<>
  <form onsubmit="console.log('You clicked start.'); return false">
  <button type="submit">Start</button>
</form>
    <Canvas camera={{ position: [0, 0, 10] }}>
      <Suspense fallback={null}>
        <mesh>
          <boxBufferGeometry attach="geometry" />
          <meshBasicMaterial attach="material" color="hotpink" />
          <Sound url="/zapsplat_musical_ice_cream_van_musical_chime_004_43592.mp3" />
        </mesh>
      </Suspense>
      <Controls />
    </Canvas>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
