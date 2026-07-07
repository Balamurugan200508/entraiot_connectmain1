import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function StylizedCharacter({ position, rotation = [0, 0, 0], type = 'typing', shirtColor = '#2563eb', hairColor = '#78350f', skinColor = '#fbcfe8' }) {
  const headRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const bodyRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    if (type === 'typing') {
      leftArmRef.current.rotation.x = -Math.PI / 4.5 + Math.sin(t * 16) * 0.08
      leftArmRef.current.rotation.y = Math.sin(t * 8) * 0.04
      rightArmRef.current.rotation.x = -Math.PI / 4.5 + Math.cos(t * 14) * 0.08
      rightArmRef.current.rotation.y = -Math.cos(t * 7) * 0.04
      headRef.current.rotation.x = Math.sin(t * 2) * 0.04
      headRef.current.rotation.y = Math.cos(t * 1.5) * 0.02
    } else if (type === 'presenting') {
      // Waving pointer or pointing to chart
      rightArmRef.current.rotation.x = -Math.PI / 2 + Math.sin(t * 3) * 0.2
      rightArmRef.current.rotation.z = -Math.PI / 6 + Math.cos(t * 3) * 0.1
      leftArmRef.current.rotation.x = -Math.PI / 6
      headRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.25
    } else if (type === 'pitching') {
      // Animated expressive discussion
      rightArmRef.current.rotation.x = -Math.PI / 3.5 + Math.sin(t * 6) * 0.2
      rightArmRef.current.rotation.y = Math.cos(t * 6) * 0.15
      leftArmRef.current.rotation.x = -Math.PI / 3.5 + Math.cos(t * 5) * 0.2
      leftArmRef.current.rotation.y = -Math.sin(t * 5) * 0.15
      headRef.current.rotation.y = Math.sin(t * 2.5) * 0.1
    } else if (type === 'standing') {
      headRef.current.rotation.x = Math.sin(t * 1.5) * 0.02
      leftArmRef.current.rotation.z = Math.sin(t * 1) * 0.03 + 0.05
      rightArmRef.current.rotation.z = -Math.sin(t * 1) * 0.03 - 0.05
    }
  })

  return (
    <group position={position} rotation={rotation} ref={bodyRef}>
      {/* Lower Legs (Seated vs Standing config) */}
      <group position={[0, 0, 0]}>
        {type === 'standing' || type === 'presenting' ? (
          <>
            <mesh ref={leftLegRef} position={[-0.08, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.045, 0.04, 0.5]} />
              <meshStandardMaterial color="#1e293b" roughness={0.7} />
            </mesh>
            <mesh ref={rightLegRef} position={[0.08, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.045, 0.04, 0.5]} />
              <meshStandardMaterial color="#1e293b" roughness={0.7} />
            </mesh>
          </>
        ) : (
          <>
            <group position={[-0.08, 0.45, 0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.2]} castShadow>
                <cylinderGeometry args={[0.04, 0.04, 0.4]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[0, -0.22, 0.38]} castShadow>
                <cylinderGeometry args={[0.04, 0.035, 0.44]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            </group>
            <group position={[0.08, 0.45, 0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.2]} castShadow>
                <cylinderGeometry args={[0.04, 0.04, 0.4]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[0, -0.22, 0.38]} castShadow>
                <cylinderGeometry args={[0.04, 0.035, 0.44]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            </group>
          </>
        )}
      </group>

      {/* Torso / Shirt */}
      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.12, 0.56]} />
        <meshStandardMaterial color={shirtColor} roughness={0.4} />
      </mesh>

      {/* Detailed Head */}
      <group ref={headRef} position={[0, 1.22, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.14, 18, 18]} />
          <meshStandardMaterial color={skinColor} roughness={0.5} />
        </mesh>
        
        <mesh position={[0, 0.06, -0.02]} castShadow>
          <sphereGeometry args={[0.145, 16, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.9} />
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.2, 1.0, 0]}>
        <mesh position={[0, -0.16, 0.04]} rotation={[-Math.PI / 5, 0, -0.05]} castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.38]} />
          <meshStandardMaterial color={shirtColor} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.32, 0.14]} castShadow>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.2, 1.0, 0]}>
        <mesh position={[0, -0.16, 0.04]} rotation={[-Math.PI / 5, 0, 0.05]} castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.38]} />
          <meshStandardMaterial color={shirtColor} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.32, 0.14]} castShadow>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>
    </group>
  )
}
