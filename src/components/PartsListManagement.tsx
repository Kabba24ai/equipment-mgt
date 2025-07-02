import React, { useState, useMemo } from 'react';
import { Search, Plus, Eye, Trash2, Package, Edit, X, ArrowLeft, Save, AlertCircle, DollarSign } from 'lucide-react';

// Master Parts List Component
const PartsManagement = ({ onCreatePart, onEditPart, onViewPart }) => {
  const [parts, setParts] = useState([
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
    },
    {
      id: 9,
      part_name: 'Custom Hydraulic Hose',
      category: 'Excavators',
      equipment_name: 'CAT 320D Excavator',
      equipment_id: 'EXC-001',
      part_number: 'CHH-2024-001',
      supplier: 'Parker Hannifin',
      unit_cost: 125.00,
      stock_level: 0,
      min_stock: 0,
      dni: true
    },
    {
      id: 12,
      part_name: 'Custom Wiring Harness',
      category: 'Compressors',
      equipment_name: 'Atlas Copco GA30',
      equipment_id: 'CMP-078',
      part_number: 'CWH-2024-004',
      supplier: 'Atlas Copco',
      unit_cost: 450.00,
      stock_level: 0,
      min_stock: 0,
      dni: true
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
      id: 8,
      part_name: 'Heavy Duty Cleaner',
      category: 'Supplies',
      equipment_name: 'General Use',
      equipment_id: 'N/A',
      part_number: 'CL-2024-007',
      supplier: 'Simple Green',
      unit_cost: 12.50,
      stock_level: 0,
      min_stock: 3,
      dni: false
    },
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
      id: 5,
      part_name: 'Hydraulic Pump Seal',
      category: 'Bulldozers',
      equipment_name: 'John Deere 650K Dozer',
      equipment_id: 'BUL-012',
      part_number: 'HS-2024-015',
      supplier: 'John Deere',
      unit_cost: 89.50,
      stock_level: 3,
      min_stock: 1,
      dni: false
    },
    {
      id: 7,
      part_name: 'Multi-Purpose Grease',
      category: 'Supplies',
      equipment_name: 'General Use',
      equipment_id: 'N/A',
      part_number: 'GR-2024-003',
      supplier: 'Mobil 1',
      unit_cost: 8.75,
      stock_level: 3,
      min_stock: 5,
      dni: false
    },
    {
      id: 11,
      part_name: 'Rebuilt Transmission',
      category: 'Loaders',
      equipment_name: 'CAT 950 Wheel Loader',
      equipment_id: 'LDR-023',
      part_number: 'RT-2024-003',
      supplier: 'Caterpillar Inc.',
      unit_cost: 8500.00,
      stock_level: 0,
      min_stock: 0,
      dni: true
    },
    {
      id: 6,
      part_name: 'Shop Towels',
      category: 'Supplies',
      equipment_name: 'General Use',
      equipment_id: 'N/A',
      part_number: 'ST-2024-001',
      supplier: 'Industrial Supply Co.',
      unit_cost: 24.99,
      stock_level: 15,
      min_stock: 10,
      dni: false
    },
    {
      id: 10,
      part_name: 'Specialty Engine Part',
      category: 'Generators',
      equipment_name: 'Kohler 150kW Generator',
      equipment_id: 'GEN-045',
      part_number: 'SEP-2024-002',
      supplier: 'Kohler Power',
      unit_cost: 750.00,
      stock_level: 0,
      min_stock: 0,
      dni: true
    },
    {
      id: 4,
      part_name: 'Transmission Filter',
      category: 'Loaders',
      equipment_name: 'CAT 950 Wheel Loader',
      equipment_id: 'LDR-023',
      part_number: 'TF-2024-008',
      supplier: 'Parker Hannifin',
      unit_cost: 32.75,
      stock_level: 0,
      min_stock: 2,
      dni: false
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    equipmentId: '',
    stockStatus: ''
  });

  const [showStockModal, setShowStockModal] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [newStockLevel, setNewStockLevel] = useState('');

  const categories = ['Bulldozers', 'Compressors', 'Excavators', 'Generators', 'Loaders', 'Supplies'];
  const equipmentOptions = [
    { id: 'CMP-078', name: 'Atlas Copco GA30' },
    { id: 'EXC-001', name: 'CAT 320D Excavator' },
    { id: 'LDR-023', name: 'CAT 950 Wheel Loader' },
    { id: 'BUL-013', name: 'CAT D6T Dozer' },
    { id: 'GEN-046', name: 'Cummins 200kW Generator' },
    { id: 'N/A', name: 'General Use (Supplies)' },
    { id: 'CMP-079', name: 'Ingersoll Rand R55' },
    { id: 'EXC-002', name: 'John Deere 350G Excavator' },
    { id: 'LDR-024', name: 'John Deere 644K Loader' },
    { id: 'BUL-012', name: 'John Deere 650K Dozer' },
    { id: 'GEN-045', name: 'Kohler 150kW Generator' }
  ];

  const getStockStatus = (part) => {
    if (part.dni) return 'dni';
    if (part.stock_level === 0) return 'out-of-stock';
    if (part.stock_level < part.min_stock) return 'buy-now';
    return 'in-stock';
  };

  const getStockBadge = (part) => {
    if (part.dni) {
      return {
        text: 'DNI',
        className: 'text-gray-700 bg-gray-100 border-gray-200'
      };
    }
    if (part.stock_level === 0) {
      return {
        text: 'Out of Stock',
        className: 'text-red-700 bg-red-100 border-red-200'
      };
    }
    if (part.stock_level < part.min_stock) {
      return {
        text: 'Buy Now',
        className: 'text-yellow-700 bg-yellow-100 border-yellow-200'
      };
    }
    return {
      text: 'In Stock',
      className: 'text-green-700 bg-green-100 border-green-200'
    };
  };

  const filteredParts = useMemo(() => {
    return parts.filter(part => {
      const matchesSearch = !filters.search ||
        part.part_name.toLowerCase().includes(filters.search.toLowerCase()) ||
        part.part_number.toLowerCase().includes(filters.search.toLowerCase()) ||
        part.equipment_name.toLowerCase().includes(filters.search.toLowerCase()) ||
        part.supplier.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = !filters.category || part.category === filters.category;
      const matchesEquipmentId = !filters.equipmentId || part.equipment_id === filters.equipmentId;

      let matchesStockStatus = true;
      if (filters.stockStatus) {
        const stockStatus = getStockStatus(part);
        matchesStockStatus = stockStatus === filters.stockStatus;
      }

      return matchesSearch && matchesCategory && matchesEquipmentId && matchesStockStatus;
    });
  }, [parts, filters]);

  const stats = useMemo(() => {
    return parts.reduce((acc, part) => {
      const stockStatus = getStockStatus(part);
      acc[stockStatus] = (acc[stockStatus] || 0) + 1;
      acc.total = (acc.total || 0) + 1;
      return acc;
    }, {});
  }, [parts]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', equipmentId: '', stockStatus: '' });
  };

  const handleStockClick = (part) => {
    if (part.dni) return;
    setEditingPart(part);
    setNewStockLevel(part.stock_level.toString());
    setShowStockModal(true);
  };

  const closeStockModal = () => {
    setShowStockModal(false);
    setEditingPart(null);
    setNewStockLevel('');
  };

  const updateStock = () => {
    if (editingPart && newStockLevel !== '') {
      const updatedStock = parseInt(newStockLevel, 10);
      if (!isNaN(updatedStock) && updatedStock >= 0) {
        setParts(prev => prev.map(part =>
          part.id === editingPart.id
            ? { ...part, stock_level: updatedStock }
            : part
        ));
        closeStockModal();
      }
    }
  };

  const handleViewPart = (partId) => {
    onViewPart?.(partId) || alert(`Navigating to Part Details for Part ID: ${partId}`);
  };

  const handleEditPart = (partId) => {
    onEditPart?.(partId) || alert(`Opening Edit Part form for Part ID: ${partId}`);
  };

  const handleDeletePart = (partId, partName) => {
    if (window.confirm(`Are you sure you want to delete "${partName}"? This action cannot be undone.`)) {
      setParts(prev => prev.filter(part => part.id !== partId));
      alert(`Part "${partName}" has been deleted.`);
    }
  };

  const handleCreatePart = () => {
    onCreatePart?.() || alert('Navigate to Create Part form');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Parts Management</h1>
          </div>
          <p className="text-gray-600">Manage parts inventory across all equipment</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <button
            onClick={() => handleFilterChange('stockStatus', '')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.stockStatus === '' ? 'border-gray-400 bg-gray-50' : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total</p>
                <p className="text-2xl font-bold text-gray-700 mt-1">{stats.total || 0}</p>
              </div>
              <Package className="h-6 w-6 text-gray-600 opacity-80" />
            </div>
          </button>

          <button
            onClick={() => handleFilterChange('stockStatus', filters.stockStatus === 'in-stock' ? '' : 'in-stock')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.stockStatus === 'in-stock' ? 'border-green-300 bg-green-50' : 'border-gray-100 hover:border-green-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">In Stock</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats['in-stock'] || 0}</p>
              </div>
              <Package className="h-6 w-6 text-green-600 opacity-80" />
            </div>
          </button>

          <button
            onClick={() => handleFilterChange('stockStatus', filters.stockStatus === 'buy-now' ? '' : 'buy-now')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.stockStatus === 'buy-now' ? 'border-yellow-300 bg-yellow-50' : 'border-gray-100 hover:border-yellow-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Buy Now</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats['buy-now'] || 0}</p>
              </div>
              <Package className="h-6 w-6 text-yellow-600 opacity-80" />
            </div>
          </button>

          <button
            onClick={() => handleFilterChange('stockStatus', filters.stockStatus === 'out-of-stock' ? '' : 'out-of-stock')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.stockStatus === 'out-of-stock' ? 'border-red-300 bg-red-50' : 'border-gray-100 hover:border-red-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats['out-of-stock'] || 0}</p>
              </div>
              <Package className="h-6 w-6 text-red-600 opacity-80" />
            </div>
          </button>

          <button
            onClick={() => handleFilterChange('stockStatus', filters.stockStatus === 'dni' ? '' : 'dni')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.stockStatus === 'dni' ? 'border-gray-400 bg-gray-50' : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">DNI</p>
                <p className="text-2xl font-bold text-gray-700 mt-1">{stats['dni'] || 0}</p>
              </div>
              <Package className="h-6 w-6 text-gray-600 opacity-80" />
            </div>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              {/* Search */}
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search parts, equipment, suppliers..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Category Filter */}
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[160px]"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Equipment Filter */}
              <select
                value={filters.equipmentId}
                onChange={(e) => handleFilterChange('equipmentId', e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[200px]"
              >
                <option value="">All Equipment</option>
                {equipmentOptions.map(equipment => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.name} - {equipment.id}
                  </option>
                ))}
              </select>

              {/* Quick Search Supplies Button */}
              <button
                onClick={() => handleFilterChange('category', filters.category === 'Supplies' ? '' : 'Supplies')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  filters.category === 'Supplies'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                Quick: Supplies
              </button>

              {/* Clear Filters */}
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

            {/* Add Part Button */}
            <button
              onClick={handleCreatePart}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Add Part</span>
            </button>
          </div>
        </div>

        {/* Parts Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Part Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Equipment Name</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Equipment ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Part Number</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Supplier</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Unit Cost</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Stock</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredParts.map((part) => {
                  const stockBadge = getStockBadge(part);
                  return (
                    <tr key={part.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-gray-900">{part.part_name}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">{part.category}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">{part.equipment_name}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-mono font-medium bg-gray-100 text-gray-800 border">
                          {part.equipment_id}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-mono text-gray-900">{part.part_number}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">{part.supplier}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-sm font-medium text-green-600">${part.unit_cost.toFixed(2)}</span>
                      </td>
                      <td className="py-3 px-3">
                        {part.dni ? (
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${stockBadge.className}`}>
                            {stockBadge.text}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleStockClick(part)}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity ${stockBadge.className}`}
                            title="Click to update stock level"
                          >
                            {stockBadge.text}
                          </button>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleViewPart(part.id)}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Part Details"
                          >
                            <Eye className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleEditPart(part.id)}
                            className="p-1 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Edit Part"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeletePart(part.id, part.part_name)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Part"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredParts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No parts found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or add new parts.</p>
              <button
                onClick={handleCreatePart}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Part</span>
              </button>
            </div>
          )}
        </div>

        {/* Stock Update Modal */}
        {showStockModal && editingPart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Update Stock</h2>
                <button
                  onClick={closeStockModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">{editingPart.part_name}</p>
                <p className="text-xs text-gray-500">{editingPart.part_number}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity on Hand
                </label>
                <input
                  type="number"
                  min="0"
                  value={newStockLevel}
                  onChange={(e) => setNewStockLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-medium"
                  placeholder="0"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum stock: {editingPart.min_stock}
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeStockModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={updateStock}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Part Detail Component
const PartDetail = ({ partId = null, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    part_name: '',
    equipment_id: '',
    current_stock: '',
    min_stock: '',
    dni: false,
    description: '',
    selected_template: '',
    part_number_1: '',
    cost_1: '',
    supplier_1: '',
    part_number_2: '',
    cost_2: '',
    supplier_2: '',
    part_number_3: '',
    cost_3: '',
    supplier_3: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const partsListTemplates = [
    { id: 1, name: 'Excavator Maintenance Template', category: 'Excavators' },
    { id: 2, name: 'Generator Standard Parts', category: 'Generators' },
    { id: 3, name: 'Compressor Maintenance Kit', category: 'Compressors' },
    { id: 4, name: 'Loader Basic Parts', category: 'Loaders' },
    { id: 5, name: 'Dozer Service Template', category: 'Bulldozers' },
    { id: 6, name: 'General Supplies Template', category: 'Supplies' }
  ];

  const suppliers = [
    {
      name: 'Caterpillar Inc.',
      address: '100 NE Adams St, Peoria, IL 61629',
      phone: '(309) 675-1000',
      contact: 'Mike Johnson',
      email: 'mike.johnson@cat.com'
    },
    {
      name: 'Parker Hannifin',
      address: '6035 Parkland Blvd, Cleveland, OH 44124',
      phone: '(216) 896-3000',
      contact: 'Sarah Williams',
      email: 'sarah.williams@parker.com'
    },
    {
      name: 'Kohler Power',
      address: '444 Highland Dr, Kohler, WI 53044',
      phone: '(920) 457-4441',
      contact: 'Tom Rodriguez',
      email: 'tom.rodriguez@kohler.com'
    },
    {
      name: 'Atlas Copco',
      address: '2200 Dagen Blvd, Rock Hill, SC 29730',
      phone: '(803) 817-7000',
      contact: 'Emma Davis',
      email: 'emma.davis@atlascopco.com'
    },
    {
      name: 'John Deere',
      address: '1 John Deere Pl, Moline, IL 61265',
      phone: '(309) 765-8000',
      contact: 'Robert Chen',
      email: 'robert.chen@johndeere.com'
    },
    {
      name: 'Industrial Supply Co.',
      address: '1500 Manufacturing Way, Detroit, MI 48201',
      phone: '(313) 555-0123',
      contact: 'Lisa Anderson',
      email: 'lisa.anderson@industrialsupply.com'
    }
  ];

  const equipmentOptions = [
    { id: 'N/A', name: 'General Use (Supplies)', category: 'Supplies' },
    { id: 'EXC-001', name: 'CAT 320D Excavator', category: 'Excavators' },
    { id: 'EXC-002', name: 'John Deere 350G Excavator', category: 'Excavators' },
    { id: 'GEN-045', name: 'Kohler 150kW Generator', category: 'Generators' },
    { id: 'GEN-046', name: 'Cummins 200kW Generator', category: 'Generators' },
    { id: 'BUL-012', name: 'John Deere 650K Dozer', category: 'Bulldozers' },
    { id: 'BUL-013', name: 'CAT D6T Dozer', category: 'Bulldozers' },
    { id: 'LDR-023', name: 'CAT 950 Wheel Loader', category: 'Loaders' },
    { id: 'LDR-024', name: 'John Deere 644K Loader', category: 'Loaders' },
    { id: 'CMP-078', name: 'Atlas Copco GA30', category: 'Compressors' },
    { id: 'CMP-079', name: 'Ingersoll Rand R55', category: 'Compressors' }
  ];

  const mockPartData = {
    id: 1,
    part_name: 'Hydraulic Filter',
    equipment_id: 'EXC-001',
    current_stock: '12',
    min_stock: '5',
    dni: false,
    description: 'High-quality hydraulic filter for heavy equipment operations',
    selected_template: 'Excavator Maintenance Template',
    part_number_1: 'CAT-HF-320-2024',
    cost_1: '45.99',
    supplier_1: 'Caterpillar Inc.',
    part_number_2: 'PH-HF-941',
    cost_2: '39.99',
    supplier_2: 'Parker Hannifin',
    part_number_3: '',
    cost_3: '',
    supplier_3: ''
  };

  React.useEffect(() => {
    if (partId) {
      setIsEdit(true);
      setLoading(true);
      setTimeout(() => {
        setFormData(mockPartData);
        setLoading(false);
      }, 500);
    }
  }, [partId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name === 'dni' && checked) {
      setFormData(prev => ({
        ...prev,
        current_stock: '',
        min_stock: '',
        dni: true
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.part_name.trim()) newErrors.part_name = 'Part name is required';
    if (!formData.equipment_id) newErrors.equipment_id = 'Equipment selection is required';

    if (!formData.dni) {
      if (formData.current_stock === '' || parseInt(formData.current_stock) < 0) newErrors.current_stock = 'Current stock must be 0 or greater';
      if (formData.min_stock === '' || parseInt(formData.min_stock) < 0) newErrors.min_stock = 'Minimum stock must be 0 or greater';
    }

    if (!formData.part_number_1.trim()) newErrors.part_number_1 = 'Primary part number is required';
    if (!formData.supplier_1) newErrors.supplier_1 = 'Primary supplier is required';
    // Removed cost validation - cost is now optional
    if (formData.cost_1 && parseFloat(formData.cost_1) < 0) newErrors.cost_1 = 'Cost cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      console.log('Saving part:', formData);
      onSave?.(formData);
      setLoading(false);
    }, 1000);
  };

  const getSelectedEquipment = () => {
    return equipmentOptions.find(eq => eq.id === formData.equipment_id);
  };

  const getSelectedSupplier = (supplierName) => {
    return suppliers.find(sup => sup.name === supplierName);
  };

  const getAvailableTemplates = () => {
    const selectedEquipment = getSelectedEquipment();
    if (!selectedEquipment) return [];

    return partsListTemplates.filter(template =>
      template.category === selectedEquipment.category
    );
  };

  const renderSupplierDetails = (supplierNumber) => {
    const supplierName = formData[`supplier_${supplierNumber}`];
    const supplier = getSelectedSupplier(supplierName);

    if (!supplier) {
      return (
        <div className="w-full px-2 py-2 bg-gray-50 border border-gray-200 rounded text-gray-500 text-xs text-center h-20 flex items-center justify-center">
          Select supplier to view details
        </div>
      );
    }

    return (
      <div className="w-full px-2 py-2 bg-blue-50 border border-blue-200 rounded text-xs">
        <div className="font-medium text-blue-900 mb-1">{supplier.name}</div>
        <div className="space-y-0.5 text-blue-800">
          <div className="truncate">{supplier.address}</div>
          <div>{supplier.phone}</div>
          <div>{supplier.contact}</div>
        </div>
      </div>
    );
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
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'Edit Part' : 'Create New Part'}
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            {isEdit ? 'Update part information with alternative suppliers' : 'Add a new part with up to 3 alternative suppliers'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            {/* Row 1: Part Name, Equipment, Category, Current Stock, Min Stock, DNI */}
            <div className="grid gap-4" style={{ gridTemplateColumns: 'calc(20% + 25px) calc(20% + 25px) calc(20% + 25px) calc(15% - 135px) calc(15% - 145px) 120px' }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Part Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="part_name"
                  value={formData.part_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.part_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter part name"
                />
                {errors.part_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.part_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment <span className="text-red-500">*</span>
                </label>
                <select
                  name="equipment_id"
                  value={formData.equipment_id}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.equipment_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select equipment</option>
                  {equipmentOptions.map(eq => (
                    <option key={eq.id} value={eq.id}>{eq.name} ({eq.id})</option>
                  ))}
                </select>
                {errors.equipment_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.equipment_id}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm">
                  {getSelectedEquipment()?.category || 'Select equipment first'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Stock {!formData.dni && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="current_stock"
                  value={formData.current_stock}
                  onChange={handleInputChange}
                  disabled={formData.dni}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    formData.dni ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
                  } ${
                    errors.current_stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={formData.dni ? 'N/A' : '0'}
                />
                {errors.current_stock && (
                  <p className="text-red-500 text-xs mt-1">{errors.current_stock}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Stock {!formData.dni && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="min_stock"
                  value={formData.min_stock}
                  onChange={handleInputChange}
                  disabled={formData.dni}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    formData.dni ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
                  } ${
                    errors.min_stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={formData.dni ? 'N/A' : '0'}
                />
                {errors.min_stock && (
                  <p className="text-red-500 text-xs mt-1">{errors.min_stock}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 whitespace-nowrap">Do Not Inventory</label>
                <div className="flex items-center h-10 px-3">
                  <input
                    type="checkbox"
                    name="dni"
                    checked={formData.dni}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    title="Do Not Inventory - Check if this part is ordered as needed only"
                  />
                </div>
              </div>
            </div>

            {/* Supplier/Part Number Sections */}
            <div className="grid grid-cols-3 gap-6" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
              {/* Primary Part/Supplier Box */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="space-y-4">
                  <div className="grid gap-3" style={{ gridTemplateColumns: '2.5fr 1fr' }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Part Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="part_number_1"
                        value={formData.part_number_1}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-sm bg-white ${
                          errors.part_number_1 ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Primary part number"
                      />
                      {errors.part_number_1 && (
                        <p className="text-red-500 text-xs mt-1">{errors.part_number_1}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cost
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1000000"
                          name="cost_1"
                          value={formData.cost_1}
                          onChange={handleInputChange}
                          className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white ${
                            errors.cost_1 ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.cost_1 && (
                        <p className="text-red-500 text-xs mt-1">{errors.cost_1}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Supplier <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="supplier_1"
                      value={formData.supplier_1}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white ${
                        errors.supplier_1 ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select primary supplier</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.name} value={supplier.name}>{supplier.name}</option>
                      ))}
                    </select>
                    {errors.supplier_1 && (
                      <p className="text-red-500 text-xs mt-1">{errors.supplier_1}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Details</label>
                    {renderSupplierDetails(1)}
                  </div>
                </div>
              </div>

              {/* Alternative 1 Part/Supplier Box */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="space-y-4">
                  <div className="grid gap-3" style={{ gridTemplateColumns: '2.5fr 1fr' }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alt 1 Part Number</label>
                      <input
                        type="text"
                        name="part_number_2"
                        value={formData.part_number_2}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-sm bg-white"
                        placeholder="Alternative part number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1000000"
                          name="cost_2"
                          value={formData.cost_2}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Supplier</label>
                    <select
                      name="supplier_2"
                      value={formData.supplier_2}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                    >
                      <option value="">Select alt supplier</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.name} value={supplier.name}>{supplier.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Details</label>
                    {renderSupplierDetails(2)}
                  </div>
                </div>
              </div>

              {/* Alternative 2 Part/Supplier Box */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="space-y-4">
                  <div className="grid gap-3" style={{ gridTemplateColumns: '2.5fr 1fr' }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alt 2 Part Number</label>
                      <input
                        type="text"
                        name="part_number_3"
                        value={formData.part_number_3}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-sm bg-white"
                        placeholder="Alternative part number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1000000"
                          name="cost_3"
                          value={formData.cost_3}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Supplier</label>
                    <select
                      name="supplier_3"
                      value={formData.supplier_3}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                    >
                      <option value="">Select alt supplier</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.name} value={supplier.name}>{supplier.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Details</label>
                    {renderSupplierDetails(3)}
                  </div>
                </div>
              </div>
            </div>

            {/* Description and Template */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter part description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add to Parts List Template
                </label>
                <select
                  name="selected_template"
                  value={formData.selected_template}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select template (optional)</option>
                  {getAvailableTemplates().map(template => (
                    <option key={template.id} value={template.name}>{template.name}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {getSelectedEquipment()
                    ? `Templates for ${getSelectedEquipment().category} category`
                    : 'Select equipment first to see available templates'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              {loading ? 'Saving...' : (isEdit ? 'Update Part' : 'Create Part')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PartsListManagementProps {
  onNavigateBack: () => void;
}

// Main App Component that switches between views
const PartsListManagement: React.FC<PartsListManagementProps> = ({ onNavigateBack }) => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
  const [editingPartId, setEditingPartId] = useState(null);

  const handleCreatePart = () => {
    setCurrentView('create');
    setEditingPartId(null);
  };

  const handleEditPart = (partId) => {
    setCurrentView('edit');
    setEditingPartId(partId);
  };

  const handleViewPart = (partId) => {
    // Could implement a view-only version of PartDetail
    alert(`Viewing part ${partId}`);
  };

  const handleBack = () => {
    if (currentView === 'list') {
      onNavigateBack();
    } else {
      setCurrentView('list');
      setEditingPartId(null);
    }
  };

  const handleSave = (partData) => {
    console.log('Saving part:', partData);
    // Here you would typically save to your backend
    alert(`Part ${editingPartId ? 'updated' : 'created'} successfully!`);
    setCurrentView('list');
    setEditingPartId(null);
  };

  if (currentView === 'create') {
    return (
      <PartDetail
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  if (currentView === 'edit') {
    return (
      <PartDetail
        partId={editingPartId}
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  return (
    <PartsManagement
      onCreatePart={handleCreatePart}
      onEditPart={handleEditPart}
      onViewPart={handleViewPart}
    />
  );
};

export default PartsListManagement;