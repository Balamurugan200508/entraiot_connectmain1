import React from 'react'
import * as THREE from 'three'

// Simple Desk Lamp
export function TableLamp({ position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.09, 0.02, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.12, -0.04]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.24, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.24, 0.02]} rotation={[-0.4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.04, 0.08, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} />
      </mesh>
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
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 2.4, 8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.1, 0.26, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  )
}

// Area Rug
export function AreaRug({ position, args = [4, 3], color = '#4c1d95' }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  )
}

// Foliage Plant
export function OfficePlant({ position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.22, 0.6, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.29, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.02, 16]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
          <mesh position={[0.12, 0.6, 0.08]} rotation={[0.4, 0, 0.2]} castShadow>
            <boxGeometry args={[0.08, 0.6, 0.02]} />
            <meshStandardMaterial color="#10b981" roughness={0.8} />
          </mesh>
          <mesh position={[0.26, 0.85, 0.16]} rotation={[0.8, 0.1, 0.4]} castShadow>
            <boxGeometry args={[0.18, 0.4, 0.01]} />
            <meshStandardMaterial color="#059669" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Office Chair
export function Chair({ position, rotation = [0, 0, 0], seatColor = '#ec4899' }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.66, 32]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
      </mesh>
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
      <mesh position={[0, 0.24, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.24, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.12, 0.44]} />
        <meshStandardMaterial color={seatColor} roughness={0.4} />
      </mesh>
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

// 3D chart grids shown on the screen
function ScreenCharts({ theme }) {
  return (
    <group position={[0, 0, 0.002]}>
      <mesh position={[0, 0.14, 0]}>
        <planeGeometry args={[0.62, 0.05]} />
        <meshBasicMaterial color={theme === 'neon' ? '#ec4899' : '#0891b2'} />
      </mesh>
      {/* Visual representation of a line chart */}
      {[-0.24, -0.16, -0.08, 0, 0.08, 0.16, 0.24].map((x, idx) => {
        const h = 0.05 + Math.abs(Math.sin(idx * 1.8)) * 0.18
        return (
          <mesh key={idx} position={[x, -0.08 + h / 2, 0.001]}>
            <planeGeometry args={[0.035, h]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#10b981' : '#a855f7'} />
          </mesh>
        )
      })}
    </group>
  )
}

// Creative Workstation with Dual Monitors
export function CreativeWorkstation({ position, rotation = [0, 0, 0], theme }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Sleek table top */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.05, 0.95]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.85, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.72, 16]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0.85, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.72, 16]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Monitor 1 (Main Dashboard Screen) */}
      <group position={[-0.32, 0.75, -0.18]} rotation={[0, 0.15, 0]}>
        <mesh position={[0, 0.1, -0.04]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.22, -0.04]} castShadow>
          <boxGeometry args={[0.66, 0.38, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <group position={[0, 0.22, -0.029]}>
          <mesh>
            <planeGeometry args={[0.62, 0.34]} />
            <meshBasicMaterial color="#0a0f1d" />
          </mesh>
          <ScreenCharts theme={theme} />
        </group>
      </group>

      {/* Monitor 2 (Social Stream / Ad Designs) */}
      <group position={[0.32, 0.75, -0.18]} rotation={[0, -0.15, 0]}>
        <mesh position={[0, 0.1, -0.04]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.22, -0.04]} castShadow>
          <boxGeometry args={[0.66, 0.38, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <group position={[0, 0.22, -0.029]}>
          <mesh>
            <planeGeometry args={[0.62, 0.34]} />
            <meshBasicMaterial color="#0a0f1d" />
          </mesh>
          <group position={[0, 0, 0.002]}>
            {/* Draw a grid representing ad templates */}
            {[-0.2, 0, 0.2].map((x, i) => (
              <mesh key={i} position={[x, 0.02, 0.001]}>
                <planeGeometry args={[0.15, 0.18]} />
                <meshBasicMaterial color={i === 1 ? '#06b6d4' : '#6366f1'} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* Designer Drawing Tablet */}
      <group position={[-0.25, 0.75, 0.22]} rotation={[-0.08, 0, 0.05]}>
        <mesh castShadow>
          <boxGeometry args={[0.22, 0.01, 0.16]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.006, 0]}>
          <planeGeometry args={[0.2, 0.14]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      </group>

      {/* Modern Mug */}
      <group position={[0.7, 0.75, 0.15]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.1, 12]} />
          <meshStandardMaterial color="#ec4899" roughness={0.2} />
        </mesh>
        <mesh position={[0.045, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.03, 0.01, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#ec4899" />
        </mesh>
      </group>

      <TableLamp position={[0, 0.75, -0.32]} />
    </group>
  )
}

// Campaign Whiteboard with Sticky Notes and Target Demographics
export function CampaignWhiteboard({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Aluminum frame structure */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 0.04, 0.04]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
      {/* Left post */}
      <mesh position={[-0.72, -0.65, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
      <mesh position={[0.72, -0.65, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
      {/* Feet */}
      <mesh position={[-0.72, -1.3, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0.72, -1.3, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Main Board */}
      <mesh position={[0, -0.15, 0.01]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.9, 0.03]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>

      {/* Target Pie Chart */}
      <group position={[-0.38, -0.1, 0.03]}>
        <mesh>
          <cylinderGeometry args={[0.16, 0.16, 0.005, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
        <mesh rotation={[0, 0, 1.2]} position={[0.01, 0.01, 0.001]}>
          <cylinderGeometry args={[0.16, 0.16, 0.005, 32, 0, Math.PI]} rotation={[Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
        <mesh rotation={[0, 0, -1.2]} position={[0, 0.01, 0.002]}>
          <cylinderGeometry args={[0.16, 0.16, 0.005, 32, 0, Math.PI / 2]} rotation={[Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#f43f5e" />
        </mesh>
      </group>

      {/* Demographic title text representation */}
      <mesh position={[-0.38, 0.14, 0.03]}>
        <planeGeometry args={[0.3, 0.02]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>

      {/* Sticky Notes */}
      {[
        { x: 0.15, y: 0.15, color: '#fef08a' },
        { x: 0.32, y: 0.15, color: '#fbcfe8' },
        { x: 0.48, y: 0.15, color: '#cffafe' },
        { x: 0.15, y: 0.0, color: '#cffafe' },
        { x: 0.32, y: 0.0, color: '#fef08a' },
        { x: 0.48, y: 0.0, color: '#fbcfe8' },
        { x: 0.25, y: -0.18, color: '#bbf7d0' },
        { x: 0.42, y: -0.18, color: '#fef08a' }
      ].map((note, idx) => (
        <mesh 
          key={idx} 
          position={[note.x, note.y, 0.03]} 
          rotation={[0, 0, (idx % 2 === 0 ? 0.05 : -0.05)]} 
          castShadow
        >
          <planeGeometry args={[0.12, 0.11]} />
          <meshStandardMaterial color={note.color} roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

// Social Monitor Rack with floating channel metrics
export function SocialMonitorStand({ position, rotation = [0, 0, 0], theme }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Metal Frame Stand */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.4, 0.55]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>

      {/* Shelves */}
      {[-0.2, 0.25, 0.65].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0.01]} castShadow>
          <boxGeometry args={[0.76, 0.04, 0.52]} />
          <meshStandardMaterial color="#334155" roughness={0.3} />
        </mesh>
      ))}

      {/* Floating Network Panels (Instagram / Heart) */}
      <group position={[-0.18, 0.85, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.26, 0.26, 0.26]} />
          <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Heart logo representation */}
        <mesh position={[0, 0, 0.132]}>
          <planeGeometry args={[0.12, 0.12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Youtube Logo Box */}
      <group position={[0.18, 0.85, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.26, 0.26, 0.26]} />
          <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Play icon representation */}
        <mesh position={[0, 0, 0.132]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.06, 0.1, 3]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Floating social bar graph monitor */}
      <group position={[0, 0.45, 0.04]} rotation={[0.1, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.24, 0.15]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.076]}>
          <planeGeometry args={[0.54, 0.2]} />
          <meshBasicMaterial color="#0a0a0f" />
        </mesh>
        {/* Glowing bars */}
        {[-0.18, -0.06, 0.06, 0.18].map((bx, bIdx) => {
          const h = 0.04 + Math.abs(Math.sin(bIdx * 2.2)) * 0.11
          return (
            <mesh key={bIdx} position={[bx, -0.08 + h/2, 0.078]}>
              <planeGeometry args={[0.06, h]} />
              <meshBasicMaterial color={theme === 'neon' ? '#38bdf8' : '#eab308'} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

// Creative Meeting / Brainstorming Lounge area
export function LoungeArea({ position }) {
  return (
    <group position={position}>
      {/* Sleek Circular Carpet */}
      <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.1, 32]} />
        <meshStandardMaterial color="#581c87" roughness={0.9} />
      </mesh>

      {/* Curved Modern Sofa */}
      <group position={[0, 0.22, -0.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.4, 0.45]} />
          <meshStandardMaterial color="#c084fc" roughness={0.5} />
        </mesh>
        {/* Back support */}
        <mesh position={[0, 0.35, -0.18]} castShadow>
          <boxGeometry args={[1.5, 0.36, 0.14]} />
          <meshStandardMaterial color="#a855f7" roughness={0.5} />
        </mesh>
      </group>

      {/* Rounded Glass Table */}
      <group position={[0, 0.2, 0.3]}>
        <mesh position={[0, -0.1, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow>
          <circleGeometry args={[0.38, 24]} />
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
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

// Modern metallic storage rack with boxes and creative gear
export function StorageRack({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* 4 Corner Posts */}
      {[-0.38, 0.38].map((x, xIdx) =>
        [-0.23, 0.23].map((z, zIdx) => (
          <mesh key={`${xIdx}-${zIdx}`} position={[x, 0.7, z]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 1.4, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
        ))
      )}

      {/* Shelves */}
      {[-0.01, 0.35, 0.7, 1.05, 1.38].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.03, 0.5]} />
          <meshStandardMaterial color="#78350f" roughness={0.6} />
        </mesh>
      ))}

      {/* Bottom Shelf Box */}
      <mesh position={[-0.15, 0.15, 0]} castShadow>
        <boxGeometry args={[0.3, 0.24, 0.38]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
      </mesh>
      <mesh position={[0.2, 0.12, 0.05]} rotation={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.22, 0.18, 0.26]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} />
      </mesh>

      {/* Second Shelf: Rolled posters */}
      {[-0.2, 0, 0.2].map((x, idx) => (
        <mesh 
          key={idx} 
          position={[x, 0.44, 0.05]} 
          rotation={[Math.PI / 2, 0.3, Math.PI / 2]} 
          castShadow
        >
          <cylinderGeometry args={[0.045, 0.045, 0.36, 12]} />
          <meshStandardMaterial color={idx % 3 === 0 ? '#38bdf8' : idx % 3 === 1 ? '#a855f7' : '#ec4899'} />
        </mesh>
      ))}

      {/* Third Shelf: Design Award Trophy */}
      <group position={[0, 0.85, 0]}>
        <mesh position={[0, -0.08, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.05, 12]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh castShadow>
          <coneGeometry args={[0.05, 0.16, 4]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Top Shelf: Books / Creative references */}
      {[-0.22, -0.15, -0.08, 0.02, 0.1, 0.18].map((x, idx) => (
        <mesh 
          key={idx} 
          position={[x, 1.2, 0]} 
          rotation={[0.1, 0, idx === 5 ? 0.35 : 0]} 
          castShadow
        >
          <boxGeometry args={[0.04, 0.22, 0.3]} />
          <meshStandardMaterial color={idx % 2 === 0 ? '#3b82f6' : '#ec4899'} roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}


