import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext.jsx';
import { getThemeConfig } from '../theme/designSystem.js';
import { CreditCard, Package, FileText, Building2, Headphones, BarChart3, Shield, Settings, Instagram, Facebook, Youtube, Linkedin, Twitter, Globe, MessageCircle } from 'lucide-react';
import { API_BASE_URL } from '../config/api.js';

const SECTION_KEYS = {
  hero: 'hero',
  features: 'features',
  pricing: 'pricing',
  demoForm: 'demoForm',
  footer: 'footer',
};

const MAX_FEATURES = 8;
const MAX_PLAN_FEATURES = 6;

const SOCIAL_LINK_OPTIONS = [
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'twitter', label: 'X / Twitter', icon: Twitter },
  { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { key: 'website', label: 'Website', icon: Globe },
];

// Default feature icons with colors
const FEATURE_ICONS = [
  { key: 'billing', label: 'Billing', icon: CreditCard, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500' },
  { key: 'inventory', label: 'Inventory', icon: Package, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500' },
  { key: 'reports', label: 'Reports', icon: FileText, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500' },
  { key: 'branch', label: 'Multi-Branch', icon: Building2, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500' },
  { key: 'support', label: 'Support', icon: Headphones, color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-500' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-500' },
  { key: 'security', label: 'Security', icon: Shield, color: 'from-red-500 to-red-600', bgColor: 'bg-red-500' },
  { key: 'settings', label: 'Settings', icon: Settings, color: 'from-slate-500 to-slate-600', bgColor: 'bg-slate-500' },
];

// Helper to get icon config by key
const getIconConfig = (key) => FEATURE_ICONS.find((i) => i.key === key) || FEATURE_ICONS[0];
const getSocialLinkOption = (key) => SOCIAL_LINK_OPTIONS.find((item) => item.key === key) || SOCIAL_LINK_OPTIONS[SOCIAL_LINK_OPTIONS.length - 1];

const createDefaultFooterDraft = () => ({
  brandTitle: 'Vayu POS',
  brandSubtitle: 'Restaurant Management Made Easy',
  description: 'Efficient restaurant management in one platform.',
  socialLinksTitle: 'Follow Us',
  socialLinks: [],
  contactTitle: 'Contact Info',
  contacts: [
    { type: 'phone', value: '+91 73581 05293' },
    { type: 'email', value: 'support@vayupos.com' },
    { type: 'location', value: 'Madhapur, Hyderabad, Telangana 500032' },
  ],
  copyrightText: '© 2026 Vayu POS. All rights reserved.',
});

const normalizeFooterDraft = (footer) => ({
  ...createDefaultFooterDraft(),
  ...(footer ?? {}),
  socialLinksTitle: footer?.socialLinksTitle ?? footer?.quickLinksTitle ?? 'Follow Us',
  socialLinks: (footer?.socialLinks ?? []).map((link) => ({
    platform: link?.platform ?? 'instagram',
    url: link?.url ?? 'https://',
  })),
});

function FeatureIconPicker({ selectedIcon, onSelect, compact = false }) {
  return (
    <div className={`grid ${compact ? 'grid-cols-4 gap-2' : 'grid-cols-4 gap-3'}`}>
      {FEATURE_ICONS.map((iconOption) => {
        const IconComponent = iconOption.icon;
        const isSelected = selectedIcon === iconOption.key;

        return (
          <button
            key={iconOption.key}
            type="button"
            onClick={() => onSelect(iconOption.key)}
            aria-label={iconOption.label}
            title={iconOption.label}
            className={`flex items-center justify-center rounded-xl border-2 transition-all ${
              compact ? 'h-12 w-12' : 'h-16 w-full'
            } ${
              isSelected
                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/20'
                : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${iconOption.color}`}>
              <IconComponent className="h-5 w-5 text-white" />
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function SuperAdminLanding() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [heroDraft, setHeroDraft] = useState(null);
  const [featuresDraft, setFeaturesDraft] = useState([]);
  const [pricingDraft, setPricingDraft] = useState([]);
  const [demoFormDraft, setDemoFormDraft] = useState(null);
  const [footerDraft, setFooterDraft] = useState(null);

  const [heroEditMode, setHeroEditMode] = useState(false);
  const [featuresEditMode, setFeaturesEditMode] = useState(false);
  const [pricingEditMode, setPricingEditMode] = useState(false);
  const [demoFormEditMode, setDemoFormEditMode] = useState(false);
  const [footerEditMode, setFooterEditMode] = useState(false);

  // Popup modal states
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showFieldModal, setShowFieldModal] = useState(false);

  // New item drafts for popups
  const [newFeature, setNewFeature] = useState({ title: '', description: '', icon: 'billing', active: true });
  const [newPlan, setNewPlan] = useState({ name: '', price: 0, popular: false, features: '' });
  const [newField, setNewField] = useState({ key: '', label: '', placeholder: '', type: 'text', required: false });

  const [savingState, setSavingState] = useState({
    hero: false,
    features: false,
    pricing: false,
    demoForm: false,
    footer: false,
  });

  const [sectionSuccess, setSectionSuccess] = useState({
    hero: '',
    features: '',
    pricing: '',
    demoForm: '',
    footer: '',
  });

  const confirmAction = (message) => window.confirm(message);

  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);
  const inputClass = themeConfig.classes['input-field'];
  const primaryButton = themeConfig.classes['primary-button'];

  useEffect(() => {
    fetchLandingData();
  }, []);

  const setDraftsFromData = (source) => {
    setHeroDraft(source.hero);
    setFeaturesDraft((source.features ?? []).slice(0, MAX_FEATURES));
    setPricingDraft(
      (source.pricing ?? []).map((plan) => ({
        ...plan,
        features: (plan.features ?? []).slice(0, MAX_PLAN_FEATURES),
      })),
    );
    setDemoFormDraft(source.demoForm);
    setFooterDraft(normalizeFooterDraft(source.footer));
  };

  const fetchLandingData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/landing`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setDraftsFromData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetSectionSuccess = (section) => {
    setSectionSuccess((prev) => ({ ...prev, [section]: '' }));
  };

  const saveSection = async (sectionKey, sectionValue) => {
    if (!data) return;

    setSavingState((prev) => ({ ...prev, [sectionKey]: true }));
    setError(null);
    resetSectionSuccess(sectionKey);

    try {
      let normalizedSectionValue = sectionValue;

      if (sectionKey === SECTION_KEYS.features) {
        normalizedSectionValue = (sectionValue ?? []).slice(0, MAX_FEATURES);
      }

      if (sectionKey === SECTION_KEYS.pricing) {
        normalizedSectionValue = (sectionValue ?? []).map((plan) => ({
          ...plan,
          features: (plan.features ?? [])
            .map((item) => item.trim())
            .filter((item) => item !== '')
            .slice(0, MAX_PLAN_FEATURES),
        }));
      }

      const payload = {
        ...data,
        [sectionKey]: normalizedSectionValue,
      };

      const response = await fetch(`${API_BASE_URL}/api/landing`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to save ${sectionKey}: ${response.status}`);
      }

      const updated = await response.json();
      setData(updated);
      setDraftsFromData(updated);

      const successLabel =
        sectionKey === SECTION_KEYS.hero
          ? 'Hero section saved'
          : sectionKey === SECTION_KEYS.features
          ? 'Features section saved'
          : sectionKey === SECTION_KEYS.pricing
          ? 'Pricing section saved'
          : sectionKey === SECTION_KEYS.demoForm
          ? 'Demo form section saved'
          : 'Footer section saved';

      setSectionSuccess((prev) => ({ ...prev, [sectionKey]: `${successLabel} successfully.` }));

      if (sectionKey === SECTION_KEYS.hero) setHeroEditMode(false);
      if (sectionKey === SECTION_KEYS.features) setFeaturesEditMode(false);
      if (sectionKey === SECTION_KEYS.pricing) setPricingEditMode(false);
      if (sectionKey === SECTION_KEYS.demoForm) setDemoFormEditMode(false);
      if (sectionKey === SECTION_KEYS.footer) setFooterEditMode(false);

      setTimeout(() => {
        setSectionSuccess((prev) => ({ ...prev, [sectionKey]: '' }));
      }, 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingState((prev) => ({ ...prev, [sectionKey]: false }));
    }
  };

  const cancelHeroEdit = () => {
    if (data?.hero) setHeroDraft(data.hero);
    setHeroEditMode(false);
  };

  const cancelFeaturesEdit = () => {
    if (data?.features) setFeaturesDraft(data.features);
    setFeaturesEditMode(false);
  };

  const cancelPricingEdit = () => {
    if (data?.pricing) setPricingDraft(data.pricing);
    setPricingEditMode(false);
  };

  const cancelDemoFormEdit = () => {
    if (data?.demoForm) setDemoFormDraft(data.demoForm);
    setDemoFormEditMode(false);
  };

  const cancelFooterEdit = () => {
    if (data?.footer) {
      setFooterDraft(normalizeFooterDraft(data.footer));
    }
    setFooterEditMode(false);
  };

  const updateHero = (field, value) => {
    setHeroDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateFeature = (index, field, value) => {
    setFeaturesDraft((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addFeature = () => {
    setFeaturesDraft((prev) => {
      if (prev.length >= MAX_FEATURES) return prev;
      const newId = prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 1;
      return [...prev, { id: newId, title: newFeature.title, description: newFeature.description, icon: newFeature.icon, active: true }];
    });
    setNewFeature({ title: '', description: '', icon: 'billing', active: true });
    setShowFeatureModal(false);
  };

  const openFeatureModal = () => {
    setNewFeature({ title: '', description: '', icon: 'billing', active: true });
    setShowFeatureModal(true);
  };

  const deleteFeature = (index) => {
    if (!confirmAction('Are you sure you want to delete this feature?')) return;
    setFeaturesDraft((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePricing = (index, field, value) => {
    setPricingDraft((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updatePricingFeatures = (index, value) => {
    const features = value
      .split('\n')
      .map((item) => item.trim());
    updatePricing(index, 'features', features);
  };

  const addPricingPlan = () => {
    setPricingDraft((prev) => {
      const newId = prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 1;
      const featuresArray = newPlan.features
        .split('\n')
        .map((f) => f.trim())
        .filter((f) => f !== '')
        .slice(0, MAX_PLAN_FEATURES);
      return [...prev, { id: newId, name: newPlan.name, price: newPlan.price, popular: newPlan.popular, features: featuresArray }];
    });
    setNewPlan({ name: '', price: 0, popular: false, features: '' });
    setShowPlanModal(false);
  };

  const openPlanModal = () => {
    setNewPlan({ name: '', price: 0, popular: false, features: '' });
    setShowPlanModal(true);
  };

  const deletePricingPlan = (index) => {
    if (!confirmAction('Are you sure you want to delete this pricing plan?')) return;
    setPricingDraft((prev) => prev.filter((_, i) => i !== index));
  };

  const updateDemoForm = (field, value) => {
    setDemoFormDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateDemoFormField = (index, fieldProp, value) => {
    setDemoFormDraft((prev) => {
      const updatedFields = [...prev.fields];
      updatedFields[index] = { ...updatedFields[index], [fieldProp]: value };
      return {
        ...prev,
        fields: updatedFields,
      };
    });
  };

  const addDemoField = () => {
    setDemoFormDraft((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          key: newField.key || `customField${prev.fields.length + 1}`,
          label: newField.label || 'Custom Field',
          placeholder: newField.placeholder || 'Enter value',
          type: newField.type,
          required: newField.required,
        },
      ],
    }));
    setNewField({ key: '', label: '', placeholder: '', type: 'text', required: false });
    setShowFieldModal(false);
  };

  const openFieldModal = () => {
    setNewField({ key: '', label: '', placeholder: '', type: 'text', required: false });
    setShowFieldModal(true);
  };

  const removeDemoField = (index) => {
    if (!confirmAction('Are you sure you want to delete this demo form field?')) return;
    setDemoFormDraft((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }));
  };

  const moveDemoField = (index, direction) => {
    setDemoFormDraft((prev) => {
      const updatedFields = [...prev.fields];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= updatedFields.length) {
        return prev;
      }

      const temp = updatedFields[index];
      updatedFields[index] = updatedFields[targetIndex];
      updatedFields[targetIndex] = temp;

      return {
        ...prev,
        fields: updatedFields,
      };
    });
  };

  const updateFooter = (field, value) => {
    setFooterDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateFooterSocialLink = (index, field, value) => {
    setFooterDraft((prev) => {
      const next = [...(prev?.socialLinks ?? [])];
      next[index] = { ...next[index], [field]: value };
      return {
        ...prev,
        socialLinks: next,
      };
    });
  };

  const addFooterSocialLink = () => {
    setFooterDraft((prev) => ({
      ...prev,
      socialLinks: [...(prev?.socialLinks ?? []), { platform: 'instagram', url: 'https://' }],
    }));
  };

  const deleteFooterSocialLink = (index) => {
    if (!confirmAction('Are you sure you want to delete this social link?')) return;
    setFooterDraft((prev) => ({
      ...prev,
      socialLinks: (prev?.socialLinks ?? []).filter((_, i) => i !== index),
    }));
  };

  const updateFooterContact = (index, field, value) => {
    setFooterDraft((prev) => {
      const next = [...(prev?.contacts ?? [])];
      next[index] = { ...next[index], [field]: value };
      return {
        ...prev,
        contacts: next,
      };
    });
  };

  const addFooterContact = () => {
    setFooterDraft((prev) => ({
      ...prev,
      contacts: [...(prev?.contacts ?? []), { type: 'phone', value: '' }],
    }));
  };

  const deleteFooterContact = (index) => {
    if (!confirmAction('Are you sure you want to delete this contact item?')) return;
    setFooterDraft((prev) => ({
      ...prev,
      contacts: (prev?.contacts ?? []).filter((_, i) => i !== index),
    }));
  };

  const formatFieldKey = (key) =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase());

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-200">Loading landing page data...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <Card title="Error Loading Data">
        <p className="mb-4 text-red-600 dark:text-red-200">{error}</p>
        <button
          onClick={fetchLandingData}
          className="px-4 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors"
        >
          Retry
        </button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Landing Page CMS</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-200">Manage each section independently with section-based save.</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-600 dark:text-red-200">
          <svg className="mr-3 h-5 w-5 text-red-500 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Hero Section */}
      <Card
        title="Hero Section"
        actions={
          <>
            <button
              onClick={() => {
                setHeroEditMode(true);
                resetSectionSuccess(SECTION_KEYS.hero);
              }}
              disabled={heroEditMode}
              className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 disabled:opacity-50 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (!confirmAction('Are you sure you want to save Hero Section changes?')) return;
                saveSection(SECTION_KEYS.hero, heroDraft);
              }}
              disabled={!heroEditMode || savingState.hero}
              className={`px-3 py-2 ${primaryButton} text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {savingState.hero ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                if (!confirmAction('Are you sure you want to cancel Hero Section changes?')) return;
                cancelHeroEdit();
              }}
              disabled={!heroEditMode}
              className="px-3 py-2 rounded-lg bg-red-500/80 text-white text-sm disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        }
      >
        {sectionSuccess.hero && (
          <p className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-200">
            {sectionSuccess.hero}
          </p>
        )}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
            <input
              type="text"
              value={heroDraft?.title ?? ''}
              onChange={(e) => updateHero('title', e.target.value)}
              disabled={!heroEditMode}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Subtitle</label>
            <textarea
              value={heroDraft?.subtitle ?? ''}
              onChange={(e) => updateHero('subtitle', e.target.value)}
              rows="2"
              disabled={!heroEditMode}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Request Button Text</label>
              <input
                type="text"
                value={heroDraft?.requestBtn ?? ''}
                onChange={(e) => updateHero('requestBtn', e.target.value)}
                disabled={!heroEditMode}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Pricing Button Text</label>
              <input
                type="text"
                value={heroDraft?.pricingBtn ?? ''}
                onChange={(e) => updateHero('pricingBtn', e.target.value)}
                disabled={!heroEditMode}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Features Section */}
      <Card
        title="Features Section"
        actions={
          <>
            <button
              onClick={() => {
                setFeaturesEditMode(true);
                resetSectionSuccess(SECTION_KEYS.features);
              }}
              disabled={featuresEditMode}
              className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 disabled:opacity-50 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (!confirmAction('Are you sure you want to save Features Section changes?')) return;
                saveSection(SECTION_KEYS.features, featuresDraft);
              }}
              disabled={!featuresEditMode || savingState.features}
              className={`px-3 py-2 ${primaryButton} text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {savingState.features ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                if (!confirmAction('Are you sure you want to cancel Features Section changes?')) return;
                cancelFeaturesEdit();
              }}
              disabled={!featuresEditMode}
              className="px-3 py-2 rounded-lg bg-red-500/80 text-white text-sm disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        }
      >
        {sectionSuccess.features && (
          <p className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-200">
            {sectionSuccess.features}
          </p>
        )}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Features</h2>
          <button
            onClick={openFeatureModal}
            disabled={!featuresEditMode || featuresDraft.length >= MAX_FEATURES}
            className={`${primaryButton} disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            + Add Feature
          </button>
        </div>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
          {featuresDraft.length}/{MAX_FEATURES} features used
        </p>
        <div className="space-y-4">
          {featuresDraft.map((feature, index) => {
            const iconConfig = getIconConfig(feature.icon);
            const IconComponent = iconConfig.icon;
            return (
            <div key={feature.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#0f2530]">
              <div className="flex gap-4 mb-3">
                {/* Icon Display/Selector */}
                <div className="flex-shrink-0">
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Icon</label>
                  {featuresEditMode ? (
                    <FeatureIconPicker
                      selectedIcon={feature.icon || 'billing'}
                      onSelect={(iconKey) => updateFeature(index, 'icon', iconKey)}
                      compact
                    />
                  ) : (
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconConfig.color} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                {/* Title & Description */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 items-end">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => updateFeature(index, 'title', e.target.value)}
                      disabled={!featuresEditMode}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
                    <input
                      type="text"
                      value={feature.description}
                      onChange={(e) => updateFeature(index, 'description', e.target.value)}
                      disabled={!featuresEditMode}
                      className={inputClass}
                    />
                  </div>
                  <div className="md:pb-[1px]">
                    <button
                      onClick={() => deleteFeature(index)}
                      disabled={!featuresEditMode}
                      className="w-full px-3 py-3 bg-red-500/80 text-white rounded hover:bg-red-500 text-sm font-medium md:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
          {featuresDraft.length === 0 && (
            <p className="py-8 text-center text-slate-600 dark:text-slate-300">No features yet. Click "Add Feature" to create one.</p>
          )}
        </div>
      </Card>

      {/* Pricing Section */}
      <Card
        title="Pricing Plans Section"
        actions={
          <>
            <button
              onClick={() => {
                setPricingEditMode(true);
                resetSectionSuccess(SECTION_KEYS.pricing);
              }}
              disabled={pricingEditMode}
              className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 disabled:opacity-50 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (!confirmAction('Are you sure you want to save Pricing Plans Section changes?')) return;
                saveSection(SECTION_KEYS.pricing, pricingDraft);
              }}
              disabled={!pricingEditMode || savingState.pricing}
              className={`px-3 py-2 ${primaryButton} text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {savingState.pricing ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                if (!confirmAction('Are you sure you want to cancel Pricing Plans Section changes?')) return;
                cancelPricingEdit();
              }}
              disabled={!pricingEditMode}
              className="px-3 py-2 rounded-lg bg-red-500/80 text-white text-sm disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        }
      >
        {sectionSuccess.pricing && (
          <p className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-200">
            {sectionSuccess.pricing}
          </p>
        )}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pricing Plans</h2>
          <button
            onClick={openPlanModal}
            disabled={!pricingEditMode}
            className={primaryButton}
          >
            + Add Plan
          </button>
        </div>
        <div className="space-y-4">
          {pricingDraft.map((plan, index) => (
            <div key={plan.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#0f2530]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Plan Name</label>
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => updatePricing(index, 'name', e.target.value)}
                    disabled={!pricingEditMode}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Price</label>
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => updatePricing(index, 'price', parseInt(e.target.value) || 0)}
                    disabled={!pricingEditMode}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Plan Features (one per line)</label>
                  <textarea
                    value={plan.features.join('\n')}
                    onChange={(e) => updatePricingFeatures(index, e.target.value)}
                    rows="3"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    disabled={!pricingEditMode}
                    className={inputClass}
                  />
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {plan.features.filter((item) => item.trim() !== '').length}/{MAX_PLAN_FEATURES} features
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={plan.popular}
                    onChange={(e) => updatePricing(index, 'popular', e.target.checked)}
                    disabled={!pricingEditMode}
                    className="h-4 w-4 rounded border-slate-300 text-cyan-400 focus:ring-cyan-400 dark:border-white/10"
                  />
                  <span className="ml-2 text-sm text-slate-700 dark:text-slate-200">Mark as Popular</span>
                </label>
                <button
                  onClick={() => deletePricingPlan(index)}
                  disabled={!pricingEditMode}
                  className="px-3 py-1 bg-red-500/80 text-white rounded hover:bg-red-500 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {pricingDraft.length === 0 && (
            <p className="py-8 text-center text-slate-600 dark:text-slate-300">No pricing plans yet. Click "Add Plan" to create one.</p>
          )}
        </div>
      </Card>

      {/* Demo Form Section */}
      <Card
        title="Demo Form Section"
        actions={
          <>
            <button
              onClick={() => {
                setDemoFormEditMode(true);
                resetSectionSuccess(SECTION_KEYS.demoForm);
              }}
              disabled={demoFormEditMode}
              className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 disabled:opacity-50 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (!confirmAction('Are you sure you want to save Demo Form Section changes?')) return;
                saveSection(SECTION_KEYS.demoForm, demoFormDraft);
              }}
              disabled={!demoFormEditMode || savingState.demoForm}
              className={`px-3 py-2 ${primaryButton} text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {savingState.demoForm ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                if (!confirmAction('Are you sure you want to cancel Demo Form Section changes?')) return;
                cancelDemoFormEdit();
              }}
              disabled={!demoFormEditMode}
              className="px-3 py-2 rounded-lg bg-red-500/80 text-white text-sm disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        }
      >
        {sectionSuccess.demoForm && (
          <p className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-200">
            {sectionSuccess.demoForm}
          </p>
        )}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Demo Form</h2>
          <button
            onClick={openFieldModal}
            disabled={!demoFormEditMode}
            className={primaryButton}
          >
            + Add Field
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Form Title</label>
            <input
              type="text"
              value={demoFormDraft?.title ?? ''}
              onChange={(e) => updateDemoForm('title', e.target.value)}
              disabled={!demoFormEditMode}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Form Subtitle</label>
            <textarea
              value={demoFormDraft?.subtitle ?? ''}
              onChange={(e) => updateDemoForm('subtitle', e.target.value)}
              rows="2"
              disabled={!demoFormEditMode}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Submit Button Text</label>
            <input
              type="text"
              value={demoFormDraft?.submitText ?? ''}
              onChange={(e) => updateDemoForm('submitText', e.target.value)}
              disabled={!demoFormEditMode}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {demoFormDraft?.fields?.map((field, index) => (
            <div key={`${field.key}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#0f2530]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{formatFieldKey(field.key)}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveDemoField(index, -1)}
                    disabled={!demoFormEditMode}
                    className="rounded border border-slate-200 bg-slate-100 px-2 py-1 text-xs text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDemoField(index, 1)}
                    disabled={!demoFormEditMode}
                    className="rounded border border-slate-200 bg-slate-100 px-2 py-1 text-xs text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeDemoField(index)}
                    disabled={!demoFormEditMode}
                    className="px-2 py-1 text-xs bg-red-500/80 text-white rounded hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">Field Key</label>
                  <input
                    type="text"
                    value={field.key}
                    onChange={(e) => updateDemoFormField(index, 'key', e.target.value)}
                    disabled={!demoFormEditMode}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">Label</label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateDemoFormField(index, 'label', e.target.value)}
                    disabled={!demoFormEditMode}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">Placeholder</label>
                  <input
                    type="text"
                    value={field.placeholder}
                    onChange={(e) => updateDemoFormField(index, 'placeholder', e.target.value)}
                    disabled={!demoFormEditMode}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">Field Type</label>
                  <select
                    value={field.type}
                    onChange={(e) => updateDemoFormField(index, 'type', e.target.value)}
                    disabled={!demoFormEditMode}
                    className={inputClass}
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="number">Number</option>
                    <option value="textarea">Textarea</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id={`required-${index}`}
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateDemoFormField(index, 'required', e.target.checked)}
                    disabled={!demoFormEditMode}
                    className="h-4 w-4 rounded border-slate-300 text-cyan-400 focus:ring-cyan-400 dark:border-white/10"
                  />
                  <label htmlFor={`required-${index}`} className="text-xs text-slate-700 dark:text-slate-200">
                    Required
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Footer Section */}
      <Card
        title="Footer Section"
        actions={
          <>
            <button
              onClick={() => {
                setFooterEditMode(true);
                resetSectionSuccess(SECTION_KEYS.footer);
              }}
              disabled={footerEditMode}
              className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 disabled:opacity-50 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (!confirmAction('Are you sure you want to save Footer Section changes?')) return;
                saveSection(SECTION_KEYS.footer, footerDraft);
              }}
              disabled={!footerEditMode || savingState.footer}
              className={`px-3 py-2 ${primaryButton} text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {savingState.footer ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                if (!confirmAction('Are you sure you want to cancel Footer Section changes?')) return;
                cancelFooterEdit();
              }}
              disabled={!footerEditMode}
              className="px-3 py-2 rounded-lg bg-red-500/80 text-white text-sm disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        }
      >
        {sectionSuccess.footer && (
          <p className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-200">
            {sectionSuccess.footer}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Brand Title</label>
            <input
              type="text"
              value={footerDraft?.brandTitle ?? ''}
              onChange={(e) => updateFooter('brandTitle', e.target.value)}
              disabled={!footerEditMode}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Brand Subtitle</label>
            <input
              type="text"
              value={footerDraft?.brandSubtitle ?? ''}
              onChange={(e) => updateFooter('brandSubtitle', e.target.value)}
              disabled={!footerEditMode}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
          <textarea
            rows="3"
            value={footerDraft?.description ?? ''}
            onChange={(e) => updateFooter('description', e.target.value)}
            disabled={!footerEditMode}
            className={inputClass}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Social Links Title</label>
            <input
              type="text"
              value={footerDraft?.socialLinksTitle ?? ''}
              onChange={(e) => updateFooter('socialLinksTitle', e.target.value)}
              disabled={!footerEditMode}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Contact Title</label>
            <input
              type="text"
              value={footerDraft?.contactTitle ?? ''}
              onChange={(e) => updateFooter('contactTitle', e.target.value)}
              disabled={!footerEditMode}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#0f2530]">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Social Media Links</h3>
              <button
                onClick={addFooterSocialLink}
                disabled={!footerEditMode}
                className={`${primaryButton} px-3 py-1 text-xs disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                + Add Social Link
              </button>
            </div>
            <div className="space-y-2">
              {(footerDraft?.socialLinks ?? []).map((link, index) => {
                const socialOption = getSocialLinkOption(link.platform);
                const SocialIcon = socialOption.icon;

                return (
                  <div key={`footer-social-${index}`} className="grid grid-cols-1 md:grid-cols-[150px_56px_1fr_auto] gap-2 items-center">
                    <select
                      value={link.platform}
                      onChange={(e) => updateFooterSocialLink(index, 'platform', e.target.value)}
                      disabled={!footerEditMode}
                      className={inputClass}
                    >
                      {SOCIAL_LINK_OPTIONS.map((option) => (
                        <option key={option.key} value={option.key}>{option.label}</option>
                      ))}
                    </select>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
                      <SocialIcon className="h-5 w-5" />
                    </div>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateFooterSocialLink(index, 'url', e.target.value)}
                      disabled={!footerEditMode}
                      className={inputClass}
                      placeholder="https://example.com/profile"
                    />
                    <button
                      onClick={() => deleteFooterSocialLink(index)}
                      disabled={!footerEditMode}
                      className="px-3 py-1 bg-red-500/80 text-white rounded hover:bg-red-500 text-xs font-medium disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#0f2530]">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Contact Items</h3>
              <button
                onClick={addFooterContact}
                disabled={!footerEditMode}
                className={`${primaryButton} px-3 py-1 text-xs disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                + Add Contact
              </button>
            </div>
            <div className="space-y-2">
              {(footerDraft?.contacts ?? []).map((contact, index) => (
                <div key={`footer-contact-${index}`} className="grid grid-cols-1 md:grid-cols-[130px_1fr_auto] gap-2 items-center">
                  <select
                    value={contact.type}
                    onChange={(e) => updateFooterContact(index, 'type', e.target.value)}
                    disabled={!footerEditMode}
                    className={inputClass}
                  >
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="location">Location</option>
                    <option value="custom">Custom</option>
                  </select>
                  <input
                    type="text"
                    value={contact.value}
                    onChange={(e) => updateFooterContact(index, 'value', e.target.value)}
                    disabled={!footerEditMode}
                    className={inputClass}
                    placeholder="Enter contact value"
                  />
                  <button
                    onClick={() => deleteFooterContact(index)}
                    disabled={!footerEditMode}
                    className="px-3 py-1 bg-red-500/80 text-white rounded hover:bg-red-500 text-xs font-medium disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Copyright Text</label>
          <input
            type="text"
            value={footerDraft?.copyrightText ?? ''}
            onChange={(e) => updateFooter('copyrightText', e.target.value)}
            disabled={!footerEditMode}
            className={inputClass}
            placeholder="Use {year} to auto insert the year"
          />
        </div>
      </Card>

      {/* Add Feature Modal */}
      {showFeatureModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0e2a33]">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Add New Feature</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Select Icon *</label>
                <FeatureIconPicker
                  selectedIcon={newFeature.icon}
                  onSelect={(iconKey) => setNewFeature((prev) => ({ ...prev, icon: iconKey }))}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Title *</label>
                <input
                  type="text"
                  value={newFeature.title}
                  onChange={(e) => setNewFeature((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter feature title"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Description *</label>
                <textarea
                  value={newFeature.description}
                  onChange={(e) => setNewFeature((prev) => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  placeholder="Enter feature description"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (!confirmAction('Are you sure you want to cancel adding this feature?')) return;
                  setShowFeatureModal(false);
                }}
                className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={addFeature}
                disabled={!newFeature.title.trim() || !newFeature.description.trim()}
                className={`${primaryButton} disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                Add Feature
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0e2a33]">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Add New Pricing Plan</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Plan Name *</label>
                <input
                  type="text"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter plan name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Price *</label>
                <input
                  type="number"
                  value={newPlan.price}
                  onChange={(e) => setNewPlan((prev) => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter price"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Features (one per line)</label>
                <textarea
                  value={newPlan.features}
                  onChange={(e) => setNewPlan((prev) => ({ ...prev, features: e.target.value }))}
                  rows="4"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Max {MAX_PLAN_FEATURES} features</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="new-plan-popular"
                  type="checkbox"
                  checked={newPlan.popular}
                  onChange={(e) => setNewPlan((prev) => ({ ...prev, popular: e.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-cyan-400 focus:ring-cyan-400 dark:border-white/10"
                />
                <label htmlFor="new-plan-popular" className="text-sm text-slate-700 dark:text-slate-200">Mark as Popular</label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (!confirmAction('Are you sure you want to cancel adding this pricing plan?')) return;
                  setShowPlanModal(false);
                }}
                className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={addPricingPlan}
                disabled={!newPlan.name.trim()}
                className={`${primaryButton} disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                Add Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Field Modal */}
      {showFieldModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0e2a33]">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Add New Form Field</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Field Key *</label>
                <input
                  type="text"
                  value={newField.key}
                  onChange={(e) => setNewField((prev) => ({ ...prev, key: e.target.value.replace(/\s/g, '') }))}
                  placeholder="e.g. companyName"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Label *</label>
                <input
                  type="text"
                  value={newField.label}
                  onChange={(e) => setNewField((prev) => ({ ...prev, label: e.target.value }))}
                  placeholder="e.g. Company Name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Placeholder</label>
                <input
                  type="text"
                  value={newField.placeholder}
                  onChange={(e) => setNewField((prev) => ({ ...prev, placeholder: e.target.value }))}
                  placeholder="e.g. Enter your company name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Field Type</label>
                <select
                  value={newField.type}
                  onChange={(e) => setNewField((prev) => ({ ...prev, type: e.target.value }))}
                  className={inputClass}
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="tel">Phone</option>
                  <option value="number">Number</option>
                  <option value="textarea">Textarea</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="new-field-required"
                  type="checkbox"
                  checked={newField.required}
                  onChange={(e) => setNewField((prev) => ({ ...prev, required: e.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-cyan-400 focus:ring-cyan-400 dark:border-white/10"
                />
                <label htmlFor="new-field-required" className="text-sm text-slate-700 dark:text-slate-200">Required</label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (!confirmAction('Are you sure you want to cancel adding this field?')) return;
                  setShowFieldModal(false);
                }}
                className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={addDemoField}
                disabled={!newField.key.trim() || !newField.label.trim()}
                className={`${primaryButton} disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                Add Field
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
