import React, { useState, useMemo } from 'react';
import { Search, Plus, Eye, Trash2, Cog, CheckCircle, Clock, AlertTriangle, X, User, Wrench, FileText, Package } from 'lucide-react';

interface Equipment {
  id: number;
  category: string;
  equipment_id: string;
  name: string;
  status: 'available' | 'rented' | 'maintenance' | 'damaged';
  tech_manager: string;
  location: string;
  rented_to?: string;
  order_id?: string;
  status_change: string;
  service_interval: number;
  current_hours: number;
  last_service: string;
  notes: string;
  manufacturer: string;
  model: string;
  year: number;
  serial_number: string;
  rental_ready_checklist: string | null;
  equipment_service_list: string | null;
}

interface EquipmentManagementProps {
  onNavigateToAdd: () => void;
  onNavigateToEdit: (equipmentId: string) => void;
  onNavigateToView: (equipmentId: string) => void;
  onNavigateToPartsTemplates: () => void;
  onNavigateToPartsManagement: () => void;
}

const EquipmentManagement: React.FC<EquipmentManagementProps> = ({
  onNavigateToAdd,
  onNavigateToEdit,
  onNavigateToView,
  onNavigateToPartsTemplates,
  onNavigateToPartsManagement
}) => {
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: 1,
      category: 'Excavators',
      equipment_id: 'EXC-001',
      name: 'CAT 320 Excavator',
      status: 'available',
      tech_manager: 'Mike Johnson',
      location: 'Main Yard',
      status_change: '2025-06-05T14:30:00',
      service_interval: 250,
      current_hours: 180,
      last_service: '2025-05-15',
      notes: 'Recently serviced, ready for rental',
      manufacturer: 'Caterpillar',
      model: '320',
      year: 2022,
      serial_number: 'CAT320-2022-001',
      rental_ready_checklist: 'Heavy Equipment Check',
      equipment_service_list: 'Excavator Maintenance'
    },
    {
      id: 2,
      category: 'Generators',
      equipment_id: 'GEN-045',
      name: 'Honda 5000W Generator',
      status: 'rented',
      tech_manager: 'Sarah Williams',
      location: 'ABC Construction Co.',
      rented_to: 'John Smith',
      order_id: 'ORD-2025-001',
      status_change: '2025-06-03T09:15:00',
      service_interval: 100,
      current_hours: 85,
      last_service: '2025-05-20',
      notes: 'Out on rental until 06/10',
      manufacturer: 'Honda',
      model: 'EU5000i',
      year: 2023,
      serial_number: 'HON5000-2023-045',
      rental_ready_checklist: 'Generator Checklist',
      equipment_service_list: 'Generator Service'
    },
    {
      id: 3,
      category: 'Bulldozers',
      equipment_id: 'BUL-012',
      name: 'John Deere 650K Dozer',
      status: 'maintenance',
      tech_manager: 'Tom Rodriguez',
      location: 'Main Yard',
      status_change: '2025-06-04T16:45:00',
      service_interval: 300,
      current_hours: 295,
      last_service: '2025-04-10',
      notes: 'Scheduled maintenance - hydraulic system check',
      manufacturer: 'John Deere',
      model: '650K',
      year: 2021,
      serial_number: 'JD650K-2021-012',
      rental_ready_checklist: 'Heavy Equipment Check',
      equipment_service_list: 'Dozer Maintenance'
    },
    {
      id: 4,
      category: 'Loaders',
      equipment_id: 'LDR-023',
      name: 'CAT 950 Wheel Loader',
      status: 'damaged',
      tech_manager: 'Mike Johnson',
      location: 'North Branch',
      status_change: '2025-06-02T11:20:00',
      service_interval: 200,
      current_hours: 156,
      last_service: '2025-05-01',
      notes: 'Damage to left hydraulic cylinder - parts ordered',
      manufacturer: 'Caterpillar',
      model: '950',
      year: 2020,
      serial_number: 'CAT950-2020-023',
      rental_ready_checklist: null,
      equipment_service_list: 'Loader Service'
    },
    {
      id: 5,
      category: 'Compressors',
      equipment_id: 'CMP-078',
      name: 'Atlas Copco 185 CFM',
      status: 'available',
      tech_manager: 'Sarah Williams',
      location: 'South Branch',
      status_change: '2025-06-06T08:00:00',
      service_interval: 150,
      current_hours: 95,
      last_service: '2025-05-25',
      notes: 'Excellent condition',
      manufacturer: 'Atlas Copco',
      model: 'XAS 185',
      year: 2023,
      serial_number: 'AC185-2023-078',
      rental_ready_checklist: 'Compressor Check',
      equipment_service_list: null
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    serviceDue: '',
    rentalReady: '',
    equipService: ''
  });

  const categories = ['Excavators', 'Generators', 'Bulldozers', 'Loaders', 'Compressors'];

  const getServiceStatus = (item: Equipment) => {
    if (!item.service_interval || !item.current_hours) {
      return { icon: Cog, color: 'text-gray-400', text: 'N/A' };
    }

    const percentComplete = (item.current_hours % item.service_interval) / item.service_interval;

    if (percentComplete >= 1) {
      return { icon: AlertTriangle, color: 'text-red-500', text: 'Overdue' };
    } else if (percentComplete >= 0.8) {
      return { icon: Clock, color: 'text-yellow-500', text: 'Due Soon' };
    } else {
      return { icon: CheckCircle, color: 'text-green-500', text: 'Good' };
    }
  };

  const filteredEquipment = useMemo(() => {
    return equipment.filter(item => {
      const matchesSearch = !filters.search || 
        item.name.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = !filters.category || item.category === filters.category;
      const matchesStatus = !filters.status || item.status === filters.status;

      let matchesServiceDue = true;
      if (filters.serviceDue) {
        const serviceStatus = getServiceStatus(item);
        if (filters.serviceDue === 'due-soon') {
          matchesServiceDue = serviceStatus.text === 'Due Soon';
        } else if (filters.serviceDue === 'overdue') {
          matchesServiceDue = serviceStatus.text === 'Overdue';
        }
      }

      let matchesRentalReady = true;
      if (filters.rentalReady) {
        if (filters.rentalReady === 'assigned') {
          matchesRentalReady = !!item.rental_ready_checklist;
        } else if (filters.rentalReady === 'not-assigned') {
          matchesRentalReady = !item.rental_ready_checklist;
        }
      }

      let matchesEquipService = true;
      if (filters.equipService) {
        if (filters.equipService === 'assigned') {
          matchesEquipService = !!item.equipment_service_list;
        } else if (filters.equipService === 'not-assigned') {
          matchesEquipService = !item.equipment_service_list;
        }
      }

      return matchesSearch && matchesCategory && matchesStatus && matchesServiceDue && 
             matchesRentalReady && matchesEquipService;
    });
  }, [equipment, filters]);

  const stats = useMemo(() => {
    return equipment.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [equipment]);

  const getStatusColor = (status: string) => {
    const colors = {
      available: 'bg-green-100 text-green-800 border-green-200',
      rented: 'bg-blue-100 text-blue-800 border-blue-200',
      maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      damaged: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusText = (status: string) => {
    const texts = {
      available: 'Available',
      rented: 'Rented',
      maintenance: 'Maint. Hold',
      damaged: 'Damaged'
    };
    return texts[status] || status;
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true});
    return `${month} ${day} - ${time}`;
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', status: '', serviceDue: '', rentalReady: '', equipService: '' });
  };

  const handleDeleteEquipment = (equipmentId: number, equipmentName: string) => {
    if (window.confirm(`Are you sure you want to delete "${equipmentName}"? This action cannot be undone.`)) {
      setEquipment(prev => prev.filter(item => item.id !== equipmentId));
    }
  };

  const handleStatusClick = (equipmentId: string, equipmentName: string) => {
    alert(`Opening Rental Ready checklist for: ${equipmentName} (ID: ${equipmentId})`);
  };

  const handleOrderLink = (orderId: string) => {
    alert(`Navigating to Order: ${orderId}`);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 mb-2">
              <Wrench className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Equipment Management</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onNavigateToPartsTemplates}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Parts Templates</span>
              </button>
              <button
                onClick={onNavigateToPartsManagement}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <Package className="h-4 w-4" />
                <span>Parts Management</span>
              </button>
            </div>
          </div>
          <p className="text-gray-600">Manage equipment inventory, assignments, and maintenance schedules</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <button
            onClick={() => handleFilterChange('status', '')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.status === '' ? 'border-gray-400 bg-gray-50' : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total</p>
                <p className="text-2xl font-bold text-gray-700 mt-1">{equipment.length}</p>
              </div>
              <Wrench className="h-6 w-6 text-gray-600 opacity-80" />
            </div>
          </button>
          <button
            onClick={() => handleFilterChange('status', filters.status === 'available' ? '' : 'available')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.status === 'available' ? 'border-green-300 bg-green-50' : 'border-gray-100 hover:border-green-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Available</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.available || 0}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600 opacity-80" />
            </div>
          </button>
          <button
            onClick={() => handleFilterChange('status', filters.status === 'rented' ? '' : 'rented')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.status === 'rented' ? 'border-blue-300 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Rented</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.rented || 0}</p>
              </div>
              <User className="h-6 w-6 text-blue-600 opacity-80" />
            </div>
          </button>
          <button
            onClick={() => handleFilterChange('status', filters.status === 'maintenance' ? '' : 'maintenance')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.status === 'maintenance' ? 'border-yellow-300 bg-yellow-50' : 'border-gray-100 hover:border-yellow-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.maintenance || 0}</p>
              </div>
              <Wrench className="h-6 w-6 text-yellow-600 opacity-80" />
            </div>
          </button>
          <button
            onClick={() => handleFilterChange('status', filters.status === 'damaged' ? '' : 'damaged')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.status === 'damaged' ? 'border-red-300 bg-red-50' : 'border-gray-100 hover:border-red-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Damaged</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats.damaged || 0}</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-600 opacity-80" />
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
                  placeholder="Search by Equipment Name..."
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

              {/* Service Due Filter */}
              <select
                value={filters.serviceDue}
                onChange={(e) => handleFilterChange('serviceDue', e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[140px]"
              >
                <option value="">All Service</option>
                <option value="due-soon">Due Soon</option>
                <option value="overdue">Past Due</option>
              </select>

              {/* Rental Ready Filter */}
              <select
                value={filters.rentalReady}
                onChange={(e) => handleFilterChange('rentalReady', e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[140px]"
              >
                <option value="">All Rental Ready</option>
                <option value="assigned">Rental Ready Assigned</option>
                <option value="not-assigned">No Rental Ready</option>
              </select>

              {/* Equipment Service Filter */}
              <select
                value={filters.equipService}
                onChange={(e) => handleFilterChange('equipService', e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[140px]"
              >
                <option value="">All Equip. Service</option>
                <option value="assigned">Service Assigned</option>
                <option value="not-assigned">No Service</option>
              </select>

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

            {/* Add Equipment Button */}
            <button
              onClick={onNavigateToAdd}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Add Equipment</span>
            </button>
          </div>
        </div>

        {/* Equipment Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Equipment Name</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Equip. ID</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Tech/Mgt.</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Location</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Status Change</th>
                  <th className="text-left py-4 px-3 font-semibold text-gray-700">Rental Ready</th>
                  <th className="text-left py-4 px-3 font-semibold text-gray-700">Equip. Service</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Service Due</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEquipment.map((item) => {
                  const serviceStatus = getServiceStatus(item);
                  const ServiceIcon = serviceStatus.icon;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-gray-900">{item.category}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">{item.name}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-mono font-medium bg-gray-100 text-gray-800 border">
                          {item.equipment_id}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleStatusClick(item.equipment_id, item.name)}
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(item.status)}`}
                        >
                          {getStatusText(item.status)}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">{item.tech_manager}</span>
                      </td>
                      <td className="py-4 px-6">
                        {item.status === 'rented' && item.rented_to ? (
                          <button
                            onClick={() => handleOrderLink(item.order_id!)}
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                          >
                            {item.rented_to}
                          </button>
                        ) : (
                          <span className="text-sm text-gray-900">{item.location}</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-xs text-gray-600">{formatDateTime(item.status_change)}</span>
                      </td>
                      <td className="py-4 px-3">
                        <span className="text-sm text-gray-600" title={item.rental_ready_checklist || 'No checklist assigned'}>
                          {item.rental_ready_checklist 
                            ? (item.rental_ready_checklist.length > 16 
                                ? item.rental_ready_checklist.substring(0, 16) + '...' 
                                : item.rental_ready_checklist)
                            : '-'
                          }
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <span className="text-sm text-gray-600" title={item.equipment_service_list || 'No service list assigned'}>
                          {item.equipment_service_list 
                            ? (item.equipment_service_list.length > 16 
                                ? item.equipment_service_list.substring(0, 16) + '...' 
                                : item.equipment_service_list)
                            : '-'
                          }
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-1">
                          <ServiceIcon className={`h-3 w-3 ${serviceStatus.color}`} />
                          <span className={`text-xs font-medium ${serviceStatus.color}`}>
                            {serviceStatus.text}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => onNavigateToView(item.equipment_id)}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Equipment Details"
                          >
                            <Eye className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteEquipment(item.id, item.name)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Equipment"
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

          {filteredEquipment.length === 0 && (
            <div className="text-center py-12">
              <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No equipment found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or add new equipment.</p>
              <button
                onClick={onNavigateToAdd}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Equipment</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentManagement;