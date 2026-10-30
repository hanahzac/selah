import { useEffect, useState } from 'react'
import { Admin } from './components/Admin'
import { Reader } from './components/Reader'

export function App() {
  const [path, setPath] = useState(window.location.hash)

  useEffect(() => {
    const listen = () => setPath(window.location.hash)
    window.addEventListener('hashchange', listen)
    return () => window.removeEventListener('hashchange', listen)
  }, [])

  return path.startsWith('#/admin') ? <Admin /> : <Reader />
}
