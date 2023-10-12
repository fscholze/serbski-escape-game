export const chatWithPalcik = () => {
  const myLayerSubscriber = WA.room
    .onEnterLayer('palcik/palcik')
    .subscribe(() => {
      WA.chat.sendChatMessage(
        `Witaj ${WA.player.name}, praji raz, kelko Serbow hisce smy?`,
        'Palčik'
      )
    })

  WA.room.onLeaveLayer('palcik/palcik').subscribe(() => {
    WA.chat.sendChatMessage('Ne Ne, to chcu netko wedzec!', 'Palčik')

    WA.room.showLayer('palcik/wrota')
    // WA.room.hideLayer('doors/door_closed');

    // myLayerSubscriber.unsubscribe();
  })

  WA.chat.onChatMessage((message) => {
    const input = Number.parseInt(message)
    if (!Number.isNaN(input)) {
      switch (true) {
        case input == 60000:
          WA.chat.sendChatMessage('Cool, to trechi!', 'Palčik')
          WA.room.hideLayer('palcik/wrota')
          break
        case input >= 50000 && input <= 70000:
          WA.chat.sendChatMessage('Skoro', 'Palčik')
          break
        case input >= 20000 && input <= 50000:
          WA.chat.sendChatMessage('To je pre malo', 'Palčik')
          break
        case input >= 70000 && input <= 100000:
          WA.chat.sendChatMessage('To je pre wjele', 'Palčik')
          break
        default:
          WA.chat.sendChatMessage('Oh je....', 'Palčik')
          break
      }
    }
  })
}
