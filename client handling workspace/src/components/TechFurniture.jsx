import React from 'react'
import * as THREE from 'three'

// Simple Desk Lamp
export function TableLamp({ position, color = '#64748b', lightColor = '#fef08a' }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.09, 0.02, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.12, -0.04]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.24, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.24, 0.02]} rotation={[-0.4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.04, 0.08, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.2, 0.04]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={lightColor} />
      </mesh>
    </group>
  )
}

// Hanging Pendant Light
export function PendantLight({ position, color = '#0f172a' }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 2.4, 8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.1, 0.26, 16]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  )
}

// Area Rug
export function AreaRug({ position, args = [4, 3], color = '#1e1b4b' }) {
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
        <cylinderGeometry args={[0.26, 0.18, 0.5, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.02, 16]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
          <mesh position={[0.1, 0.5, 0.06]} rotation={[0.4, 0, 0.2]} castShadow>
            <boxGeometry args={[0.06, 0.5, 0.02]} />
            <meshStandardMaterial color="#06b6d4" roughness={0.8} />
          </mesh>
          <mesh position={[0.22, 0.72, 0.12]} rotation={[0.8, 0.1, 0.4]} castShadow>
            <boxGeometry args={[0.15, 0.35, 0.01]} />
            <meshStandardMaterial color="#0891b2" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Office Chair
export function Chair({ position, rotation = [0, 0, 0], seatColor = '#06b6d4' }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.6, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.14, 8]} />
        <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.8} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh 
          key={i} 
          position={[Math.sin((i * Math.PI * 2) / 5) * 0.22, 0.08, Math.cos((i * Math.PI * 2) / 5) * 0.22]}
          rotation={[0, (i * Math.PI * 2) / 5, 0]}
          castShadow
        >
          <boxGeometry args={[0.025, 0.025, 0.3]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, 0.24, 0]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.24, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.1, 0.42]} />
        <meshStandardMaterial color={seatColor} roughness={0.5} />
      </mesh>
      <group position={[0, 0.76, -0.18]} rotation={[0.05, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.38, 0.5, 0.08]} />
          <meshStandardMaterial color={seatColor} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.18, -0.04]} castShadow>
          <boxGeometry args={[0.06, 0.32, 0.03]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

// 1. Frontend Workstation
export function FrontendWorkstation({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Table Top */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.05, 0.9]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[-0.75, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.72, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      <mesh position={[0.75, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.72, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>

      {/* Neon Desk Mat (Pink/Cyan) */}
      <mesh position={[0, 0.75, 0.05]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.2, 0.5]} />
        <meshStandardMaterial color="#ec4899" roughness={0.9} emissive="#db2777" emissiveIntensity={0.2} />
      </mesh>

      {/* Curved Ultra-wide Monitor */}
      <group position={[0, 0.75, -0.22]}>
        <mesh position={[0, 0.1, -0.03]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        {/* Curved screens representation */}
        {[-0.32, 0, 0.32].map((x, idx) => (
          <group key={idx} position={[x, 0.24, -0.01]} rotation={[0, (idx === 0 ? 0.25 : idx === 2 ? -0.25 : 0), 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.34, 0.32, 0.02]} />
              <meshStandardMaterial color="#1e293b" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0, 0.012]}>
              <planeGeometry args={[0.32, 0.28]} />
              <meshBasicMaterial color="#030712" />
            </mesh>
            {/* Visual layouts */}
            {idx === 0 && (
              <group position={[0, 0, 0.015]}>
                {/* Wireframe Layout */}
                <mesh position={[-0.08, 0.06, 0]}>
                  <planeGeometry args={[0.1, 0.1]} />
                  <meshBasicMaterial color="#ec4899" />
                </mesh>
                <mesh position={[0.06, 0.08, 0]}>
                  <planeGeometry args={[0.14, 0.02]} />
                  <meshBasicMaterial color="#06b6d4" />
                </mesh>
                <mesh position={[0.06, 0.04, 0]}>
                  <planeGeometry args={[0.14, 0.02]} />
                  <meshBasicMaterial color="#06b6d4" />
                </mesh>
                {/* Simulated text lines */}
                {[-0.04, -0.08].map((y, i) => (
                  <mesh key={i} position={[0, y, 0]}>
                    <planeGeometry args={[0.26, 0.015]} />
                    <meshBasicMaterial color="#94a3b8" />
                  </mesh>
                ))}
              </group>
            )}
            {idx === 1 && (
              <group position={[0, 0, 0.015]}>
                {/* Color Palette and App view */}
                <mesh position={[0, 0.04, 0]}>
                  <planeGeometry args={[0.28, 0.16]} />
                  <meshBasicMaterial color="#1e1b4b" />
                </mesh>
                <mesh position={[0, 0.04, 0.001]}>
                  <sphereGeometry args={[0.05, 16, 16]} />
                  <meshBasicMaterial color="#06b6d4" />
                </mesh>
                {/* Small color swatches */}
                {[-0.1, -0.03, 0.04, 0.1].map((cx, i) => (
                  <mesh key={i} position={[cx, -0.08, 0]}>
                    <planeGeometry args={[0.04, 0.04]} />
                    <meshBasicMaterial color={i === 0 ? '#3b82f6' : i === 1 ? '#ec4899' : i === 2 ? '#10b981' : '#f59e0b'} />
                  </mesh>
                ))}
              </group>
            )}
            {idx === 2 && (
              <group position={[0, 0, 0.015]}>
                {/* Mobile UI Simulator */}
                <mesh position={[0, 0, 0]}>
                  <planeGeometry args={[0.11, 0.22]} />
                  <meshBasicMaterial color="#111827" />
                </mesh>
                <mesh position={[0, 0.06, 0.001]}>
                  <planeGeometry args={[0.09, 0.08]} />
                  <meshBasicMaterial color="#f43f5e" />
                </mesh>
                <mesh position={[0, -0.04, 0.001]}>
                  <planeGeometry args={[0.09, 0.08]} />
                  <meshBasicMaterial color="#06b6d4" />
                </mesh>
              </group>
            )}
          </group>
        ))}
      </group>

      {/* Tablet / Notebook */}
      <group position={[-0.45, 0.75, 0.22]} rotation={[0, 0.1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.2, 0.01, 0.14]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.006, 0]}>
          <planeGeometry args={[0.18, 0.12]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
      </group>

      {/* Coffee Mug */}
      <group position={[0.55, 0.75, 0.18]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.09, 12]} />
          <meshStandardMaterial color="#06b6d4" roughness={0.3} />
        </mesh>
        <mesh position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.026, 0.008, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#06b6d4" />
        </mesh>
      </group>

      <TableLamp position={[-0.7, 0.75, -0.25]} color="#0891b2" lightColor="#06b6d4" />
    </group>
  )
}

