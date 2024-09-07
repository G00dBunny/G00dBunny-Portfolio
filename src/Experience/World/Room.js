/**
 * This class has to be renamed to your choice => I choose room because thats what I'm going to display
 */

import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

export default class Room {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.ressources = this.experience.ressources
    this.time = this.experience.time
    this.room = this.ressources.items.room
    this.actualRoom = this.room.scene

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    }

    this.setModel()
    this.setAnimation()
    this.setAquariumLight()
    this.onMouseMove()
  }

  onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth
      this.lerp.target = this.rotation * 0.1
    })
  }
  setAquariumLight() {
    const width = 0.5
    const height = 1
    const intensity = 1
    const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height)
    rectLight.position.set(7.5, 6.8, -0.5)
    rectLight.rotation.x = -Math.PI / 2
    rectLight.rotation.z = Math.PI / 4
    this.actualRoom.add(rectLight)
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      if (child instanceof THREE.Group) {
        child.children.forEach((item) => {
          if (item.name === 'Cube136') {
            this.material = new THREE.MeshPhysicalMaterial({
              color: 0x549dd2, // Base color of the glass, often kept subtle
              transmission: 1, // Full transparency
              opacity: 0.1, // Opacity set low, but not zero
              roughness: 0, // Smooth surface
              metalness: 0, // Non-metallic
              ior: 1.45, // Index of refraction for glass
              thickness: 0.1, // Simulates glass thickness
              clearcoat: 1, // Adds a glossy layer
              clearcoatRoughness: 0
            })
            this.material.depthWrite = false
            this.material.depthTest = false

            item.material = this.material
          }
          item.castShadow = true
          item.receiveShadow = true
        })
      }
      if (child instanceof THREE.Mesh) {
        if (child.name === 'Chair') {
          child.castShadow = true
          child.receiveShadow = true
        }
      }
    })
    this.scene.add(this.actualRoom)
    this.actualRoom.scale.set(0.11, 0.11, 0.11)
  }

  setAnimation() {
    this.actualRoom.traverse((object) => {
      if (object.name === 'fish') {
        this.fishObject = object
      }
    })
    if (this.fishObject) {
      this.mixer = new THREE.AnimationMixer(this.fishObject)
      this.clips = this.room.animations

      this.clip = THREE.AnimationClip.findByName(this.clips, 'fishAction.001')

      this.swim = this.mixer.clipAction(this.clip)

      this.swim.play()
    } else {
      console.error('Fish object not found!')
    }
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease)

    this.actualRoom.rotation.y = this.lerp.current

    this.mixer.update(this.time.delta * 0.001)
  }
}
