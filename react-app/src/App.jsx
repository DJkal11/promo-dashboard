import { Outlet, NavLink } from 'react-router-dom';
import './App.css'

function App() {

  return (
     <>
      <header className='app-header'>
      <div className="container app-header__bar">
        <h1 className='app-title'>Promo Dashboard</h1>
        <nav className='nav'><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>Dashboard</NavLink></nav>
        </div>
      </header>

      <main className="container section">
        <Outlet />
      </main>
    </>
  )
}

export default App