// 2. Backend Workstation
export function BackendWorkstation({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Table Top */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.05, 0.9]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[-0.75, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.72, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>
      <mesh position={[0.75, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.72, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>

      {/* Neon Desk Mat (Green) */}
      <mesh position={[0, 0.75, 0.05]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.2, 0.5]} />
        <meshStandardMaterial color="#10b981" roughness={0.9} emissive="#047857" emissiveIntensity={0.2} />
      </mesh>

      {/* Terminal Monitors (Vertical and Horizontal stack) */}
      {/* Left Screen (System Terminal) */}
      <group position={[-0.26, 0.75, -0.18]} rotation={[0, 0.18, 0]}>
        <mesh position={[0, 0.1, -0.03]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        <mesh castShadow position={[0, 0.24, -0.01]}>
          <boxGeometry args={[0.48, 0.32, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.24, 0.002]}>
          <planeGeometry args={[0.44, 0.28]} />
          <meshBasicMaterial color="#022c22" />
        </mesh>
        {/* Neon Terminal Lines */}
        <group position={[0, 0.24, 0.004]}>
          {[-0.1, -0.06, -0.02, 0.02, 0.06, 0.1].map((y, idx) => (
            <mesh key={idx} position={[-0.08 + (idx % 2 === 0 ? 0.02 : 0), y, 0]}>
              <planeGeometry args={[0.22 - (idx % 3 === 0 ? 0.08 : 0), 0.01]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          ))}
        </group>
      </group>

      {/* Right Screen (Database Schema / Grafana) */}
      <group position={[0.26, 0.75, -0.18]} rotation={[0, -0.18, 0]}>
        <mesh position={[0, 0.1, -0.03]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        <mesh castShadow position={[0, 0.24, -0.01]}>
          <boxGeometry args={[0.48, 0.32, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.24, 0.002]}>
          <planeGeometry args={[0.44, 0.28]} />
          <meshBasicMaterial color="#090d16" />
        </mesh>
        {/* Nodes flow chart */}
        <group position={[0, 0.24, 0.004]}>
          <mesh position={[-0.1, 0.04, 0]}>
            <planeGeometry args={[0.06, 0.06]} />
            <meshBasicMaterial color="#3b82f6" />
          </mesh>
          <mesh position={[0.1, 0.08, 0]}>
            <planeGeometry args={[0.06, 0.06]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          <mesh position={[0.1, -0.04, 0]}>
            <planeGeometry args={[0.06, 0.06]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          {/* Connector lines representation */}
          <mesh position={[0, 0.02, -0.001]} rotation={[0, 0, -0.2]}>
            <planeGeometry args={[0.16, 0.01]} />
            <meshBasicMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[0, -0.01, -0.001]} rotation={[0, 0, 0.4]}>
            <planeGeometry args={[0.16, 0.01]} />
            <meshBasicMaterial color="#cbd5e1" />
          </mesh>
        </group>
      </group>

      {/* Database Cylinders on Desk */}
      <group position={[0.62, 0.75, 0.2]} rotation={[0, -0.4, 0]}>
        {[-0.08, 0.08].map((x, i) => (
          <group key={i} position={[x, 0.08, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.16, 12]} />
              <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.7} />
            </mesh>
            {/* Database slots */}
            {[0.04, 0, -0.04].map((y, idx) => (
              <mesh key={idx} position={[0, y, 0.052]}>
                <boxGeometry args={[0.06, 0.015, 0.005]} />
                <meshBasicMaterial color="#10b981" />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      <TableLamp position={[0.7, 0.75, -0.25]} color="#047857" lightColor="#10b981" />
    </group>
  )
}

// 3. Full Stack Workstation
export function FullStackWorkstation({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Table Top */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.05, 0.95]} />
        <meshStandardMaterial color="#1e1b4b" roughness={0.15} metalness={0.8} />
      </mesh>
      <mesh position={[-0.85, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.72, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>
      <mesh position={[0.85, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.72, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </mesh>

      {/* Neon Desk Mat (Purple/Gold) */}
      <mesh position={[0, 0.75, 0.05]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.4, 0.52]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.9} emissive="#6d28d9" emissiveIntensity={0.2} />
      </mesh>

      {/* Dual Monitors */}
      {/* Screen 1 (UI view) */}
      <group position={[-0.34, 0.75, -0.18]} rotation={[0, 0.15, 0]}>
        <mesh position={[0, 0.1, -0.04]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.22, -0.04]} castShadow>
          <boxGeometry args={[0.62, 0.36, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.22, -0.029]}>
          <planeGeometry args={[0.58, 0.32]} />
          <meshBasicMaterial color="#090514" />
        </mesh>
        {/* System layout view */}
        <group position={[0, 0.22, -0.027]}>
          <mesh position={[-0.16, 0, 0]}>
            <planeGeometry args={[0.16, 0.24]} />
            <meshBasicMaterial color="#8b5cf6" />
          </mesh>
          <mesh position={[0.08, 0.06, 0]}>
            <planeGeometry args={[0.26, 0.1]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>
          <mesh position={[0.08, -0.06, 0]}>
            <planeGeometry args={[0.26, 0.1]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
        </group>
      </group>

      {/* Screen 2 (Git Branch Flow) */}
      <group position={[0.34, 0.75, -0.18]} rotation={[0, -0.15, 0]}>
        <mesh position={[0, 0.1, -0.04]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.22, -0.04]} castShadow>
          <boxGeometry args={[0.62, 0.36, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.22, -0.029]}>
          <planeGeometry args={[0.58, 0.32]} />
          <meshBasicMaterial color="#020617" />
        </mesh>
        {/* Git lines and dots */}
        <group position={[0, 0.22, -0.027]}>
          <mesh position={[-0.2, 0, 0]}>
            <planeGeometry args={[0.01, 0.2]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
          <mesh position={[-0.04, -0.02, 0]} rotation={[0, 0, -0.5]}>
            <planeGeometry args={[0.01, 0.16]} />
            <meshBasicMaterial color="#3b82f6" />
          </mesh>
          <mesh position={[0.06, 0, 0]}>
            <planeGeometry args={[0.01, 0.2]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          {[-0.08, 0, 0.08].map((y, idx) => (
            <mesh key={idx} position={[-0.2, y, 0.001]}>
              <sphereGeometry args={[0.016, 8, 8]} />
              <meshBasicMaterial color="#f43f5e" />
            </mesh>
          ))}
          {[-0.06, 0.04].map((y, idx) => (
            <mesh key={idx} position={[0.06, y, 0.001]}>
              <sphereGeometry args={[0.016, 8, 8]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          ))}
        </group>
      </group>

      {/* Floating CI/CD deployment cube */}
      <group position={[-0.72, 0.75, 0.2]} rotation={[0.2, 0.4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.062]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>

      <TableLamp position={[0, 0.75, -0.32]} color="#6d28d9" lightColor="#c084fc" />
    </group>
  )
}

// 4. Standalone Server Rack Cabinet
export function ServerRackCabinet({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Outer Case */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.7, 1.6, 0.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.9} />
      </mesh>
      
      {/* Front Tempered Glass Door */}
      <mesh position={[0, 0, 0.301]} castShadow>
        <boxGeometry args={[0.62, 1.48, 0.01]} />
        <meshStandardMaterial color="#0284c7" transparent opacity={0.4} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Server Units inside */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((y, idx) => (
        <group key={idx} position={[0, y, 0.02]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.18, 0.52]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
          </mesh>
          {[-0.22, -0.16, -0.1, -0.04, 0.04, 0.1, 0.16, 0.22].map((x, lIdx) => {
            const lit = (idx + lIdx) % 3 === 0
            return (
              <mesh key={lIdx} position={[x, 0.02, 0.264]}>
                <sphereGeometry args={[0.012, 6, 6]} />
                <meshBasicMaterial color={lit ? '#10b981' : '#dc2626'} />
              </mesh>
            )
          })}
          <mesh position={[0.2, -0.03, 0.264]}>
            <cylinderGeometry args={[0.04, 0.04, 0.005, 8]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#020617" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// 5. System Architecture Whiteboard
export function ArchitectureWhiteboard({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.04, 0.04]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
      <mesh position={[-0.76, -0.65, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
      <mesh position={[0.76, -0.65, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
      </mesh>
      <mesh position={[-0.76, -1.3, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.76, -1.3, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Main Board */}
      <mesh position={[0, -0.15, 0.012]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.95, 0.03]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.25} />
      </mesh>

      <group position={[0, -0.15, 0.03]}>
        <mesh position={[-0.4, 0.2, 0]}>
          <planeGeometry args={[0.26, 0.08]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
        {[-0.1, -0.25].map((y, i) => (
          <group key={i} position={[0.05, y, 0]}>
            <mesh>
              <planeGeometry args={[0.22, 0.08]} />
              <meshBasicMaterial color="#a855f7" />
            </mesh>
          </group>
        ))}
        <mesh position={[0.42, -0.18, 0]}>
          <planeGeometry args={[0.18, 0.12]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[-0.16, 0.06, -0.001]} rotation={[0, 0, -0.4]}>
          <planeGeometry args={[0.26, 0.008]} />
          <meshBasicMaterial color="#475569" />
        </mesh>
        <mesh position={[-0.16, -0.04, -0.001]} rotation={[0, 0, 0.4]}>
          <planeGeometry args={[0.26, 0.008]} />
          <meshBasicMaterial color="#475569" />
        </mesh>
        <mesh position={[0.24, -0.18, -0.001]}>
          <planeGeometry args={[0.12, 0.008]} />
          <meshBasicMaterial color="#475569" />
        </mesh>
      </group>
    </group>
  )
}

// Office filing cabinet
export function FilingCabinet({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.5, 0.6]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>
      {[0.5, 0.15, -0.2, -0.55].map((y, idx) => (
        <group key={idx} position={[0, y, 0.01]}>
          <mesh castShadow>
            <boxGeometry args={[0.74, 0.32, 0.6]} />
            <meshStandardMaterial color="#475569" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.05, 0.315]} castShadow>
            <boxGeometry args={[0.24, 0.03, 0.03]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
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

// Storage rack
export function StorageRack({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {[-0.38, 0.38].map((x, xIdx) =>
        [-0.23, 0.23].map((z, zIdx) => (
          <mesh key={`${xIdx}-${zIdx}`} position={[x, 0.7, z]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 1.4, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
        ))
      )}
      {[-0.01, 0.35, 0.7, 1.05, 1.38].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.03, 0.5]} />
          <meshStandardMaterial color="#78350f" roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[-0.15, 0.15, 0]} castShadow>
        <boxGeometry args={[0.3, 0.24, 0.38]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
      </mesh>
      <mesh position={[0.2, 0.12, 0.05]} rotation={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.22, 0.18, 0.26]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} />
      </mesh>
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

// Cabin Divider
export function CabinDivider({ position, rotation = [0, 0, 0], length = 3.2 }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, 0.8, 0.06]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[length, 0.8, 0.02]} />
        <meshStandardMaterial color="#0891b2" transparent opacity={0.25} metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[length, 0.04, 0.08]} />
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[length, 0.03, 0.07]} />
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[length, 0.03, 0.07]} />
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </mesh>
      <mesh position={[-length / 2, 0.8, 0]}>
        <boxGeometry args={[0.04, 1.6, 0.06]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} />
      </mesh>
      <mesh position={[length / 2, 0.8, 0]}>
        <boxGeometry args={[0.04, 1.6, 0.06]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} />
      </mesh>
    </group>
  )
}
