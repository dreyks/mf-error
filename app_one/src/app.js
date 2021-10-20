import { lazy, Suspense } from 'react'

const RemoteExport = lazy(() => (
  import('app_two/remote-export').then((module) => ({ default: module.RemoteExport }))
))

export const App = () => (
  <Suspense fallback="Loading...">
    <RemoteExport />
  </Suspense>
)
