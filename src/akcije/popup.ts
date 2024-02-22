export const popupNoweWokno = () => {
  WA.ui.openPopup('wokno', 'Hallo swet',[
  {
    label:'Zacin so',
    callback: (popup) => {popup.close()} 
  },
  {
    label:'Zacin so',
    callback: (popup) => {popup.close()} 
  },
  {
    label:'Zacin so',
    callback: (popup) => {popup.close()} 
  },
  {
    label:'Zacin so',
    callback: (popup) => {popup.close()} 
  }
  ])
}