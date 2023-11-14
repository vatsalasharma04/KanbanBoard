// App.js
import React, { useState, useEffect } from 'react';
import Board from './Board';


const App = () => {
  const [tickets, setTickets] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    status: 'Todo',
    userId: '',
    priority: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [groupBy, setGroupBy] = useState('status');
  const [sortOrder, setSortOrder] = useState('priority');

  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();

        if (data && Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Load saved view state from localStorage
    const savedGroupBy = localStorage.getItem('kanbanGroupBy');
    const savedSortOrder = localStorage.getItem('kanbanSortOrder');

    if (savedGroupBy) {
      setGroupBy(savedGroupBy);
    }

    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTickets((prevTickets) => [
      ...prevTickets,
      { ...newTask, id: `CAM-${prevTickets.length + 1}` },
    ]);
    setNewTask({ title: '', status: 'Todo', userId: '', priority: 0 });
    setShowForm(false);
  };

  const handleGroupByChange = (selectedGroupBy) => {
    setGroupBy(selectedGroupBy);
    // Save the selected groupBy to localStorage
    localStorage.setItem('kanbanGroupBy', selectedGroupBy);
  };

  const handleSortOrderChange = (selectedSortOrder) => {
    setSortOrder(selectedSortOrder);
    // Save the selected sortOrder to localStorage
    localStorage.setItem('kanbanSortOrder', selectedSortOrder);
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div>
          <button style={styles.settingsButton}>
            <img
              src="https://img.icons8.com/android/24/000000/settings.png"
              alt="Settings"
              style={styles.settingsIcon}
            />
          </button>
          <button style={styles.displayButton}>
            <img
              src="https://img.icons8.com/material-outlined/24/000000/expand-arrow--v1.png"
              alt="Dropdown"
              style={styles.dropdownIcon}
            />
          </button>
        </div>
        <div>
          <label htmlFor="groupBy">Group By:</label>
          <select
            id="groupBy"
            onChange={(e) => handleGroupByChange(e.target.value)}
            value={groupBy}
          >
            <option value="status">By Status</option>
            <option value="userId">By User</option>
            <option value="priority">By Priority</option>
          </select>
          <label htmlFor="sortOrder">Sort Order:</label>
          <select
            id="sortOrder"
            onChange={(e) => handleSortOrderChange(e.target.value)}
            value={sortOrder}
          >
            <option value="priority">By Priority</option>
            <option value="title">By Title</option>
          </select>
        </div>
      </div>
      <button style={styles.addButton} onClick={() => setShowForm(true)}>
        Add Task
      </button>
      {showForm && (
        <form style={styles.form} onSubmit={handleFormSubmit}>
       
        </form>
      )}
      <Board tickets={tickets} groupBy={groupBy} sortOrder={sortOrder} />
    </div>
  );
};

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F5F8',
    padding: '10px',
  },
  settingsButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  settingsIcon: {
    width: '24px',
    height: '24px',
    fill: '#fff',
  },
  displayButton: {
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
    position: 'relative',
  },
  dropdownIcon: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
  },
  addButton: {
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default App;


