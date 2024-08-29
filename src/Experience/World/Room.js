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
    this.room = this.ressources.items.room
    this.actualRoom = this.room.scene

    console.log(this.room)
    console.log(this.actualRoom)

    this.setModel()
  }

  setModel() {
    this.scene.add(this.actualRoom)
  }

  resize() {}

  update() {}
}
