import React, { useRef, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Desk, Chair, Whiteboard, ExecutiveDesk, CafeBar, Cabinet, StorageRack, ServerRack, OfficePlant, PendantLight, Sofa, AreaRug, ReceptionDesk, SlatPanel, StudioClock, StudioShelf, ConferenceTable, MeetingMonitor } from './OfficeFurniture'
import { StylizedCharacter } from './OfficeCharacters'
import { Skyline } from './Skyline'
import * as THREE from 'three'

export function OfficeScene({ theme, cameraPreset, onSelectPreset, onWhiteboardClick, meetingActive }) {
  const controlsRef = useRef()
  const { camera } = useThree()

  // Click-to-focus helper for AreaRugs
  const hoverProps = (preset) => ({
    onClick: (e) => {
      e.stopPropagation()
      onSelectPreset?.(preset)
    },
    onPointerOver: (e) => {
      e.stopPropagation()
      document.body.style.cursor = 'pointer'
    },
    onPointerOut: (e) => {
      e.stopPropagation()
      document.body.style.cursor = 'auto'
    }
  })

  useEffect(() => {
    if (!camera || !controlsRef.current) return

    const presets = {
      main: { pos: [0, 11, 18], look: [0, 1, -2] },
      ceo: { pos: [-10, 4, -4], look: [-12, 1.0, -8] },
      cto: { pos: [0, 4, -4], look: [0, 1.0, -8] },
      md: { pos: [10, 4, -4], look: [12, 1.0, -8] },
      hr: { pos: [10, 4, 8], look: [13, 1.0, 8] },
      meeting: { pos: [-5, 3.5, 11], look: [-12, 1.0, 4.5] }
    }

    const config = presets[cameraPreset] || presets.main

    camera.position.set(...config.pos)
    controlsRef.current.target.set(...config.look)
    controlsRef.current.update()
  }, [cameraPreset, camera])

  // Lighting configurations
  const getLighting = () => {
    switch (theme) {
      case 'creative':
        return {
          ambient: '#ffffff',
          ambientIntensity: 1.0,
          direct: '#fffbeb',
          directIntensity: 3.2,
          directPos: [12, 16, 8],
          point: '#fef08a',
          pointIntensity: 1.8
        }
      case 'cozy':
        return {
          ambient: '#2d2e30',
          ambientIntensity: 0.7,
          direct: '#ffedd5',
          directIntensity: 3.5,
          directPos: [-10, 10, 10],
          point: '#fed7aa',
          pointIntensity: 1.5
        }
      case 'sunset':
        return {
          ambient: '#4a3025',
          ambientIntensity: 0.65,
          direct: '#ea580c',
          directIntensity: 3.5,
          directPos: [16, 8, -8],
          point: '#ffb259',
          pointIntensity: 3.2
        }
      case 'cyber':
        return {
          ambient: '#0b061c',
          ambientIntensity: 0.9,
          direct: '#06b6d4',
          directIntensity: 2.5,
          directPos: [-12, 8, -6],
          point: '#ec4899',
          pointIntensity: 4.0
        }
      default: // day
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

  // Generate procedural wood floor strips
  const woodPlanks = React.useMemo(() => {
    const arr = []
    const width = 0.6
    const length = 5
    for (let x = -18; x < 18; x += width) {
      for (let z = -12; z < 12; z += length) {
        // Vary color tone slightly for realistic wood patterns
        const hueSeed = Math.abs(Math.sin(x * 12.3 + z * 4.5))
        let color = hueSeed > 0.6 ? '#b45309' : hueSeed > 0.3 ? '#d97706' : '#9a3412'
        if (theme === 'cozy') {
          color = hueSeed > 0.6 ? '#d8a47f' : hueSeed > 0.3 ? '#c68a5c' : '#a86b3e'
        } else if (theme === 'creative') {
          color = hueSeed > 0.5 ? '#f8fafc' : '#f1f5f9'
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
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Ceiling overhead light fixtures */}
      <pointLight position={[-12, 4.5, -8]} color={lights.point} intensity={lights.pointIntensity} distance={15} />
      <pointLight position={[0, 4.5, -8]} color={lights.point} intensity={lights.pointIntensity} distance={15} />
      <pointLight position={[12, 4.5, -8]} color={lights.point} intensity={lights.pointIntensity} distance={15} />
      <pointLight position={[12, 4.5, 8]} color={theme === 'sunset' ? '#ff9d3b' : '#ffedd5'} intensity={lights.pointIntensity} distance={15} />
      <pointLight position={[-12, 4.5, 4.5]} color={lights.point} intensity={lights.pointIntensity} distance={15} />

      <OrbitControls
        ref={controlsRef}
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
      />

      {/* Office Base & Architecture */}
      <group>
        {/* Procedural Wood Plank Floor */}
        <group>
          {woodPlanks.map((plank, idx) => (
            <mesh key={idx} position={[plank.x, -0.01, plank.z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[plank.w, plank.d]} />
              <meshStandardMaterial color={plank.color} roughness={0.4} metalness={0.1} />
            </mesh>
          ))}
        </group>

        {/* Back Wall */}
        <mesh position={[0, 6, -12]} receiveShadow>
          <boxGeometry args={[36, 12, 0.1]} />
          <meshStandardMaterial 
            color={theme === 'creative' ? '#facc15' : theme === 'cozy' ? '#3a3d40' : '#f8fafc'} 
            roughness={0.8} 
          />
        </mesh>
        
        {/* Cozy Studio Decorative items on Back Wall */}
        {theme === 'cozy' && (
          <group>
            {/* Wooden slats paneling behind executive suites */}
            <SlatPanel position={[-14, 3, -11.9]} args={[2.4, 5.8, 0.04]} />
            <SlatPanel position={[-10, 3, -11.9]} args={[1.6, 5.8, 0.04]} />
            <SlatPanel position={[2, 3, -11.9]} args={[2.0, 5.8, 0.04]} />
            <SlatPanel position={[10, 3, -11.9]} args={[2.4, 5.8, 0.04]} />
            {/* Clocks */}
            <StudioClock position={[-12, 4.2, -11.85]} />
            <StudioClock position={[12, 4.2, -11.85]} />
            {/* Wooden floating shelves */}
            <StudioShelf position={[-12, 4.8, -11.7]} args={[1.8, 0.04, 0.3]} />
            <StudioShelf position={[0, 4.5, -11.7]} args={[2.2, 0.04, 0.3]} />
            <StudioShelf position={[12, 4.8, -11.7]} args={[1.8, 0.04, 0.3]} />
          </group>
        )}

        {/* Playful Creative floating shelves and paintings */}
        {theme === 'creative' && (
          <group>
            {/* Floating white shelves */}
            <StudioShelf position={[-6, 4.2, -11.7]} args={[2.2, 0.04, 0.28]} />
            <StudioShelf position={[6, 4.2, -11.7]} args={[2.2, 0.04, 0.28]} />
            <StudioClock position={[0, 4.4, -11.85]} />
          </group>
        )}
        
        {/* Wall baseboards */}
        <mesh position={[0, 0.15, -11.9]} receiveShadow>
          <boxGeometry args={[36, 0.3, 0.1]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Left Wall */}
        <mesh position={[-18, 6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[24, 12, 0.1]} />
          <meshStandardMaterial 
            color={theme === 'creative' ? '#f8fafc' : theme === 'cozy' ? '#3a3d40' : '#f1f5f9'} 
            roughness={0.8} 
          />
        </mesh>
        {theme === 'cozy' && (
          <group position={[-17.9, 0, 0]}>
            {/* Wood panels slats along developers wall */}
            <SlatPanel position={[0, 3, -2]} args={[2.2, 5.8, 0.04]} rotation={[0, Math.PI / 2, 0]} />
            <SlatPanel position={[0, 3, 4]} args={[2.2, 5.8, 0.04]} rotation={[0, Math.PI / 2, 0]} />
          </group>
        )}
        <mesh position={[-17.9, 0.15, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[24, 0.3, 0.1]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Right Wall with Tall Windows */}
        <group position={[17.95, 6, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh>
            <boxGeometry args={[24, 12, 0.05]} />
            <meshStandardMaterial color="#94a3b8" transparent opacity={0.15} metalness={0.9} roughness={0.05} />
          </mesh>
          {/* Vertical window frames */}
          {[-8, -4, 0, 4, 8].map((x, idx) => (
            <mesh key={idx} position={[x, 0, 0.03]}>
              <boxGeometry args={[0.12, 12, 0.12]} />
              <meshStandardMaterial color={theme === 'creative' ? '#0f172a' : '#1e293b'} />
            </mesh>
          ))}
        </group>

        {/* Skyline backdrop outside windows */}
        <Skyline theme={theme} />

        {/* Partition Glass Suite Dividers */}
        <group position={[0, 3, -4]}>
          <mesh position={[0, -2.8, 0]}>
            <boxGeometry args={[36, 0.4, 0.15]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {[-18, -6, 6, 18].map((x, idx) => (
            <mesh key={idx} position={[x, 0, 0]}>
              <boxGeometry args={[0.15, 6, 0.15]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          ))}
          {/* Glass panels */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[35.8, 5.2, 0.02]} />
            <meshStandardMaterial color="#cbd5e1" transparent opacity={0.2} roughness={0.05} metalness={0.8} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* DECORATIONS & HANGING PENDANT LAMPS */}
        {/* ============================================================== */}
        {/* Dev desk pendant lights */}
        <PendantLight position={[-3.5, 3.8, 3.7]} />
        <PendantLight position={[12, 3.8, 6]} />

        {/* Office foliage / plants in suites and corners */}
        <OfficePlant position={[-16.5, 0, -10.5]} />
        <OfficePlant position={[16.5, 0, -10.5]} />
        <OfficePlant position={[8, 0, 10.5]} />

        {/* ============================================================== */}
        {/* CEO SUITE */}
        {/* ============================================================== */}
        <group position={[-12, 0, -8]}>
          <AreaRug position={[0, 0.01, 0]} args={[3.2, 2.2]} color={theme === 'creative' ? '#7c3aed' : '#1e1b4b'} {...hoverProps('ceo')} />
          <ExecutiveDesk 
            position={[0, 0, 0]} 
            onMonitorClick={() => {
              window.location.href = '/non-animated/?from=ceo'
            }} 
          />
          <Chair position={[0, 0, -0.95]} seatColor={theme === 'creative' ? '#a78bfa' : '#450a0a'} />
          <StylizedCharacter position={[0, 0.05, -0.95]} type="discussing" shirtColor="#1e1b4b" hairColor="#312e81" />
          <Whiteboard position={[-5.9, 2.5, 0.5]} rotation={[0, Math.PI / 2, 0]} />
          <Cabinet position={[-2.2, 0.9, -2.8]} />
          <StorageRack position={[2.2, 0, -2.8]} />
        </group>

        {/* ============================================================== */}
        {/* CTO SUITE */}
        {/* ============================================================== */}
        <group position={[0, 0, -8]}>
          <AreaRug position={[0, 0.01, 0]} args={[3.2, 2.2]} color={theme === 'creative' ? '#6d28d9' : '#0f172a'} {...hoverProps('cto')} />
          <ExecutiveDesk 
            position={[0, 0, 0]} 
            secondaryScreen={true} 
            onMonitorClick={() => {
              window.location.href = '/non-animated/?from=cto'
            }} 
          />
          <Chair position={[0, 0, -0.95]} seatColor={theme === 'creative' ? '#fbbf24' : '#0f172a'} />
          <StylizedCharacter position={[0, 0.05, -0.95]} type="typing" shirtColor="#0284c7" hairColor="#1e293b" hasHeadset={true} />
          <ServerRack position={[2.2, 0, -2.8]} />
          <ServerRack position={[3.1, 0, -2.8]} />
          <Cabinet position={[-2.2, 0.9, -2.8]} />
          <StorageRack position={[-3.1, 0, -2.8]} />
        </group>

        {/* ============================================================== */}
        {/* MD SUITE */}
        {/* ============================================================== */}
        <group position={[12, 0, -8]}>
          <AreaRug position={[0, 0.01, 0]} args={[3.2, 2.2]} color={theme === 'creative' ? '#c084fc' : '#111827'} {...hoverProps('md')} />
          <ExecutiveDesk 
            position={[0, 0, 0]} 
            onMonitorClick={() => {
              window.location.href = '/non-animated/'
            }} 
          />
          <Chair position={[0, 0, -0.95]} seatColor={theme === 'creative' ? '#60a5fa' : '#1e3a8a'} />
          <StylizedCharacter position={[0, 0.05, -0.95]} type="discussing" shirtColor="#065f46" hairColor="#78350f" />
          <Cabinet position={[-2.2, 0.9, -2.8]} />
          <StorageRack position={[2.2, 0, -2.8]} />
        </group>



        {/* ============================================================== */}
        {/* HR ROOM */}
        {/* ============================================================== */}
        <group position={[12, 0, 6]} rotation={[0, -Math.PI / 2, 0]}>
          <Desk position={[0, 0, 0]} />
          <Cabinet position={[-1.2, 0.9, -1.8]} />
          <Chair position={[0, 0, 0.85]} seatColor="#059669" />
          <StylizedCharacter position={[0, 0.05, 0.85]} type="typing" shirtColor="#059669" hairColor="#3f3f46" />
          <AreaRug position={[0, 0.01, -0.4]} args={[3.0, 2.4]} color="#065f46" {...hoverProps('hr')} />
        </group>

        {/* ============================================================== */}
        {/* MEETING / CONFERENCE ROOM */}
        {/* ============================================================== */}
        <group position={[-12, 0, 4.5]}>
          {/* Floor Area Rug */}
          <AreaRug position={[0, 0.01, 0]} args={[4.2, 2.6]} color="#1e293b" {...hoverProps('meeting')} />


          {/* Conference Table */}
          <ConferenceTable position={[0, 0, 0]} />

          {/* 3D Hologram Video Call Projector (Active only when meeting is live) */}
          {meetingActive && (
            <group position={[0, 0.8, 0]}>
              {/* Emitter Base */}
              <mesh castShadow>
                <cylinderGeometry args={[0.16, 0.18, 0.04, 16]} />
                <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Glowing projection beam */}
              <mesh position={[0, 0.45, 0]} receiveShadow>
                <cylinderGeometry args={[0.5, 0.16, 0.9, 16, 1, true]} />
                <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} wireframe />
              </mesh>
              {/* Floating Holographic Sphere (Simulated remote stream) */}
              <mesh position={[0, 0.5, 0]} castShadow>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshBasicMaterial color="#00d8ff" transparent opacity={0.65} />
              </mesh>
              {/* Minor surrounding particles/details */}
              {[-0.3, 0.3].map((x, i) => (
                <mesh key={i} position={[x, 0.65 + i * 0.1, x * 0.4]}>
                  <boxGeometry args={[0.06, 0.06, 0.06]} />
                  <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
                </mesh>
              ))}
            </group>
          )}

          {/* Meeting Chairs */}
          {/* Front Row (facing back/table) */}
          <Chair position={[-0.8, 0, 0.65]} rotation={[0, Math.PI, 0]} seatColor="#2563eb" />
          <Chair position={[0.8, 0, 0.65]} rotation={[0, Math.PI, 0]} seatColor="#2563eb" />
          {/* Back Row (facing forward/table) */}
          <Chair position={[-0.8, 0, -0.65]} rotation={[0, 0, 0]} seatColor="#2563eb" />
          <Chair position={[0.8, 0, -0.65]} rotation={[0, 0, 0]} seatColor="#2563eb" />

          {/* Meeting Room Pendant Lights */}
          <PendantLight position={[-0.8, 3.8, 0]} />
          <PendantLight position={[0.8, 3.8, 0]} />

          {/* Characters discussing (All 4 seats occupied) */}
          <StylizedCharacter position={[-0.8, 0.05, 0.65]} rotation={[0, Math.PI, 0]} type="discussing" shirtColor="#be185d" hairColor="#78350f" />
          <StylizedCharacter position={[0.8, 0.05, 0.65]} rotation={[0, Math.PI, 0]} type="discussing" shirtColor="#065f46" hairColor="#7c2d12" />
          <StylizedCharacter position={[-0.8, 0.05, -0.65]} rotation={[0, 0, 0]} type="discussing" shirtColor="#f59e0b" hairColor="#3f3f46" />
          <StylizedCharacter position={[0.8, 0.05, -0.65]} rotation={[0, 0, 0]} type="typing" shirtColor="#0284c7" hairColor="#1e293b" />
        </group>

        {/* Whiteboard Standup presentation area */}
        <Whiteboard 
          position={[-17.9, 2.5, 3]} 
          rotation={[0, Math.PI / 2, 0]} 
          onClick={(e) => { e.stopPropagation(); onWhiteboardClick?.() }}
          onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
          onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto' }}
        />
      </group>
    </>
  )
}
