import StateManager from './stateManager'
import Images from './assets/images'

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
context.strokeStyle = 'FFF'

let start = () => new StateManager({context: context})

Images.loadImages(context, start)
