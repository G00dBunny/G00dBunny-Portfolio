import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import ASScroll from '@ashthornton/asscroll'

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

    this.setSmoothScroll()
    this.setScrollTrigger()

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

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.05,
      disableRaf: true
    })

    GSAP.ticker.add(asscroll.update)

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement
    })

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value
          return
        }
        return asscroll.currentPos
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      fixedMarkers: true
    })

    asscroll.on('update', ScrollTrigger.update)
    ScrollTrigger.addEventListener('refresh', asscroll.resize)

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll('.gsap-marker-start, .gsap-marker-end, [asscroll]')
      })
    })
    return asscroll
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll()
  }

  setScrollTrigger() {
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

    mm.add('(min-width: 0px)', () => {
      this.sections = document.querySelectorAll('.section')
      this.sections.forEach((section) => {
        this.progressWrapper = section.querySelector('.progress-wrapper')
        this.progressBar = section.querySelector('.progress-bar')

        if (section.classList.contains('right')) {
          GSAP.to(section, {
            borderTopLeftRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.6
            }
          })
          GSAP.to(section, {
            borderBottomLeftRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: 0.6
            }
          })
        } else {
          GSAP.to(section, {
            borderTopRightRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.6
            }
          })
          GSAP.to(section, {
            borderBottomRightRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: 0.6
            }
          })
        }

        GSAP.from(this.progressBar, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
            pin: this.progressWrapper,
            pinSpacing: false
          }
        })
      })
      // Mini platform animations
      this.secondPartTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: '.third-move',
          markers: true,
          start: 'center center'
        }
      })

      this.room.children.forEach((child) => {
        if (child.name === 'Mini_Floor') {
          this.first = GSAP.to(child.position, {
            x: -5.44055,
            z: 13.6135,
            duration: 0.3
          })
        }
        if (child.name === 'Mailbox') {
          this.second = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3
          })
        }
        if (child.name === 'Lamp') {
          this.third = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2)',
            duration: 0.3
          })
        }
        if (child.name === 'FloorFirst') {
          this.fourth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2)',
            duration: 0.3
          })
        }
        if (child.name === 'FloorSecond') {
          this.fifth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2)',
            duration: 0.3
          })
        }
        if (child.name === 'FloorThird') {
          this.sixth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2)',
            duration: 0.3
          })
        }
        if (child.name === 'Dirt') {
          this.seventh = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2)',
            duration: 0.3
          })
        }
        if (child.name === 'Flower1') {
          this.eighth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2)',
            duration: 0.3
          })
        }
        if (child.name === 'Flower2') {
          this.nineth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2)',
            duration: 0.3
          })
        }
      })
      this.secondPartTimeline.add(this.first)
      this.secondPartTimeline.add(this.second)
      this.secondPartTimeline.add(this.third)
      this.secondPartTimeline.add(this.fourth, '-=0.2')
      this.secondPartTimeline.add(this.fifth, '-=0.2')
      this.secondPartTimeline.add(this.sixth, '-=0.2')
      this.secondPartTimeline.add(this.seventh, '-=0.2')
      this.secondPartTimeline.add(this.eighth)
      this.secondPartTimeline.add(this.nineth, '-=0.1')
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
