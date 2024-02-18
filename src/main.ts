/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { Quiz } from "./types/enums";
import { addButtons, buttons } from './features/add-buttons'
import { chatWithPalcik } from './features/chat-with-palcik'
import { wocinDzeru } from './features/dzera'
import { followPlayer } from './features/follow-player'

// import { initStuff } from './helpers/initial-init'

console.log('Script started successfully')
let durijeWocinjene = false

WA.onInit()
  .then(async () => {
 
    await WA.players.configureTracking({
      players: true
    })
  
    WA.room.showLayer('palcik/wrota')
    WA.room.hideLayer('palcik/wrota')
  
 
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

    WA.room.showLayer('palcik/wrota')
    WA.room.hideLayer('palcik/wrota')
     
    addButtons(updateMap)
    wocinDzeru()
    updateMap()

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
      console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
  })
  .catch((e) => console.error(e))

function updateMap() {
  // Reset pressed state
  for (const button of Object.values(buttons)) {
    button.pressed = false
  }

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
        durijeWocinjene = true
      }
    }
  }

  displayButtons()

  if (durijeWocinjene === true) {
    WA.room.showLayer('doors/door_opened')
    WA.room.hideLayer('doors/door_closed')

    if (WA.state.loadVariable('activeQuiz') === Quiz.wrota)
      WA.state
        .saveVariable('activeQuiz', Quiz.palcik)
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
