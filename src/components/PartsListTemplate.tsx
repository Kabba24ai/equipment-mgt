import React, { useState, useMemo } from 'react';
import { Search, Plus, Eye, Trash2, Package, Edit, X, ArrowLeft, Save, DollarSign, FileText, Copy, GripVertical } from 'lucide-react';

// Mock parts data
const mockParts = [
  {
    id: 1,
    part_name: 'Hydraulic Filter',
    category: 'Excavators',
    equipment_name: 'CAT 320D Excavator',
    equipment_id: 'EXC-001',
    part_number: 'HF-2024-001',
    supplier: 'Caterpillar Inc.',
    unit_cost: 45.99,
    stock_level: 12,
    min_stock: 5,
    dni: false
  },
  {
    id: 2,
    part_name: 'Engine Oil Filter',
    category: 'Generators',
    equipment_name: 'Kohler 150kW Generator',
    equipment_id: 'GEN-045',
    part_number: 'OF-2024-005',
    supplier: 'Kohler Power',
    unit_cost: 28.50,
    stock_level: 8,
    min_stock: 3,
    dni: false
  },
  {
    id: 3,
    part_name: 'Air Filter Element',
    category: 'Compressors',
    equipment_name: 'Atlas Copco GA30',
    equipment_id: 'CMP-078',
    part_number: 'AF-2024-012',
    supplier: 'Atlas Copco',
    unit_cost: 67.25,
    stock_level: 4,
    min_stock: 2,
    dni: false
  }
];

interface PartsListTemplateProps {
  onNavigateBack: () => void;
}

