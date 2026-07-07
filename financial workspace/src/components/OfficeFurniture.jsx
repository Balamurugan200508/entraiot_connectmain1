import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simple Desk Lamp
export function TableLamp({ position }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.09, 0.02, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Arm */}
      <mesh position={[0, 0.12, -0.04]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.24, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} />
      </mesh>
      {/* Lamp Head */}
      <mesh position={[0, 0.24, 0.02]} rotation={[-0.4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.04, 0.08, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} />
      </mesh>
      {/* Bulb Glow */}
      <mesh position={[0, 0.2, 0.04]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  )
}

// Hanging Pendant Light
export function PendantLight({ position }) {
  return (
    <group position={position}>
      {/* Cord */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 2.4, 8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Shade */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.1, 0.26, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Glow bulb */}
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  )
}

// Colored carpet floor rug
export function AreaRug({ position, args = [4, 3], color = '#1e3a8a' }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  )
}

// Office Foliage Plant
export function OfficePlant({ position }) {
  return (
    <group position={position}>
      {/* Ceramic Pot */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.22, 0.6, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.29, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.02, 16]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      {/* Stems & Leaves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
          <mesh position={[0.12, 0.6, 0.08]} rotation={[0.4, 0, 0.2]} castShadow>
            <boxGeometry args={[0.08, 0.6, 0.02]} />
            <meshStandardMaterial color="#15803d" roughness={0.8} />
          </mesh>
          <mesh position={[0.26, 0.85, 0.16]} rotation={[0.8, 0.1, 0.4]} castShadow>
            <boxGeometry args={[0.18, 0.4, 0.01]} />
            <meshStandardMaterial color="#166534" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// 3D safe cash vault box
export function GoldVault({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Vault Cabinet */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.0, 1.4, 0.85]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Safe Door */}
      <mesh position={[0, 0, 0.43]} castShadow>
        <boxGeometry args={[0.84, 1.22, 0.05]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Dial Lock System */}
      <group position={[0, 0.1, 0.46]}>
        {/* Dial Center */}
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.95} />
        </mesh>
        {/* Dial Handle Spokes */}
        {[0, 1, 2].map((i) => (
          <mesh 
            key={i} 
            rotation={[0, 0, (i * Math.PI * 2) / 3]} 
            position={[0, 0, 0.02]}
            castShadow
          >
            <boxGeometry args={[0.025, 0.28, 0.02]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
          </mesh>
        ))}
      </group>
      {/* Electronic Keypad */}
      <mesh position={[-0.25, -0.25, 0.46]} castShadow>
        <boxGeometry args={[0.13, 0.18, 0.03]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
    </group>
  )
}

