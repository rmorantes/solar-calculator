import 'mapbox-gl/dist/mapbox-gl.css'
import GlobalStyles from './components/GlobalStyles'
import NextHead from './components/NextHead'
import UIDesktop from './components/UIDesktop'
import UIMobile from './components/UIMobile'

const isMobileRegex = /Android|BlackBerry|iPhone|iPod|Opera Mini|webOS/i
const isMobile = isMobileRegex.test(navigator.userAgent)

const App = () => {
  return (
    <>
      <NextHead />
      <GlobalStyles />
      {isMobile ? <UIMobile /> : <UIDesktop />}
    </>
  )
}

export default App
