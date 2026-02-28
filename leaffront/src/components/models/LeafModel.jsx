// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// function LeafRing() {
//   const groupRef = useRef();

//   const leafCount = 8;     // Number of leaves
//   const radius = 3;        // Circle radius

//   useFrame(() => {
//     groupRef.current.rotation.y += 0.005;  // Rotate whole ring
//     // groupRef.current.position.y = Math.sin(clock.elapsedTime) * 0.3;
//   });

//   return (
//     <group ref={groupRef}>
//       {Array.from({ length: leafCount }).map((_, i) => {
//         const angle = (i / leafCount) * Math.PI * 2;

//         const x = Math.cos(angle) * radius;
//         const z = Math.sin(angle) * radius;

//         return (
//           <mesh key={i} position={[x, 0, z]}>
//             <boxGeometry args={[0.5, 3, 0.1]} />
//             <meshStandardMaterial color="green" />
//           </mesh>
//         );
//       })}
//     </group>
//   );
// }

// export default LeafRing;

i