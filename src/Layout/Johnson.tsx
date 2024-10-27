import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardTable from './DashboardTable'; 
import { userData } from '../Data';

const Johnsons: React.FC = () => {
  const dashboardCards = [
    { 
      number: userData.filter(user => user.name.lastName === 'Johnson').length,
      name: 'Total no of Johnsons' },
   
  ];
  
  console.log('dashboard mounted')

  return (
    <>
    <Box
    sx={{
      padding: 2,
      backgroundColor: '#f0f4f8',
      borderRadius: '8px',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        padding: 2,
      }}
    >
      {dashboardCards.map((card, index) => (
        <Box
          key={index}
          sx={{
            padding: 2,
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: 'gray',
            flex: '0 0 auto', 
            minWidth: '300px', 
          }}
        >
          <Typography  sx={{ fontWeight: 'bold', color:'secondary.main', fontSize:'60px'}}>
            {card.number}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {card.name}
          </Typography>
        </Box>
      ))}
    </Box>

   
  </Box>
   <DashboardTable users={userData} />
 </>
  );
};

export default Johnsons;
