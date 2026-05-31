import { Box, TextField, MenuItem, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

interface Props {
  t: (key: string) => string;
  date: string;
  setDate: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  keyword: string;
  setKeyword: (val: string) => void;
}

const AppointmentFilters = ({
  t,
  date,
  setDate,
  status,
  setStatus,
  keyword,
  setKeyword,
}: Props) => {
  const statuses = [
    { value: 'ALL', label: t('filters.allStatuses') },
    { value: 'PENDING', label: t('status.PENDING') },
    { value: 'CONFIRMED', label: t('status.CONFIRMED') },
    { value: 'COMPLETED', label: t('status.COMPLETED') },
    { value: 'CANCELLED', label: t('status.CANCELLED') },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <TextField
        label={t('filters.date')}
        type="date"
        size="small"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ minWidth: 180 }}
      />

      <TextField
        select
        label={t('filters.status')}
        size="small"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ minWidth: 180 }}
      >
        {statuses.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        variant="outlined"
        size="small"
        placeholder={t('searchPlaceholder')}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        sx={{ flexGrow: 1, minWidth: 250 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: keyword && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setKeyword('')} edge="end">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default AppointmentFilters;
