"use client"

import { useState, useEffect } from "react"
import { Button, Box, Drawer } from "@mui/material"
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb"
import EmailList from "@/app/(DashboardLayout)/components/apps/email/EmailList"
import EmailFilter from "@/app/(DashboardLayout)/components/apps/email/EmailFilter"
import EmailSearch from "@/app/(DashboardLayout)/components/apps/email/EmailSearch"
import EmailContent from "@/app/(DashboardLayout)/components/apps/email/EmailContent"
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer"
import AppCard from "@/app/(DashboardLayout)/components/shared/AppCard"
import Image from "next/image"

const drawerWidth = 240
const secdrawerWidth = 340

const Email = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false)
  const [isLgUp, setIsLgUp] = useState(false)
  const [isMdUp, setIsMdUp] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsLgUp(window.innerWidth >= 1200) // Adjust this breakpoint as needed
      setIsMdUp(window.innerWidth >= 900) // Adjust this breakpoint as needed
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <PageContainer title="Email" description="this is Email">
      <Breadcrumb title="Email app" subtitle="Look at Inbox">
        <Image src="/images/breadcrumb/emailSv.png" alt={"emailIcon"} width={195} height={195} />
      </Breadcrumb>

      <AppCard>
        {/* Left part */}
        <Drawer
          open={isLeftSidebarOpen}
          onClose={() => setLeftSidebarOpen(false)}
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              position: "relative",
              zIndex: 2,
            },
            flexShrink: 0,
          }}
          variant={isLgUp ? "permanent" : "temporary"}
        >
          <EmailFilter />
        </Drawer>

        {/* Middle part */}
        <Box
          sx={{
            minWidth: secdrawerWidth,
            width: { xs: "100%", md: secdrawerWidth, lg: secdrawerWidth },
            flexShrink: 0,
          }}
        >
          <EmailSearch onClick={() => setLeftSidebarOpen(true)} />
          <EmailList showrightSidebar={() => setRightSidebarOpen(true)} />
        </Box>

        {/* Right part */}
        {isMdUp ? (
          <Drawer
            anchor="right"
            variant="permanent"
            sx={{
              zIndex: 0,
              width: "200px",
              flex: "1 1 auto",
              [`& .MuiDrawer-paper`]: { position: "relative" },
            }}
          >
            <Box>
              <EmailContent />
            </Box>
          </Drawer>
        ) : (
          <Drawer
            anchor="right"
            open={isRightSidebarOpen}
            onClose={() => setRightSidebarOpen(false)}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: "85%" },
            }}
            variant="temporary"
          >
            <Box p={3}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setRightSidebarOpen(false)}
                sx={{ mb: 3, display: { xs: "block", md: "none", lg: "none" } }}
              >
                Back
              </Button>
              <EmailContent />
            </Box>
          </Drawer>
        )}
      </AppCard>
    </PageContainer>
  )
}

export default Email

