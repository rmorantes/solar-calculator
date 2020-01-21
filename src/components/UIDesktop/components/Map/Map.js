import addLayerIconImageToMap from './services/addLayerIconImageToMap'
import panThenZoomMap from 'src/components/UIDesktop/services/panThenZoomMap'
import { useStateValue } from 'src/services/context'
import BUILDING_SVG_STRING from './services/BUILDING_SVG_STRING'
import LAYERS from './services/LAYERS'
import SOURCE from './services/SOURCE'

const Map = props => {
  const [{ mapboxgl }, dispatch] = useStateValue()

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
      style: 'mapbox://styles/mapbox/satellite-v9',
      zoom: 2.5
    })
    map.addControl(new mapboxgl.NavigationControl())

    map.on('load', () => {
      map.addSource('results', SOURCE)
      addLayerIconImageToMap('building', BUILDING_SVG_STRING, map)
      LAYERS.forEach(layer => map.addLayer(layer))

      // SOURCE: https://docs.mapbox.com/mapbox-gl-js/example/cluster/
      map.on('click', 'results', event => {
        const features = map.queryRenderedFeatures(event.point, {
          layers: ['results']
        })
        panThenZoomMap(map, features[0].geometry.coordinates)
      })

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
    dispatch({ map: map, type: 'SET_MAP' })
  }, [])

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
  ${'' /* NOTE: Prevents panel from overlapping Mapbox attribution. ~ RM */}
  .mapboxgl-ctrl-bottom-left {
    left: ${props => props.isActiveSidePanel ? '30rem' : 0};
    transition: 0.25s left;
  }
`

export default Map
