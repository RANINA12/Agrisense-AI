import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

function RotatingCube() {
  const meshRef = useRef()

  useFrame(() => {
    meshRef.current.rotation.x += 0.00
    meshRef.current.rotation.y += 0.01
    meshRef.current.rotation.z += 0.00
    meshRef.current.position.x += 0.00
    // meshRef.current.position.x = Math.sin(Date.now() * 0.001) * 5
  })

  return (
    <mesh ref={meshRef} position={[5,5,0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  )
}

export default function ThreeScene() {
  return (
    <div style={{ height: "500px", width: "100%" }}>
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <RotatingCube />
      <OrbitControls />
      {/* orbit conrole is for Drag to rotate camera Scroll to zoom Move around cube */}
    </Canvas>
    </div>
  )
}