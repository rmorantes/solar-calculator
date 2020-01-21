import sleep from 'src/services/sleep'

// TODO: Temporarily prevent user control of camera while executing. ~ RM
// TODO: Offsets map center according to whether side panel is active. ~ RM
const panThenZoomMap = async (map, coordinates, zoom = 17) => {
  const durationMS = 2000
  map.easeTo({ center: coordinates, duration: durationMS })
  await sleep(durationMS)
  map.easeTo({ duration: durationMS, zoom: zoom })
}

export default panThenZoomMap
