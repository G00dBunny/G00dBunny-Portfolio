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
            onComplete: resolve
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
            onComplete: resolve
          })
      }
    })
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline()

      this.secondTimeline
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: 'power1,out'
          },
          'same'
        )
        .to(
          this.roomChildren.cube.rotation,
          {
            y: 2 * Math.PI + Math.PI / 4
          },
          'same'
        )
        .to(
          this.roomChildren.cube.scale,
          {
            x: 10,
            y: 10,
            z: 10
          },
          'same'
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 0.75
          },
          'same'
        )
        .to(
          this.roomChildren.cube.position,
          {
            x: 0.638711,
            y: 8.5618,
            z: 1.3243
          },
          'same'
        )
        .set(this.roomChildren.body.scale, {
          x: 1,
          y: 1,
          z: 1
        })
        .to(this.roomChildren.cube.scale, {
          x: 0,
          y: 0,
          z: 0
        })
        .to(this.roomChildren.aquarium.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(2,2)',
          duration: 0.5
        })
        .to(this.roomChildren.clock.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(2,2)',
          duration: 0.5
        })
        .to(this.roomChildren.shelves.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(2,2)',
          duration: 0.5
        })
        .to(this.roomChildren.floor_items.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(2,2)',
          duration: 0.5
        })
        .to(this.roomChildren.desks.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(2,2)',
          duration: 0.5
        })
        .to(this.roomChildren.table_stuff.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(2,2)',
          duration: 0.5
        })
        .to(this.roomChildren.computer.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(2,2)',
          duration: 0.5
        })

        .to(this.roomChildren.aquarium.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: 'back.out(2,2)',
          duration: 0.5
        })
        .to(
          this.roomChildren.chair.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2,2)',
            duration: 0.5
          },
          'chair'
        )
        .to(
          this.roomChildren.fish.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2,2)',
            duration: 0.5
          },
          'chair'
        )
        .to(
          this.roomChildren.chair.rotation,
          {
            y: 4 * Math.PI + Math.PI / 4,

            ease: 'power2.out',
            duration: 1,
            onComplete: resolve
          },
          'chair'
        )
    })
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners()
      this.playSecondIntro()
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY
    let difference = this.initalY - currentY
    if (difference > 0) {
      this.removeEventListeners()
      this.playSecondIntro()
    }
    this.intialY = null
  }

  removeEventListeners() {
    window.removeEventListener('wheel', this.scrollOnceEvent)
    window.removeEventListener('touchstart', this.touchStart)
    window.removeEventListener('touchmove', this.touchMove)
  }

  async playIntro() {
    await this.firstIntro()

    this.scrollOnceEvent = this.onScroll.bind(this)
    this.touchStart = this.onTouch.bind(this)
    this.touchMove = this.onTouchMove.bind(this)
    window.addEventListener('wheel', this.scrollOnceEvent)
    window.addEventListener('touchstart', this.touchStart)
    window.addEventListener('touchmove', this.touchMove)
  }
  async playSecondIntro() {
    console.log('Starting second intro')
    await this.secondIntro()
    console.log('Second intro finished')
    this.emit('enablecontrols')
  }
}
