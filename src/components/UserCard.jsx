import React from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
  Avatar,
  Divider,
  Paper
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';

const UserCard = ({ user, onEdit, onDelete, onLike, isLiked }) => {
  return (
    <Card
      sx={{
        width: 320,
        margin: '5px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        alignItems:'center',
        backgroundColor:'#f5f5f5'
      }}
      >
      <Avatar
        src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user.username}`}
        alt={user.name}
        sx={{ width: 160, height: 155 }}
        variant="square"
      />
      </Box>

      <CardContent sx={{ textAlign: 'start', padding: 2 }}>
        <Typography variant="h6" fontWeight="bold">{user.name}</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <MailOutlineIcon fontSize="small" />
          <Typography variant="body2" color='#000000A6'>{user.email}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <PhoneIcon fontSize="small" />
          <Typography variant="body2" color='#000000A6'>{user.phone}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LanguageIcon fontSize="small" />
          <Typography variant="body2" color='#000000A6'>{user.website}</Typography>
        </Box>
      </CardContent>
      <Divider />
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          paddingY: 1,
          backgroundColor: '#f9f9f9'
        }}
      >
        <IconButton
          onClick={() => onLike(user.id)}
          color={isLiked ? 'error' : 'default'}
          disableRipple
          sx={{ '&:focus': { outline: 'none' }, padding: '6px' }}
        >
          <FavoriteIcon />
        </IconButton>
        <Divider orientation="vertical" flexItem />
        <IconButton
          onClick={() => onEdit(user)}
          disableRipple
          sx={{ '&:focus': { outline: 'none' }, padding: '6px' }}
        >
          <EditIcon />
        </IconButton>
           <Divider orientation="vertical" flexItem />
        <IconButton
          onClick={() => onDelete(user.id)}
          disableRipple
          sx={{ '&:focus': { outline: 'none' }, padding: '6px' }}
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
    </Card>
  );
};

export default UserCard;
