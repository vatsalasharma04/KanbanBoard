import React from 'react';
import Ticket from './Ticket';
import './Board.css';

const Board = ({ tickets, groupBy, sortOrder, moveInProgress }) => {
  const groupTickets = () => {
    switch (groupBy) {
      case 'status':
        return groupByStatus();
      case 'user':
        return groupByUser();
      case 'priority':
        return groupByPriority();
      default:
        return tickets;
    }
  };

  const sortTickets = (groupedTickets) => {
    switch (sortOrder) {
      case 'priority':
        return sortByPriority(groupedTickets);
      case 'title':
        return sortByTitle(groupedTickets);
      default:
        return groupedTickets;
    }
  };

  const groupByStatus = () => {
    const grouped = {};
    tickets.forEach((ticket) => {
      if (!grouped[ticket.status]) {
        grouped[ticket.status] = [];
      }
      grouped[ticket.status].push(ticket);
    });
    return grouped;
  };

  const groupByUser = () => {
    const grouped = {};
    tickets.forEach((ticket) => {
      const userName = ticket.user || 'Unassigned';
      if (!grouped[userName]) {
        grouped[userName] = [];
      }
      grouped[userName].push(ticket);
    });
    return grouped;
  };

  const groupByPriority = () => {
    const grouped = {};
    tickets.forEach((ticket) => {
      if (!grouped[ticket.priority]) {
        grouped[ticket.priority] = [];
      }
      grouped[ticket.priority].push(ticket);
    });
    return grouped;
  };

  const sortByPriority = (groupedTickets) => {
    const sortedKeys = Object.keys(groupedTickets).sort((a, b) => b - a);
    return sortedKeys.reduce((sorted, key) => {
      const ticketsArray = Array.isArray(groupedTickets[key])
        ? groupedTickets[key]
        : [groupedTickets[key]];
      sorted[key] = ticketsArray;
      return sorted;
    }, {});
  };

  const sortByTitle = (groupedTickets) => {
    const sortedKeys = Object.keys(groupedTickets).sort();
    return sortedKeys.reduce((sorted, key) => {
      const ticketsArray = Array.isArray(groupedTickets[key])
        ? groupedTickets[key]
        : [groupedTickets[key]];
      sorted[key] = ticketsArray;
      return sorted;
    }, {});
  };

  const groupedTickets = groupTickets();
  const sortedTickets = sortTickets(groupedTickets);

  
  return (
    <div className="board">
      {Object.keys(sortedTickets).map((key) => (
        <div key={key} className={groupBy === 'user' ? 'user-group' : ''}>
          <h2>
            {groupBy === 'user'
              ? key
              : groupBy === 'priority'
              ? `Priority ${key}`
              : key}{' '}
            ({sortedTickets[key].length})
          </h2>
          {sortedTickets[key].map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} moveInProgress={moveInProgress} />
          ))}
        </div>
      ))}
    </div>
  );
};
export default Board;