// Stack of Gold Bars
export function GoldBars({ position }) {
  const bars = [
    // Bottom row
    { x: -0.1, y: 0.02, z: -0.06 },
    { x: 0, y: 0.02, z: -0.06 },
    { x: 0.1, y: 0.02, z: -0.06 },
    { x: -0.1, y: 0.02, z: 0.06 },
    { x: 0, y: 0.02, z: 0.06 },
    { x: 0.1, y: 0.02, z: 0.06 },
    // Middle row
    { x: -0.05, y: 0.06, z: 0 },
    { x: 0.05, y: 0.06, z: 0 },
    // Top bar
    { x: 0, y: 0.1, z: 0 }
  ]

  return (
    <group position={position}>
      {/* Base table or tray */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.04, 0.28]} />
        <meshStandardMaterial color="#78350f" roughness={0.7} />
      </mesh>
      {/* Stacked bars */}
      {bars.map((bar, idx) => (
        <mesh 
          key={idx} 
          position={[bar.x, bar.y, bar.z]}
          castShadow
        >
          <boxGeometry args={[0.09, 0.035, 0.055]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

// Office filing cabinet with drawers and invoice folders
export function FilingCabinet({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Cabinet Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.5, 0.6]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>

      {/* Drawers (4 drawer panels) */}
      {[0.5, 0.15, -0.2, -0.55].map((y, idx) => (
        <group key={idx} position={[0, y, 0.01]}>
          {/* Drawer Face */}
          <mesh castShadow>
            <boxGeometry args={[0.74, 0.32, 0.6]} />
            <meshStandardMaterial color="#475569" roughness={0.3} />
          </mesh>
          {/* Handle */}
          <mesh position={[0, 0.05, 0.315]} castShadow>
            <boxGeometry args={[0.24, 0.03, 0.03]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
          {/* Folder tabs peeking if it's the second drawer */}
          {idx === 1 && (
            <group position={[0, 0.18, 0.1]} rotation={[-0.1, 0, 0]}>
              {[-0.2, -0.05, 0.1, 0.25].map((x, fIdx) => (
                <mesh key={fIdx} position={[x, 0, 0]} castShadow>
                  <boxGeometry args={[0.12, 0.08, 0.02]} />
                  <meshStandardMaterial color={fIdx % 3 === 0 ? '#ef4444' : fIdx % 3 === 1 ? '#3b82f6' : '#fbbf24'} />
                </mesh>
              ))}
            </group>
          )}
        </group>
      ))}
    </group>
  )
}

// 3D Spreadsheet display mesh (drawn with white lines representing spreadsheet rows/columns)
export function SpreadsheetGrid({ theme, size = [0.66, 0.36] }) {
  return (
    <group position={[0, 0, 0.002]}>
      {/* Header bar */}
      <mesh position={[0, size[1]/2 - 0.03, 0]}>
        <planeGeometry args={[size[0] * 0.96, 0.06]} />
        <meshBasicMaterial color="#065f46" />
      </mesh>
      {/* Grid rows */}
      {[-0.12, -0.06, 0, 0.06, 0.12].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0.001]}>
          <planeGeometry args={[size[0] * 0.95, 0.004]} />
          <meshBasicMaterial color="#334155" transparent opacity={0.6} />
        </mesh>
      ))}
      {/* Grid columns */}
      {[-0.25, -0.12, 0, 0.12, 0.25].map((x, idx) => (
        <mesh key={idx} position={[x, 0, 0.001]}>
          <planeGeometry args={[0.004, size[1] * 0.82]} />
          <meshBasicMaterial color="#334155" transparent opacity={0.6} />
        </mesh>
      ))}
      {/* Fake Bar Chart elements in spreadsheet */}
      {[-0.2, -0.07, 0.06, 0.18].map((x, idx) => {
        const height = 0.05 + Math.abs(Math.sin(idx * 1.5)) * 0.18
        const color = idx === 1 ? '#ef4444' : '#10b981'
        return (
          <mesh key={idx} position={[x, -0.06 + height/2, 0.002]}>
            <planeGeometry args={[0.05, height]} />
            <meshBasicMaterial color={color} />
          </mesh>
        )
      })}
    </group>
  )
}

// Accountant's Cozy Working Desk (Wood oak top, document folders, spreadsheets, ledger)
export function AccountantDesk({ position, rotation = [0, 0, 0], theme = 'bull' }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Wood oak table top */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.06, 1.0]} />
        <meshStandardMaterial color="#dfac6c" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Supportive drawer legs */}
      <mesh position={[-0.76, 0.33, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.36, 0.66, 0.82]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      <mesh position={[0.76, 0.33, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.36, 0.66, 0.82]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>

      {/* Accountant Spreadsheet Computer Monitor */}
      <group position={[0, 0.75, -0.2]}>
        {/* Support arm */}
        <mesh position={[0, 0.1, -0.05]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
        {/* Screen Bezel */}
        <mesh position={[0, 0.22, -0.05]} castShadow>
          <boxGeometry args={[0.7, 0.4, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        {/* Glowing screen content */}
        <group position={[0, 0.22, -0.039]}>
          <mesh>
            <planeGeometry args={[0.66, 0.36]} />
            <meshBasicMaterial color="#022c22" />
          </mesh>
          <SpreadsheetGrid theme={theme} size={[0.66, 0.36]} />
        </group>
      </group>

      {/* Open Ledger book (Accountant records) */}
      <group position={[-0.4, 0.76, 0.15]} rotation={[0, 0.12, 0]}>
        {/* Cover */}
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.015, 0.22]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.6} />
        </mesh>
        {/* Pages Left */}
        <mesh position={[-0.065, 0.01, 0]} rotation={[0, 0, 0.03]} castShadow>
          <boxGeometry args={[0.13, 0.01, 0.2]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </mesh>
        {/* Pages Right */}
        <mesh position={[0.065, 0.01, 0]} rotation={[0, 0, -0.03]} castShadow>
          <boxGeometry args={[0.13, 0.01, 0.2]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </mesh>
      </group>

      {/* Retro Calculator */}
      <group position={[0.35, 0.76, 0.18]} rotation={[0, -0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.02, 0.16]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.011, -0.045]} castShadow>
          <boxGeometry args={[0.09, 0.005, 0.035]} />
          <meshStandardMaterial color="#bbf7d0" roughness={0.9} />
        </mesh>
      </group>

      {/* Stack of Invoices/Paper files */}
      <group position={[-0.7, 0.75, 0.18]}>
        {[0, 0.015, 0.03, 0.045].map((y, idx) => (
          <mesh 
            key={idx} 
            position={[0, y, 0]} 
            rotation={[0, idx * 0.08 - 0.1, 0]} 
            castShadow
          >
            <boxGeometry args={[0.22, 0.012, 0.28]} />
            <meshStandardMaterial color={idx % 2 === 0 ? '#f8fafc' : '#fef08a'} roughness={0.95} />
          </mesh>
        ))}
      </group>

      <TableLamp position={[0.65, 0.75, -0.2]} />
    </group>
  )
}

// Office Chair (Chrome base, thick seat, mesh backrest)
export function Chair({ position, rotation = [0, 0, 0], seatColor = '#10b981' }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Carpet under chair */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.66, 32]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
      </mesh>

      {/* Base cylinder support */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.14, 8]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.8} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh 
          key={i} 
          position={[Math.sin((i * Math.PI * 2) / 5) * 0.24, 0.08, Math.cos((i * Math.PI * 2) / 5) * 0.24]}
          rotation={[0, (i * Math.PI * 2) / 5, 0]}
          castShadow
        >
          <boxGeometry args={[0.03, 0.03, 0.34]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
      ))}

      {/* Castor wheels */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i + 10}
          position={[Math.sin((i * Math.PI * 2) / 5) * 0.28, 0.02, Math.cos((i * Math.PI * 2) / 5) * 0.28]}
          castShadow
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}

      <mesh position={[0, 0.24, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.24, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Cushion seat */}
      <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.12, 0.44]} />
        <meshStandardMaterial color={seatColor} roughness={0.4} />
      </mesh>

      {/* Backrest */}
      <group position={[0, 0.8, -0.2]} rotation={[0.05, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.42, 0.54, 0.1]} />
          <meshStandardMaterial color={seatColor} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.2, -0.05]} castShadow>
          <boxGeometry args={[0.07, 0.36, 0.04]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
      </group>
    </group>
  )
}
