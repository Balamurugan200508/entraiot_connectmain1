import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Skyline({ theme }) {
  const groupRef = useRef()
  const cloudsRef = useRef()

  const buildings = React.useMemo(() => {
    const arr = []
    const seed = 98765
    let random = () => {
      let x = Math.sin(seed + arr.length) * 10000
      return x - Math.floor(x)
    }
    
    for (let i = 0; i < 45; i++) {
      const w = 1.2 + random() * 2
      const h = 5 + random() * 15
      const d = 1.2 + random() * 2
      const x = -30 + random() * 60
      const z = -20 - random() * 15
      arr.push({ w, h, d, x, z })
    }
    return arr
  }, [])

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 5
    }
  })

  const getThemeColors = () => {
    switch (theme) {
      case 'matrix': // Matrix Cyber (Green)
        return {
          building: '#030712',
          window: '#10b981',
          windowEmissive: '#059669',
          sky: '#022c22'
        }
      case 'synthwave': // Synthwave Midnight (Purple/Pink)
        return {
          building: '#1e1b4b',
          window: '#ec4899',
          windowEmissive: '#db2777',
          sky: '#170b22'
        }
      default: // day (Daylight)
        return {
          building: '#cbd5e1',
          window: '#ffffff',
          windowEmissive: '#e2e8f0',
          sky: '#38bdf8'
        }
    }
  }

  const colors = getThemeColors()

  return (
    <group ref={groupRef} position={[0, -2, -15]}>
      {/* Backdrop sky plane */}
      <mesh position={[0, 10, -5]}>
        <planeGeometry args={[100, 50]} />
        <meshBasicMaterial color={colors.sky} toneMapped={false} />
      </mesh>

      {/* Procedural Buildings */}
      {buildings.map((b, idx) => (
        <group key={idx} position={[b.x, b.h / 2, b.z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshStandardMaterial color={colors.building} roughness={0.6} metalness={0.4} />
          </mesh>
          {idx % 2 === 0 && (
            <mesh position={[0, 0, b.d / 2 + 0.01]}>
              <planeGeometry args={[b.w * 0.8, b.h * 0.8]} />
              <meshStandardMaterial 
                color={colors.window}
                emissive={colors.windowEmissive}
                emissiveIntensity={theme === 'day' ? 0.4 : 2.2}
                transparent
                opacity={0.8}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Floating Clouds */}
      <group ref={cloudsRef} position={[0, 15, -4]}>
        <mesh opacity={0.3} transparent>
          <sphereGeometry args={[4, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
        </mesh>
        <mesh position={[6, -1, -2]}>
          <sphereGeometry args={[3, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
        <mesh position={[-6, 1, -1]}>
          <sphereGeometry args={[3.5, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
      </group>
    </group>
  )
}
