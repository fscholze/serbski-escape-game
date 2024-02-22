export const wulicDistancu = (
  xOld: number, 
  yOld:number, 
  x:number, 
  y:number
) => {

  return Math.sqrt(Math.pow(xOld-x, 2) + Math.pow(yOld-y, 2))
}



// Math.pow(x, 2) // x^2
// Math.sqrt(x)  //  √x 
// Math.pow(x, 1/3) // 3√x