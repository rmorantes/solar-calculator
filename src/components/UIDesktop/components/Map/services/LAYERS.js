const LAYERS = [
  {
    filter: ['!', ['has', 'sum']],
    id: 'results',
    layout: {
      'icon-allow-overlap': true,
      'icon-image': 'building'
    },
    source: 'results',
    type: 'symbol'
  },
  {
    filter: ['has', 'sum'],
    id: 'results-cluster-background',
    paint: {
      'circle-color': '#FFDB2D',
      'circle-radius': 25,
      'circle-stroke-color': '#FFA600',
      'circle-stroke-opacity': 0.65,
      'circle-stroke-width': ['case', ['has', 'cluster'], 10, 0]
    },
    source: 'results',
    type: 'circle'
  },
  {
    filter: ['has', 'sum'],
    id: 'results-cluster-sum',
    layout: {
      'text-allow-overlap': true,
      'text-field': ['get', 'sum'],
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-optional': true,
      'text-size': 20
    },
    source: 'results',
    type: 'symbol'
  }
]

export default LAYERS
