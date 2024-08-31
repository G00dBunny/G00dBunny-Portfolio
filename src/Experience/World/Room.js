/**
 * This class has to be renamed to your choice => I choose room because thats what I'm going to display
 */

import * as THREE from 'three'
import Experience from '../Experience'

export default class Room {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.ressources = this.experience.ressources
    this.time = this.experience.time
    this.room = this.ressources.items.room
    this.actualRoom = this.room.scene

    console.log(this.room)

    this.setModel()
    this.setAnimation()
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      if (child instanceof THREE.Group) {
        child.children.forEach((item) => {
          if (item.name === 'Cube136') {
            this.material = new THREE.MeshPhysicalMaterial({
              color: 0x549dd2,
              transmission: 1,
              opacity: 10,
              roughness: 0,
              ior: 3
            })

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
    this.mixer.update(this.time.delta * 0.001)
  }
}
