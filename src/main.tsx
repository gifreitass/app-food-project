import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import PageAllRestaurants from './pages/PageAllRestaurants'
import PageOrders from './pages/PageOrders'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: system-ui;
  }
`

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageAllRestaurants />} />
        <Route path='/pedido' element={<PageOrders />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  </React.StrictMode>
)
