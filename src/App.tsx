import React, { useState } from 'react';
import EquipmentManagement from './components/EquipmentManagement';
import MachineDetailsPage from './components/MachineDetailsPage';
import EquipmentViewPage from './components/EquipmentViewPage';
import PartsListTemplate from './components/PartsListTemplate';
import PartsListManagement from './components/PartsListManagement';

export interface Equipment {
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

export interface EquipmentFormData {
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
}

type CurrentView = 'summary' | 'add' | 'edit' | 'view' | 'parts-templates' | 'parts-management';

function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('summary');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);

  const navigateToSummary = () => {
    setCurrentView('summary');
    setSelectedEquipmentId(null);
  };

  const navigateToAdd = () => {
    setCurrentView('add');
    setSelectedEquipmentId(null);
  };

  const navigateToEdit = (equipmentId: string) => {
    setCurrentView('edit');
    setSelectedEquipmentId(equipmentId);
  };

  const navigateToView = (equipmentId: string) => {
    setCurrentView('view');
    setSelectedEquipmentId(equipmentId);
  };

  const navigateToPartsTemplates = () => {
    setCurrentView('parts-templates');
    setSelectedEquipmentId(null);
  };

  const navigateToPartsManagement = () => {
    setCurrentView('parts-management');
    setSelectedEquipmentId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'summary' && (
        <EquipmentManagement
          onNavigateToAdd={navigateToAdd}
          onNavigateToEdit={navigateToEdit}
          onNavigateToView={navigateToView}
          onNavigateToPartsTemplates={navigateToPartsTemplates}
          onNavigateToPartsManagement={navigateToPartsManagement}
        />
      )}
      
      {(currentView === 'add' || currentView === 'edit') && (
        <MachineDetailsPage
          isEdit={currentView === 'edit'}
          equipmentId={selectedEquipmentId}
          onNavigateBack={navigateToSummary}
        />
      )}
      
      {currentView === 'view' && selectedEquipmentId && (
        <EquipmentViewPage
          equipmentId={selectedEquipmentId}
          onNavigateBack={navigateToSummary}
          onNavigateToEdit={() => navigateToEdit(selectedEquipmentId)}
        />
      )}

      {currentView === 'parts-templates' && (
        <PartsListTemplate
          onNavigateBack={navigateToSummary}
        />
      )}

      {currentView === 'parts-management' && (
        <PartsListManagement
          onNavigateBack={navigateToSummary}
        />
      )}
    </div>
  );
}

export default App;