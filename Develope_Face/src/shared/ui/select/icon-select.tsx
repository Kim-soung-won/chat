import { IconInfo, iconRecord } from '@/shared/constants'
import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'

const iconOptionsForUI: Array<IconInfo & { keyName: string }> = [
  { keyName: 'None', name: 'None', Component: null, source: null, tags: [] },
  ...Object.entries(iconRecord).map(([keyName, info]) => ({
    keyName,
    ...info,
  })),
]

interface IconSelectProps {
  selectedIcon: IconInfo
  setIconState: React.Dispatch<React.SetStateAction<IconInfo>>
}

/**
 * 아이콘 선택 버튼
 */
export const IconSelectBlock = ({
  selectedIcon,
  setIconState,
}: IconSelectProps) => {
  // 선택 화면
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  // 검색어
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIcons = useMemo(
    () =>
      iconOptionsForUI.filter(
        (icon) =>
          icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          icon.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      ),
    [searchTerm],
  )

  const SelectIconComponent = selectedIcon.Component

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography sx={{ minWidth: 120 }}>아이콘</Typography>
      <Button
        variant="outlined"
        fullWidth
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {SelectIconComponent && (
          <SelectIconComponent sx={{ fontSize: 20, marginRight: '8px' }} />
        )}
        {selectedIcon.name}
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: '400px' }}>
          <TextField
            fullWidth
            label="아이콘 검색"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Box
            sx={{
              mt: 1,
              maxHeight: '300px',
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
              gap: 1,
            }}
          >
            {filteredIcons.map((icon) => {
              const Icon = icon.Component
              return (
                <IconButton
                  key={icon.keyName}
                  onClick={() => {
                    setIconState(icon)
                    setAnchorEl(null)
                    setSearchTerm('')
                  }}
                  title={icon.name}
                >
                  {Icon &&
                    (icon.source === 'lucide-react' ? (
                      <Icon size={24} />
                    ) : (
                      <Icon sx={{ fontSize: 24 }} />
                    ))}
                </IconButton>
              )
            })}
          </Box>
        </Box>
      </Popover>
    </Stack>
  )
}
