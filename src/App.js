import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './styles/fonts.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modals from './components/Modals'
import { ModalProvider } from './contexts/Modal'
import { UserProvider } from './contexts/User'
import { FeedProvider } from './contexts/Feed'

import Welcome from './pages/Welcome'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Users from './pages/Users'
import Tweet from './pages/Tweet'


const App = () => {
  return (
    <FeedProvider>
      <UserProvider>
        <BrowserRouter>
          <ModalProvider>
            <Routes>
              <Route exact path="/" element={<Welcome />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/users" element={<Users />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/tweets/:_id" element={<Tweet />} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Modals />
          </ModalProvider>
        </BrowserRouter>
      </UserProvider>
    </FeedProvider>
  )
}

export default App