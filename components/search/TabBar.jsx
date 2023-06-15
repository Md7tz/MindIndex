import React from 'react';
import Basepath from '/components/Basepath';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TabBar = ({ query, type, handleTabClick }) => {
  

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={type} aria-label="basic tabs example">
        <Tab
          value="collections"
          label="Collections"
          href={Basepath.get(`/search?query=${query}&type=collections&page=1`)}
          onClick={handleTabClick}
        />
        <Tab
          value="notes"
          label="Notes"
          href={Basepath.get(`/search?query=${query}&type=notes&page=1`)}
          onClick={handleTabClick}
        />
      </Tabs>
    </Box>
  );
};

export default TabBar;
