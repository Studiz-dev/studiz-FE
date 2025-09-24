import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DonePage from './pages/DonePage'
import GroupPage from './pages/GroupPage'
import HomePage from './pages/HomePage'
import MyPage from './pages/MyPage'
import Sign1Page from './pages/Sign1Page'
import Sign2Page from './pages/Sign2Page'
import './index.css'

export default function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="mobile-frame">
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
    </div>
  )
}
