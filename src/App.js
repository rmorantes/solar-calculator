import 'mapbox-gl/dist/mapbox-gl.css'
import GlobalStyles from './components/GlobalStyles'
import NextHead from './components/NextHead'
import mapboxgl from 'mapbox-gl'
import reducer from './services/reducer'
import UIDesktop from './components/UIDesktop'
import UIMobile from './components/UIMobile'
import { StateContextProvider } from 'src/services/context'

const isMobileRegex = /Android|BlackBerry|iPhone|iPod|Opera Mini|webOS/i
const isMobile = isMobileRegex.test(navigator.userAgent)
// NOTE: Ideally, token is accessed is a more secure manner. ~ RM
mapboxgl.accessToken = 'pk.eyJ1Ijoicm1vcmFudGVzIiwiYSI6ImNqYTRtaWp5MzRjcXEzMXBveWViOGNjYm0ifQ.lt1qdGpfbbrT328BOUhIpQ'

const App = () => {
  return (
    <StateContextProvider
      initialState={{ mapboxgl: mapboxgl }}
      reducer={reducer}
    >
      <NextHead />
      <GlobalStyles />
      {isMobile ? <UIMobile /> : <UIDesktop />}
    </StateContextProvider>
  )
}

export default App
