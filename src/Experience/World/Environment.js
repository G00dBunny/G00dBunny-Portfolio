/**
 * This class has to be renamed to your choice => I choose room because thats what I'm going to display
 */

import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'

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
    this.sunLight.shadow.mapSize.set(2048, 2048)
    this.sunLight.shadow.normalBias = 0.05

    const helper = new THREE.CameraHelper(this.sunLight.shadow.camera)
    // this.scene.add(helper)

    this.sunLight.position.set(-1.5, 7, 3)
    this.scene.add(this.sunLight)

    this.ambientLight = new THREE.AmbientLight('#ffffff', 1)
    this.scene.add(this.ambientLight)
  }

  switchTheme(theme) {
    if (theme === 'dark') {
      GSAP.to(this.sunLight.color, {
        r: 0,
        g: 0,
        b: 0
      })
      GSAP.to(this.ambientLight.color, {
        r: 0,
        g: 0,
        b: 0
      })
    } else {
      GSAP.to(this.sunLight.color, {
        r: 1,
        g: 1,
        b: 1
      })
      GSAP.to(this.ambientLight.color, {
        r: 1,
        g: 1,
        b: 1
      })
    }
  }

  resize() {}

  update() {}
}
