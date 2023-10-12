/// <reference types="@workadventure/iframe-api-typings" />

import { addButtons, buttons } from './features/add-buttons'
import { chatWithPalcik } from './features/chat-with-palcik'
import { followPlayer } from './features/follow-player'

console.log('Script started successfully')

interface TileDescriptor {
  x: number
  y: number
  tile: number | string | null
  layer: string
}

enum Quiz {
  wrota = 'wrota',
  palcik = 'palcik',
  pytajMje = 'pytajMje'
}

WA.onInit()
  .then(async () => {
    await WA.players.configureTracking({
      players: true
    })

    await WA.state
      .saveVariable('activeQuiz', Quiz.wrota)
      .catch((e) =>
        console.error('Something went wrong while saving variable', e)
      )

    WA.state.onVariableChange('activeQuiz').subscribe((value) => {
      console.log('Variable "activeQuiz" changed. New value: ', value)
      if (value === Quiz.pytajMje) {
        followPlayer(1136, 972)
      } else if (value === Quiz.palcik) {
        chatWithPalcik()
      }
    })

    addButtons(updateMap)
    WA.room.showLayer('palcik/wrota')
    WA.room.hideLayer('palcik/wrota')
    updateMap()
  })
  .catch((e) => console.error(e))

function updateMap() {
  // Reset pressed state
  for (const button of Object.values(buttons)) {
    button.pressed = false
  }

  let nbRedPressed = 0

  const players = [...WA.players.list(), WA.player]
  for (const player of players) {
    const buttonPressed = player.state.buttonPressed
    // Workaround for Typescript type narrowing bug with "buttonPressed in buttons"
    if (
      typeof buttonPressed === 'string' &&
      (buttonPressed === 'button1' || buttonPressed === 'button2')
    ) {
      buttons[buttonPressed].pressed = true
      if (buttons[buttonPressed].color === 'red') {
        nbRedPressed++
      }
    }
  }

  displayButtons()

  if (nbRedPressed >= 1) {
    WA.room.showLayer('doors/door_opened')
    WA.room.hideLayer('doors/door_closed')

    if (WA.state.loadVariable('activeQuiz') === Quiz.wrota)
      WA.state
        .saveVariable('activeQuiz', Quiz.pytajMje)
        .catch((e) =>
          console.error('Something went wrong while saving variable', e)
        )
  } else {
    WA.room.hideLayer('doors/door_opened')
    WA.room.showLayer('doors/door_closed')
  }
}

function displayButtons() {
  let tiles: TileDescriptor[] = []
  for (const { x, y, color, pressed } of Object.values(buttons)) {
    tiles.push({
      x,
      y,
      tile: color + (pressed ? '_enabled' : '_disabled'),
      layer: 'buttons'
    })
  }
  WA.room.setTiles(tiles)
}

export {}
