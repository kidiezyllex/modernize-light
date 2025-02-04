"use client"

import { useState, useEffect } from 'react';
import { Button, Box, Drawer, Theme } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import ContactDetails from '@/app/(DashboardLayout)/components/apps/contacts/ContactDetails';
import ContactList from '@/app/(DashboardLayout)/components/apps/contacts/ContactList';
import ContactSearch from '@/app/(DashboardLayout)/components/apps/contacts/ContactSearch';
import ContactFilter from '@/app/(DashboardLayout)/components/apps/contacts/ContactFilter';
import AppCard from '@/app/(DashboardLayout)/components/shared/AppCard';

const drawerWidth = 240;
const secdrawerWidth = 320;

const Contacts = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isLgUp, setIsLgUp] = useState(false);
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLgUp(window.innerWidth >= 1200); // Adjust this breakpoint as needed
      setIsMdUp(window.innerWidth >= 900); // Adjust this breakpoint as needed
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PageContainer title="Contact" description="this is Contact">
      <Breadcrumb title="Contact app" subtitle="List Your Contacts" />
      <AppCard>
        {/* Left Part */}
        <Drawer
          open={isLeftSidebarOpen}
          onClose={() => setLeftSidebarOpen(false)}
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, position: 'relative', zIndex: 2 },
            flexShrink: 0,
          }}
          variant={isLgUp ? 'permanent' : 'temporary'}
        >
          <ContactFilter />
        </Drawer>

        {/* Middle part */}
        <Box
          sx={{
            minWidth: secdrawerWidth,
            width: { xs: '100%', md: secdrawerWidth, lg: secdrawerWidth },
            flexShrink: 0,
          }}
        >
          <ContactSearch onClick={() => setLeftSidebarOpen(true)} />
          <ContactList showrightSidebar={() => setRightSidebarOpen(true)} />
        </Box>

        {/* Right part */}
        <Drawer
          anchor="right"
          open={isRightSidebarOpen}
          onClose={() => setRightSidebarOpen(false)}
          variant={isMdUp ? 'permanent' : 'temporary'}
          sx={{
            width: isMdUp ? secdrawerWidth : '100%',
            zIndex: isLgUp ? 0 : 1,
            flex: isMdUp ? 'auto' : '',
            [`& .MuiDrawer-paper`]: { width: '100%', position: 'relative' },
          }}
        >
          {/* back btn Part */}
          {!isMdUp && (
            <Box sx={{ p: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setRightSidebarOpen(false)}
                sx={{ mb: 3, display: { xs: 'block', md: 'none', lg: 'none' } }}
              >
                Back
              </Button>
            </Box>
          )}
          <ContactDetails />
        </Drawer>
      </AppCard>
    </PageContainer>
  );
};

export default Contacts;
