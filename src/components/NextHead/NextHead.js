import Head from 'next/head'

// TODO: Install dependencies. ~ RM
const NextHead = () => (
  <Head>
    <title> Solar Calculator </title>
    {/* TODO: Replace with own icons. ~ RM */}
    {/* NOTE: Good source for icons on the quick. ~ RM */}
    <link
      href='https://use.fontawesome.com/releases/v5.8.2/css/all.css'
      rel='stylesheet'
    />
    <link
      href='/static/favicon.ico'
      rel='shortcut icon'
    />
    {/* TODO: Import only Turf.js modules needed. ~ RM */}
    <script src='https://api.tiles.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js' />
  </Head>
)

export default NextHead
