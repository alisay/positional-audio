import ReactDOM from 'react-dom'
import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './styles.css'

import Sound from "./Sound.js";
import Controls from "./Controls.js";


extend({ OrbitControls })


function App() {
  return (<>
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Sound position={[-2.2, 0, 0]} url="/zapsplat_musical_ice_cream_van_musical_chime_004_43592.mp3" />
        <Sound position={[2.2, 0, 0]} url="/b.mp3" />
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

