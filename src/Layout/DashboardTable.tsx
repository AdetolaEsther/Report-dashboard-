import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Modal, Box, Avatar, Stack, Button } from '@mui/material';
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

const filterLabels = [
    { label: 'nigeria user', condition: (user: User) => user.country.toLowerCase() === 'nigeria' },
    { label: 'ghana user', condition: (user: User) => user.country.toLowerCase() === 'ghana' },
    { label: 'not nigeria or ghana', condition: (user: User) => user.country.toLowerCase() !== 'nigeria' && user.country.toLowerCase() !== 'ghana' },
    { label: 'under 20', condition: (user: User) => user.age < 20 },
    { label: 'lawyer', condition: (user: User) => user.profession.toLowerCase() === 'lawyer' },
    { label: 'johnson', condition: (user: User) => user.name.lastName.toLowerCase() === 'johnson' },
];

const DashboardTable: React.FC<DashboardTableProps> = ({ users }) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeFilterButtonId, setActiveFilterButtonId] = useState<number | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleFilterClick = (index: number) => {
    setActiveFilterButtonId(index);

    const newFilteredUsers = index === null ? users : users.filter(filterLabels[index].condition);

    setFilteredUsers(newFilteredUsers);
  };

  return (
    <>
      <Stack direction="row" sx={{ overflowX: 'auto', mb: 2 }}>
        {filterLabels.map((filter, idx) => (
          <Button
            key={filter.label}
            onClick={() => handleFilterClick(idx)}
            sx={{
              mr: 1,
              color: 'black',
              borderBottom: activeFilterButtonId === idx ? '1px solid black' : 'none',
              borderRadius: 0,
            }}
          >
            {filter.label}
          </Button>
        ))}
      </Stack>

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
          {filteredUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name.firstName}</TableCell>
              <TableCell>{user.name.lastName}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.country}</TableCell>
              <TableCell>{user.profession}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(user)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleClose} aria-labelledby="user-modal-title" aria-describedby="user-modal-description">
        <Box sx={modalStyle}>
          <Avatar sx={{  width: 56, height: 56, mb: 2, mx: 'auto',}}>
            <PersonIcon fontSize="large"  />
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
