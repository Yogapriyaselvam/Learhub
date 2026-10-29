import { useEffect, useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('admin_categories');
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      const defaults = [
        { id: 1, name: 'Programming', courseCount: 12 },
        { id: 2, name: 'Web Development', courseCount: 18 },
        { id: 3, name: 'Data Science', courseCount: 9 },
        { id: 4, name: 'Cloud & DevOps', courseCount: 6 },
      ];
      setCategories(defaults);
      localStorage.setItem('admin_categories', JSON.stringify(defaults));
    }
  }, []);

  const persist = (updated) => {
    setCategories(updated);
    localStorage.setItem('admin_categories', JSON.stringify(updated));
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    persist([...categories, { id: Date.now(), name: newCategoryName.trim(), courseCount: 0 }]);
    setNewCategoryName('');
    setShowAddModal(false);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Delete this category?')) {
      persist(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ margin: 0 }}>Category Management</h1>
        
      </div>

      {categories.length === 0 ? (
        <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: '#64748b' }}>
          No categories yet.
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 20px',
                borderBottom: idx < categories.length - 1 ? '1px solid #f1f5f9' : 'none'
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{cat.name}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{cat.courseCount} course{cat.courseCount !== 1 ? 's' : ''}</div>
              </div>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15,23,42,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '2rem', width: 380 }}>
            <h3 style={{ margin: '0 0 1rem' }}>New Category</h3>
            <input
              autoFocus
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: '1.25rem', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleAddCategory} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: '#4f46e5', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}