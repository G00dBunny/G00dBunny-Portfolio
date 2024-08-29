import Experience from './Experience'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.createPerspectiveCamera()
    this.createOrthographicCamera()
    this.setOrbitControls()
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 100)
    this.perspectiveCamera.position.set(6, 4, 8)
    this.scene.add(this.perspectiveCamera)
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    )

    // this.orthographicCamera.position.y = 5.65
    // this.orthographicCamera.position.z = 10
    // this.orthographicCamera.rotation.x = -Math.PI / 6

    this.scene.add(this.orthographicCamera)
  }
  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
    this.controls.enableDamping = true
  }

  resize() {
    // Updating Perspective Camera on Resize
    this.perspectiveCamera.aspect = this.sizes.aspect
    this.perspectiveCamera.updateProjectionMatrix()

    // Updating Orthographic Camera on Resize
    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2
    this.orthographicCamera.top = this.sizes.frustrum / 2
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2
    this.orthographicCamera.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }
}
