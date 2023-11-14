// Ticket.js
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faPlus);
const Ticket = ({ ticket, moveInProgress }) => {
  const { id, title, status, user, priority } = ticket;

  return (

    <div className="ticket" style={styles.ticket}>
      <div className="ticket-content">
        <h3>{title}</h3>
        <p>
          {status === 'To Do' && <img
              src="https://img.icons8.com/android/24/000000/settings.png"
              alt="Settings"
              style={styles.settingsIcon} />} Status: {status} | User: {user} | Priority: {priority}
        </p>
      </div>
      {status === 'To Do' && (
        <button onClick={() => moveInProgress(id)}>Move to In Progress</button>
      )}
    </div>
    
  );
};

const styles = {
  ticket: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    // width:'300px'
    // height:'300px'

    
  },
};

export default Ticket;
