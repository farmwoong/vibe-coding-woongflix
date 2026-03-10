import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Admin from './pages/Admin'
import AdminProductNew from './pages/AdminProductNew'
import AdminProducts from './pages/AdminProducts'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products">
            <Route index element={<Navigate to="/admin/products" replace />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/products/new" element={<AdminProductNew />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
