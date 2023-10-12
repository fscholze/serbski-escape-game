export const buttons = {
  button1: { x: 3, y: 35, color: 'red', pressed: false },
  button2: { x: 8, y: 28, color: 'red', pressed: false }
}

export const addButtons = (updateMap: Function) => {
  for (const [btnName, { x, y }] of Object.entries(buttons)) {
    WA.room.area.create({
      name: btnName,
      x: x * 32,
      y: y * 32,
      width: 32,
      height: 32
    })
    WA.room.area.onEnter(btnName).subscribe(() => {
      WA.player.state.saveVariable('buttonPressed', btnName, {
        persist: false,
        public: true
      })
      updateMap()
    })
    WA.room.area.onLeave(btnName).subscribe(() => {
      WA.player.state.saveVariable('buttonPressed', undefined, {
        persist: false,
        public: true
      })
      updateMap()
    })
  }

  WA.players.onPlayerEnters.subscribe((player) => {
    player.state.onVariableChange('buttonPressed').subscribe(() => {
      updateMap()
    })
  })
  WA.players.onPlayerLeaves.subscribe(() => {
    updateMap()
  })

  /*WA.players.onVariableChange('buttonPressed').subscribe(({player, value}) => {
    console.log("VARIABLE CHANGED", value, player.state.buttonPressed);
    updateMap();
});*/
}
