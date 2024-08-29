import * as THREE from 'three'
import Experience from '../Experience'
import Room from './Room'
import { EventEmitter } from 'events'

export default class World extends EventEmitter {
  constructor() {
    super()
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.ressources = this.experience.ressources

    this.ressources.on('ready', () => {
      // this.environment = new Environment();
      // this.floor = new Floor();
      this.room = new Room()
      // this.controls = new Controls();

      console.log('worldReady')
      this.emit('worldready')
    })
  }

  resize() {}

  update() {}
}
