import { useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)
const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

export default function Layout() {
  const { user, logout } = useAuth()
  const [openDropdown, setOpenDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!openDropdown) return
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [openDropdown])

  const handleLogout = () => {
    logout()
    setOpenDropdown(false)
  }

  return (
    <>
      <div className="site-wrap">
        <div className="announcement-bar">
          [NEW] 2024 쇼핑몰 시즌 컬렉션
        </div>
        <header className="site-header">
          <div className="header-inner">
            <Link to="/" className="header-logo">
              쇼핑몰
            </Link>
            <nav className="header-nav">
              <Link to="/products">MEN&apos;S</Link>
              <Link to="/products">WOMEN&apos;S</Link>
              <Link to="/products">ACTIVE</Link>
              <Link to="/products">BAGS</Link>
              <Link to="/products">OUTER</Link>
              <Link to="/products">BOTTOM</Link>
              <Link to="/products">TOP</Link>
              <Link to="/products">ACC</Link>
            </nav>
            <div className="header-actions">
              <button type="button" className="header-icon-btn" aria-label="검색">
                <IconSearch />
              </button>
              <Link to="/products" className="header-icon-btn" aria-label="장바구니">
                <IconCart />
              </Link>
              {user?.user_type === 'admin' && (
                <Link to="/admin" className="header-admin-btn">Admin</Link>
              )}
              {!user ? (
                <Link to="/login" className="header-login-btn">로그인</Link>
              ) : (
                <div className="header-user-wrap" ref={dropdownRef}>
                  <button
                    type="button"
                    className="header-user-btn"
                    onClick={() => setOpenDropdown((v) => !v)}
                    aria-expanded={openDropdown}
                    aria-haspopup="true"
                  >
                    {user.name}님 환영합니다
                  </button>
                  {openDropdown && (
                    <div className="header-user-dropdown">
                      <button type="button" className="header-user-dropdown-item" onClick={handleLogout}>
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
      </div>
      <main className="site-main">
        <Outlet />
      </main>
    </>
  )
}
