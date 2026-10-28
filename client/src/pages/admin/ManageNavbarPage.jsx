import { useState } from 'react'
import { Plus, Trash2, Menu, FolderPlus, ArrowRight, CornerDownRight, CheckCircle2 } from 'lucide-react'
import { DEFAULT_NAV_LINKS } from '../../utils/constants'

export default function ManageNavbarPage() {
  const [navItems, setNavItems] = useState(DEFAULT_NAV_LINKS)
  const [showParentModal, setShowParentModal] = useState(false)
  const [showChildModal, setShowChildModal] = useState(false)
  const [selectedParentId, setSelectedParentId] = useState(null)

  const [parentForm, setParentForm] = useState({ label: '', path: '' })
  const [childForm, setChildForm] = useState({ label: '', path: '', description: '' })

  const handleAddParent = (e) => {
    e.preventDefault()
    const newItem = {
      id: String(Date.now()),
      label: parentForm.label,
      path: parentForm.path || null,
      order: navItems.length,
      children: [],
    }
    setNavItems([...navItems, newItem])
    setParentForm({ label: '', path: '' })
    setShowParentModal(false)
  }

  const handleAddChild = (e) => {
    e.preventDefault()
    if (!selectedParentId) return

    setNavItems(
      navItems.map((item) => {
        if (item.id === selectedParentId) {
          const updatedChildren = [
            ...(item.children || []),
            {
              id: `${selectedParentId}-${Date.now()}`,
              label: childForm.label,
              path: childForm.path || '/academics',
              description: childForm.description,
            },
          ]
          return { ...item, children: updatedChildren }
        }
        return item
      })
    )

    setChildForm({ label: '', path: '', description: '' })
    setShowChildModal(false)
    setSelectedParentId(null)
  }

  const handleDeleteItem = (id) => {
    setNavItems(navItems.filter((item) => item.id !== id))
  }

  const handleDeleteChild = (parentId, childId) => {
    setNavItems(
      navItems.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: (item.children || []).filter((c) => c.id !== childId),
          }
        }
        return item
      })
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Menu className="w-6 h-6 text-[#1CA24B]" />
            Dynamic Navbar &amp; Dropdown Customizer
          </h2>
          <p className="text-sm text-slate-500">
            Configure primary menu links and nest multiple sub-links (dropdown menus) for courses and programs.
          </p>
        </div>
        <button
          onClick={() => setShowParentModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-sm font-bold shadow-md shadow-[#1CA24B]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Main Nav Link
        </button>
      </div>

      {/* Nav Hierarchy List */}
      <div className="space-y-4">
        {navItems.map((item, index) => {
          const hasChildren = item.children && item.children.length > 0

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
            >
              {/* Parent Item Header */}
              <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#e8f7ee] text-[#1CA24B] font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{item.label}</h3>
                    <span className="text-xs text-slate-500">
                      Target Route: <code className="bg-slate-200/60 px-1.5 py-0.5 rounded text-[11px]">{item.path || '(Dropdown Container)'}</code>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedParentId(item.id)
                      setShowChildModal(true)
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#1CA24B] text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>Add Sub-Link</span>
                  </button>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Child Sub-links (Dropdown Items) */}
              {hasChildren ? (
                <div className="p-4 sm:p-5 space-y-2.5 bg-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Dropdown Sub-links ({item.children.length})
                  </span>
                  {item.children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-[#1CA24B]/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <CornerDownRight className="w-4 h-4 text-[#1CA24B] shrink-0" />
                        <div>
                          <span className="text-sm font-semibold text-slate-800">
                            {child.label}
                          </span>
                          {child.description && (
                            <p className="text-xs text-slate-500">{child.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <code className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {child.path}
                        </code>
                        <button
                          onClick={() => handleDeleteChild(item.id, child.id)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded-md"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-3 text-xs text-slate-400 italic">
                  Single direct link (No dropdown children).
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add Parent Link Modal */}
      {showParentModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add Main Nav Link</h3>
            <form onSubmit={handleAddParent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Menu Label *
                </label>
                <input
                  type="text"
                  required
                  value={parentForm.label}
                  onChange={(e) => setParentForm({ ...parentForm, label: e.target.value })}
                  placeholder="e.g. Programs or Facilities"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Target Route Path (Leave empty if it only has dropdown sub-links)
                </label>
                <input
                  type="text"
                  value={parentForm.path}
                  onChange={(e) => setParentForm({ ...parentForm, path: e.target.value })}
                  placeholder="e.g. /programs"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowParentModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-sm font-bold shadow-md shadow-[#1CA24B]/20"
                >
                  Add Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Child Sub-link Modal */}
      {showChildModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Add Sub-Link Dropdown Item</h3>
            <p className="text-xs text-slate-500 mb-4">
              This will appear in the dropdown under the selected parent menu item.
            </p>
            <form onSubmit={handleAddChild} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Sub-link Label *
                </label>
                <input
                  type="text"
                  required
                  value={childForm.label}
                  onChange={(e) => setChildForm({ ...childForm, label: e.target.value })}
                  placeholder="e.g. +2 Computer Science"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Target Route Path *
                </label>
                <input
                  type="text"
                  required
                  value={childForm.path}
                  onChange={(e) => setChildForm({ ...childForm, path: e.target.value })}
                  placeholder="e.g. /academics#cs"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={childForm.description}
                  onChange={(e) => setChildForm({ ...childForm, description: e.target.value })}
                  placeholder="e.g. Software, coding & AI lab"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowChildModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1CA24B] hover:bg-[#16843c] text-white text-sm font-bold shadow-md shadow-[#1CA24B]/20"
                >
                  Save Sub-Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
