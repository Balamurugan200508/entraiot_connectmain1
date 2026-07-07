import React, { useRef, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { CreativeWorkstation, Chair, OfficePlant, PendantLight, AreaRug, CampaignWhiteboard, SocialMonitorStand, LoungeArea, FilingCabinet, StorageRack } from './OfficeFurniture'
import { StylizedCharacter } from './OfficeCharacters'
import { Skyline } from './Skyline'
import * as THREE from 'three'

export function OfficeScene({ theme, cameraPreset }) {
  const controlsRef = useRef()
  const { camera } = useThree()

  useEffect(() => {
    if (!camera || !controlsRef.current) return

    const presets = {
      main: { pos: [0, 6.5, 9.5], look: [0, 0.8, -0.5] },
      desk: { pos: [0, 2.4, 1.8], look: [0, 0.9, -0.2] },
      whiteboard: { pos: [-2.4, 2.0, -1.2], look: [-3.8, 0.8, -2.8] },
      monitors: { pos: [2.5, 1.8, -1.2], look: [3.8, 0.8, -3.2] },
      lounge: { pos: [0, 2.2, 2.8], look: [0, 0.5, 1.2] }
    }

    const config = presets[cameraPreset] || presets.main

    camera.position.set(...config.pos)
    controlsRef.current.target.set(...config.look)
    controlsRef.current.update()
  }, [cameraPreset, camera])

  const getLighting = () => {
    switch (theme) {
      case 'sunset': // Night Cozy
        return {
          ambient: '#1e1b4b',
          ambientIntensity: 0.9,
          direct: '#ef4444',
          directIntensity: 3.0,
          directPos: [-6, 6, -3],
          point: '#dc2626',
          pointIntensity: 3.5
        }
      case 'cyber': // Cyber Gold
        return {
          ambient: '#1c1917',
          ambientIntensity: 0.95,
          direct: '#fbbf24',
          directIntensity: 3.8,
          directPos: [5, 8, 3],
          point: '#d97706',
          pointIntensity: 3.2
        }
      default: // day (Daylight)
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

  const floorTiles = React.useMemo(() => {
    const arr = []
    const width = 0.5
    const length = 4.5
    for (let x = -5; x < 5; x += width) {
      for (let z = -4.5; z < 4.5; z += length) {
        const hueSeed = Math.abs(Math.sin(x * 12.3 + z * 4.5))
        let color = hueSeed > 0.6 ? '#b45309' : hueSeed > 0.3 ? '#d97706' : '#9a3412'
        if (theme === 'sunset') { // Night Cozy
          color = hueSeed > 0.6 ? '#450a0a' : hueSeed > 0.3 ? '#7f1d1d' : '#991b1b'
        } else if (theme === 'cyber') { // Cyber Gold
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
            color={theme === 'sunset' ? '#311010' : theme === 'cyber' ? '#1c1917' : '#f8fafc'} 
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
            color={theme === 'sunset' ? '#311010' : theme === 'cyber' ? '#292524' : '#f1f5f9'} 
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

        {/* Skyline backdrop outside window */}
        <Skyline theme={theme} />

        {/* Pendant lamp */}
        <PendantLight position={[0, 2.5, 0]} />

        {/* Office plant */}
        <OfficePlant position={[-4, 0, 3.2]} />

        {/* Center setup: Creative desk & character */}
        <group position={[0, 0, 0]}>
          <AreaRug 
            position={[0, 0.01, -0.2]} 
            args={[2.6, 2.2]} 
            color={theme === 'sunset' ? '#450a0a' : theme === 'cyber' ? '#44403c' : '#064e3b'} 
          />
          <CreativeWorkstation position={[0, 0, 0]} theme={theme} />
          <Chair 
            position={[0, 0, -0.85]} 
            seatColor={theme === 'sunset' ? '#dc2626' : theme === 'cyber' ? '#d97706' : '#10b981'} 
          />
          <StylizedCharacter 
            position={[0, 0.3, -0.85]} 
            type="typing" 
            shirtColor="#0284c7" 
            hairColor="#475569" 
          />
        </group>

        {/* Campaign Whiteboard Corner (Back Left) */}
        <group position={[-3.8, 0.75, -2.8]} rotation={[0, Math.PI / 3, 0]}>
          <CampaignWhiteboard position={[0, 0.5, 0]} />
        </group>

        {/* Social Metrics stand (Back Right) */}
        <group position={[3.8, 0, -3.2]} rotation={[0, -Math.PI / 4, 0]}>
          <SocialMonitorStand position={[0, 0.7, 0]} theme={theme} />
        </group>

        {/* Lounge / Presentation meeting space (Front Right) */}
        <LoungeArea position={[2.2, 0, 1.8]} />

        {/* Filing Cabinet (Back Left Side Wall) */}
        <FilingCabinet position={[-3.8, 0.75, -1.0]} rotation={[0, Math.PI / 2.5, 0]} />

        {/* Storage Rack (Back Middle Wall) */}
        <StorageRack position={[-1.8, 0, -4.1]} rotation={[0, 0, 0]} />

      </group>
    </>
  )
}
