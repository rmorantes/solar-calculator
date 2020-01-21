const SOURCE = {
  cluster: true,
  clusterMaxZoom: 17,
  clusterProperties: {
    sum: ['+', ['get', 'count']]
  },
  clusterRadius: 50,
  data: {
    features: [],
    type: 'FeatureCollection'
  },
  type: 'geojson'
}

export default SOURCE
