import React, { useRef, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { 
  FrontendWorkstation, 
  BackendWorkstation, 
  FullStackWorkstation, 
  Chair, 
  OfficePlant, 
  PendantLight, 
  AreaRug,
  FilingCabinet,
  StorageRack 
} from './TechFurniture'
import { StylizedCharacter } from './OfficeCharacters'
import { Skyline } from './Skyline'
import * as THREE from 'three'

export function OfficeScene({ theme, cameraPreset }) {
  const controlsRef = useRef()
  const { camera } = useThree()

  useEffect(() => {
    if (!camera || !controlsRef.current) return

    const presets = {
      main: { pos: [0, 6.8, 10.0], look: [0, 0.8, -0.5] },
      ceo: { pos: [-3.2, 2.5, -0.8], look: [-3.5, 0.9, -2.5] },
      pm: { pos: [0, 2.2, 0.6], look: [0, 0.9, -1.2] },
      tech_lead: { pos: [3.2, 2.0, 1.8], look: [3.2, 0.9, 0.2] },
      hr: { pos: [-3.2, 2.0, 1.8], look: [-3.2, 0.9, 0.2] }
    }

    const config = presets[cameraPreset] || presets.main

    camera.position.set(...config.pos)
    controlsRef.current.target.set(...config.look)
    controlsRef.current.update()
  }, [cameraPreset, camera])

  const getLighting = () => {
    switch (theme) {
      case 'cozy': // Night Cozy
        return {
          ambient: '#271e16',
          ambientIntensity: 1.1,
          direct: '#f97316',
          directIntensity: 3.5,
          directPos: [5, 8, 3],
          point: '#ea580c',
          pointIntensity: 3.8
        }
      case 'gold': // Cyber Gold
        return {
          ambient: '#1c1917',
          ambientIntensity: 0.95,
          direct: '#eab308',
          directIntensity: 4.2,
          directPos: [-5, 7, -2],
          point: '#ca8a04',
          pointIntensity: 3.8
        }
      default: // day (Daylight)
        return {
          ambient: '#f8fafc',
          ambientIntensity: 0.95,
          direct: '#e0f2fe',
          directIntensity: 2.8,
          directPos: [8, 12, 6],
          point: '#0284c7',
          pointIntensity: 1.2
        }
    }
  }

  const lights = getLighting()

  const floorTiles = React.useMemo(() => {
    const arr = []
    const width = 0.5
    const length = 5.0
    for (let x = -6; x < 6; x += width) {
      for (let z = -5.0; z < 5.0; z += length) {
        const hueSeed = Math.abs(Math.sin(x * 12.3 + z * 4.5))
        
        // Setup warm wood plank hues to match the screenshot floor exactly
        let color = '#ea580c' // default warm orange
        if (hueSeed > 0.6) {
          color = '#f97316' // bright orange plank
        } else if (hueSeed > 0.3) {
          color = '#7c2d12' // deep mahogany plank
        } else {
          color = '#b45309' // warm amber plank
        }

        if (theme === 'cozy') {
          color = hueSeed > 0.65 ? '#451a03' : hueSeed > 0.35 ? '#1c1917' : '#7c2d12'
        } else if (theme === 'gold') {
          color = hueSeed > 0.65 ? '#854d0e' : hueSeed > 0.35 ? '#1c1917' : '#a16207'
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

      <pointLight position={[0, 3.5, 0]} color={lights.point} intensity={lights.pointIntensity} distance={10} />

      <OrbitControls
        ref={controlsRef}
        enableRotate={false}
        enablePan={false}
        enableZoom={false}
      />

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
        <mesh position={[0, 3, -5]} receiveShadow>
          <boxGeometry args={[12, 6, 0.1]} />
          <meshStandardMaterial 
            color={theme === 'cozy' ? '#1c1917' : theme === 'gold' ? '#0f0d05' : '#f8fafc'} 
            roughness={0.8} 
          />
        </mesh>
        
        {/* Wall baseboard */}
        <mesh position={[0, 0.1, -4.95]} receiveShadow>
          <boxGeometry args={[12, 0.2, 0.1]} />
          <meshStandardMaterial color="#020617" />
        </mesh>

        {/* Left Wall */}
        <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[10, 6, 0.1]} />
          <meshStandardMaterial 
            color={theme === 'cozy' ? '#1c1917' : theme === 'gold' ? '#0f0d05' : '#f1f5f9'} 
            roughness={0.8} 
          />
        </mesh>
        <mesh position={[-5.95, 0.1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[10, 0.2, 0.1]} />
          <meshStandardMaterial color="#020617" />
        </mesh>

        {/* Right Wall with Window */}
        <group position={[5.95, 3, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh>
            <boxGeometry args={[10, 6, 0.05]} />
            <meshStandardMaterial color="#cbd5e1" transparent opacity={0.15} metalness={0.9} roughness={0.05} />
          </mesh>
          {[-3.5, 0, 3.5].map((x, idx) => (
            <mesh key={idx} position={[x, 0, 0.03]}>
              <boxGeometry args={[0.1, 6, 0.08]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          ))}
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[10, 0.1, 0.08]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>

        {/* Skyline backdrop */}
        <Skyline theme={theme} />

        {/* Pendant lamps */}
        <PendantLight position={[-3.2, 2.5, 0]} color={theme === 'cozy' ? '#78350f' : theme === 'gold' ? '#854d0e' : '#0369a1'} />
        <PendantLight position={[3.2, 2.5, 0]} color={theme === 'cozy' ? '#78350f' : theme === 'gold' ? '#854d0e' : '#0369a1'} />
        <PendantLight position={[0, 2.5, -1.6]} color={theme === 'cozy' ? '#78350f' : theme === 'gold' ? '#854d0e' : '#0369a1'} />

        {/* Plants in corners */}
        <OfficePlant position={[-5.2, 0, 4.0]} />
        <OfficePlant position={[5.2, 0, 4.0]} />

        {/* CABIN 1: CEO - Vikram Malhotra (Back Left) */}
        <group position={[-3.5, 0, -2.5]}>
          <AreaRug 
            position={[0, 0.01, 0.05]} 
            args={[2.2, 2.1]} 
            color={theme === 'cozy' ? '#450a0a' : theme === 'gold' ? '#422006' : '#7f1d1d'} 
          />
          <FullStackWorkstation position={[0, 0, 0]} />
          <Chair 
            position={[0, 0, 0.68]} 
            rotation={[0, Math.PI, 0]}
            seatColor={theme === 'cozy' ? '#b91c1c' : theme === 'gold' ? '#ca8a04' : '#ef4444'} 
          />
          <StylizedCharacter 
            position={[0, 0.3, 0.68]} 
            type="presenting" 
            shirtColor="#dc2626" 
            hairColor="#1c1917" 
            skinColor="#fed7aa"
          />
          <FilingCabinet position={[-1.3, 0.75, 0.2]} rotation={[0, Math.PI / 5, 0]} />
        </group>

        {/* CABIN 2: PM - Neha Patel (Center Front) */}
        <group position={[0, 0, -1.2]}>
          <AreaRug 
            position={[0, 0.01, 0.05]} 
            args={[2.4, 2.1]} 
            color={theme === 'cozy' ? '#1c1917' : theme === 'gold' ? '#422006' : '#fbbf24'} 
          />
          <FullStackWorkstation position={[0, 0, 0]} />
          <Chair 
            position={[0, 0, 0.68]} 
            rotation={[0, Math.PI, 0]}
            seatColor={theme === 'cozy' ? '#ea580c' : theme === 'gold' ? '#ca8a04' : '#eab308'} 
          />
          <StylizedCharacter 
            position={[0, 0.3, 0.68]} 
            type="typing" 
            shirtColor="#ca8a04" 
            hairColor="#475569" 
            skinColor="#fbcfe8"
          />
        </group>

        {/* CABIN 3: Tech Lead - Arun Kumar (Right) */}
        <group position={[3.2, 0, 0.2]}>
          <AreaRug 
            position={[0, 0.01, 0]} 
            args={[2.2, 2.0]} 
            color={theme === 'cozy' ? '#1c1917' : theme === 'gold' ? '#422006' : '#334155'} 
          />
          <BackendWorkstation position={[0, 0, 0]} />
          <Chair 
            position={[0, 0, 0.65]} 
            rotation={[0, Math.PI, 0]}
            seatColor={theme === 'cozy' ? '#ea580c' : theme === 'gold' ? '#ca8a04' : '#10b981'} 
          />
          <StylizedCharacter 
            position={[0, 0.3, 0.65]} 
            type="debugging" 
            shirtColor="#10b981" 
            hairColor="#b45309" 
            skinColor="#fbcfe8"
          />
          <StorageRack position={[1.4, 0, -0.6]} rotation={[0, -Math.PI / 2, 0]} />
        </group>

        {/* CABIN 4: HR - Priya Sharma (Left Front) */}
        <group position={[-3.2, 0, 0.2]}>
          <AreaRug 
            position={[0, 0.01, 0]} 
            args={[2.2, 2.0]} 
            color={theme === 'cozy' ? '#450a0a' : theme === 'gold' ? '#1e293b' : '#0f172a'} 
          />
          <FrontendWorkstation position={[0, 0, 0]} />
          <Chair 
            position={[0, 0, 0.65]} 
            rotation={[0, Math.PI, 0]}
            seatColor={theme === 'cozy' ? '#dc2626' : theme === 'gold' ? '#eab308' : '#06b6d4'} 
          />
          <StylizedCharacter 
            position={[0, 0.3, 0.65]} 
            type="standing" 
            shirtColor="#06b6d4" 
            hairColor="#78350f" 
            skinColor="#fed7aa"
          />
          <StorageRack position={[-1.4, 0, -0.6]} rotation={[0, Math.PI / 2, 0]} />
        </group>

      </group>
    </>
  )
}
