'use client' // usePathname 훅을 사용하므로 클라이언트 컴포넌트여야 해

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  Apps as AppsIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
} from '@mui/icons-material'
import { MenuItems } from '@/shared/constants'

// 사이드바 너비
const drawerWidth = 240

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            mt: '64px',
            height: 'calc(100% - 64px)',
          },
        }}
      >
        <Box sx={{ overflow: 'auto', p: 1 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Components</Typography>}
              />
            </ListItem>
            {MenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <Link
                  href={item.path}
                  passHref
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    width: '100%',
                  }}
                >
                  <ListItemButton selected={pathname === item.path}>
                    <ListItemIcon>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* --- 오른쪽 메인 콘텐츠 --- */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        {children}
      </Box>
    </Box>
  )
}
