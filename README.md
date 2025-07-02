# Equipment Management System

A comprehensive React-based equipment management system for tracking inventory, parts, maintenance schedules, and rental operations.

## Features

- **Equipment Management**: Track equipment status, location, and assignments
- **Parts Management**: Inventory tracking with multiple suppliers and alternatives
- **Parts List Templates**: Reusable parts lists for different equipment categories
- **Maintenance Tracking**: Service schedules and maintenance history
- **Rental Ready Checklists**: Pre-rental inspection workflows
- **Advanced Filtering**: Multi-criteria search and filtering capabilities

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **ESLint** for code quality

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd equipment-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── EquipmentManagement.tsx     # Main equipment list and management
│   ├── MachineDetailsPage.tsx      # Add/edit equipment form
│   ├── EquipmentViewPage.tsx       # Equipment details view
│   ├── PartsListTemplate.tsx       # Parts list template management
│   └── PartsListManagement.tsx     # Parts inventory management
├── App.tsx                         # Main application component
├── main.tsx                        # Application entry point
└── index.css                       # Global styles
```

## Key Components

### Equipment Management
- Equipment listing with status tracking
- Advanced filtering by category, status, service due
- Equipment assignment and location tracking
- Service interval monitoring

### Parts Management
- Parts inventory with stock level tracking
- Multiple supplier support with alternatives
- DNI (Do Not Inventory) parts support
- Cost tracking and supplier information

### Parts List Templates
- Reusable parts lists for equipment categories
- Drag-and-drop part ordering
- Template-based parts management
- Category-specific templates

## Development Guidelines

### Code Style
- Use TypeScript for all new components
- Follow React functional component patterns
- Use Tailwind CSS for styling
- Implement proper error handling and validation

### Component Structure
- Keep components focused and single-responsibility
- Use proper TypeScript interfaces for props
- Implement loading states and error boundaries
- Follow consistent naming conventions

### State Management
- Use React hooks for local state
- Implement proper form validation
- Handle async operations with loading states
- Use proper TypeScript types for all data

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
The built files in the `dist/` folder can be deployed to any static hosting service.

## Contributing

1. Create a feature branch from `main`
2. Make your changes following the coding guidelines
3. Test your changes thoroughly
4. Submit a pull request with a clear description

## License

[Add your license information here]

## Support

For questions or issues, please contact the development team or create an issue in the repository.