import * as THREE from 'three'
import Experience from '../Experience'
import Room from './Room'
import { EventEmitter } from 'events'
import Environment from './Environment'

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
      this.environment = new Environment()
      this.room = new Room()
    })
  }

  resize() {}

  update() {
    if (this.room) {
      this.room.update()
    }
  }
}
