import React, { useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import _ from 'lodash'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Profile from './pages/Profile'
import UserProvider from './contexts/UserProvider'
import DataTagProvider from './contexts/DataTagContext'
import './styles/App.scss'

function App() {
  const userData = useContext(UserProvider.context)

  return (
    <Router>
      <div className='react-root'>
        <Navbar />
          <Route path='/' exact component={Home}/>
          <Route path='/About' component={About}/>
          <Route path='/Login' component={Login}/>
          <UserProvider>
          <DataTagProvider>
              <Route path='/Profile' component={Profile}/>          
          </DataTagProvider>
          </UserProvider>
      </div>
    </Router>
  );
}

export default App;