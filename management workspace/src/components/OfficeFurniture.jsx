import React from 'react'

// Cozy tabletop lamp helper component
export function TableLamp({ position }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.4} />
      </mesh>
      {/* Rod */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.4]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>
      {/* Shade (cone shape) */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.22, 0.22, 16, 1, true]} />
        <meshStandardMaterial color="#93c5fd" roughness={0.2} />
      </mesh>
      {/* Light bulb glow */}
      <mesh position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  )
}

// Realistic Standard Desk (Clay style, thick oak top, white drawer supports)
export function Desk({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Desk Wood Surface (Thick, rounded wood plank) */}
      <mesh position={[0.1, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.12, 0.9]} />
        <meshStandardMaterial color="#dfac6c" roughness={0.4} metalness={0.1} />
      </mesh>
      
      {/* Thick Rounded support cabinet drawers */}
      <group position={[0.66, 0.33, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.66, 0.82]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Drawers separation lines */}
        {[-0.2, -0.02, 0.16].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0.415]} castShadow>
            <boxGeometry args={[0.36, 0.03, 0.01]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
        ))}
      </group>

      {/* Left thick supporting leg panel */}
      <mesh position={[-0.66, 0.33, 0]} castShadow>
        <boxGeometry args={[0.12, 0.66, 0.82]} />
        <meshStandardMaterial color="#dfac6c" roughness={0.4} />
      </mesh>

      {/* Screen Frame & Display */}
      <group position={[0, 0.79, -0.2]}>
        <mesh position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[0.2, 0.015, 0.12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.12, -0.02]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.22]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.8} />
        </mesh>
        {/* Monitor panel */}
        <mesh position={[0, 0.26, -0.02]} castShadow>
          <boxGeometry args={[0.62, 0.36, 0.015]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        {/* Glowing screen content */}
        <mesh position={[0, 0.26, -0.011]}>
          <planeGeometry args={[0.58, 0.32]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[0, 0.79, 0.15]} castShadow>
        <boxGeometry args={[0.36, 0.02, 0.12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Table Lamp placement */}
      <TableLamp position={[-0.45, 0.78, -0.2]} />
    </group>
  )
}

// Executive Premium Desk (Thick oak surface, white drawers support)
export function ExecutiveDesk({ position, rotation = [0, 0, 0], secondaryScreen = true, onMonitorClick }) {
  const monitorProps = onMonitorClick ? {
    onClick: (e) => {
      e.stopPropagation()
      onMonitorClick()
    },
    onPointerOver: (e) => {
      e.stopPropagation()
      document.body.style.cursor = 'pointer'
    },
    onPointerOut: (e) => {
      e.stopPropagation()
      document.body.style.cursor = 'auto'
    }
  } : {}

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.12, 1.1]} />
        <meshStandardMaterial color="#dfac6c" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Supporting drawers units */}
      <mesh position={[-0.85, 0.33, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.66, 0.95]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      <mesh position={[0.85, 0.33, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.66, 0.95]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>

      {/* Main Curved Ultra-wide Monitor */}
      <group position={[0, 0.79, -0.22]} {...monitorProps}>
        <mesh position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[0.26, 0.015, 0.18]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.16, -0.04]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.32]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.34, -0.04]} castShadow>
          <boxGeometry args={[0.9, 0.44, 0.025]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.34, -0.026]}>
          <planeGeometry args={[0.86, 0.4]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>
    </group>
  )
}

