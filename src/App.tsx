import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './App.css'

interface MannequinParts {
  torso: THREE.Mesh;
  head: THREE.Mesh;
  leftArm: THREE.Mesh;
  rightArm: THREE.Mesh;
  leftLeg: THREE.Mesh;
  rightLeg: THREE.Mesh;
}

interface Measurements {
  height: number;
  chest: number;
  waist: number;
  hips: number;
  shoulders: number;
}

const DEFAULT_MEASUREMENTS: Measurements = {
  height: 170,
  chest: 90,
  waist: 75,
  hips: 95,
  shoulders: 45,
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const partsRef = useRef<MannequinParts | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    console.log('Initializing scene...')

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(400, 400)
    containerRef.current.appendChild(renderer.domElement)

    // Material
    const material = new THREE.MeshPhongMaterial({
      color: 0x2194ce,
      shininess: 100,
    })

    // Create body parts
    const torso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.25, 1, 16),
      material
    )
    torso.position.y = 0.2
    scene.add(torso)

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 16, 16),
      material
    )
    head.position.y = 0.9
    scene.add(head)

    // Arms
    const leftArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8),
      material
    )
    leftArm.position.set(-0.4, 0.3, 0)
    leftArm.rotation.z = Math.PI / 6
    scene.add(leftArm)

    const rightArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8),
      material
    )
    rightArm.position.set(0.4, 0.3, 0)
    rightArm.rotation.z = -Math.PI / 6
    scene.add(rightArm)

    // Legs
    const leftLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 1, 8),
      material
    )
    leftLeg.position.set(-0.2, -0.5, 0)
    scene.add(leftLeg)

    const rightLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 1, 8),
      material
    )
    rightLeg.position.set(0.2, -0.5, 0)
    scene.add(rightLeg)

    // Store references to parts
    partsRef.current = {
      torso,
      head,
      leftArm,
      rightArm,
      leftLeg,
      rightLeg
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.8)
    frontLight.position.set(2, 2, 5)
    scene.add(frontLight)

    // Animation
    let rotationY = 0
    function animate() {
      requestAnimationFrame(animate)
      rotationY += 0.01
      
      if (partsRef.current) {
        Object.values(partsRef.current).forEach(part => {
          part.rotation.y = rotationY
        })
      }
      
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      material.dispose()
      Object.values(partsRef.current || {}).forEach(part => {
        part.geometry.dispose()
      })
      renderer.dispose()
    }
  }, [])

  const updateMeasurements = (measurement: keyof Measurements, value: number) => {
    if (!partsRef.current) return
    const parts = partsRef.current

    switch (measurement) {
      case 'height':
        const heightScale = value / DEFAULT_MEASUREMENTS.height
        parts.torso.scale.y = heightScale
        parts.torso.position.y = 0.2 * heightScale
        parts.head.position.y = 0.9 * heightScale
        parts.leftArm.scale.y = heightScale
        parts.rightArm.scale.y = heightScale
        parts.leftArm.position.y = 0.3 * heightScale
        parts.rightArm.position.y = 0.3 * heightScale
        parts.leftLeg.scale.y = heightScale
        parts.rightLeg.scale.y = heightScale
        parts.leftLeg.position.y = -0.5 * heightScale
        parts.rightLeg.position.y = -0.5 * heightScale
        break

      case 'chest':
        const chestScale = value / DEFAULT_MEASUREMENTS.chest
        parts.torso.scale.x = chestScale
        parts.torso.scale.z = chestScale
        break

      case 'waist':
        const waistScale = value / DEFAULT_MEASUREMENTS.waist
        parts.torso.scale.x = waistScale * 0.8 // Slightly smaller than chest
        parts.torso.scale.z = waistScale * 0.8
        break

      case 'hips':
        const hipScale = value / DEFAULT_MEASUREMENTS.hips
        parts.leftLeg.scale.x = hipScale * 0.5
        parts.leftLeg.scale.z = hipScale * 0.5
        parts.rightLeg.scale.x = hipScale * 0.5
        parts.rightLeg.scale.z = hipScale * 0.5
        break

      case 'shoulders':
        const shoulderScale = value / DEFAULT_MEASUREMENTS.shoulders
        parts.leftArm.position.x = -0.4 * shoulderScale
        parts.rightArm.position.x = 0.4 * shoulderScale
        parts.leftArm.scale.x = shoulderScale * 0.3
        parts.leftArm.scale.z = shoulderScale * 0.3
        parts.rightArm.scale.x = shoulderScale * 0.3
        parts.rightArm.scale.z = shoulderScale * 0.3
        break
    }
  }

  const MeasurementSlider = ({ 
    label, 
    measurement, 
    min, 
    max 
  }: { 
    label: string, 
    measurement: keyof Measurements, 
    min: number, 
    max: number 
  }) => (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>
        {label}:
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="range"
          min={min}
          max={max}
          defaultValue={DEFAULT_MEASUREMENTS[measurement]}
          onChange={(e) => updateMeasurements(measurement, Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span style={{ minWidth: '45px', textAlign: 'right' }}>
          {DEFAULT_MEASUREMENTS[measurement]}
        </span>
      </div>
    </div>
  )

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mannequin Measurements</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <MeasurementSlider
            label="Height (cm)"
            measurement="height"
            min={150}
            max={200}
          />
          <MeasurementSlider
            label="Chest (cm)"
            measurement="chest"
            min={75}
            max={120}
          />
          <MeasurementSlider
            label="Waist (cm)"
            measurement="waist"
            min={60}
            max={100}
          />
          <MeasurementSlider
            label="Hips (cm)"
            measurement="hips"
            min={80}
            max={120}
          />
          <MeasurementSlider
            label="Shoulders (cm)"
            measurement="shoulders"
            min={35}
            max={55}
          />
        </div>

        <div 
          ref={containerRef}
          style={{ 
            width: '400px',
            height: '400px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            background: '#f5f5f5'
          }}
        />
      </div>

      <div style={{ marginTop: '20px', color: '#666' }}>
        Adjust the sliders to change specific body measurements.
      </div>
    </div>
  )
}

export default App
