import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import { Route,Routes } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'
import RestarauntDetails from './components/RestarauntDetails'
import Cart from './components/Cart'
const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

function App() {

  return (
    <Routes>
        <Route path="/login" element={<Login/>}/>

        <Route path="/" element={
          <ProtectedRoute>
             <Home sortByOptions={sortByOptions} />
          </ProtectedRoute>
        }/>

        <Route path="/restaurant/:resId" element={
          <ProtectedRoute>
            <RestarauntDetails />
          </ProtectedRoute>
          }/>

        <Route path="/cart" element={<Cart/>}/>
        
      </Routes>
    
  )
}

export default App