import { Popup } from '@workadventure/iframe-api-typings'
import { calculateDistance } from '../helpers/algorithms'
import { createPopup } from '../helpers/popup'
import { getFunnyReaction } from '../helpers/wrong-reaction'

const MAX_DISTANCE = 9999999999
let popups: Popup[] = []
let found = false

export const followPlayer = (toX: number, toY: number) => {
  console.info('followPlayer starts')
  let counter = 0
  let oldX = 0
  let oldY = 0

  WA.player.onPlayerMove((data) => {
    if (found === false) {
      console.warn('onPlayerMove')
      const { x, y } = data
      console.log(`moving from ${toX}|${toY} to ${x}|${y} [${counter}]`)

      const oldDistance =
        oldX && oldY
          ? calculateDistance(oldX, oldY, toX, toY)
          : MAX_DISTANCE
      const newDistance = calculateDistance(x, y, toX, toY)
      oldX = x
      oldY = y

      if (counter <= 0) {
        if (newDistance < oldDistance) {
          popups.push(
            createPopup(
              'countdown',
              `To wupada gut, hisce ${Math.floor(newDistance)} krocelow.`
            )
          )
          // WA.chat.sendChatMessage(
          //   `To wupada gut, hisce ${Math.floor(newDistance)} krocelow.`,
          //   'Super Serb'
          // )
        } else {
          if (newDistance <= 10) {
            found = true

            WA.chat.sendChatMessage(
              `'Mega cool, sy mje namakal!!! Netko pytaj palcika.`,
              'Super Serb'
            )

            WA.state
              .saveVariable('activeQuiz', 'palcik')
              .catch((e) =>
                console.error(
                  'Something went wrong while saving variable',
                  e
                )
              )
            popups.forEach((p) => p.close())
          } else
            popups.push(
              createPopup('popup-pytaj-mje', getFunnyReaction('wrong'))
            )
          // WA.chat.sendChatMessage(getFunnyReaction('wrong'), 'Super Serb')
        }
      } else {
        if (counter >= 5) counter = 0
      }
      counter += 0
    }
  })
}
