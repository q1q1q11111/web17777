import { useState, useMemo } from 'react';
import { studioData, streetData } from '../data/studios';

const ALL = '全部';
const HAS_IMAGE = '有活动照片';

function StudiosPage() {
  const [filter, setFilter] = useState(ALL);
  const [search, setSearch] = useState('');
  const [selectedStudio, setSelectedStudio] = useState(null);

  const filters = [ALL, HAS_IMAGE, ...streetData];

  const filtered = useMemo(() => {
    return studioData.studios.filter(s => {
      if (filter === HAS_IMAGE && !s.image) return false;
      if (filter !== ALL && filter !== HAS_IMAGE) {
        const streetMatch = streetData.find(st => s.name.includes(st.replace('街道', '')));
        if (!streetMatch && !s.address.includes(filter)) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        return s.name.toLowerCase().includes(q) ||
               s.leader.toLowerCase().includes(q) ||
               s.address.toLowerCase().includes(q);
      }
      return true;
    });
  }, [filter, search]);

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
          委员工作室
        </h1>
        <p style={{ opacity: 0.8, fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
          上城区共有委员工作室{studioData.statistics.total_studios}家，实现{studioData.statistics.coverage}
        </p>
      </section>

      <section className="section">
        {/* Search */}
        <div style={{ maxWidth: '480px', margin: '0 auto 24px' }}>
          <input
            type="text"
            placeholder="搜索工作室名称、负责人或地址..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: '24px',
              border: '1px solid var(--border-light)',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
              background: '#fff',
              transition: 'border-color 0.3s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--gold-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
          />
        </div>

        {/* Filters */}
        <div className="studio-filters">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Count */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
          fontSize: '13px',
          color: 'var(--text-muted)',
        }}>
          共 {filtered.length} 个工作室
        </div>

        {/* Grid */}
        <div className="studio-grid">
          {filtered.map((studio, idx) => (
            <div
              key={studio.id}
              className="studio-card animate-in"
              style={{ animationDelay: `${Math.min(idx * 0.04, 0.5)}s` }}
              onClick={() => setSelectedStudio(studio)}
            >
              <span className="studio-card-id">#{String(studio.id).padStart(2, '0')}</span>
              {studio.image ? (
                <img className="studio-card-image" src={studio.image} alt={studio.name} loading="lazy" />
              ) : (
                <div className="studio-card-noimg">协</div>
              )}
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

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--text-muted)',
            fontSize: '15px',
          }}>
            未找到匹配的工作室
          </div>
        )}
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
              <h3>#{selectedStudio.id} {selectedStudio.name}</h3>
              <p>负责人：{selectedStudio.leader}</p>
              <p>地址：{selectedStudio.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudiosPage;
