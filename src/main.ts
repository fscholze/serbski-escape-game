/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { Quiz } from "./types/enums";
import { addButtons, buttons } from './features/add-buttons'
import { chatWithPalcik } from './features/chat-with-palcik'
import { wocinDzeru } from './features/dzera'
import { followPlayer } from './features/follow-player'
import { createPopup } from "./helpers/popup";
import { setTimeout } from "timers/promises";
import { calculateDistance } from "./helpers/algorithms";
import { wulicDistancu } from "./pomocnik/wulic-distancu";
import { popupNoweWokno } from './akcije/popup'

// import { initStuff } from './helpers/initial-init'
let dotkanje = 0
let distance = 0
console.log('Script started successfully')
let durijeWocinjene = false
let currentPopup = null
WA.onInit()
  .then(async () => {

    // sound
    const mamaspew =  WA.sound.loadSound('src/hudzba/beep.mp3')
    const config = {
      volume: 0.5, 
      loop: false,
      rate: 4,
      detune: 1,
      delay: 0,
      seek: 0,
      mute: false
    }

    WA.players.configureTracking({players:true, movement:true})
    WA.players.onPlayerMoves.subscribe(({ player, newPosition }) => { 
      console.log(`${player.name} dze k ${newPosition.x}|${newPosition.y}`)
     });


    WA.ui.actionBar.addButton({
      label: 'Button za menu', callback: () => { },
      id: "5"
    })


// loggwac sto su kooridnate wot muzika
    // WA.player.onPlayerMove((data) => {
    //     // const { x, y } = data // Object Deconstruction
    //     const {x, oldX, y, oldY  } = data
  
    //     const puc = wulicDistancu(oldX || 0, oldY || 0, x, y)
        
    //   distance += 1

    //     console.warn(`${WA.player.name} moving to ${x}|${y} [${distance}]`)
    // })

    popupNoweWokno()
    WA.ui.openPopup('countdown', `hisce ${5-dotkanje} kroc`,[{
      label: 'A',
      className: 'primary',
      callback: (popup) => {
        // Close the popup when the "Close" button is pressed.
        popup.close()
      }},
      {
        label: 'B',
        className: 'error',
        callback: (popup) => {
          // Close the popup when the "Close" button is pressed.
          popup.close()
          WA.player.moveTo(0,0, 50)
        
        }}
    ])

    


// wot jedneho mestna k tamnemu skocic
    WA.room.onEnterLayer('dzera').subscribe(() => {
// dotken so 3 razy dzery a zahraje so zwuk
// WA.chat.sendChatMessage(String(dotkanje + 1), 'Juri')
      dotkanje = dotkanje + 1
      WA.ui.openPopup('countdown', `hisce ${5-dotkanje} kroc`,[{
        label: 'A',
        className: 'primary',
        callback: (popup) => {
          // Close the popup when the "Close" button is pressed.
          popup.close()
        }},
        {
          label: 'B',
          className: 'error',
          callback: (popup) => {
            // Close the popup when the "Close" button is pressed.
            popup.close()
            WA.player.moveTo(0,0, 20)
          }}
      ])
      if (dotkanje == 5) {
        // WA.chat.sendChatMessage(`Upps, to sy to dzere padnyl.`, 'Juri')
        mamaspew.play(config)
        // WA.player.moveTo(WA.pl,1,9)
        WA.nav.goToRoom('map.tmj#cil')
        dotkanje = 0
        // WA.nav.goToRoom('map.tmj#moveTo=146,544')
      }
    })

    







// setTimeout(1000, WA.chat.sendChatMessage('Kukuk'))


















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
    // wocinDzeru()



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
