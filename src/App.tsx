import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage.tsx'
import DonePage from './pages/DonePage.tsx'
import GroupPage from './pages/GroupPage.tsx'
import HomePage from './pages/HomePage.tsx'
import MyPage from './pages/MyPage.tsx'
import Sign1Page from './pages/Sign1Page.tsx'
import Sign2Page from './pages/Sign2Page.tsx'
import './index.css' 

export default function App() {
  return (
    <div className="mobile-frame scale-80">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/done" element={<DonePage />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/sign1" element={<Sign1Page />} />
        <Route path="/sign2" element={<Sign2Page />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  )
}
