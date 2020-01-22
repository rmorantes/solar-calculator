import MapboxDraw from '@mapbox/mapbox-gl-draw'
import addLayerIconImageToMap from './services/addLayerIconImageToMap'
import panThenZoomMap from 'src/components/UIDesktop/services/panThenZoomMap'
import { useStateValue } from 'src/services/context'
import SVG_STRING_BUILDING from './services/SVG_STRING_BUILDING'
import SVG_STRING_PENCIL from './services/SVG_STRING_PENCIL'
import LAYERS from './services/LAYERS'
import SOURCE from './services/SOURCE'

// TODO: Add control for switching between satelite and street view. ~ RM
const Map = props => {
  const [{ mapboxgl }, dispatch] = useStateValue()
  // TODO: Replace with `useState` if possible. ~ RM
  const popups = useRef({})

  // TODO: Break this up. ~ RM
  useEffect(() => {
    // Offset of map center is to ensure initial configuration does not cause
    // side panel to overlap search results.
    const offset = 25
    const map = new mapboxgl.Map({
      accessToken: mapboxgl.accessToken,
      // Geographic center of the contiguous United States
      center: [-98.583333 - offset, 39.833333],
      container: 'map',
      fadeDuration: 0,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      zoom: 2.5
    })
    map.addControl(new mapboxgl.NavigationControl())
    const draw = new MapboxDraw({ displayControlsDefault: false })
    map.addControl(draw)

    map.on('load', () => {
      map.addSource('results', SOURCE)
      addLayerIconImageToMap('pencil', SVG_STRING_PENCIL, map)
      addLayerIconImageToMap('building', SVG_STRING_BUILDING, map)
      LAYERS.forEach(layer => map.addLayer(layer))

      // SOURCE: https://docs.mapbox.com/mapbox-gl-js/example/cluster/
      map.on('click', 'results', event => {
        props.setIsActiveSidePanel(false)
        const features = map.queryRenderedFeatures(event.point, {
          layers: ['results']
        })
        map.getZoom()
        if (map.getZoom() < 17) {
          panThenZoomMap(map, features[0].geometry.coordinates)
        } else {
          draw.changeMode('draw_polygon')
        }
      })

      const drawLogic = e => {
        const drawFeature = e.features && e.features[0]
        if (drawFeature) {
          if (e.features.length > 0) {
            const id = drawFeature.id
            const polygon = turf.polygon(drawFeature.geometry.coordinates)
            const position = turf.centroid(polygon).geometry.coordinates
            const area = turf.area(polygon) // m²
            // Assuming standard test conditions
            // SOURCE: https://en.wikipedia.org/wiki/Nominal_power_(photovoltaic)
            const lightIntensity = 1 // kW/m², or 1000 W/m²
            // Most solar panels are between 15% and 20% efficient
            // SOURCE: https://news.energysage.com/what-are-the-most-efficient-solar-panels-on-the-market/
            const efficiency = 0.175 // %
            // A typical value
            // SOURCE: https://photovoltaic-software.com/principle-ressources/how-calculate-solar-energy-power-pv-systems
            const performanceRatio = 0.75 // %
            const nominalPower = (
              Math.round(
                area *
                lightIntensity *
                efficiency *
                performanceRatio *
                10
              ) / 10
            )

            if (popups.current[id]) {
              popups.current[id]
                .setLngLat(position)
                .setHTML(`<h1> ${nominalPower} kW/m² </h1>`)
            } else {
              const popup = new mapboxgl.Popup({
                className: 'popup',
                closeOnClick: false
              })
                .setLngLat(position)
                .setHTML(`<h1> ${nominalPower} kW/m² </h1>`)
                .addTo(map)
                .on('close', () => {
                  const newPopups = { ...popups.current }
                  delete newPopups[id]
                  popups.current = newPopups
                  draw.delete(id)
                })
              popups.current = {
                ...popups.current,
                [id]: popup
              }
            }
          }
        }
      }

      map.on('draw.actionable', drawLogic)
      map.on('draw.modechange', drawLogic)
      // The `draw.selectionchange` event is necessary to access select + drag
      // movement as the other events do not.
      map.on('draw.selectionchange', drawLogic)
      map.on('draw.update', drawLogic)

      map.on('click', 'results-cluster-background', event => {
        const features = map.queryRenderedFeatures(event.point, {
          layers: ['results-cluster-background']
        })
        const clusterId = features[0].properties.cluster_id
        const handleZoom = (error, zoom) => {
          if (error) throw error
          panThenZoomMap(map, features[0].geometry.coordinates, zoom)
        }
        map.getSource('results').getClusterExpansionZoom(clusterId, handleZoom)
      })
    })

    dispatch({ draw: draw, map: map, type: 'SET_MAP' })
  }, [popups])

  return (
    <Wrapper
      id='map'
      isActiveSidePanel={props.isActiveSidePanel}
    />
  )
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  .popup {
    padding: 1rem;
    h1 {
      margin: 0.25rem 0.5rem 0;
    }
    .mapboxgl-popup-close-button {
      width: 1rem;
    }
  }
  ${'' /* NOTE: Prevents panel from overlapping Mapbox attribution. ~ RM */}
  .mapboxgl-ctrl-bottom-left {
    left: ${props => props.isActiveSidePanel ? '30rem' : 0};
    transition: 0.25s left;
  }
`

export default Map
