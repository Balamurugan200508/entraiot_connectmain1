import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Skyline({ theme }) {
  const groupRef = useRef()
  const cloudsRef = useRef()

  // Generate buildings coordinates once
  const buildings = React.useMemo(() => {
    const arr = []
    const seed = 54321
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
      const windowRows = Math.floor(h / 1.5)
      const windowCols = Math.floor(w / 0.5)

      arr.push({ w, h, d, x, z, rows: windowRows, cols: windowCols })
    }
    return arr
  }, [])

  // Animate clouds
  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.04) * 4
    }
  })

  // Theme configuration for building materials based on Market themes
  const getThemeColors = () => {
    switch (theme) {
      case 'bear':
        return {
          building: '#2d1e2f',
          window: '#ef4444',
          windowEmissive: '#dc2626',
          sky: '#1e1b4b'
        }
      case 'gold':
        return {
          building: '#1c1917',
          window: '#fbbf24',
          windowEmissive: '#d97706',
          sky: '#0f0f12'
        }
      default: // bull (day)
        return {
          building: '#cfd8dc',
          window: '#ffffff',
          windowEmissive: '#e0f7fa',
          sky: '#81d4fa'
        }
    }
  }

  const colors = getThemeColors()

  return (
    <group ref={groupRef} position={[0, -2, -15]}>
      {/* Background Sky Plane */}
      <mesh position={[0, 10, -5]}>
        <planeGeometry args={[100, 50]} />
        <meshBasicMaterial 
          color={colors.sky} 
          toneMapped={false}
        />
      </mesh>

      {/* Buildings array */}
      {buildings.map((b, idx) => (
        <group key={idx} position={[b.x, b.h / 2, b.z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshStandardMaterial 
              color={colors.building} 
              roughness={0.6}
              metalness={0.2}
            />
          </mesh>
          {/* Animated windows showing lights */}
          {idx % 2 === 0 && (
            <mesh position={[0, 0, b.d / 2 + 0.01]}>
              <planeGeometry args={[b.w * 0.8, b.h * 0.8]} />
              <meshStandardMaterial 
                color={colors.window}
                emissive={colors.windowEmissive}
                emissiveIntensity={theme === 'bull' ? 0.3 : 1.8}
                transparent
                opacity={0.85}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Clouds */}
      <group ref={cloudsRef} position={[0, 15, -4]}>
        <mesh opacity={0.6} transparent>
          <sphereGeometry args={[4, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
        </mesh>
        <mesh position={[5, -1, -2]}>
          <sphereGeometry args={[3, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
        <mesh position={[-5, 1, -1]}>
          <sphereGeometry args={[3.5, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  )
}
