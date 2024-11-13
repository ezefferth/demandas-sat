import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './components/data/context/authContext'
import Router from './components/routes/router'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
