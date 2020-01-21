import dynamic from 'next/dynamic'

// NOTE: Node.js/SSR doesn't have access to the `window` object used by app to
// determine whether to render a mobile vs desktop UI and such. `dynamic` code
// below prevents associated errors for development purposes, but ideally as
// much of the app as possible is rendered by server before being sent to
// client where rendering is completed. ~ RM
const DynamicAppWithNoSSR = dynamic(() => import('../App'), {
  loading: () => <div> Loading... </div>,
  ssr: false
})

export default DynamicAppWithNoSSR
