import React, { useRef, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { AccountantDesk, Chair, OfficePlant, PendantLight, AreaRug, GoldVault, GoldBars, FilingCabinet } from './OfficeFurniture'
import { StylizedCharacter } from './OfficeCharacters'
import { Skyline } from './Skyline'
import * as THREE from 'three'

export function OfficeScene({ theme, cameraPreset }) {
  const controlsRef = useRef()
  const { camera } = useThree()

  useEffect(() => {
    if (!camera || !controlsRef.current) return

    // Cozy camera targets focused inside the single room
    const presets = {
      main: { pos: [0, 6.5, 9.5], look: [0, 0.8, -0.5] },
      desk: { pos: [0, 2.4, 1.8], look: [0, 0.9, -0.2] },
      vault: { pos: [2.5, 1.8, -1.2], look: [3.8, 0.8, -3.2] },
      files: { pos: [-2.4, 2.0, -1.2], look: [-3.8, 0.8, -2.8] }
    }

    const config = presets[cameraPreset] || presets.main

    camera.position.set(...config.pos)
    controlsRef.current.target.set(...config.look)
    controlsRef.current.update()
  }, [cameraPreset, camera])

  // Lighting configurations
  const getLighting = () => {
    switch (theme) {
      case 'bear':
        return {
          ambient: '#1e1b4b',
          ambientIntensity: 0.9,
          direct: '#ef4444',
          directIntensity: 3.0,
          directPos: [-6, 6, -3],
          point: '#dc2626',
          pointIntensity: 3.5
        }
      case 'gold':
        return {
          ambient: '#1c1917',
          ambientIntensity: 0.95,
          direct: '#fbbf24',
          directIntensity: 3.8,
          directPos: [5, 8, 3],
          point: '#d97706',
          pointIntensity: 3.2
        }
      default: // bull (daylight)
        return {
          ambient: '#f8fafc',
          ambientIntensity: 0.95,
          direct: '#fef08a',
          directIntensity: 3.0,
          directPos: [10, 14, 6],
          point: '#bae6fd',
          pointIntensity: 1.2
        }
    }
  }

  const lights = getLighting()

  // Generate floor tiles for the single room (10 x 9 dimensions)
  const floorTiles = React.useMemo(() => {
    const arr = []
    const width = 0.5
    const length = 4.5
    for (let x = -5; x < 5; x += width) {
      for (let z = -4.5; z < 4.5; z += length) {
        const hueSeed = Math.abs(Math.sin(x * 12.3 + z * 4.5))
        let color = hueSeed > 0.6 ? '#b45309' : hueSeed > 0.3 ? '#d97706' : '#9a3412'
        if (theme === 'bear') {
          color = hueSeed > 0.6 ? '#450a0a' : hueSeed > 0.3 ? '#7f1d1d' : '#991b1b'
        } else if (theme === 'gold') {
          color = hueSeed > 0.6 ? '#292524' : hueSeed > 0.3 ? '#44403c' : '#1c1917'
        }
        arr.push({ x: x + width / 2, z: z + length / 2, w: width - 0.02, d: length - 0.02, color })
      }
    }
    return arr
  }, [theme])

  return (
    <>
      <ambientLight color={lights.ambient} intensity={lights.ambientIntensity} />
      
      <directionalLight
        castShadow
        position={lights.directPos}
        color={lights.direct}
        intensity={lights.directIntensity}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      <pointLight position={[0, 3.5, 0]} color={lights.point} intensity={lights.pointIntensity} distance={8} />

      <OrbitControls
        ref={controlsRef}
        enableRotate={false}
        enablePan={false}
        enableZoom={false}
      />

      {/* Accountant Office Architecture */}
      <group>
        {/* Floor */}
        <group>
          {floorTiles.map((tile, idx) => (
            <mesh key={idx} position={[tile.x, -0.01, tile.z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[tile.w, tile.d]} />
              <meshStandardMaterial color={tile.color} roughness={0.4} metalness={0.1} />
            </mesh>
          ))}
        </group>

        {/* Back Wall */}
        <mesh position={[0, 3, -4.5]} receiveShadow>
          <boxGeometry args={[10, 6, 0.1]} />
          <meshStandardMaterial 
            color={theme === 'bear' ? '#311010' : theme === 'gold' ? '#1c1917' : '#f8fafc'} 
            roughness={0.8} 
          />
        </mesh>
        
        {/* Wall baseboard */}
        <mesh position={[0, 0.1, -4.45]} receiveShadow>
          <boxGeometry args={[10, 0.2, 0.1]} />
          <meshStandardMaterial color="#020617" />
        </mesh>

        {/* Left Wall */}
        <mesh position={[-5, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[9, 6, 0.1]} />
          <meshStandardMaterial 
            color={theme === 'bear' ? '#311010' : theme === 'gold' ? '#292524' : '#f1f5f9'} 
            roughness={0.8} 
          />
        </mesh>
        <mesh position={[-4.95, 0.1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[9, 0.2, 0.1]} />
          <meshStandardMaterial color="#020617" />
        </mesh>

        {/* Right Wall with Window */}
        <group position={[4.95, 3, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh>
            <boxGeometry args={[9, 6, 0.05]} />
            <meshStandardMaterial color="#cbd5e1" transparent opacity={0.15} metalness={0.9} roughness={0.05} />
          </mesh>
          {/* Window frames */}
          {[-3, 0, 3].map((x, idx) => (
            <mesh key={idx} position={[x, 0, 0.03]}>
              <boxGeometry args={[0.1, 6, 0.08]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          ))}
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[9, 0.1, 0.08]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>

        {/* Skyline backdrop outside the window */}
        <Skyline theme={theme} />

        {/* Pendant lamp above desk */}
        <PendantLight position={[0, 2.5, 0]} />

        {/* Office plant in the front-left corner */}
        <OfficePlant position={[-4, 0, 3.2]} />

        {/* ============================================================== */}
        {/* CENTERED ACCOUNTANT OFFICE SETUP */}
        {/* ============================================================== */}
        <group position={[0, 0, 0]}>
          {/* Rug */}
          <AreaRug 
            position={[0, 0.01, -0.2]} 
            args={[2.6, 2.2]} 
            color={theme === 'bear' ? '#450a0a' : theme === 'gold' ? '#44403c' : '#064e3b'} 
          />
          {/* Desk */}
          <AccountantDesk position={[0, 0, 0]} theme={theme} />
          {/* Chair */}
          <Chair 
            position={[0, 0, -0.85]} 
            seatColor={theme === 'bear' ? '#dc2626' : theme === 'gold' ? '#d97706' : '#10b981'} 
          />
          {/* Accountant Character */}
          <StylizedCharacter 
            position={[0, 0.3, -0.85]} 
            type="calculating" 
            shirtColor="#0284c7" 
            hairColor="#475569" 
          />
        </group>

        {/* ============================================================== */}
        {/* SECURE CASH VAULT CORNER (Back Right) */}
        {/* ============================================================== */}
        <group position={[3.8, 0, -3.2]} rotation={[0, -Math.PI / 4, 0]}>
          <GoldVault position={[0, 0.7, 0]} />
          <GoldBars position={[-0.6, 0, 0.6]} />
        </group>

        {/* ============================================================== */}
        {/* FILING CABINET SECTION (Back Left) */}
        {/* ============================================================== */}
        <FilingCabinet position={[-3.8, 0.75, -2.8]} rotation={[0, Math.PI / 3, 0]} />

      </group>
    </>
  )
}
