# A React To-Do List App

A simple and responsive to-do application built with React. It stores tasks in the browser's localStorage so your list persists across refreshes.

## Features

- Add new tasks
- Mark tasks as complete or active
- Delete tasks
- Filter tasks by all, active, or completed
- Search tasks by name
- Assign priority and due date
- Save data locally with `localStorage`
- Responsive design for desktop and mobile

## Tech Stack

- React 18
- Vite
- CSS Grid & Flexbox
- LocalStorage API

## Getting started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

3. Build for production:
```bash
npm run build
```

## Project structure

```bash
src/
  App.jsx          # Main React component
  main.jsx         # React entry point
  index.css        # Styling
index.html         # HTML template
vite.config.js     # Vite configuration
package.json       # Dependencies
```

## How it works

- **Add Task**: Fill in the task input, select priority and due date, then click "Add Task"
- **Toggle Complete**: Click the checkbox next to any task to mark it complete/incomplete
- **Delete Task**: Click the "Delete" button on any task
- **Filter**: Use the filter buttons (All, Active, Completed) to view different task sets
- **Search**: Type in the search box to filter tasks by name
- **Clear Completed**: Click "Clear completed" to remove all finished tasks
- **Persistence**: All data is automatically saved to localStorage and restored on reload

## localStorage Key

Tasks are stored under the key `todo-list-items` in localStorage. You can clear it by running:

```javascript
localStorage.removeItem('todo-list-items');
```
