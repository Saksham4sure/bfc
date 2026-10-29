import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, GripVertical, Check, X, Menu, CornerDownRight } from 'lucide-react'
import api from '../../services/api'
import { DEFAULT_NAV_LINKS } from '../../utils/constants'

export default function ManageNavbarPage() {
  const [navItems, setNavItems] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [parentForChild, setParentForChild] = useState(null)
  const [formData, setFormData] = useState({ label: '', path: '', order: 0 })

  useEffect(() => {
    fetchNav()
  }, [])

  const fetchNav = async () => {
    try {
      const response = await api.get('/nav/all')
      if (response?.data?.navItems?.length > 0) {
        setNavItems(response.data.navItems)
      } else {
        setNavItems(DEFAULT_NAV_LINKS)
      }
    } catch {
      setNavItems(DEFAULT_NAV_LINKS)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        parentId: parentForChild ? parentForChild.id : null,
      }
      await api.post('/nav', payload)
      fetchNav()
      setShowAddModal(false)
      setParentForChild(null)
      setFormData({ label: '', path: '', order: 0 })
    } catch (err) {
      alert('Error saving navigation link: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/nav/${editingItem.id}`, formData)
      fetchNav()
      setEditingItem(null)
    } catch (err) {
      alert('Error updating navigation link: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this navigation item?')) return
    try {
      await api.delete(`/nav/${id}`)
      fetchNav()
    } catch (err) {
      alert('Error deleting navigation link: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 flex items-center gap-2">
            <Menu className="w-5 h-5 text-zinc-700" />
            Dynamic Navigation Menu
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure header navigation structure, parent dropdown items, and order.
          </p>
        </div>
        <button
          onClick={() => {
            setParentForChild(null)
            setFormData({ label: '', path: '', order: navItems.length })
            setShowAddModal(true)
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Top Nav Item
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="divide-y divide-zinc-200">
          {navItems.map((item, index) => (
            <div key={item.id} className="p-4 sm:p-5 hover:bg-zinc-50/50 transition-colors">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-zinc-100 text-zinc-700 font-mono text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <span className="text-sm font-bold text-zinc-900">{item.label}</span>
                    <span className="text-xs text-zinc-400 ml-2 font-mono">{item.path || 'Dropdown Parent'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setParentForChild(item)
                      setFormData({ label: '', path: '', order: (item.children?.length || 0) })
                      setShowAddModal(true)
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium cursor-pointer transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add Dropdown Sub-item
                  </button>

                  <button
                    onClick={() => {
                      setEditingItem(item)
                      setFormData({ label: item.label, path: item.path || '', order: item.order || 0 })
                    }}
                    className="p-1.5 text-zinc-400 hover:text-zinc-800 rounded-md transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {item.children && item.children.length > 0 && (
                <div className="mt-3 pl-8 pr-2 space-y-1.5 border-l-2 border-zinc-200 ml-3">
                  {item.children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/60"
                    >
                      <div className="flex items-center gap-2">
                        <CornerDownRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="text-xs font-semibold text-zinc-800">{child.label}</span>
                        <span className="text-[11px] text-zinc-400 font-mono">{child.path}</span>
                      </div>
                      <button
                        onClick={() => handleDelete(child.id)}
                        className="text-zinc-400 hover:text-red-600 p-1 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200">
            <h3 className="text-base font-bold text-zinc-900 mb-1">
              {parentForChild ? `Add Sub-item to ${parentForChild.label}` : 'Add Nav Menu Link'}
            </h3>
            <form onSubmit={handleCreate} className="space-y-3.5 mt-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Label</label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. +2 Science"
                  className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 uppercase mb-1">Path / URL</label>
                <input
                  type="text"
                  value={formData.path}
                  onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                  placeholder="e.g. /academics"
                  className="w-full px-3 py-1.5 border border-zinc-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
