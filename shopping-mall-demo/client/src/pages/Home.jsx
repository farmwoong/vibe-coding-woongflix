import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productsApi } from '../lib/api'

const SHOP_TABS = [
  { id: 'new', label: 'NEW ARRIVALS' },
  { id: 'best', label: 'BEST' },
  { id: 'restock', label: 'RESTOCK' },
]

const CATEGORIES = [
  { id: 'mens', label: "MEN'S", path: '/products' },
  { id: 'womens', label: "WOMEN'S", path: '/products' },
  { id: 'active', label: 'ACTIVE', path: '/products' },
  { id: 'underwear', label: 'UNDERWEAR', path: '/products' },
  { id: 'socks', label: 'SOCKS', path: '/products' },
  { id: 'caps', label: 'CAPS', path: '/products' },
]

const BOTTOM_GRID = [
  { id: 'campaign', label: 'CAMPAIGN', sub: 'NIGHT OUT', path: '#' },
  { id: 'lookbook', label: 'LOOKBOOK', sub: '2024 COLLECTION', path: '#' },
  { id: 'stockist', label: 'STOCKIST', sub: 'OFFICIAL STORE', path: '#' },
  { id: 'instagram', label: 'INSTAGRAM', sub: '@SHOPPINGMALL', path: '#' },
]

export default function Home() {
  const [shopTab, setShopTab] = useState('new')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productsApi
      .list({ limit: 0 })
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const displayProducts = products.slice(0, 6)

  return (
    <div className="home-btwin">
      <section className="home-hero-btwin">
        <div className="home-hero-bg" />
        <div className="home-hero-content">
          <h1 className="home-hero-title">SHOP: ECLIPSE</h1>
          <Link to="/products" className="home-hero-cta">SHOP</Link>
        </div>
      </section>

      <section className="home-shop-in">
        <div className="home-shop-tabs">
          {SHOP_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`home-shop-tab ${shopTab === tab.id ? 'active' : ''}`}
              onClick={() => setShopTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="home-shop-carousel">
          <div className="home-shop-track">
            {loading ? (
              <p className="home-shop-loading">로딩 중...</p>
            ) : displayProducts.length === 0 ? (
              <p className="home-shop-empty">등록된 체육관이 없습니다.</p>
            ) : (
              displayProducts.map((p) => (
                <Link key={p._id} to={`/products/${p._id}`} className="home-product-card">
                  {p.image ? (
                    <img src={p.image} alt="" className="home-product-img home-product-img-real" />
                  ) : (
                    <div className="home-product-img" />
                  )}
                  <p className="home-product-name">{p.name}</p>
                  <p className="home-product-price">₩{Number(p.price).toLocaleString()}</p>
                </Link>
              ))
            )}
          </div>
        </div>
        <div className="home-shop-viewall">
          <Link to="/products" className="home-viewall-btn">VIEW ALL</Link>
        </div>
      </section>

      <section className="home-category">
        <h2 className="home-section-title">CATEGORY</h2>
        <div className="home-category-grid">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={cat.path} className="home-category-item">
              <div className="home-category-circle" />
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-winners-style">
        <h2 className="home-section-title">WINNER&apos;S STYLE</h2>
        <div className="home-winners-carousel">
          <div className="home-winners-track">
            {[1, 2, 3, 4, 5].map((i) => (
              <Link key={i} to="/products" className="home-winners-card">
                <div className="home-winners-img" />
                <span>2 ITEMS</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="home-shop-viewall">
          <Link to="/products" className="home-viewall-btn">VIEW ALL</Link>
        </div>
      </section>

      <section className="home-signature-banner">
        <div className="home-signature-bg" />
        <div className="home-signature-content">
          <h2>쇼핑몰 SIGNATURE BAGS</h2>
        </div>
      </section>

      <section className="home-bottom-grid">
        {BOTTOM_GRID.map((item) => (
          <Link key={item.id} to={item.path} className="home-bottom-item">
            <div className="home-bottom-img" />
            <span className="home-bottom-label">{item.label}</span>
            <span className="home-bottom-sub">{item.sub}</span>
          </Link>
        ))}
      </section>

      <footer className="home-footer">
        <div className="home-footer-inner">
          <nav className="home-footer-nav">
            <a href="#terms">이용약관</a>
            <a href="#privacy">개인정보처리방침</a>
            <a href="#guide">이용안내</a>
          </nav>
          <div className="home-footer-info">
            <p>주식회사 쇼핑몰 | 대표이사 홍길동 | 사업자등록번호 000-00-00000</p>
            <p>서울특별시 강남구 테헤란로 123 | 고객센터 1234-5678</p>
            <p>반품주소: 서울특별시 강남구</p>
            <p className="home-footer-copy">© SHOPPING MALL. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
