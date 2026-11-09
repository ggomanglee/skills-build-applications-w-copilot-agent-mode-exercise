import { Activity, Dumbbell, LayoutDashboard, Trophy, Users, UsersRound } from 'lucide-react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Overview from './components/Overview.jsx'
import Teams from './components/Teams.jsx'
import UsersPage from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/', label: '개요', icon: LayoutDashboard, end: true },
  { to: '/activities', label: '활동', icon: Activity },
  { to: '/leaderboard', label: '리더보드', icon: Trophy },
  { to: '/teams', label: '팀', icon: UsersRound },
  { to: '/users', label: '사용자', icon: Users },
  { to: '/workouts', label: '운동', icon: Dumbbell },
]

function App() {
  const { pathname } = useLocation()
  const currentPage = navigation.find((item) => item.to === pathname)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand-lockup" to="/" aria-label="OctoFit 개요">
          <img src={logo} alt="" className="brand-mark" />
          <span className="brand-copy"><strong>OCTOFIT</strong><small>TRACKER</small></span>
        </NavLink>
        <div className="sidebar-label">WORKSPACE</div>
        <nav className="primary-nav" aria-label="주 탐색">
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom"><span className="live-indicator" aria-hidden="true" /><span>API 연결됨</span><span className="sidebar-port">:8000</span></div>
      </aside>
      <main className="main-shell">
        <header className="topbar">
          <div className="breadcrumb"><span>OCTOFIT</span><span className="breadcrumb-divider">/</span><strong>{currentPage?.label ?? '개요'}</strong></div>
          <div className="topbar-meta"><span className="today-label">커뮤니티 활동</span><span className="topbar-date">{new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' }).format(new Date())}</span></div>
        </header>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
