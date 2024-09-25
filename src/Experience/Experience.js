import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Camera from './Camera.js'
import Theme from './Theme.js'
import Renderer from './Renderer.js'
import Time from './Utils/Time.js'
import World from './World/World.js'
import Ressources from './Utils/Ressources.js'
import assets from './Utils/assets.js'
import Preloader from './Preloader.js'
import Controls from './World/Controls.js'

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
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.ressources = new Ressources(assets)
    this.theme = new Theme()
    this.world = new World()
    this.preloader = new Preloader()

    this.preloader.on('enablecontrols', () => {
      this.controls = new Controls()
    })
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
    this.preloader.update()
    if (this.world) {
      this.world.update()
    }
    this.camera.update()
    this.renderer.update()
  }
}
