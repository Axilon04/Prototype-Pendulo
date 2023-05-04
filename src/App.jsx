import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, BakeShadows } from '@react-three/drei'
import { Model } from './components/Pendulo'
import { Camera, PerspectiveCamera } from 'three'
import { Soporte } from './components/Soporte'
import { useControls } from 'leva';
let time = 0
const AnimationBall = ({ position }) => {
  const mibola = useRef()
  const L=1
  const { Gravedad,Grados } = useControls({
    Gravedad: {value:9.8,min:0, max:20},
    Grados: {value: 0, step: 1, min:-14 ,max:14},
  })
  useEffect(()=>{
    const Animation = setInterval(()=>{
      time+=0.004
    })  
    return () => {
      clearInterval(Animation)
    };
  }, []);
  useFrame(()=>{
    let Angulo=(Grados*2)*Math.PI/180
    let w = Math.sqrt(Gravedad/L)
    let Amplitud = Angulo*L*Math.cos(w*time)
     mibola.current.rotation.set(position.x + Amplitud , position.y, position.z)
  })
  return <Model movimiento={mibola} />
}

function App() {
  const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)

  const {Camarax, Camaray} = useControls({
    Camarax: { value: 0, min:0.1 , max: 1},
    Camaray: { value: 0, min:0.1 , max: 1}
  })

  camera.position.x = Camarax
  camera.position.y = Camaray
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0, z: 0 })

  return (
    <div className='app'>
      <Canvas shadows dpr={[1,2]} camera={camera}>
        <Stage environment={'city'} intensity={0.6}>
          <AnimationBall position={ballPosition} />
          <Soporte/>
        </Stage>
        <OrbitControls minZoom={1000}/>
        <BakeShadows></BakeShadows>
      </Canvas>
    </div>
  )
}

export default App