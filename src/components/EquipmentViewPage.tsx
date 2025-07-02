import React, { useState } from 'react';
import { ArrowLeft, Edit, Plus, Edit2, Trash2, Settings } from 'lucide-react';

interface EquipmentViewPageProps {
  equipmentId: string;
  onNavigateBack: () => void;
  onNavigateToEdit: () => void;
}

interface Alternative {
  id: string;
  part_number: string;
  brand: string;
  supplier: string;
  contact_name: string;
  supplier_phone: string;
  supplier_address: string;
  website: string;
}

interface Part {
  id: number;
  part_description: string;
  alternatives: Alternative[];
}

const EquipmentViewPage: React.FC<EquipmentViewPageProps> = ({
  equipmentId,
  onNavigateBack,
  onNavigateToEdit
}) => {
  // Sample equipment data
  const equipment = {
    equipment_name: 'CAT 320 Excavator',
    category: 'Excavators',
    equipment_id: 'EXC-001',
    brand: 'Caterpillar',
    model: '320',
    model_year: 2022,
    date_acquired: '2023-01-15',
    cost: 125000.00,
    ownership_type: 'financed',
    finance_company: 'CAT Financial',
    term: 60,
    rate: 4.25,
    monthly_payment: 2450.00,
    vin: '1FDWF36P04EB12345',
    serial_number: 'CAT320-2022-001',
    plate: 'EXC-001',
    imei: '123456789012345',
    rental_ready_checklist: 'Heavy Equipment Check',
    equipment_service_list: 'Excavator Maintenance',
    equipment_notes: 'Recently serviced, ready for rental. New hydraulic system installed.',
    status: 'available',
    tech_manager: 'Mike Johnson',
    location: 'Main Yard',
    last_order_id: 'ORD-2025-0847'
  };

  // Sample parts data with alternative part numbers
  const [partsList, setPartsList] = useState<Part[]>([
    {
      id: 1,
      part_description: 'Engine Air Filter',
      alternatives: [
        {
          id: 'alt-1-1',
          part_number: 'AF25308',
          brand: 'Fleetguard',
          supplier: 'CAT Parts Direct',
          contact_name: 'John Smith',
          supplier_phone: '(555) 123-4567',
          supplier_address: '123 Industrial Blvd, Detroit, MI 48201',
          website: 'www.catpartsdirect.com'
        },
        {
          id: 'alt-1-2',
          part_number: 'A3134',
          brand: 'Donaldson',
          supplier: 'Heavy Equipment Supply',
          contact_name: 'Sarah Wilson',
          supplier_phone: '(555) 987-6543',
          supplier_address: '456 Parts Ave, Chicago, IL 60601',
          website: 'www.heavyequipmentsupply.com'
        }
      ]
    },
    {
      id: 2,
      part_description: 'Hydraulic Oil Filter',
      alternatives: [
        {
          id: 'alt-2-1',
          part_number: 'HF6553',
          brand: 'Fleetguard',
          supplier: 'CAT Parts Direct',
          contact_name: 'John Smith',
          supplier_phone: '(555) 123-4567',
          supplier_address: '123 Industrial Blvd, Detroit, MI 48201',
          website: 'www.catpartsdirect.com'
        }
      ]
    }
  ]);

  const [showAddPartModal, setShowAddPartModal] = useState(false);
  const [activeTab, setActiveTab] = useState('rental-ready');

  const handleDeleteAlternative = (partId: number, alternativeId: string) => {
    setPartsList(prevParts => 
      prevParts.map(part => {
        if (part.id === partId) {
          const newAlternatives = part.alternatives.filter(alt => alt.id !== alternativeId);
          
          if (newAlternatives.length === 0) {
            return null;
          }
          
          return { ...part, alternatives: newAlternatives };
        }
        return part;
      }).filter(Boolean) as Part[]
    );
  };

  const handleEditAlternative = (partId: number, alternativeId: string) => {
    alert(`Edit alternative ${alternativeId} for part ${partId}`);
  };

  const handleOrderClick = (orderId: string) => {
    alert(`Navigating to Order: ${orderId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onNavigateBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Equipment</span>
              </button>

              <div className="h-6 border-l border-gray-300"></div>

              <div>
                <div className="flex items-center space-x-4 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{equipment.equipment_name}</h1>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                    equipment.status === 'available' ? 'bg-green-100 text-green-800 border-green-200' :
                    equipment.status === 'rented' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    equipment.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Equipment ID: {equipment.equipment_id}</span>
                  <span>•</span>
                  <span>{equipment.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={onNavigateToEdit}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Equipment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="max-w-full">
            {/* Compact Equipment Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
              <div className="grid grid-cols-4 gap-x-12 gap-y-3 text-sm">
                {/* Column 1: Basic Equipment Info */}
                <div>
                  <span className="font-medium text-gray-900">Brand:</span>
                  <span className="ml-2 text-gray-700">{equipment.brand}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Tech Manager:</span>
                  <span className="ml-2 text-gray-700">{equipment.tech_manager}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Location:</span>
                  <span className="ml-2 text-gray-700">{equipment.location}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Serial:</span>
                  <span className="ml-2 text-gray-700 font-mono text-xs">{equipment.serial_number}</span>
                </div>

                {/* Row 2 */}
                <div>
                  <span className="font-medium text-gray-900">Model:</span>
                  <span className="ml-2 text-gray-700">{equipment.model}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Service List:</span>
                  <span className="ml-2 text-gray-700">{equipment.equipment_service_list}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">IMEI:</span>
                  <span className="ml-2 text-gray-700 font-mono text-xs">{equipment.imei}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">VIN:</span>
                  <span className="ml-2 text-gray-700 font-mono text-xs">{equipment.vin}</span>
                </div>

                {/* Row 3 */}
                <div>
                  <span className="font-medium text-gray-900">Year:</span>
                  <span className="ml-2 text-gray-700">{equipment.model_year}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Rental Ready:</span>
                  <span className="ml-2 text-gray-700">{equipment.rental_ready_checklist}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Last Order:</span>
                  {equipment.last_order_id ? (
                    <button
                      onClick={() => handleOrderClick(equipment.last_order_id)}
                      className="ml-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
                    >
                      {equipment.last_order_id}
                    </button>
                  ) : (
                    <span className="ml-2 text-gray-700">-</span>
                  )}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Plate:</span>
                  <span className="ml-2 text-gray-700">{equipment.plate}</span>
                </div>
              </div>

              {/* Notes - Full Width */}
              {equipment.equipment_notes && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <span className="font-medium text-gray-900">Notes:</span>
                  <p className="mt-1 text-sm text-gray-700">{equipment.equipment_notes}</p>
                </div>
              )}
            </div>

            {/* Tab Navigation */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <button
                onClick={() => setActiveTab('rental-ready')}
                className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
                  activeTab === 'rental-ready' ? 'border-blue-300 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                <div className="text-center">
                  <p className={`text-sm font-medium uppercase tracking-wide ${
                    activeTab === 'rental-ready' ? 'text-blue-700' : 'text-gray-600'
                  }`}>Rental Ready</p>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('customer-checklist')}
                className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
                  activeTab === 'customer-checklist' ? 'border-green-300 bg-green-50' : 'border-gray-100 hover:border-green-200'
                }`}
              >
                <div className="text-center">
                  <p className={`text-sm font-medium uppercase tracking-wide ${
                    activeTab === 'customer-checklist' ? 'text-green-700' : 'text-gray-600'
                  }`}>Customer Checklist</p>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('equipment-parts')}
                className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
                  activeTab === 'equipment-parts' ? 'border-purple-300 bg-purple-50' : 'border-gray-100 hover:border-purple-200'
                }`}
              >
                <div className="text-center">
                  <p className={`text-sm font-medium uppercase tracking-wide ${
                    activeTab === 'equipment-parts' ? 'text-purple-700' : 'text-gray-600'
                  }`}>Equipment Parts List</p>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('service-schedule')}
                className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
                  activeTab === 'service-schedule' ? 'border-orange-300 bg-orange-50' : 'border-gray-100 hover:border-orange-200'
                }`}
              >
                <div className="text-center">
                  <p className={`text-sm font-medium uppercase tracking-wide ${
                    activeTab === 'service-schedule' ? 'text-orange-700' : 'text-gray-600'
                  }`}>Service Schedule</p>
                </div>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'rental-ready' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Rental Ready Checklist</h3>
                  <p className="text-gray-600 mb-4">
                    Inspection criteria and checklist system to ensure equipment is ready for rental.
                  </p>
                  <p className="text-sm text-gray-500">
                    This module will be implemented to manage pre-rental inspections, safety checks, and equipment readiness verification.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'customer-checklist' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Checklist</h3>
                  <p className="text-gray-600 mb-4">
                    Checklist system for equipment delivery and return processes with customers.
                  </p>
                  <p className="text-sm text-gray-500">
                    This module will be implemented to manage customer handoff procedures, condition documentation, and return inspections.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'service-schedule' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Schedule</h3>
                  <p className="text-gray-600 mb-4">
                    Track service schedules, maintenance intervals, and completion status for equipment.
                  </p>
                  <p className="text-sm text-gray-500">
                    This module will be implemented to manage preventive maintenance, service history, and scheduling of upcoming maintenance tasks.
                  </p>
                </div>
              </div>
            )}

            {/* Equipment Parts List Section */}
            {activeTab === 'equipment-parts' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Equipment Parts List</h3>
                  </div>
                  <button
                    onClick={() => setShowAddPartModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Part</span>
                  </button>
                </div>

                {partsList.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Part Description</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Part Number</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Brand</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Supplier</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Contact</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Phone</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Website</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Address</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {partsList.map((part) => (
                          <React.Fragment key={part.id}>
                            {/* Main part row */}
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="py-2 px-3 font-medium text-gray-900 text-sm">
                                {part.part_description}
                              </td>
                              <td className="py-2 px-3 text-sm text-gray-900 font-mono">
                                {part.alternatives[0].part_number}
                              </td>
                              <td className="py-2 px-3 text-sm text-gray-900">
                                {part.alternatives[0].brand}
                              </td>
                              <td className="py-2 px-3 text-sm text-gray-900">
                                {part.alternatives[0].supplier}
                              </td>
                              <td className="py-2 px-3 text-sm text-gray-900">
                                {part.alternatives[0].contact_name}
                              </td>
                              <td className="py-2 px-3 text-sm text-gray-900">
                                {part.alternatives[0].supplier_phone}
                              </td>
                              <td className="py-2 px-3 text-sm text-blue-600 hover:text-blue-800">
                                <a href={`https://${part.alternatives[0].website}`} target="_blank" rel="noopener noreferrer">
                                  {part.alternatives[0].website}
                                </a>
                              </td>
                              <td className="py-2 px-3 text-sm text-gray-700">
                                {part.alternatives[0].supplier_address}
                              </td>
                              <td className="py-2 px-3">
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => handleEditAlternative(part.id, part.alternatives[0].id)}
                                    className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                    title="Edit"
                                  >
                                    <Edit2 className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAlternative(part.id, part.alternatives[0].id)}
                                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            
                            {/* Alternative part rows (indented) */}
                            {part.alternatives.slice(1).map((alternative, index) => (
                              <tr key={`${part.id}-alt-${index}`} className="hover:bg-gray-50 transition-colors bg-gray-25">
                                <td className="py-1 px-3 pl-6">
                                  <span className="text-xs text-gray-400 italic">— Alternative</span>
                                </td>
                                <td className="py-1 px-3 text-sm text-gray-900 font-mono">
                                  {alternative.part_number}
                                </td>
                                <td className="py-1 px-3 text-sm text-gray-900">
                                  {alternative.brand}
                                </td>
                                <td className="py-1 px-3 text-sm text-gray-900">
                                  {alternative.supplier}
                                </td>
                                <td className="py-1 px-3 text-sm text-gray-900">
                                  {alternative.contact_name}
                                </td>
                                <td className="py-1 px-3 text-sm text-gray-900">
                                  {alternative.supplier_phone}
                                </td>
                                <td className="py-1 px-3 text-sm text-blue-600 hover:text-blue-800">
                                  <a href={`https://${alternative.website}`} target="_blank" rel="noopener noreferrer">
                                    {alternative.website}
                                  </a>
                                </td>
                                <td className="py-1 px-3 text-sm text-gray-700">
                                  {alternative.supplier_address}
                                </td>
                                <td className="py-1 px-3">
                                  <div className="flex items-center space-x-1">
                                    <button
                                      onClick={() => handleEditAlternative(part.id, alternative.id)}
                                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                      title="Edit"
                                    >
                                      <Edit2 className="h-3 w-3" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteAlternative(part.id, alternative.id)}
                                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No Parts Listed</h4>
                    <p className="text-gray-600 mb-4">This equipment doesn't have any parts in the system yet.</p>
                    <button
                      onClick={() => setShowAddPartModal(true)}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add First Part</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Part Modal Placeholder */}
      {showAddPartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add Equipment Part</h2>
              <button
                onClick={() => setShowAddPartModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-4">Parts management form will be implemented here.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddPartModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddPartModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save Part
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentViewPage;