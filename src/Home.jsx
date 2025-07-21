import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import UserCard from './components/UserCard';
import UserModal from './components/UserModal';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleLike = (id) => {
    setLikedUsers((prev) => (
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    ));
  };

  const handleEdit = (user) => setSelectedUser(user);
  const handleDelete = (id) => setUsers((prev) => prev.filter((user) => user.id !== id));
  const handleSave = (editedUser) => {
    setUsers((prev) => prev.map((user) => (user.id === editedUser.id ? editedUser : user)));
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: 4}}>
      <Grid container spacing={3} justifyContent="flex-start" >
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onLike={handleLike}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLiked={likedUsers.includes(user.id)}
          />
        ))}
      </Grid>
      <UserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onSave={handleSave}
        modalSize={{ width: '650px', height: '400px' }}
      />
    </Box>
  );
};

export default Home;
