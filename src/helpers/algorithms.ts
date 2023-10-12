export const calculateDistance = (
  oldX: number,
  oldY: number,
  newX: number,
  newY: number
) => {
  const distX2 = Math.pow(oldX - newX, 2)
  const distY2 = Math.pow(oldY - newY, 2)

  const hypotenuse = Math.sqrt(distX2 + distY2)

  return hypotenuse
}

export const getRandomInt = (from: number, to: number) => {
  const min = Math.ceil(from)
  const max = Math.floor(to)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
