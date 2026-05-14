import { useState } from 'react';
import { jiebierData } from '../data/studios';
import { jiebierPhotos } from '../data/jiebierPhotos';

const folderMap = {
  1: '1中共', 2: '2无党派', 3: '3共青团、青联', 4: '4工会',
  5: '5妇联', 6: '6工商联', 7: '7科技、科协', 8: '8侨、台',
  9: '9新闻文体', 10: '10经济', 11: '11环境资源和农业', 12: '12教育',
  13: '13医卫', 14: '14社会福利和保障', 15: '15民宗', 16: '16特邀',
};

function JiebierPage() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--red-deeper), var(--red-primary))',
        padding: '56px 24px',
        textAlign: 'center',
        color: '#fff',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '36px',
          fontWeight: 700,
          marginBottom: '12px',
          letterSpacing: '2px',
        }}>
          界别基本情况
        </h1>
        <p style={{ opacity: 0.8, fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
          上城区政协共有{jiebierData.length}个界别，涵盖各领域代表人士
        </p>
      </section>

      <section className="section">
        <div className="jiebier-grid">
          {jiebierData.map((j, idx) => {
            const folder = folderMap[j.id];
            const photos = jiebierPhotos[folder] || [];
            const isExpanded = expandedId === j.id;

            return (
              <div
                key={j.id}
                className="jiebier-card animate-in"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className="jiebier-name">
                  <span style={{ color: 'var(--red-primary)', marginRight: '8px', fontWeight: 700 }}>
                    {String(j.id).padStart(2, '0')}
                  </span>
                  {j.name}
                </div>
                <div className="jiebier-members">👥 {j.members} 名委员</div>
                <div className="jiebier-desc">{j.desc}</div>

                {/* Photo thumbnails */}
                {photos.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : j.id)}
                      style={{
                        background: 'none',
                        border: '1px solid var(--border-light)',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-sans)',
                        marginBottom: '8px',
                      }}
                    >
                      📷 {photos.length} 张活动照片 {isExpanded ? '▲' : '▼'}
                    </button>
                    {isExpanded && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: photos.length > 2 ? 'repeat(3, 1fr)' : `repeat(${photos.length}, 1fr)`,
                        gap: '6px',
                      }}>
                        {photos.map((p, pi) => (
                          <img
                            key={pi}
                            src={p}
                            alt={`${j.name} 活动${pi + 1}`}
                            loading="lazy"
                            onClick={() => setActivePhoto(p)}
                            style={{
                              width: '100%',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              transition: 'transform 0.3s',
                            }}
                            onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={e => e.target.style.transform = 'scale(1)'}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* All Photos Gallery */}
      <section className="photo-gallery">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="section-header">
            <h2>界别活动照片集锦</h2>
            <div className="divider"><span className="divider-icon">✦</span></div>
            <p>各界别积极开展履职活动，凝聚共识、建言献策</p>
          </div>
          <div className="gallery-grid">
            {jiebierData.map(j => {
              const folder = folderMap[j.id];
              const photos = jiebierPhotos[folder] || [];
              return photos.map((p, pi) => (
                <div key={`${j.id}-${pi}`} className="gallery-item" onClick={() => setActivePhoto(p)}>
                  <img src={p} alt={`${j.name} 活动${pi + 1}`} loading="lazy" />
                  <div className="gallery-caption">{j.name}</div>
                </div>
              ));
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activePhoto && (
        <div className="modal-overlay" onClick={() => setActivePhoto(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActivePhoto(null)}>✕</button>
            <img className="modal-image" src={activePhoto} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default JiebierPage;
