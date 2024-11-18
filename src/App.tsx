import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './components/data/context/authContext'
import Router from './components/routes/router'
import DataProvider from './components/data/context/dataContext'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Router />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
