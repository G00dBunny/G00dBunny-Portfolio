import EventEmitter from 'events'
import Experience from './Experience'
import GSAP from 'gsap'

export default class Preloader extends EventEmitter {
  constructor() {
    super()
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.ressources = this.experience.ressources
    this.time = this.experience.time
    this.sizes = this.experience.sizes
    this.camera = this.experience.camera
    this.world = this.experience.world

    this.device = this.sizes.device

    this.sizes.on('switchdevice', (device) => {
      this.device = device
    })

    this.world.on('worldReady', () => {
      this.setAssets()
      this.playIntro()
    })
  }

  setAssets() {
    this.room = this.experience.world.room.actualRoom
    this.roomChildren = this.experience.world.room.roomChildren
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline()

      if (this.device === 'desktop') {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: 'back.out(2.5)',
            duration: 0.7
          })
          .to(this.room.position, {
            x: -1,
            ease: 'power1,out',
            duration: 0.7,
            onComplet: resolve
          })
      } else {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: 'back.out(2.5)',
            duration: 0.7
          })
          .to(this.room.position, {
            z: -1,
            ease: 'power1,out',
            duration: 0.7,
            onComplet: resolve
          })
      }
    })
  }

  secondIntro() {
    this.secondTimeline = new GSAP.timeline()

    if (this.device === 'desktop') {
      this.timeline.to(this.room.position, {
        x: 0,
        y: 0,
        z: 0,
        ease: 'power1,out',
        duration: 0.7
      })
    } else {
      this.secondTimeline.to(this.room.position, {
        x: 0,
        y: 0,
        z: 0,
        ease: 'power1,out',
        duration: 0.7
      })
    }
  }

  playSecondIntro() {
    this.secondIntro()
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      window.removeEventListener('wheel', this.scrollOnceEvent)
      this.playSecondIntro()
    }
  }

  async playIntro() {
    await this.firstIntro()
    this.scrollOnceEvent = this.onScroll.bind(this)
    window.addEventListener('wheel', this.scrollOnceEvent)
  }
}
