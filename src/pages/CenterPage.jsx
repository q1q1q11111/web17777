import { useState } from 'react';
import { centerData } from '../data/studios';

function CenterPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activePhoto, setActivePhoto] = useState(null);
  const center = centerData.centers[activeTab];

  return (
    <div>
      {/* Header */}
      <section className="center-intro">
        <div className="center-intro-inner">
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>
            市政协新时代协商民主实践中心
          </h1>
          <p style={{ marginBottom: '12px' }}>{centerData.overview}</p>
          <p>
            着力打造"一中心一主题、多站点互联动"的平台矩阵，已建成{centerData.centers.length}个区级实践分中心，
            推动协商民主向下扎根、向实发展。
          </p>
        </div>
      </section>

      <section className="section">
        {/* Tabs */}
        <div className="center-tabs">
          {centerData.centers.map((c, idx) => (
            <button
              key={idx}
              className={`center-tab ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              {c.name.replace('上城区（', '').replace('）新时代协商民主实践中心', '')}分中心
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="center-detail">
          <div className="center-info animate-in">
            <h3>{center.name}</h3>
            <div className="center-info-item">
              <span className="label">📍 地址：</span>
              <span>{center.address}</span>
            </div>
            <div className="center-info-item">
              <span className="label">📅 建成：</span>
              <span>{center.established}</span>
            </div>
            <div className="center-info-item">
              <span className="label">🖼️ 活动：</span>
              <span>{center.images.length} 场活动记录</span>
            </div>
            <div className="center-info-desc">{center.desc}</div>
          </div>
          <div className="center-photos animate-in animate-delay-2">
            {center.images.map((img, idx) => (
              <img
                key={idx}
                className="center-photo"
                src={img}
                alt={`活动${idx + 1}`}
                loading="lazy"
                onClick={() => setActivePhoto(img)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Photos Gallery */}
      <section className="photo-gallery">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="section-header">
            <h2>活动照片集锦</h2>
            <div className="divider"><span className="divider-icon">✦</span></div>
            <p>记录协商民主的基层实践</p>
          </div>
          <div className="gallery-grid">
            {centerData.centers.map((c, cIdx) =>
              c.images.map((img, idx) => (
                <div key={`${cIdx}-${idx}`} className="gallery-item" onClick={() => setActivePhoto(img)}>
                  <img src={img} alt={`${c.name} 活动${idx + 1}`} loading="lazy" />
                  <div className="gallery-caption">
                    {c.name.replace('上城区（', '').replace('）新时代协商民主实践中心', '')}分中心
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activePhoto && (
        <div className="modal-overlay" onClick={() => setActivePhoto(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '1100px' }}>
            <button className="modal-close" onClick={() => setActivePhoto(null)}>✕</button>
            <img className="modal-image" src={activePhoto} alt="" style={{ maxHeight: '75vh' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CenterPage;
