export const wocinDzeru = () => {
  WA.room.onEnterLayer('dzera').subscribe(() => {
    WA.chat.sendChatMessage(`Upps, to sy to dzere padnyl.`, 'Juri')
    WA.nav.goToRoom('map.tmj#start2')
  })
}
