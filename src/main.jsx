
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartContextProvider } from './context/ContextProvider.jsx'
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <CartContextProvider>
          <App />
      </CartContextProvider>
    </BrowserRouter>

)
