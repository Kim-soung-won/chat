'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Container,
  TextField,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  useTheme,
  Pagination,
  Stack,
} from '@mui/material'
import { DynamicIcon } from '@/shared/ui/icon'

const ICONS_PER_PAGE = 30 // 한 페이지에 보여줄 아이콘 개수를 30개로 수정

interface IconFinderPageProps {
  iconNames: string[]
  iconTags: Record<string, string[]>
  source: 'mui' | 'lucide'
}

export function IconFinderPage({
  iconNames,
  iconTags,
  source,
}: IconFinderPageProps) {
  const theme = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  })

  // 1. 검색어에 따라 필터링된 아이콘 목록을 useMemo로 계산합니다.
  const filteredIcons = useMemo(() => {
    const lowercasedTerm = searchTerm.toLowerCase()
    if (!lowercasedTerm) {
      return iconNames
    }
    return iconNames.filter(
      (name) =>
        name.toLowerCase().includes(lowercasedTerm) ||
        (iconTags[name] || []).some((tag) =>
          tag.toLowerCase().includes(lowercasedTerm),
        ),
    )
  }, [searchTerm])

  // 2. 검색어가 바뀔 때마다 1페이지로 리셋합니다.
  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  // 3. 현재 페이지에 보여줄 아이콘들을 계산합니다.
  const displayedIcons = useMemo(() => {
    const startIndex = (page - 1) * ICONS_PER_PAGE
    return filteredIcons.slice(startIndex, startIndex + ICONS_PER_PAGE)
  }, [page, filteredIcons])

  // 페이지 개수를 계산합니다.
  const pageCount = Math.ceil(filteredIcons.length / ICONS_PER_PAGE)

  const handleCopy = (iconName: string) => {
    const importStatement = `import { ${iconName} } from '@mui/icons-material';`
    navigator.clipboard.writeText(importStatement).then(() => {
      setSnackbar({
        open: true,
        message: `'${iconName}' import 구문이 복사되었습니다.`,
      })
    })
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
    // 페이지 변경 시 화면 상단으로 스크롤 (사용자 경험 개선)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <TextField
        fullWidth
        label="아이콘 검색 (예: '집', 'home', 'search')"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mb: 4,
          position: 'sticky',
          top: 20,
          zIndex: 10,
          background: theme.palette.background.default,
        }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
          <CircularProgress />
        </Box>
      ) : displayedIcons.length === 0 ? (
        <Typography sx={{ textAlign: 'center', mt: 10 }}>
          검색 결과가 없습니다.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {displayedIcons.map((iconName) => (
              // 4. Grid 아이템 prop을 올바르게 수정합니다.
              <Grid size={2} key={iconName}>
                <Paper
                  variant="outlined"
                  onClick={() => handleCopy(iconName)}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: 3,
                    },
                  }}
                >
                  <DynamicIcon
                    iconName={iconName}
                    sx={{ fontSize: 40 }}
                    source={source}
                  />
                  <Typography variant="caption" sx={{ wordBreak: 'break-all' }}>
                    {iconName}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* --- 5. 페이지 버튼 (Pagination) UI를 추가합니다. --- */}
          <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Stack>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
