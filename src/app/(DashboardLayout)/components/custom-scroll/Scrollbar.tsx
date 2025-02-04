"use client"

import { useState, useEffect, type ReactElement, type ReactNode } from "react"
import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"
import { Box, styled, type SxProps } from "@mui/material"

const SimpleBarStyle = styled(SimpleBar)(() => ({
  maxHeight: "100%",
}))

interface PropsType {
  children: ReactElement | ReactNode
  sx: SxProps
}

const Scrollbar = (props: PropsType) => {
  const { children, sx, ...other } = props
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    return <Box sx={{ overflowX: "auto" }}>{children}</Box>
  }

  return (
    <SimpleBarStyle sx={sx} {...other}>
      {children}
    </SimpleBarStyle>
  )
}

export default Scrollbar

