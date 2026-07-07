import React, { useRef, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { 
  FrontendWorkstation, 
  BackendWorkstation, 
  FullStackWorkstation, 
  ServerRackCabinet, 
  ArchitectureWhiteboard,
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
      frontend: { pos: [-2.8, 2.0, 1.8], look: [-2.8, 0.9, 0] },
      backend: { pos: [2.8, 2.0, 1.8], look: [2.8, 0.9, 0.2] },
      fullstack: { pos: [0, 2.1, -0.4], look: [0, 0.9, -2.0] },
      server: { pos: [3.4, 2.0, -0.8], look: [3.8, 0.8, -1.8] }
    }

    const config = presets[cameraPreset] || presets.main

    // Linear animations could be added, but setting direct updates allows the control targets to stay in sync
    camera.position.set(...config.pos)
    controlsRef.current.target.set(...config.look)
    controlsRef.current.update()
  }, [cameraPreset, camera])

  const getLighting = () => {
    switch (theme) {
      case 'matrix': // Matrix Cyber (Green)
        return {
          ambient: '#022c22',
          ambientIntensity: 0.95,
          direct: '#10b981',
          directIntensity: 3.5,
          directPos: [-5, 7, -2],
          point: '#059669',
          pointIntensity: 3.8
        }
      case 'synthwave': // Synthwave Midnight (Purple/Pink)
        return {
          ambient: '#1e1b4b',
          ambientIntensity: 0.9,
          direct: '#ec4899',
          directIntensity: 3.5,
          directPos: [5, 8, 3],
          point: '#8b5cf6',
          pointIntensity: 3.5
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
        let color = hueSeed > 0.6 ? '#b45309' : hueSeed > 0.3 ? '#d97706' : '#9a3412'
        if (theme === 'matrix') {
          color = hueSeed > 0.65 ? '#022c22' : hueSeed > 0.35 ? '#020617' : '#064e3b'
        } else if (theme === 'synthwave') {
          color = hueSeed > 0.65 ? '#2e1065' : hueSeed > 0.35 ? '#0f052d' : '#4c1d95'
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
            color={theme === 'matrix' ? '#020617' : theme === 'synthwave' ? '#0c051c' : '#f8fafc'} 
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
            color={theme === 'matrix' ? '#020617' : theme === 'synthwave' ? '#0c051c' : '#f1f5f9'} 
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
        <PendantLight position={[-2.8, 2.5, 0]} color={theme === 'matrix' ? '#047857' : theme === 'synthwave' ? '#6d28d9' : '#0369a1'} />
        <PendantLight position={[2.8, 2.5, 0]} color={theme === 'matrix' ? '#047857' : theme === 'synthwave' ? '#6d28d9' : '#0369a1'} />
        <PendantLight position={[0, 2.5, -2.0]} color={theme === 'matrix' ? '#047857' : theme === 'synthwave' ? '#6d28d9' : '#0369a1'} />

        {/* Plants in corners */}
        <OfficePlant position={[-5.2, 0, 4.0]} />
        <OfficePlant position={[5.2, 0, 4.0]} />

        {/* CABIN 1: Frontend Developer (Left) */}
        <group position={[-2.8, 0, 0]}>
          <AreaRug 
            position={[0, 0.01, 0]} 
            args={[2.2, 2.0]} 
            color={theme === 'matrix' ? '#064e3b' : theme === 'synthwave' ? '#581c87' : '#0f172a'} 
          />
          <FrontendWorkstation 
            position={[0, 0, 0]} 
            onMonitorClick={() => {
              window.location.href = '/non-animated/?from=developer2'
            }} 
          />
          <Chair 
            position={[0, 0, 0.65]} 
            rotation={[0, Math.PI, 0]}
            seatColor={theme === 'matrix' ? '#10b981' : theme === 'synthwave' ? '#ec4899' : '#06b6d4'} 
          />
          <StylizedCharacter 
            position={[0, 0.3, 0.65]} 
            type="typing" 
            shirtColor="#0284c7" 
            hairColor="#b45309" 
            skinColor="#fbcfe8"
          />
          {/* Cabin Specific Filing Cabinet & Storage Rack */}
          <FilingCabinet position={[-1.2, 0.75, 0.4]} rotation={[0, Math.PI / 4, 0]} />
          <StorageRack position={[-1.4, 0, -0.6]} rotation={[0, Math.PI / 2, 0]} />
        </group>

        {/* CABIN 2: Backend Developer (Right) */}
        <group position={[2.8, 0, 0.2]}>
          <AreaRug 
            position={[0, 0.01, 0]} 
            args={[2.2, 2.0]} 
            color={theme === 'matrix' ? '#022c22' : theme === 'synthwave' ? '#1e1b4b' : '#334155'} 
          />
          <BackendWorkstation 
            position={[0, 0, 0]} 
            onMonitorClick={() => {
              window.location.href = '/non-animated/'
            }} 
          />
          <Chair 
            position={[0, 0, 0.65]} 
            rotation={[0, Math.PI, 0]}
            seatColor={theme === 'matrix' ? '#059669' : theme === 'synthwave' ? '#8b5cf6' : '#10b981'} 
          />
          <StylizedCharacter 
            position={[0, 0.3, 0.65]} 
            type="debugging" 
            shirtColor="#1e293b" 
            hairColor="#1c1917" 
            skinColor="#fed7aa"
          />
          {/* Cabin Specific Filing Cabinet & Storage Rack */}
          <FilingCabinet position={[1.2, 0.75, 0.4]} rotation={[0, -Math.PI / 4, 0]} />
          <StorageRack position={[1.4, 0, -0.6]} rotation={[0, -Math.PI / 2, 0]} />
        </group>

        {/* CABIN 3: Full Stack Developer (Center Back) */}
        <group position={[0, 0, -2.0]} rotation={[0, 0.2, 0]}>
          <AreaRug 
            position={[0, 0.01, 0.05]} 
            args={[2.4, 2.1]} 
            color={theme === 'matrix' ? '#064e3b' : theme === 'synthwave' ? '#3b0764' : '#1e1b4b'} 
          />
          <FullStackWorkstation 
            position={[0, 0, 0]} 
            onMonitorClick={() => {
              window.location.href = '/non-animated/?from=developer'
            }} 
          />
          <Chair 
            position={[0, 0, 0.68]} 
            rotation={[0, Math.PI, 0]}
            seatColor={theme === 'matrix' ? '#10b981' : theme === 'synthwave' ? '#a855f7' : '#ec4899'} 
          />
          <StylizedCharacter 
            position={[0, 0.3, 0.68]} 
            type="typing" 
            shirtColor="#4f46e5" 
            hairColor="#475569" 
            skinColor="#fbcfe8"
          />
          {/* Cabin Specific Filing Cabinet & Storage Rack */}
          <FilingCabinet position={[-1.3, 0.75, 0.2]} rotation={[0, Math.PI / 5, 0]} />
          <StorageRack position={[1.3, 0, 0.2]} rotation={[0, -Math.PI / 5, 0]} />
        </group>

        {/* Server Rack (Back Right) */}
        <ServerRackCabinet position={[4.6, 0, -2.2]} rotation={[0, -Math.PI / 4, 0]} />

        {/* System Architecture Whiteboard (Back Left) */}
        <ArchitectureWhiteboard position={[-4.2, 0.75, -2.5]} rotation={[0, Math.PI / 4, 0]} />

      </group>
    </>
  )
}
