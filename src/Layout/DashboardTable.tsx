import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Modal, Box, Avatar } from '@mui/material';
import { Button } from '@mui/material'; 
import PersonIcon from '@mui/icons-material/Person';


interface User {
  name: {
    firstName: string;
    lastName: string;
  };
  age: number;
  country: string;
  profession: string;
}

interface DashboardTableProps {
  users: User[];
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DashboardTable: React.FC<DashboardTableProps> = ({ users }) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Table sx={{ mb: 3 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Country</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Profession</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name.firstName}</TableCell>
              <TableCell>{user.name.lastName}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.country}</TableCell>
              <TableCell>{user.profession}</TableCell>
              <TableCell>
              <Button onClick={() => handleOpen(user)} >
  View
</Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleClose} aria-labelledby="user-modal-title" aria-describedby="user-modal-description">
      <Box sx={modalStyle}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 2, mx: 'auto' }}>
          <PersonIcon fontSize="large" />
        </Avatar>

        <Typography id="user-modal-title" variant="h6" component="h2" align="center">
          {selectedUser ? `${selectedUser.name.firstName} ${selectedUser.name.lastName}` : 'User Details'}
        </Typography>
        
        {selectedUser && (
          <Box id="user-modal-description" sx={{ mt: 2 }}>
            <Typography>Age: {selectedUser.age}</Typography>
            <Typography>Country: {selectedUser.country}</Typography>
            <Typography>Profession: {selectedUser.profession}</Typography>
          </Box>
        )}
      </Box>
    </Modal>
    </>
  );
};

export default DashboardTable;
