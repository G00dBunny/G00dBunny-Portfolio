import EventEmitter from 'events'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Ressources extends EventEmitter {
  constructor(assets) {
    super()

    this.assets = assets

    this.items = {}
    this.queue = this.assets.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.dracoLoader = new DRACOLoader()
    this.loaders.dracoLoader.setDecoderPath('/draco/')
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === 'glbModel') {
        this.loaders.gltfLoader.load(
          asset.path,
          (file) => {
            this.singleAssetLoaded(asset, file)
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
          },
          (error) => {
            console.log('An error happened', error)
          }
        )
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file
    this.loaded++

    if (this.loaded === this.queue) {
      console.log('Preparing Room')
      this.emit('ready')
    }
  }
}
