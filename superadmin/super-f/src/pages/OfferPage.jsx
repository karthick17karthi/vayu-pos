import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { createOffer, updateOffer, deleteOffer } from '../store/store';
import { Plus, Trash2 } from 'lucide-react';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext.jsx';
import { getThemeConfig } from '../theme/designSystem.js';

export default function OfferPage() {
  const { offers } = useSelector((state) => state.offer);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    discount: '',
    validity: '',
  });

  const handleCreateOffer = (e) => {
    e.preventDefault();
    if (formData.title && formData.discount && formData.validity) {
      dispatch(
        createOffer({
          id: offers.length + 1,
          ...formData,
          status: 'Active',
          uses: 0,
        })
      );
      setFormData({ title: '', discount: '', validity: '' });
      setShowForm(false);
    }
  };

  const handleDeleteOffer = (id) => {
    dispatch(deleteOffer(id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Offers Management</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-200">Create and manage promotional offers.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 ${themeConfig.classes['primary-button']}`}
        >
          <Plus size={18} />
          {showForm ? 'Close' : 'Create Offer'}
        </button>
      </div>

      {/* Create Offer Form */}
        {showForm && (
          <Card title="Create New Offer">
            <form onSubmit={handleCreateOffer} className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <input
                type="text"
                placeholder="Offer Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={themeConfig.classes['input-field']}
              />
              <input
                type="text"
                placeholder="Discount (e.g., 20%, BOGO)"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className={themeConfig.classes['input-field']}
              />
              <input
                type="date"
                value={formData.validity}
                onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
                className={themeConfig.classes['input-field']}
              />
              <button type="submit" className={themeConfig.classes['primary-button']}>
                Create
              </button>
            </form>
          </Card>
        )}

      {/* Offers Table */}
        <Card title="All Offers">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 dark:border-white/10">
                <tr className="text-left text-xs font-semibold uppercase text-slate-600 dark:text-slate-200">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Discount</th>
                  <th className="px-6 py-3">Validity</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Uses</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr
                    key={offer.id}
                    className="border-b border-slate-200 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    <td className="px-6 py-4">{offer.title}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{offer.discount}</td>
                    <td className="px-6 py-4">{offer.validity}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          offer.status === 'Active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-200'
                            : offer.status === 'Scheduled'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200'
                            : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-200'
                        }`}
                      >
                        {offer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{offer.uses}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="text-red-300 hover:text-red-200 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      {/* Offer Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card title="Active Offers">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {offers.filter((o) => o.status === 'Active').length}
          </p>
        </Card>
        <Card title="Total Uses">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {offers.reduce((sum, o) => sum + o.uses, 0)}
          </p>
        </Card>
        <Card title="Scheduled">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {offers.filter((o) => o.status === 'Scheduled').length}
          </p>
        </Card>
        <Card title="Expired">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {offers.filter((o) => o.status === 'Expired').length}
          </p>
        </Card>
      </div>
    </div>
  );
}
