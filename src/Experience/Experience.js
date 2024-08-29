import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Time from './Utils/Time.js'
import World from './World/World.js'
import Ressources from './Utils/Ressources.js'
import assets from './Utils/assets.js'

export default class Experience {
  static instance

  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance
    }
    Experience.instance = this

    this.canvas = canvas
    this.sizes = new Sizes()
    this.time = new Time()
    this.ressources = new Ressources(assets)
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.world = new World()
    this.renderer = new Renderer()

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('update', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()
  }
}
