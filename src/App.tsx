import { Routes, Route, useLocation } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DonePage from './pages/DonePage'
import GroupPage from './pages/GroupPage'
import HomePage from './pages/HomePage'
import MyPage from './pages/MyPage'
import Sign1Page from './pages/Sign1Page'
import Sign2Page from './pages/Sign2Page'
import './index.css'

import BottomNav from './pages/BottomNav'

export default function App() {
  const location = useLocation();
  const navPages = ['/Home', '/Group', '/My'];
  const showNav = navPages.includes(location.pathname);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="mobile-frame relative">
        <main className={showNav ? 'pb-16' : ''}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/done" element={<DonePage />} />
            
            <Route path="/Group" element={<GroupPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/My" element={<MyPage />} />
            
            <Route path="/sign1" element={<Sign1Page />} />
            <Route path="/sign2" element={<Sign2Page />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}
