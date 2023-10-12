enum Quiz {
  wrota = 'wrota',
  palcik = 'palcik',
  pytajMje = 'pytajMje'
}

interface TileDescriptor {
  x: number
  y: number
  tile: number | string | null
  layer: string
}
