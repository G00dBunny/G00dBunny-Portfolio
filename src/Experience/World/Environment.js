/**
 * This class has to be renamed to your choice => I choose room because thats what I'm going to display
 */

import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.ressources = this.experience.ressources

    this.setSunlight()
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 3)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.mapSize.set = (1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(1.5, 7, 3)
    this.scene.add(this.sunLight)
    const helper = new THREE.DirectionalLightHelper(this.sunLight, 2)
    this.scene.add(helper)

    this.ambientLight = new THREE.AmbientLight('white', 1)
    this.scene.add(this.ambientLight)
  }

  resize() {}

  update() {}
}
