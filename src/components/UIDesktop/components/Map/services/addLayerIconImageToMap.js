// SOURCE: https://github.com/mapbox/mapbox-gl-js/issues/5529#issuecomment-503799896
// SOURCE: https://dev.to/benjaminblack/using-a-string-of-svg-as-an-image-source-8mo
const convertSvgStringToImage = (svgString, width, height) => (
  new Promise(resolve => {
    const blob = new window.Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const element = new window.Image(width, height)
    const onLoad = () => { resolve(element); window.URL.revokeObjectURL(url) }
    element.src = url
    element.addEventListener('load', onLoad, { once: true })
  })
)

const addLayerIconImageToMap = async (id, svg, map) => {
  const imageElement = await convertSvgStringToImage(svg, 50, 50)
  map.addImage(id, imageElement)
}

export default addLayerIconImageToMap
