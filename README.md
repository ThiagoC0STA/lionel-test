# Planning Screen Application

A modern planning screen application built with Next.js, React, TypeScript, and TailwindCSS. This application allows users to manage and schedule events through an intuitive drag-and-drop interface.

## Features

- 📅 Interactive Calendar Interface
- 🔄 Drag & Drop Event Management
- 📝 Context Menu for Quick Actions
- 🎯 Event Type Indicators
- 👥 User Assignment
- ✏️ Real-time Event Editing
- 🎨 Visual Event Categories
- 📱 Responsive Design

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Hooks
- **Drag & Drop**: React DnD
- **UI Components**:
  - Radix UI (Modals, Context Menus)
  - Lucide Icons
  - Custom Components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/planning-screen.git
```

2. Install dependencies:

```bash
cd planning-screen
```

3. Start the development server:

```bash
npm install
```

or

```bash
yarn install
```

4. Run the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```


5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```bash
├── app/
│   ├── components/
│   │   ├── calendar/
│   │   │   ├── DayColumn.tsx
│   │   │   ├── EventCard.tsx
│   │   │   └── Calendar.tsx
│   │   ├── ui/
│   │   │   ├── Modal.tsx
│   │   │   └── ContextMenu.tsx
│   ├── lib/
│   │   ├── types.ts
│   │   └── constants.ts
│   └── page.tsx
├── public/
└── styles/
```


## Implementation Details

### Drag & Drop
- Implemented using React DnD
- Supports event dragging between days
- Visual feedback during drag operations
- Automatic data updates on drop

### Context Menu
- Right-click activation
- Edit and Delete options
- Position-aware rendering
- Keyboard navigation support

### Event Management
- Create, Edit, and Delete events
- Visual type indicators
- Time range selection
- User assignment
- Category-based styling

### Data Handling
- Mock data for demonstration
- Real-time updates
- Type-safe implementations
- Persistent state management

## Development Approach

1. **Component Architecture**
   - Modular design for reusability
   - Separation of concerns
   - Type-safe props and state

2. **Styling Strategy**
   - TailwindCSS for utility-first styling
   - Consistent color scheme
   - Responsive design principles

3. **State Management**
   - React hooks for local state
   - Prop drilling minimization
   - Efficient re-renders

4. **User Experience**
   - Smooth animations
   - Intuitive interactions
   - Visual feedback
   - Error prevention

## Future Improvements

- [ ] Add unit tests
- [ ] Implement search functionality
- [ ] Add filter options
- [ ] Improve mobile responsiveness
- [ ] Add keyboard shortcuts
- [ ] Implement undo/redo functionality

## Author

Thiago Rodrigues da Costa

## Acknowledgments

- Design inspiration from the provided mockup
- Icons from Lucide Icons
- UI components from Radix UI