import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { productsApi } from '../lib/api'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    productsApi
      .get(id)
      .then(setProduct)
      .catch((e) => setError(e.message || '체육관 정보를 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="product-detail product-detail--loading">로딩 중...</div>
  if (error) {
    return (
      <div className="product-detail product-detail--error">
        <p>{error}</p>
        <button type="button" onClick={() => navigate(-1)}>이전으로</button>
      </div>
    )
  }
  if (!product) return null

  return (
    <div className="product-detail">
      <nav className="product-detail-breadcrumb">
        <Link to="/">홈</Link>
        <span className="product-detail-breadcrumb-sep">&gt;</span>
        <Link to="/admin/products">체육관</Link>
        <span className="product-detail-breadcrumb-sep">&gt;</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-detail-main">
        <aside className="product-detail-gallery">
          <div className="product-detail-image-wrap">
            {product.image ? (
              <img src={product.image} alt="" className="product-detail-image" />
            ) : (
              <div className="product-detail-image product-detail-image--placeholder" />
            )}
          </div>
          <div className="product-detail-card">
            <div className="product-detail-card-avatar" />
            <div className="product-detail-card-info">
              <strong className="product-detail-card-name">{product.name}</strong>
              <p className="product-detail-card-meta">
                {product.address || '주소 없음'} · {product.category}
              </p>
              <button type="button" className="product-detail-card-btn">
                단골 맺기
              </button>
            </div>
          </div>
        </aside>

        <article className="product-detail-content">
          <h1 className="product-detail-title">{product.name} 소개</h1>
          <p className="product-detail-meta">
            {product.category} · 일일권 ₩{Number(product.price).toLocaleString()}
          </p>
          {product.description ? (
            <div className="product-detail-description">
              {product.description.split(/\n+/).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          ) : (
            <p className="product-detail-description product-detail-description--empty">
              등록된 소개가 없습니다.
            </p>
          )}
          <section className="product-detail-cta">
            <h2 className="product-detail-cta-title">이용 안내</h2>
            <p>
              일일권 가격 <strong>₩{Number(product.price).toLocaleString()}</strong> (1일 이용)
            </p>
            {product.address && (
              <p className="product-detail-address">
                <span className="product-detail-label">주소</span> {product.address}
              </p>
            )}
          </section>
          <div className="product-detail-footer">
            <Link to="/admin/products" className="product-detail-link">체육관 목록 보기</Link>
          </div>
        </article>
      </div>
    </div>
  )
}
