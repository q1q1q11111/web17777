import { useState } from 'react';
import { Link } from 'react-router-dom';
import { studioData, jiebierData, centerData } from '../data/studios';

function HomePage() {
  const [selectedStudio, setSelectedStudio] = useState(null);

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge animate-in">★ 中国人民政治协商会议 · 上城区委员会</div>
          <h1 className="animate-in animate-delay-1">
            上城区政协委员<br />
            <span>工作室履职平台</span>
          </h1>
          <p className="hero-desc animate-in animate-delay-2">
            {studioData.overview}
          </p>
          <div className="hero-stats animate-in animate-delay-3">
            <div className="stat-card">
              <div className="stat-number">{studioData.statistics.total_studios}</div>
              <div className="stat-label">委员工作室</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{jiebierData.length}</div>
              <div className="stat-label">界别小组</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{centerData.centers.length}</div>
              <div className="stat-label">实践分中心</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{studioData.statistics.star_ratings_2025.five_star}<small>家</small></div>
              <div className="stat-label">五星级工作室</div>
            </div>
          </div>
        </div>
      </section>

      {/* Star Ratings */}
      <section className="star-section">
        <div className="section" style={{ paddingBottom: '48px' }}>
          <div className="section-header">
            <h2>2025年度星级认定</h2>
            <div className="divider"><span className="divider-icon">✦</span></div>
            <p>坚持创先争优，激发委员工作室活力</p>
          </div>
          <div className="star-grid">
            <div className="star-card five-star animate-in animate-delay-1">
              <div className="star-number">{studioData.statistics.star_ratings_2025.five_star}</div>
              <div className="stars-display">★★★★★</div>
              <div className="star-label">五星级</div>
              <div className="star-sub">示范引领</div>
            </div>
            <div className="star-card four-star animate-in animate-delay-2">
              <div className="star-number">{studioData.statistics.star_ratings_2025.four_star}</div>
              <div className="stars-display">★★★★☆</div>
              <div className="star-label">四星级</div>
              <div className="star-sub">积极作为</div>
            </div>
            <div className="star-card three-star animate-in animate-delay-3">
              <div className="star-number">{studioData.statistics.star_ratings_2025.three_star}</div>
              <div className="stars-display">★★★☆☆</div>
              <div className="star-label">三星级</div>
              <div className="star-sub">规范运行</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Studios */}
      <section className="section">
        <div className="section-header">
          <h2>委员工作室风采</h2>
          <div className="divider"><span className="divider-icon">✦</span></div>
          <p>全区50家委员工作室，实现街道委员小组全覆盖</p>
        </div>
        <div className="studio-grid">
          {studioData.studios.filter(s => s.image).slice(0, 8).map((studio, idx) => (
            <div
              key={studio.id}
              className="studio-card animate-in"
              style={{ animationDelay: `${idx * 0.08}s` }}
              onClick={() => setSelectedStudio(studio)}
            >
              <span className="studio-card-id">#{String(studio.id).padStart(2, '0')}</span>
              <img
                className="studio-card-image"
                src={studio.image}
                alt={studio.name}
                loading="lazy"
              />
              <div className="studio-card-body">
                <div className="studio-card-name">{studio.name}</div>
                <div className="studio-card-meta">
                  <span className="icon">👤</span> {studio.leader}
                </div>
                <div className="studio-card-address">📍 {studio.address}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/studios" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 32px',
            background: 'var(--red-primary)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '24px',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '1px',
            boxShadow: 'var(--shadow-md)',
            transition: 'all 0.3s ease',
          }}>
            查看全部50家工作室 →
          </Link>
        </div>
      </section>

      {/* Jiebier Preview */}
      <section style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--border-light)' }}>
        <div className="section">
          <div className="section-header">
            <h2>界别概况</h2>
            <div className="divider"><span className="divider-icon">✦</span></div>
            <p>涵盖16个界别，广泛凝聚各界共识</p>
          </div>
          <div className="jiebier-grid">
            {jiebierData.slice(0, 6).map((j, idx) => (
              <div key={j.id} className="jiebier-card animate-in" style={{ animationDelay: `${idx * 0.08}s` }}>
                <div className="jiebier-name">{j.name}</div>
                <div className="jiebier-members">{j.members} 名委员</div>
                <div className="jiebier-desc">{j.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/jiebier" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 32px',
              background: '#fff',
              color: 'var(--red-primary)',
              textDecoration: 'none',
              borderRadius: '24px',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '1px',
              border: '1px solid var(--red-primary)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.3s ease',
            }}>
              查看全部界别 →
            </Link>
          </div>
        </div>
      </section>

      {/* Center Preview */}
      <section className="center-intro">
        <div className="center-intro-inner">
          <h2>市政协新时代协商民主实践中心</h2>
          <p style={{ marginBottom: '20px' }}>{centerData.overview}</p>
          <p>
            上城区着力打造"一中心一主题、多站点互联动"的平台矩阵，
            已建成{centerData.centers.length}个区级实践分中心：
            {centerData.centers.map((c, i) => (
              <span key={i}> {i > 0 ? '、' : ''}<strong>{c.name.replace('上城区（', '').replace('）新时代协商民主实践中心', '')}</strong></span>
            ))}。
          </p>
        </div>
      </section>

      {/* Activity Photos */}
      <section className="photo-gallery">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="section-header">
            <h2>活动掠影</h2>
            <div className="divider"><span className="divider-icon">✦</span></div>
          </div>
          <div className="gallery-grid">
            {studioData.studios.filter(s => s.image).slice(0, 12).map((studio, idx) => (
              <div
                key={studio.id}
                className="gallery-item"
                onClick={() => setSelectedStudio(studio)}
              >
                <img src={studio.image} alt={studio.name} loading="lazy" />
                <div className="gallery-caption">{studio.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedStudio && (
        <div className="modal-overlay" onClick={() => setSelectedStudio(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedStudio(null)}>✕</button>
            {selectedStudio.image ? (
              <img className="modal-image" src={selectedStudio.image} alt={selectedStudio.name} />
            ) : (
              <div className="studio-card-noimg" style={{ height: '300px', fontSize: '80px' }}>协</div>
            )}
            <div className="modal-body">
              <h3>{selectedStudio.name}</h3>
              <p>负责人：{selectedStudio.leader}</p>
              <p>地址：{selectedStudio.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
