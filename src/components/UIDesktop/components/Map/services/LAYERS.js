const LAYERS = [
  {
    filter: ['!', ['has', 'sum']],
    id: 'results',
    layout: {
      'icon-allow-overlap': true,
      'icon-image': [
        'step',
        ['zoom'],
        'building',
        17, 'pencil'
      ],
      'text-allow-overlap': true,
      'text-field': [
        'step',
        ['zoom'],
        '',
        17, 'Click me and then map to start calculating!',
        18, 'Double click map to finish drawing!',
        21.5, 'Whoa there, buddy!'
      ],
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-max-width': 15,
      'text-offset': [
        'step',
        ['zoom'],
        ['literal', [0, 3]],
        21.5,
        ['literal', [0, 2.25]]
      ],
      'text-optional': true,
      'text-size': 20
    },
    paint: {
      'text-color': 'orange',
      'text-halo-color': 'black',
      'text-halo-width': 2
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
