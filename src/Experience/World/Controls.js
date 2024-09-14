import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

export default class Controls {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.ressources = this.experience.ressources
    this.time = this.experience.time
    this.sizes = this.experience.sizes
    this.camera = this.experience.camera
    this.room = this.experience.world.room.actualRoom
    this.room.children.forEach((child) => {
      if (child.type === 'RectAreaLight') {
        this.rectLight = child
      }
    })
    GSAP.registerPlugin(ScrollTrigger)

    this.setPath()

    // this.progress = 0

    // this.lerp = {
    //   current: 0,
    //   target: 0,
    //   ease: 0.1
    // }
    // this.position = new THREE.Vector3(0, 0, 0)

    // this.setPath()
    // this.onWheel()
  }

  setPath() {
    let mm = GSAP.matchMedia()

    mm.add('(min-width: 969px)', () => {
      /**
       * Resets
       */
      this.room.scale.set(0.11, 0.11, 0.11)
      this.rectLight.width = 0.5
      this.rectLight.height = 1
      /**
       * First Section
       */
      this.firstTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: '.first-move',
          markers: true,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      })
      this.firstTimeline.to(this.room.position, {
        x: () => {
          return this.sizes.width * 0.0012
        }
      })
      /**
       * Second Section
       */
      this.secondTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: '.second-move',
          markers: true,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      })
        .to(
          this.room.position,
          {
            x: () => {
              return 1.5
            },
            z: () => {
              return this.sizes.height * 0.002
            }
          },
          'same'
        )
        .to(
          this.room.scale,
          {
            x: 0.4,
            y: 0.4,
            z: 0.4
          },
          'same'
        )
        .to(
          this.rectLight,
          {
            width: 0.5 * 4,
            height: 1 * 4
          },
          'same'
        )
      /**
       * Third Section
       */
      this.thirdTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: '.third-move',
          markers: true,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      }).to(this.camera.orthographicCamera.position, {
        y: -4.1,
        x: -3
      })
    })

    mm.add('(max-width: 969px)', () => {
      /**
       * Resets
       */
      this.room.scale.set(0.07, 0.07, 0.07)
      this.room.position.set(0, 0, 0)
      this.rectLight.width = 0.6
      this.rectLight.height = 0.6

      /**
       * First Section
       */
      this.firstTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: '.first-move',
          markers: true,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      })
        .to(
          this.room.scale,
          {
            x: 0.1,
            y: 0.1,
            z: 0.1
          },
          'same'
        )
        .to(
          this.rectLight,
          {
            width: 0.5 * 2,
            height: 1 * 0.8
          },
          'same'
        )

      /**
       * Second Section
       */
      this.secondTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: '.second-move',
          markers: true,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      })
        .to(
          this.room.scale,
          {
            x: 0.25,
            y: 0.25,
            z: 0.25
          },
          'same2'
        )
        .to(
          this.rectLight,
          {
            width: 0.5 * 5,
            height: 1 * 2
          },
          'same2'
        )
        .to(
          this.room.position,
          {
            x: 1.5
          },
          'same2'
        )
      /**
       * Third section
       */
      this.thirdTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: '.third-move',
          markers: true,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      }).to(this.room.position, {
        z: -4.5
      })
    })
  }

  //   onWheel() {
  //     window.addEventListener('wheel', (e) => {
  //       if (e.deltaY > 0) {
  //         this.lerp.target += 0.01
  //       } else {
  //         this.lerp.target -= 0.01
  //       }
  //     })
  //   }

  //   setPath() {
  //     //Create a closed wavey loop
  //     this.curve = new THREE.CatmullRomCurve3(
  //       [
  //         new THREE.Vector3(-10, 0, 10),
  //         new THREE.Vector3(-5, 5, 5),
  //         new THREE.Vector3(0, 0, 0),
  //         new THREE.Vector3(5, -5, 5),
  //         new THREE.Vector3(10, 0, 10)
  //       ],
  //       true
  //     )

  //     const points = this.curve.getPoints(50)
  //     const geometry = new THREE.BufferGeometry().setFromPoints(points)

  //     const material = new THREE.LineBasicMaterial({ color: 0xff0000 })

  //     // Create the final object to add to the scene
  //     const curveObject = new THREE.Line(geometry, material)

  //     this.scene.add(curveObject)
  //   }

  update() {
    // this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease)
    // this.curve.getPointAt(this.lerp.current, this.position)
    // this.camera.orthographicCamera.position.copy(this.position)
  }
}
