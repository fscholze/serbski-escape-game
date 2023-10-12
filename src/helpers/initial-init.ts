export const initStuff = async () => {
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
}
