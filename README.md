# Dashboard Application

A dashboard application built with Next.js, TypeScript, and modern web technologies. Features an editable data table with advanced functionality, collapsible sidebar, and comprehensive validation system.

**Key Features Demonstrated:**
- ✏️ Inline table editing with real-time validation
- 📊 Column sorting
- 🎨 Collapsible sidebar navigation
- 🔍 Advanced filtering and search
- ✅ Form validation with error handling
- 🗑️ Safe deletion with confirmation dialogs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aayashres/dashboard.git
cd dashboard-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Table**: TanStack Table v8
- **Validation**: Zod
- **Notifications**: Sonner
- **Icons**: Lucide React

## ✨ Features

### 📊 Advanced Data Table
- **Editable Rows**: Inline editing with real-time validation
- **Dynamic Validation**: Zod-based validation system with error feedback
- **Sorting**: Multi-column sorting with visual indicators
- **Filtering**: Global search and column-specific filtering
- **Pagination**: Client-side pagination with customizable page sizes
- **Column Visibility**: Toggle column visibility
- **Action Buttons**: Edit, save, cancel, and delete operations

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── table/             # Table page
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/           # Layout components
│   │   ├── sidebar.tsx   # Collapsible sidebar
│   │   └── navbar.tsx    # Navigation bar
│   ├── table/            # Table components
│   │   ├── editable-table.tsx
│   │   ├── add-users.tsx
│   │   ├── delete-confirmation.tsx
│   │   └── field-renderers/
│   ├── ui/               # ShadCN UI components
│   └── theme-toggle.tsx  # Theme switching
├── lib/
│   ├── validators.ts     # Zod validation schemas
│   ├── mock-data.ts     # Sample data
│   └── table-config.tsx # Table configuration
└── types/
    └── table.ts         # TypeScript definitions
```

## 🎯 Key Components

### Editable Table System
- **useEditableRow**: Hook for managing row editing state
- **useTableState**: Hook for table pagination, sorting, and filtering
- **EditableCell**: Component for inline cell editing
- **FieldRenderer**: Extensible field type system

### Validation System
- **Zod Schemas**: Type-safe validation rules
- **Field Validation**: Individual field validation with error messages
- **Form Validation**: Complete form validation with error aggregation
- **Real-time Feedback**: Live validation during editing

### Layout System
- **Collapsible Sidebar**: Animated navigation with state persistence
- **Responsive Design**: Mobile-first approach
- **Theme Support**: Dark/light mode switching
