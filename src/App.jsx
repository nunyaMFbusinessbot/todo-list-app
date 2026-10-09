import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'todo-list-items';

const defaultTasks = [
  { id: 1, text: 'Plan the week', completed: false, priority: 'Medium', dueDate: '' },
  { id: 2, text: 'Review project goals', completed: true, priority: 'High', dueDate: '2026-10-10' },
  { id: 3, text: 'Finish the onboarding tasks', completed: false, priority: 'Low', dueDate: '' },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    return {
      total: tasks.length,
      completed,
      remaining: tasks.length - completed,
    };
  }, [tasks]);

  const visibleTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);

    const matchesSearch = task.text.toLowerCase().includes(search.trim().toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const addTask = (e) => {
    e.preventDefault();

    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      priority,
      dueDate,
    };

    setTasks((current) => [task, ...current]);
    setNewTask('');
    setPriority('Medium');
    setDueDate('');
  };

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((current) => current.filter((task) => !task.completed));
  };

  return (
    <div className="app-shell">
      <main className="todo-app">
        <header className="header">
          <div>
            <p className="eyebrow">Productivity</p>
            <h1>My Todo List</h1>
          </div>
          <div className="stats">
            <div>
              <span>{stats.total}</span>
              <small>Total</small>
            </div>
            <div>
              <span>{stats.remaining}</span>
              <small>Remaining</small>
            </div>
            <div>
              <span>{stats.completed}</span>
              <small>Done</small>
            </div>
          </div>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            aria-label="Task description"
          />

          <select value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Task priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="Task due date"
          />

          <button type="submit">Add Task</button>
        </form>

        <div className="toolbar">
          <div className="filters" aria-label="Task filters">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
              All
            </button>
            <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>
              Active
            </button>
            <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
              Completed
            </button>
          </div>

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks"
            aria-label="Search tasks"
          />

          <button className="secondary" onClick={clearCompleted}>
            Clear completed
          </button>
        </div>

        <ul className="task-list">
          {visibleTasks.length === 0 ? (
            <li className="empty-state">No tasks match your current view.</li>
          ) : (
            visibleTasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? 'done' : ''}`}>
                <label className="task-main">
                  <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                  <span>{task.text}</span>
                </label>

                <div className="task-meta">
                  <span className={`badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                  {task.dueDate && <span className="due-date">Due: {task.dueDate}</span>}
                </div>

                <button className="delete-btn" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.text}`}>
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
