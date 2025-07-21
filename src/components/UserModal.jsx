import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UserModal = ({ user, onClose, onSave, modalSize }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || ''
      });
    }
  }, [user]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email';
        }
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone is required';
        break;
      case 'website':
        if (!value.trim()) error = 'Website is required';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSave({ ...user, ...formData });
  };

  return (
    <Dialog open={!!user} onClose={onClose} maxWidth={false} PaperProps={{ sx: { ...modalSize } }}>
      <DialogTitle>
        Basic Modal
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box display="flex" flexDirection="column" justifyContent="center" gap={2} mt={2}>
          <Box display="flex" flexDirection="row" justifyContent={'flex-end'} alignItems="center" gap={2}>
            <Typography variant="h6" sx={{ color: 'red' }}>*</Typography>
            <Typography variant="h6" sx={{ width: '80px' }}>Name:</Typography>
            <TextField
              size="small"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth={false}
              sx={{ width: '400px' }}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent={'flex-end'} alignItems="center" gap={2}>
            <Typography variant="h6" sx={{ color: 'red' }}>*</Typography>
            <Typography variant="h6" sx={{ width: '80px' }}>Email:</Typography>
            <TextField
              size="small"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth={false}
              sx={{ width: '400px' }}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent={'flex-end'} alignItems="center" gap={2}>
            <Typography variant="h6" sx={{ color: 'red' }}>*</Typography>
            <Typography variant="h6" sx={{ width: '80px' }}>Phone:</Typography>
            <TextField
              size="small"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth={false}
              sx={{ width: '400px' }}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Box>
          <Box display="flex" flexDirection="row"justifyContent={'flex-end'} alignItems="center" gap={2}>
            <Typography variant="h6" sx={{ color: 'red' }}>*</Typography>
            <Typography variant="h6"sx={{ width: '80px' }}>Website:</Typography>
            <TextField
              size="small"
              name="website"
              value={formData.website}
              onChange={handleChange}
              fullWidth={false}
              sx={{ width: '400px' }}
              error={!!errors.website}
              helperText={errors.website}
            />
          </Box>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;