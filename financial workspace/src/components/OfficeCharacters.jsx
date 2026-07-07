import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Premium Stylized Character
export function StylizedCharacter({ position, rotation = [0, 0, 0], type = 'typing', shirtColor = '#2563eb', hairColor = '#78350f', hasHeadset = false }) {
  const headRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const bodyRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    if (type === 'typing') {
      // Arms typing key motions
      leftArmRef.current.rotation.x = -Math.PI / 4.5 + Math.sin(t * 16) * 0.08
      leftArmRef.current.rotation.y = Math.sin(t * 8) * 0.04
      rightArmRef.current.rotation.x = -Math.PI / 4.5 + Math.cos(t * 14) * 0.08
      rightArmRef.current.rotation.y = -Math.cos(t * 7) * 0.04
      // Head nodding slightly
      headRef.current.rotation.x = Math.sin(t * 2) * 0.04
      headRef.current.rotation.y = Math.cos(t * 1.5) * 0.02
    } else if (type === 'discussing') {
      // Animated conversation gestures
      rightArmRef.current.rotation.x = -Math.PI / 3 + Math.sin(t * 4) * 0.25
      rightArmRef.current.rotation.y = Math.sin(t * 5) * 0.15
      leftArmRef.current.rotation.x = -Math.PI / 5 + Math.cos(t * 3) * 0.1
      headRef.current.rotation.y = Math.sin(t * 2) * 0.15
      headRef.current.rotation.x = Math.cos(t * 2) * 0.05
    } else if (type === 'calculating') {
      // Moving right arm back and forth (writing on notepad/calculator)
      leftArmRef.current.rotation.x = -Math.PI / 4.5
      rightArmRef.current.rotation.x = -Math.PI / 4 + Math.sin(t * 8) * 0.15
      rightArmRef.current.rotation.y = Math.cos(t * 8) * 0.08
      headRef.current.rotation.x = 0.25 + Math.sin(t * 1) * 0.03
    } else if (type === 'standing') {
      // Natural idle standing state
      headRef.current.rotation.x = Math.sin(t * 1.5) * 0.02
      leftArmRef.current.rotation.z = Math.sin(t * 1) * 0.03 + 0.05
      rightArmRef.current.rotation.z = -Math.sin(t * 1) * 0.03 - 0.05
    } else if (type === 'drinking') {
      // Drinking espresso cup sequence
      const drinkCycle = Math.sin(t * 0.8) * 0.5 + 0.5
      rightArmRef.current.rotation.x = -Math.PI / 3 - drinkCycle * 0.8
      headRef.current.rotation.x = drinkCycle * 0.15
    }
  })

  return (
    <group position={position} rotation={rotation} ref={bodyRef}>
      {/* Lower Legs (Seated vs Standing config) */}
      <group position={[0, 0, 0]}>
        {type === 'standing' ? (
          <>
            {/* Left Leg */}
            <mesh ref={leftLegRef} position={[-0.08, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.045, 0.04, 0.5]} />
              <meshStandardMaterial color="#1e293b" roughness={0.7} />
            </mesh>
            {/* Right Leg */}
            <mesh ref={rightLegRef} position={[0.08, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.045, 0.04, 0.5]} />
              <meshStandardMaterial color="#1e293b" roughness={0.7} />
            </mesh>
          </>
        ) : (
          <>
            {/* Seated Leg position (knee bent forward) */}
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
        {/* Face */}
        <mesh castShadow>
          <sphereGeometry args={[0.14, 18, 18]} />
          <meshStandardMaterial color="#fbcfe8" roughness={0.5} />
        </mesh>
        
        {/* Hair Styles */}
        <mesh position={[0, 0.06, -0.02]} castShadow>
          <sphereGeometry args={[0.145, 16, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.9} />
        </mesh>

        {/* Headset (For support / developer roles) */}
        {hasHeadset && (
          <group position={[0, 0.02, 0]}>
            {/* Top band */}
            <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.12, 0]}>
              <torusGeometry args={[0.14, 0.02, 8, 24]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Left cup */}
            <mesh position={[-0.14, 0, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Right cup */}
            <mesh position={[0.14, 0, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Microphone rod */}
            <mesh position={[0.08, -0.06, 0.08]} rotation={[0.4, -0.4, 0]}>
              <cylinderGeometry args={[0.005, 0.005, 0.12]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          </group>
        )}
      </group>

      {/* Jointed Left Arm */}
      <group ref={leftArmRef} position={[-0.2, 1.0, 0]}>
        <mesh position={[0, -0.16, 0.04]} rotation={[-Math.PI / 5, 0, -0.05]} castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.38]} />
          <meshStandardMaterial color={shirtColor} roughness={0.4} />
        </mesh>
        {/* Left Hand */}
        <mesh position={[0, -0.32, 0.14]} castShadow>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#fbcfe8" />
        </mesh>
      </group>

      {/* Jointed Right Arm */}
      <group ref={rightArmRef} position={[0.2, 1.0, 0]}>
        <mesh position={[0, -0.16, 0.04]} rotation={[-Math.PI / 5, 0, 0.05]} castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.38]} />
          <meshStandardMaterial color={shirtColor} roughness={0.4} />
        </mesh>
        {/* Right Hand */}
        <mesh position={[0, -0.32, 0.14]} castShadow>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#fbcfe8" />
        </mesh>
      </group>
    </group>
  )
}
