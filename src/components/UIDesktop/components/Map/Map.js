import mapboxgl from 'mapbox-gl'

const Map = props => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      // NOTE: Ideally, token is accessed is a more secure manner. ~ RM
      accessToken: 'pk.eyJ1Ijoicm1vcmFudGVzIiwiYSI6ImNqYTRtaWp5MzRjcXEzMXBveWViOGNjYm0ifQ.lt1qdGpfbbrT328BOUhIpQ',
      center: [0, 0],
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-v9',
      zoom: 2
    })
    map.addControl(new mapboxgl.NavigationControl())
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
  .mapboxgl-ctrl-bottom-left {
    ${'' /* NOTE: Prevents side panel from overlapping Mapbox attribution. ~ RM
    */}
    left: ${props => props.isActiveSidePanel ? '30rem' : 0};
    transition: 0.25s left;
  }
`

export default Map
