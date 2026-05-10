# Dashboard Application

A dashboard application built with Next.js, TypeScript, and modern web technologies. Features an editable data table with advanced functionality, collapsible sidebar, and comprehensive validation system.

**Key Features Demonstrated:**
- Inline table editing with real-time validation
- Column sorting
- Collapsible sidebar navigation
- Advanced filtering and search
- Form validation with error handling
- Safe deletion with confirmation dialogs

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

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm 
- Git (for cloning)

### Installation & Setup
1. Clone the repository:
```bash
git clone https://github.com/aayashres/dashboard.git
cd dashboard-app
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture Decisions

### Component Architecture
- **Atomic Components**: Small, reusable components with single responsibilities
- **Composition over Inheritance**: Prefer component composition
- **Custom Hooks**: Extract complex logic into custom hooks
- **Type Safety**: Full TypeScript coverage with strict mode

### State Management
- **Local State**: React hooks for component-level state
- **No Global State**: Avoid unnecessary complexity
- **Prop Drilling**: Preferred over context for simple cases
- **Optimistic Updates**: Immediate UI feedback

### Validation Strategy
- **Zod Integration**: Single source of truth for validation rules
- **Runtime Validation**: Client-side validation with real-time feedback
- **Type Safety**: Compile-time validation with TypeScript
- **Error Boundaries**: Graceful error handling

### Performance Considerations
- **React.memo**: Prevent unnecessary re-renders
- **useMemo/useCallback**: Optimize expensive computations
- **Code Splitting**: Route-based component loading

## 🤔 Tradeoffs Made

### Technology Choices
- **Next.js vs Remix**: Chose Next.js for better ecosystem and documentation
- **TanStack Table vs Custom**: Used TanStack for proven table functionality
- **Zod vs Joi**: Selected Zod for better TypeScript integration
- **Tailwind vs CSS-in-JS**: Chose Tailwind for faster development

### Implementation Tradeoffs
- **Inline Editing vs Modal**: Inline editing for better UX, more complex state
- **Client-side Pagination**: Simpler implementation, less server load
- **Form Reset Strategy**: Full reset vs selective reset - chose full reset for simplicity
- **Validation Timing**: Real-time vs on-submit - chose real-time for better UX

### Known Limitations
- **No Real Database**: Using mock data limits persistence
- **No Authentication**: Simplified for demo purposes
- **Limited Error Recovery**: Basic error handling without retry logic
- **Mobile Responsiveness**: Basic responsive design, could be enhanced

## 🚀 Future Improvements

### With More Time
- **Database Integration**: Replace mock data with real database (PostgreSQL/MongoDB)
- **Authentication System**: Add user authentication and authorization
- **Advanced Filtering**: Date ranges, multi-select filters
- **Bulk Operations**: Select multiple rows for batch edit/delete
- **Analytics Dashboard**: Charts, metrics, and reporting features

### Technical Debt
- **Error Handling**: Implement comprehensive error boundaries and retry logic
- **Type Safety**: Strengthen TypeScript strictness and validation
- **Code Organization**: Refactor into feature-based modules
- **Performance**: Add performance monitoring and optimization
- **Security**: Implement CSRF protection, input sanitization