// Office Chair (Chrome/White base, thick cushions, loop armrests, grey mesh pads)
export function Chair({ position, rotation = [0, 0, 0], seatColor = '#38bdf8' }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Circular white carpet rug under the chair */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.76, 32]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
      </mesh>

      {/* 5-star support base in white style */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.14]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh 
          key={i} 
          position={[Math.sin((i * Math.PI * 2) / 5) * 0.28, 0.08, Math.cos((i * Math.PI * 2) / 5) * 0.28]}
          rotation={[0, (i * Math.PI * 2) / 5, 0]}
          castShadow
        >
          <boxGeometry args={[0.04, 0.04, 0.4]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
      ))}

      {/* Wheels / Casters */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i + 10}
          position={[Math.sin((i * Math.PI * 2) / 5) * 0.32, 0.02, Math.cos((i * Math.PI * 2) / 5) * 0.32]}
          castShadow
        >
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}

      <mesh position={[0, 0.26, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.26]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Extremely Thick Contoured Cushion seat */}
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.54, 0.14, 0.5]} />
        <meshStandardMaterial color={seatColor} roughness={0.4} />
      </mesh>

      {/* Extremely Thick support backrest */}
      <group position={[0, 0.85, -0.22]} rotation={[0.05, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.46, 0.62, 0.12]} />
          <meshStandardMaterial color={seatColor} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.22, -0.06]} castShadow>
          <boxGeometry args={[0.08, 0.4, 0.04]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
      </group>

      {/* Loop white armrests */}
      <group position={[-0.3, 0.62, 0.04]}>
        <mesh castShadow>
          <boxGeometry args={[0.04, 0.22, 0.28]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
      </group>
      <group position={[0.3, 0.62, 0.04]}>
        <mesh castShadow>
          <boxGeometry args={[0.04, 0.22, 0.28]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

// Cafe & Snack Corner
export function CafeBar({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Bar Counter (Wood top, tile base) */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.0, 0.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.3, 0.05, 0.9]} />
        <meshStandardMaterial color="#854d0e" roughness={0.2} />
      </mesh>

      {/* Espresso Machine */}
      <group position={[-0.8, 1.2, -0.1]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.35, 0.45]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.1, -0.12, 0.22]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.15]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.1, -0.12, 0.22]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.15]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Display Rack */}
      <group position={[0.6, 1.15, -0.1]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.25, 0.35]} />
          <meshStandardMaterial color="#e2e8f0" transparent opacity={0.3} roughness={0.05} />
        </mesh>
        <mesh position={[0, -0.125, 0]} castShadow>
          <boxGeometry args={[0.62, 0.02, 0.37]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Cafe Stools */}
      {[-0.8, 0, 0.8].map((x, idx) => (
        <group key={idx} position={[x, 0, 0.8]}>
          <mesh position={[0, 0.32, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.65]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.65, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.04]} />
            <meshStandardMaterial color="#78350f" roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Storage Cabinets with Drawers (Filing/Office style)
export function Cabinet({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main outer frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.8, 0.45]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>
      
      {/* Drawers (4 stacked drawers) */}
      {[0.55, 0.18, -0.18, -0.55].map((y, idx) => (
        <group key={idx} position={[0, y, 0.23]}>
          {/* Drawer front panel front */}
          <mesh castShadow>
            <boxGeometry args={[1.12, 0.34, 0.02]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
          </mesh>
          {/* Horizontal sleek handle */}
          <mesh position={[0, 0, 0.02]} castShadow>
            <boxGeometry args={[0.3, 0.03, 0.02]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Keyhole for filing cabinet aesthetics on the top drawer */}
          {idx === 0 && (
            <mesh position={[0.45, 0.1, 0.015]}>
              <cylinderGeometry args={[0.01, 0.01, 0.005, 8]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#475569" metalness={0.9} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  )
}

// Storage Rack component with detailed contents
export function StorageRack({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* 4 corner vertical posts */}
      {[-0.48, 0.48].map((x) =>
        [-0.18, 0.18].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.9, z]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 1.8, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
          </mesh>
        ))
      )}
      {/* Shelves */}
      {[0.1, 0.55, 1.0, 1.45].map((y, idx) => (
        <group key={idx} position={[0, y, 0]}>
          {/* Wooden shelf board */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.0, 0.03, 0.4]} />
            <meshStandardMaterial color="#b45309" roughness={0.4} />
          </mesh>
          {/* Small items on shelves */}
          {idx === 0 && (
            <>
              {/* Box */}
              <mesh position={[-0.2, 0.1, 0]} castShadow>
                <boxGeometry args={[0.25, 0.15, 0.25]} />
                <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
              </mesh>
              {/* Stacked books */}
              <mesh position={[0.2, 0.03, 0]} castShadow rotation={[0, 0.1, 0]}>
                <boxGeometry args={[0.2, 0.04, 0.3]} />
                <meshStandardMaterial color="#38bdf8" />
              </mesh>
              <mesh position={[0.2, 0.07, -0.02]} castShadow rotation={[0, -0.05, 0]}>
                <boxGeometry args={[0.2, 0.04, 0.3]} />
                <meshStandardMaterial color="#ec4899" />
              </mesh>
            </>
          )}
          {idx === 1 && (
            <>
              {/* Folder organizer */}
              <mesh position={[-0.25, 0.12, 0]} castShadow>
                <boxGeometry args={[0.2, 0.2, 0.3]} />
                <meshStandardMaterial color="#0f172a" roughness={0.4} />
              </mesh>
              {/* Small decorative plant */}
              <group position={[0.25, 0.08, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.08, 0.06, 0.12, 10]} />
                  <meshStandardMaterial color="#f8fafc" />
                </mesh>
                <mesh position={[0, 0.1, 0]} castShadow>
                  <sphereGeometry args={[0.1, 8, 8]} />
                  <meshStandardMaterial color="#22c55e" />
                </mesh>
              </group>
            </>
          )}
          {idx === 2 && (
            <>
              {/* Group of standing folders/books */}
              {[-0.15, -0.09, -0.03, 0.03].map((folderX, fIdx) => (
                <mesh key={fIdx} position={[folderX, 0.12, 0.02]} rotation={[0, 0, 0.05]} castShadow>
                  <boxGeometry args={[0.05, 0.2, 0.28]} />
                  <meshStandardMaterial color={['#f59e0b', '#3b82f6', '#ef4444', '#10b981'][fIdx]} />
                </mesh>
              ))}
            </>
          )}
          {idx === 3 && (
            <>
              {/* Storage box */}
              <mesh position={[0, 0.1, 0]} castShadow>
                <boxGeometry args={[0.4, 0.16, 0.3]} />
                <meshStandardMaterial color="#475569" roughness={0.6} />
              </mesh>
            </>
          )}
        </group>
      ))}
    </group>
  )
}


// Whiteboard
export function Whiteboard({ position, rotation = [0, 0, 0], ...props }) {
  return (
    <group position={position} rotation={rotation} {...props}>
      <mesh castShadow>
        <boxGeometry args={[3.2, 2.0, 0.08]} />
        <meshStandardMaterial color="#475569" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.045]} receiveShadow>
        <planeGeometry args={[3.0, 1.8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
      </mesh>
      {/* Sticky notes */}
      <mesh position={[-0.8, 0.4, 0.05]} rotation={[0, 0, 0.05]}>
        <planeGeometry args={[0.18, 0.18]} />
        <meshStandardMaterial color="#fef08a" roughness={0.6} />
      </mesh>
      <mesh position={[-0.5, 0.35, 0.05]} rotation={[0, 0, -0.08]}>
        <planeGeometry args={[0.18, 0.18]} />
        <meshStandardMaterial color="#93c5fd" roughness={0.6} />
      </mesh>
      <mesh position={[-0.2, 0.42, 0.05]} rotation={[0, 0, 0.02]}>
        <planeGeometry args={[0.18, 0.18]} />
        <meshStandardMaterial color="#fbcfe8" roughness={0.6} />
      </mesh>
    </group>
  )
}

// CTO Server Racks
export function ServerRack({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 2.0, 0.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>
      {[0.6, 0.3, 0.0, -0.3, -0.6].map((y, idx) => (
        <group key={idx} position={[0, y, 0.405]}>
          <mesh>
            <planeGeometry args={[0.72, 0.18]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
          <mesh position={[-0.26, 0, 0.005]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#10b981' : '#06b6d4'} />
          </mesh>
          <mesh position={[-0.2, 0, 0.005]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color={idx % 3 === 0 ? '#ef4444' : '#10b981'} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Potted Office Plant (Ficus / Monstera style)
export function OfficePlant({ position }) {
  return (
    <group position={position}>
      {/* Ceramic Pot */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.2, 0.5, 12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.04]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      {/* Plant Stems */}
      <mesh position={[0, 0.8, 0]} rotation={[0.1, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.7]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
      {/* Stylized Leaves */}
      {[-0.1, 0.1].map((x, i) => (
        <group key={i} position={[x, 1.0 + i * 0.1, x * 0.5]} rotation={[0.4 * x, 0, 0.8 * x]}>
          <mesh castShadow>
            <sphereGeometry args={[0.24, 8, 8]} />
            <meshStandardMaterial color="#166534" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Hanging Pendant Light
export function PendantLight({ position }) {
  return (
    <group position={position}>
      {/* Cable cord */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 2.0]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* Metal Shade */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.25, 0.16, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Glowing bulb */}
      <mesh position={[0, -0.02, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  )
}

// Comfortable Lounge Sofa
export function Sofa({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base frame cushion */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.24, 0.8]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
      </mesh>
      {/* Seat Cushions */}
      <mesh position={[-0.48, 0.35, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.16, 0.72]} />
        <meshStandardMaterial color="#2563eb" roughness={0.7} />
      </mesh>
      <mesh position={[0.48, 0.35, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.16, 0.72]} />
        <meshStandardMaterial color="#2563eb" roughness={0.7} />
      </mesh>
      {/* Backrest support */}
      <mesh position={[0, 0.65, -0.34]} castShadow>
        <boxGeometry args={[2.0, 0.64, 0.15]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-1.02, 0.44, 0]} castShadow>
        <boxGeometry args={[0.15, 0.54, 0.8]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
      </mesh>
      {/* Right arm */}
      <mesh position={[1.02, 0.44, 0]} castShadow>
        <boxGeometry args={[0.15, 0.54, 0.8]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
      </mesh>
    </group>
  )
}

// Cozy Rug (textured boundary layer)
export function AreaRug({ position, args = [3.0, 2.0], color = '#475569', ...props }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow {...props}>
      <planeGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  )
}

// Reception Front Counter
export function ReceptionDesk({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Front Curved Desk Body */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 1.0, 24, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
      
      {/* Wooden Desk Countertop */}
      <mesh position={[0, 1.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.05, 24, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color="#b58d68" roughness={0.3} />
      </mesh>

      {/* Reception Phone */}
      <mesh position={[-0.4, 1.06, -0.2]} castShadow>
        <boxGeometry args={[0.16, 0.08, 0.16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Small potted desk plant */}
      <group position={[0.5, 1.05, -0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.08]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
      </group>
    </group>
  )
}

// Vertical Wood Slat Wall Panels
export function SlatPanel({ position, args = [1.2, 5.8, 0.04], rotation = [0, 0, 0] }) {
  const slatsCount = Math.floor(args[0] / 0.15)
  return (
    <group position={position} rotation={rotation}>
      {/* Back Plate */}
      <mesh receiveShadow>
        <boxGeometry args={[args[0], args[1], args[2]]} />
        <meshStandardMaterial color="#3f1a04" roughness={0.9} />
      </mesh>
      {/* Individual wood slats */}
      {Array.from({ length: slatsCount }).map((_, i) => {
        const offset = -args[0]/2 + (i * 0.15) + 0.075
        return (
          <mesh key={i} position={[offset, 0, args[2]/2 + 0.015]} castShadow>
            <boxGeometry args={[0.06, args[1], 0.03]} />
            <meshStandardMaterial color="#b45309" roughness={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

// Minimalistic Wall Clock
export function StudioClock({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Clock Face base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 24]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
      {/* Dark rim */}
      <mesh position={[0, 0, -0.01]} castShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.03, 24]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
      {/* Hands */}
      <mesh position={[0, 0.08, 0.025]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.02, 0.16, 0.01]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.05, 0, 0.025]} rotation={[0, 0, -Math.PI/2]}>
        <boxGeometry args={[0.02, 0.22, 0.01]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
    </group>
  )
}

// Floating Wood Shelf
export function StudioShelf({ position, args = [1.2, 0.04, 0.3], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial color="#b45309" roughness={0.3} />
      </mesh>
      {/* Small potted shelf ivy plant */}
      <group position={[args[0]/4, args[1]/2 + 0.05, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.1]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
      </group>
    </group>
  )
}

// Large Conference/Meeting Table
export function ConferenceTable({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Tabletop - large sleek wooden panel */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.08, 1.4]} />
        <meshStandardMaterial color="#854d0e" roughness={0.3} />
      </mesh>
      {/* Table legs/support (modern dual base pillars) */}
      <mesh position={[-0.9, 0.33, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.66, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      <mesh position={[0.9, 0.33, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.66, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      {/* Center cable/media box panel */}
      <mesh position={[0, 0.765, 0]} castShadow>
        <boxGeometry args={[0.8, 0.01, 0.22]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>
    </group>
  )
}

// Sleek Monitor for the Conference Table
export function MeetingMonitor({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh position={[0, 0.01, 0]} castShadow>
        <boxGeometry args={[0.24, 0.015, 0.16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      {/* Stand column */}
      <mesh position={[0, 0.15, -0.02]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.28]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>
      {/* Monitor Screen Frame */}
      <mesh position={[0, 0.32, -0.02]} castShadow>
        <boxGeometry args={[0.72, 0.42, 0.02]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>
      {/* Glowing Display */}
      <mesh position={[0, 0.32, -0.009]}>
        <planeGeometry args={[0.68, 0.38]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  )
}
