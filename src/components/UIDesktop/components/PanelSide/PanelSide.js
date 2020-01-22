import ButtonToggle from './components/ButtonToggle'
import Description from './components/Description'
import Logo from './components/Logo'
import Result from './components/Result'
import SearchBar from './components/SearchBar'
import { useStateValue } from 'src/services/context'
import mapboxGeocodingService from '@mapbox/mapbox-sdk/services/geocoding'
import mapboxgl from 'mapbox-gl'

const PanelSide = props => {
  const [{ map }] = useStateValue()
  const [geocodingClient, setGeocodingClient] = useState(null)
  const [results, setResults] = useState(null)
  const [searchBarInputValue, setSearchBarInputValue] = useState('')

  useEffect(() => {
    setGeocodingClient(mapboxGeocodingService({ accessToken: mapboxgl.accessToken }))
  }, [])

  useEffect(() => {
    if (!results) return
    const resultFeatures = []
    results.map(result => {
      resultFeatures.push({
        geometry: {
          coordinates: result.coordinates,
          type: 'Point'
        },
        properties: { count: 1 },
        type: 'Feature'
      })
    })
    map.getSource('results').setData({
      features: resultFeatures,
      type: 'FeatureCollection'
    })
  }, [results])

  // SOURCE: https://docs.mapbox.com/mapbox-gl-js/example/marker-from-geocode/
  const handleResponse = response => {
    if (
      response &&
      response.body &&
      response.body.features &&
      response.body.features.length
    ) {
      const newResults = []
      response.body.features.forEach((feature, i) => {
        newResults.push({
          id: i,
          placeName: feature.place_name,
          coordinates: feature.geometry.coordinates
        })
      })
      setResults(newResults)
    } else {
      console.log("response = ", response)
    }
  }

  // SOURCE: https://github.com/mapbox/mapbox-sdk-js/blob/master/docs/services.md#geocoding
  const onSubmitSearch = e => {
    e.preventDefault()
    // TODO: Handle if result equals previous result, etc. ~ RM
    if (!searchBarInputValue) return
    // TODO: Replace with async/await syntax if possible. ~ RM
    geocodingClient.forwardGeocode({
      autocomplete: false,
      countries: ['us'],
      limit: 5,
      query: searchBarInputValue,
      types: ['address']
    }).send().then(handleResponse)
  }

  const onChangeSearchBarInputValue = e => {
    setSearchBarInputValue(e.target.value)
  }

  return (
    <Wrapper isActive={props.isActive}>
      <Logo />
      <Description />
      <SearchBar
        onSubmit={onSubmitSearch}
        onChange={onChangeSearchBarInputValue}
        value={searchBarInputValue}
      />
      {results && results.map(result => (
        <Result
          key={result.id}
          {...result}
        />
      ))}
      <ButtonToggle onClick={props.onClickButtonToggle} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.65);
  height: 100vh;
  left: ${props => props.isActive ? 0 : '-30rem'};
  position: fixed;
  top: 0;
  transition: 0.25s left;
  width: 30rem;
`

export default PanelSide