// Template Management Component
const TemplateManagement: React.FC<{ onCreateTemplate: () => void; onEditTemplate: (id: number) => void }> = ({ onCreateTemplate, onEditTemplate }) => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Excavator Standard Maintenance',
      category: 'Excavators',
      description: 'Standard maintenance parts for all excavator models',
      parts_count: 12,
      created_date: '2024-01-15',
      last_modified: '2024-02-10',
      created_by: 'John Smith'
    },
    {
      id: 2,
      name: 'Generator Basic Service Kit',
      category: 'Generators',
      description: 'Essential service parts for generator maintenance',
      parts_count: 8,
      created_date: '2024-01-20',
      last_modified: '2024-02-05',
      created_by: 'Sarah Johnson'
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    category: ''
  });

  const categories = ['Bulldozers', 'Compressors', 'Excavators', 'Generators', 'Loaders', 'Supplies'];

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = !filters.search ||
        template.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        template.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = !filters.category || template.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }, [templates, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '' });
  };

  const handleDeleteTemplate = (templateId: number, templateName: string) => {
    if (window.confirm('Are you sure you want to delete "' + templateName + '"?')) {
      setTemplates(prev => prev.filter(template => template.id !== templateId));
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Parts List Templates</h1>
          </div>
          <p className="text-gray-600">Create and manage reusable parts lists for different equipment categories</p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                />
              </div>

              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white min-w-[160px]"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {Object.values(filters).some(v => v) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <button
              onClick={onCreateTemplate}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Create Template</span>
            </button>
          </div>
        </div>

        {/* Templates Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Template Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Parts Count</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Created By</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{template.name}</span>
                        <p className="text-xs text-gray-500 mt-1">Modified: {template.last_modified}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {template.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{template.description}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {template.parts_count} parts
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{template.created_by}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onEditTemplate && onEditTemplate(template.id)}
                          className="p-1 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Edit Template"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id, template.name)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Template"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a new template.</p>
              <button
                onClick={onCreateTemplate}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create Template</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Template Detail Component
const TemplateDetail: React.FC<{ templateId?: number | null; onBack: () => void; onSave: (data: any) => void }> = ({ templateId = null, onBack, onSave }) => {
  const [templateData, setTemplateData] = useState({
    name: '',
    category: '',
    description: ''
  });

  const [templateParts, setTemplateParts] = useState<any[]>([]);
  const [availableParts, setAvailableParts] = useState(mockParts);
  const [showAddPartsModal, setShowAddPartsModal] = useState(false);
  const [selectedParts, setSelectedParts] = useState<number[]>([]);
  const [partsFilter, setPartsFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const categories = ['Bulldozers', 'Compressors', 'Excavators', 'Generators', 'Loaders', 'Supplies'];

  const mockTemplateData = {
    name: 'Excavator Standard Maintenance',
    category: 'Excavators',
    description: 'Standard maintenance parts for all excavator models',
    parts: [
      { ...mockParts[0] },
      { ...mockParts[2] }
    ]
  };

  React.useEffect(() => {
    if (templateId) {
      setIsEdit(true);
      setLoading(true);
      setTimeout(() => {
        setTemplateData({
          name: mockTemplateData.name,
          category: mockTemplateData.category,
          description: mockTemplateData.description
        });
        setTemplateParts(mockTemplateData.parts);
        setLoading(false);
      }, 500);
    }
  }, [templateId]);

  const handleTemplateDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const newValue = type === 'checkbox' ? checked : value;

    setTemplateData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const filteredAvailableParts = useMemo(() => {
    return availableParts.filter(part => {
      const matchesSearch = !partsFilter ||
        part.part_name.toLowerCase().includes(partsFilter.toLowerCase()) ||
        part.part_number.toLowerCase().includes(partsFilter.toLowerCase());

      const matchesCategory = !categoryFilter || part.category === categoryFilter;

      const notInTemplate = !templateParts.find(tp => tp.id === part.id);

      return matchesSearch && matchesCategory && notInTemplate;
    });
  }, [availableParts, partsFilter, categoryFilter, templateParts]);

  const handleAddPartsToTemplate = () => {
    const partsToAdd = selectedParts.map(partId => {
      const part = availableParts.find(p => p.id === partId);
      return { ...part };
    });

    setTemplateParts(prev => [...prev, ...partsToAdd]);
    setSelectedParts([]);
    setShowAddPartsModal(false);
    setPartsFilter('');
    setCategoryFilter('');
  };

  const handleRemovePartFromTemplate = (partId: number) => {
    setTemplateParts(prev => prev.filter(part => part.id !== partId));
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    const draggedPart = templateParts[draggedItem];
    const newParts = [...templateParts];
    
    // Remove the dragged item
    newParts.splice(draggedItem, 1);
    
    // Insert at new position
    newParts.splice(dropIndex, 0, draggedPart);
    
    setTemplateParts(newParts);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handlePartSelection = (partId: number) => {
    setSelectedParts(prev => {
      if (prev.includes(partId)) {
        return prev.filter(id => id !== partId);
      } else {
        return [...prev, partId];
      }
    });
  };

  const validateTemplate = () => {
    const newErrors: Record<string, string> = {};

    if (!templateData.name.trim()) newErrors.name = 'Template name is required';
    if (!templateData.category) newErrors.category = 'Category selection is required';
    if (templateParts.length === 0) newErrors.parts = 'At least one part must be added to the template';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveTemplate = () => {
    if (!validateTemplate()) return;

    setLoading(true);
    setTimeout(() => {
      const templateToSave = {
        ...templateData,
        parts: templateParts,
        parts_count: templateParts.length
      };
      console.log('Saving template:', templateToSave);
      onSave && onSave(templateToSave);
      setLoading(false);
    }, 1000);
  };

  if (loading && isEdit) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={onBack}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <FileText className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'Edit Template' : 'Create New Template'}
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            {isEdit ? 'Update template information and manage parts list' : 'Create a reusable parts list template for equipment maintenance'}
          </p>
        </div>

        {/* Template Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Template Information</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={templateData.name}
                onChange={handleTemplateDataChange}
                className={'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ' + 
                  (errors.name ? 'border-red-500' : 'border-gray-300')}
                placeholder="Enter template name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={templateData.category}
                onChange={handleTemplateDataChange}
                className={'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ' + 
                  (errors.category ? 'border-red-500' : 'border-gray-300')}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={templateData.description}
              onChange={handleTemplateDataChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="Enter template description"
            />
          </div>
        </div>

        {/* Parts Management */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Template Parts</h2>
              <p className="text-sm text-gray-600">Parts included in this template ({templateParts.length} parts)</p>
            </div>
            <button
              onClick={() => setShowAddPartsModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Parts</span>
            </button>
          </div>

          {errors.parts && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{errors.parts}</p>
            </div>
          )}

          {templateParts.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No parts added yet</h3>
              <p className="text-gray-600 mb-4">Add parts to this template.</p>
              <button
                onClick={() => setShowAddPartsModal(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Parts</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 w-8"></th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Part Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Part Number</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Unit Cost</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {templateParts.map((part, index) => (
                    <tr 
                      key={part.id} 
                      className={`transition-colors ${
                        draggedItem === index ? 'opacity-50' : 'hover:bg-gray-50'
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <td className="py-3 px-4">
                        <div className="cursor-move text-gray-400 hover:text-gray-600">
                          <GripVertical className="h-4 w-4" />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-900">{part.part_name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-mono text-gray-700">{part.part_number}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {part.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-green-600">${part.unit_cost.toFixed(2)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleRemovePartFromTemplate(part.id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from template"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
          <button
            onClick={handleSaveTemplate}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : (isEdit ? 'Update Template' : 'Create Template')}
          </button>
        </div>

        {/* Add Parts Modal */}
        {showAddPartsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Add Parts to Template</h2>
                <button
                  onClick={() => {
                    setShowAddPartsModal(false);
                    setSelectedParts([]);
                    setPartsFilter('');
                    setCategoryFilter('');
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search parts..."
                      value={partsFilter}
                      onChange={(e) => setPartsFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white min-w-[160px]"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                {selectedParts.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">{selectedParts.length} parts selected</p>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {filteredAvailableParts.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No parts available to add.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredAvailableParts.map(part => (
                      <div
                        key={part.id}
                        className={'border rounded-lg p-4 cursor-pointer transition-colors ' + 
                          (selectedParts.includes(part.id)
                            ? 'border-purple-300 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300')}
                        onClick={() => handlePartSelection(part.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedParts.includes(part.id)}
                            onChange={() => handlePartSelection(part.id)}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">{part.part_name}</h3>
                                <p className="text-xs text-gray-500">{part.part_number} • {part.supplier}</p>
                              </div>
                              <div className="text-right">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {part.category}
                                </span>
                                <p className="text-sm font-medium text-green-600 mt-1">${part.unit_cost.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowAddPartsModal(false);
                    setSelectedParts([]);
                    setPartsFilter('');
                    setCategoryFilter('');
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPartsToTemplate}
                  disabled={selectedParts.length === 0}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg transition-colors"
                >
                  Add {selectedParts.length} Part{selectedParts.length !== 1 ? 's' : ''} to Template
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const PartsListTemplate: React.FC<PartsListTemplateProps> = ({ onNavigateBack }) => {
  const [currentView, setCurrentView] = useState('list');
  const [editingTemplateId, setEditingTemplateId] = useState<number | null>(null);

  const handleCreateTemplate = () => {
    setCurrentView('create');
    setEditingTemplateId(null);
  };

  const handleEditTemplate = (templateId: number) => {
    setCurrentView('edit');
    setEditingTemplateId(templateId);
  };

  const handleBack = () => {
    if (currentView === 'list') {
      onNavigateBack();
    } else {
      setCurrentView('list');
      setEditingTemplateId(null);
    }
  };

  const handleSave = (templateData: any) => {
    console.log('Saving template:', templateData);
    alert('Template ' + (editingTemplateId ? 'updated' : 'created') + ' successfully!');
    setCurrentView('list');
    setEditingTemplateId(null);
  };

  if (currentView === 'create') {
    return (
      <TemplateDetail
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  if (currentView === 'edit') {
    return (
      <TemplateDetail
        templateId={editingTemplateId}
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  return (
    <TemplateManagement
      onCreateTemplate={handleCreateTemplate}
      onEditTemplate={handleEditTemplate}
    />
  );
};

export default PartsListTemplate;