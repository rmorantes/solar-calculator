# Solar Calculator

A simple solar calculator web app. Most of the know-how and some of code was drawn from [Maptivist](https://github.com/rmorantes/maptivist).

Should work on Chrome, Safari, and Edge. Firefox seems to be having issues with Mapbox (some map icons are not rendering properly).

### Initialization:

```
git clone https://github.com/rmorantes/solar-calculator.git
cd solar-calculator
npm install
npm run dev
```

Deploy to the cloud with [Now](https://zeit.co/now) ([download](https://zeit.co/download)):

```
now
```

### Justifications
Built with:
* [React](https://reactjs.org/)
* [Next.js](https://nextjs.org/)/[Now](https://zeit.co/now)
* [Styled Components](https://styled-components.com/)
* [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/)/[MapboxDraw](https://github.com/mapbox/mapbox-gl-draw)
* [Turf.js](https://turfjs.org/)


#### React
The only modern front-end UI framework I'm familiar with, largely because I love it so much. An easy choice.

#### Next.js
Requires very minimal setup and deploys seamlessly via Now. Comes
with lots of other bells and whistles I'm still learning about.

#### Styled Components
CSS-in-JS enforces component modularity and lowers cognitive burden (associated styles are in same file, far less need to worry about naming things in comparison to [BEM](http://getbem.com/introduction/) and such). Styled Components is my preferred implementation as the markup is very readable (`<PlaceName/>` beats `<p className='place-name'/>`), CSS-like syntax makes for seamless transition from CSS stylesheets, easy manipulation of CSS with Javascript (though care must be taken for performance reasons), and so on.

#### Mapbox GL
I've a fair amount of experience with Mapbox GL. The most capable web mapping service I've encountered with regard to map annotation and developer experience. However, its satellite imagery seems inferior to, say, Google Maps. I'm curious as to if and how they could work together in this regard.

#### Turf.js
I've little experience with geospatial-related calculations, but Turf.js seems like a good resource. It works, has a Mapbox plugin, and can be imported as discrete modules according to need so as to minimize size.
