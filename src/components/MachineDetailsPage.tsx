import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, AlertCircle, CheckCircle, Wrench, DollarSign, Hash, Truck, Smartphone, FileText } from 'lucide-react';

interface MachineDetailsPageProps {
  isEdit: boolean;
  equipmentId: string | null;
  onNavigateBack: () => void;
}

interface FormData {
  equipment_name: string;
  category: string;
  equipment_id: string;
  equipment_hours: string;
  brand: string;
  model: string;
  model_year: string;
  date_acquired: string;
  cost: string;
  ownership_type: string;
  finance_company: string;
  term: string;
  rate: string;
  monthly_payment: string;
  equipment_notes: string;
  vin: string;
  serial_number: string;
  plate: string;
  imei: string;
  rental_ready_checklist: string;
  equipment_service_list: string;
  power_source: string;
  has_def: boolean;
  diesel_gallons: string;
  def_gallons: string;
  gas_gallons: string;
  battery_type: string;
  standard_battery_count: string;
  expanded_battery_count: string;
}

const MachineDetailsPage: React.FC<MachineDetailsPageProps> = ({
  isEdit,
  equipmentId,
  onNavigateBack
}) => {
  const [isEditMode, setIsEditMode] = useState(!isEdit);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    equipment_name: '',
    category: '',
    equipment_id: '',
    equipment_hours: '',
    brand: '',
    model: '',
    model_year: '',
    date_acquired: '',
    cost: '',
    ownership_type: '',
    finance_company: '',
    term: '',
    rate: '',
    monthly_payment: '',
    equipment_notes: '',
    vin: '',
    serial_number: '',
    plate: '',
    imei: '',
    rental_ready_checklist: '',
    equipment_service_list: '',
    power_source: '',
    has_def: false,
    diesel_gallons: '',
    def_gallons: '',
    gas_gallons: '',
    battery_type: '',
    standard_battery_count: '',
    expanded_battery_count: ''
  });

  const categories = [
    'Excavators',
    'Bulldozers',
    'Loaders',
    'Generators',
    'Compressors',
    'Trucks',
    'Trailers',
    'Concrete Equipment',
    'Lifting Equipment',
    'Hand Tools'
  ];

  useEffect(() => {
    if (isEdit && equipmentId) {
      // In a real app, this would fetch from an API
      // For now, simulate loading existing equipment data
      setFormData({
        equipment_name: 'CAT 320 Excavator',
        category: 'Excavators',
        equipment_id: 'EXC-001',
        equipment_hours: '180',
        brand: 'Caterpillar',
        model: '320',
        model_year: '2022',
        date_acquired: '2023-01-15',
        cost: '125000',
        ownership_type: 'financed',
        finance_company: 'CAT Financial',
        term: '60',
        rate: '4.25',
        monthly_payment: '2450',
        equipment_notes: 'Recently serviced, ready for rental. New hydraulic system installed.',
        vin: '1FDWF36P04EB12345',
        serial_number: 'CAT320-2022-001',
        plate: 'EXC-001',
        imei: '123456789012345',
        rental_ready_checklist: 'Heavy Equipment Check',
        equipment_service_list: 'Excavator Maintenance',
        power_source: 'diesel',
        has_def: true,
        diesel_gallons: '50',
        def_gallons: '5',
        gas_gallons: '',
        battery_type: '',
        standard_battery_count: '',
        expanded_battery_count: ''
      });
    }
  }, [isEdit, equipmentId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.equipment_name.trim()) {
      newErrors.equipment_name = 'Equipment name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.equipment_id.trim()) {
      newErrors.equipment_id = 'Equipment ID is required';
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }

    if (formData.model_year && (parseInt(formData.model_year) < 1900 || parseInt(formData.model_year) > new Date().getFullYear() + 1)) {
      newErrors.model_year = 'Please enter a valid year';
    }

    if (formData.cost && isNaN(parseFloat(formData.cost))) {
      newErrors.cost = 'Please enter a valid cost';
    }

    if (formData.equipment_hours && (isNaN(parseFloat(formData.equipment_hours)) || parseFloat(formData.equipment_hours) < 0)) {
      newErrors.equipment_hours = 'Please enter valid equipment hours';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    console.log('Saving equipment:', formData);

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const toggleViewMode = () => {
    setIsEditMode(!isEditMode);
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
                <h1 className="text-2xl font-bold text-gray-900">
                  {!isEdit ? 'Add New Equipment' : 'Equipment Details'}
                </h1>
                <p className="text-sm text-gray-600">
                  {isEditMode ? 'Create or edit equipment information' : 'View equipment details'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {isEdit && (
                <button
                  onClick={toggleViewMode}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  {isEditMode ? 'Switch to View' : 'Switch to Edit'}
                </button>
              )}

              {isEditMode && (
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>{!isEdit ? 'Create Equipment' : 'Save Changes'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Equipment {!isEdit ? 'created' : 'updated'} successfully!
            </span>
          </div>
        )}

        {/* Main Content */}
        <div className="p-6">
          {isEditMode ? (
            <div className="max-w-5xl">
              {/* 2x2 Grid Layout for all 4 sections */}
              <div className="grid grid-cols-2 gap-6">

                {/* Top Left - Basic Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Row 1 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Equipment Name *
                      </label>
                      <input
                        type="text"
                        name="equipment_name"
                        value={formData.equipment_name}
                        onChange={handleInputChange}
                        placeholder="CAT 320 Excavator"
                        style={{ maxWidth: '200px' }}
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.equipment_name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {errors.equipment_name && (
                        <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.equipment_name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        style={{ maxWidth: '200px' }}
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white ${
                          errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.category}</span>
                        </p>
                      )}
                    </div>

                    {/* Row 2 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Equipment Hours
                      </label>
                      <input
                        type="number"
                        name="equipment_hours"
                        value={formData.equipment_hours}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        step="0.1"
                        style={{ maxWidth: '200px' }}
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.equipment_hours ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {errors.equipment_hours && (
                        <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.equipment_hours}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Equipment ID *
                      </label>
                      <input
                        type="text"
                        name="equipment_id"
                        value={formData.equipment_id}
                        onChange={handleInputChange}
                        placeholder="EXC-001"
                        style={{ maxWidth: '200px' }}
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.equipment_id ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {errors.equipment_id && (
                        <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.equipment_id}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Top Right - Equipment Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center space-x-2 mb-4">
                    <Truck className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-900">Equipment Details</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brand *
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Caterpillar"
                        style={{ maxWidth: '200px' }}
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.brand ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {errors.brand && (
                        <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.brand}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        placeholder="320"
                        style={{ maxWidth: '200px' }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model Year
                      </label>
                      <input
                        type="number"
                        name="model_year"
                        value={formData.model_year}
                        onChange={handleInputChange}
                        placeholder="2023"
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        style={{ maxWidth: '200px' }}
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.model_year ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {errors.model_year && (
                        <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.model_year}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Acquired
                      </label>
                      <input
                        type="date"
                        name="date_acquired"
                        value={formData.date_acquired}
                        onChange={handleInputChange}
                        style={{ maxWidth: '200px' }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Left - Financial & Legal */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center space-x-2 mb-4">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                    <h3 className="text-lg font-bold text-gray-900">Financial & Legal</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Purchase Cost
                      </label>
                      <div className="relative" style={{ maxWidth: '200px' }}>
                        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          name="cost"
                          value={formData.cost}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className={`w-full pl-8 pr-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.cost ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.cost && (
                        <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.cost}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ownership Type
                      </label>
                      <select
                        name="ownership_type"
                        value={formData.ownership_type}
                        onChange={handleInputChange}
                        style={{ maxWidth: '200px' }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                      >
                        <option value="">Select</option>
                        <option value="owned">Owned</option>
                        <option value="financed">Financed</option>
                        <option value="leased">Leased</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Finance Company
                      </label>
                      <input
                        type="text"
                        name="finance_company"
                        value={formData.finance_company}
                        onChange={handleInputChange}
                        placeholder="Bank/Lender"
                        style={{ maxWidth: '200px' }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Term (Months)
                      </label>
                      <input
                        type="number"
                        name="term"
                        value={formData.term}
                        onChange={handleInputChange}
                        placeholder="60"
                        min="1"
                        style={{ maxWidth: '200px' }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Interest Rate (%)
                      </label>
                      <input
                        type="number"
                        name="rate"
                        value={formData.rate}
                        onChange={handleInputChange}
                        placeholder="5.25"
                        min="0"
                        step="0.01"
                        style={{ maxWidth: '200px' }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Payment
                      </label>
                      <div className="relative" style={{ maxWidth: '200px' }}>
                        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="number"
                          name="monthly_payment"
                          value={formData.monthly_payment}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Right - Identification Numbers */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center space-x-2 mb-4">
                    <Hash className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900">Identification Numbers</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        VIN
                      </label>
                      <input
                        type="text"
                        name="vin"
                        value={formData.vin}
                        onChange={handleInputChange}
                        placeholder="Vehicle Identification Number"
                        style={{ maxWidth: '175px' }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Serial Number
                      </label>
                      <input
                        type="text"
                        name="serial_number"
                        value={formData.serial_number}
                        onChange={handleInputChange}
                        placeholder="Serial Number"
                        style={{ maxWidth: '175px' }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Plate
                      </label>
                      <input
                        type="text"
                        name="plate"
                        value={formData.plate}
                        onChange={handleInputChange}
                        placeholder="ABC-1234"
                        style={{ maxWidth: '175px' }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        IMEI (GPS)
                      </label>
                      <div className="relative" style={{ maxWidth: '200px' }}>
                        <Smartphone className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          name="imei"
                          value={formData.imei}
                          onChange={handleInputChange}
                          placeholder="GPS Tracker IMEI"
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Second Row - Additional Sections */}
              <div className="grid grid-cols-3 gap-6 mt-6">
                
                {/* Power Source Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center space-x-2 mb-4">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-900">Power Source</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Power Type
                      </label>
                      <select
                        name="power_source"
                        value={formData.power_source}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                      >
                        <option value="">Select Power Source</option>
                        <option value="diesel">Diesel</option>
                        <option value="gas">Gas</option>
                        <option value="batteries">Batteries</option>
                      </select>
                    </div>

                    {/* Diesel Fields */}
                    {formData.power_source === 'diesel' && (
                      <>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="has_def"
                            checked={formData.has_def}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="text-sm font-medium text-gray-700">
                            Has DEF (Diesel Exhaust Fluid)
                          </label>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Diesel Tank Capacity (Gallons)
                          </label>
                          <input
                            type="number"
                            name="diesel_gallons"
                            value={formData.diesel_gallons}
                            onChange={handleInputChange}
                            placeholder="0"
                            min="0"
                            step="0.1"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>

                        {formData.has_def && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              DEF Tank Capacity (Gallons)
                            </label>
                            <input
                              type="number"
                              name="def_gallons"
                              value={formData.def_gallons}
                              onChange={handleInputChange}
                              placeholder="0"
                              min="0"
                              step="0.1"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                          </div>
                        )}
                      </>
                    )}

                    {/* Gas Fields */}
                    {formData.power_source === 'gas' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gas Tank Capacity (Gallons)
                        </label>
                        <input
                          type="number"
                          name="gas_gallons"
                          value={formData.gas_gallons}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="0"
                          step="0.1"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    )}

                    {/* Battery Fields */}
                    {formData.power_source === 'batteries' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Standard Battery Count
                          </label>
                          <input
                            type="number"
                            name="standard_battery_count"
                            value={formData.standard_battery_count}
                            onChange={handleInputChange}
                            placeholder="0"
                            min="0"
                            step="1"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expanded Battery Count
                          </label>
                          <input
                            type="number"
                            name="expanded_battery_count"
                            value={formData.expanded_battery_count}
                            onChange={handleInputChange}
                            placeholder="0"
                            min="0"
                            step="1"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Rental Ready */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    <h3 className="text-lg font-bold text-gray-900">Rental Ready</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rental Ready Checklist
                    </label>
                    <select
                      name="rental_ready_checklist"
                      value={formData.rental_ready_checklist || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                    >
                      <option value="">Select Rental Ready Checklist</option>
                      <option value="Heavy Equipment Check">Heavy Equipment Check</option>
                      <option value="Generator Checklist">Generator Checklist</option>
                      <option value="Compressor Check">Compressor Check</option>
                    </select>
                    <p className="mt-2 text-xs text-gray-500">
                      Pre-rental inspection and preparation checklist
                    </p>
                  </div>
                </div>

                {/* Equipment Service */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center space-x-2 mb-4">
                    <Wrench className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-lg font-bold text-gray-900">Equipment Service</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Schedule
                    </label>
                    <select
                      name="equipment_service_list"
                      value={formData.equipment_service_list || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                    >
                      <option value="">Select Equipment Service List</option>
                      <option value="Excavator Maintenance">Excavator Maintenance</option>
                      <option value="Generator Service">Generator Service</option>
                      <option value="Dozer Maintenance">Dozer Maintenance</option>
                      <option value="Loader Service">Loader Service</option>
                    </select>
                    <p className="mt-2 text-xs text-gray-500">
                      Maintenance schedule and service history tracking
                    </p>
                  </div>
                </div>

              </div>

              {/* Equipment Notes - Full Width at Bottom */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-bold text-gray-900">Equipment Notes</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes and Comments
                  </label>
                  <textarea
                    name="equipment_notes"
                    value={formData.equipment_notes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter any additional notes, maintenance history, special instructions, or other relevant information about this equipment..."
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-5xl">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">View Mode</h2>
                <p className="text-gray-600">Condensed view mode will be implemented next...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineDetailsPage;