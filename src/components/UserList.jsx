import React from 'react';
import PropTypes from 'prop-types';

import './UserList.scss';
import UserCard from './UserCard';

export default function UserList({ handleModal, setUserToEdit, setEditMode, setUsers, users }) {
  const handleDelete = (evt, userId) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    if (!confirm('Are you sure you want to remove this user?')) {
      return;
    }

    let usersInLS = JSON.parse(localStorage.getItem('users')) || [];
    usersInLS = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(usersInLS));

    setUsers(usersInLS);
  };

  const handleEdit = (evt, userId) => {
    const userToEdit = users.find(user => user.id === userId);
    setEditMode(true);
    setUserToEdit(userToEdit);
    handleModal(true);
  };

  return (
    <div className="user-list">
      <hr />
      <button
        type="button"
        className="add btn btn-primary"
        onClick={() => { handleModal(true); return setUserToEdit({}); }}
      >
        Add New User
      </button>

      <hr />
      <hr />
      <h2>All Users</h2>
      <hr />

      <div className="users">
        {
          users.length
            ? users.map(user =>
              (
                <UserCard
                  key={user.id}
                  user={user}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))
            : <h3><b><i>No users yet!</i></b></h3>
        }
      </div>

    </div>
  );
}

UserList.propTypes = {
  handleModal: PropTypes.func.isRequired,
  setUsers: PropTypes.func.isRequired,
  setUserToEdit: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
