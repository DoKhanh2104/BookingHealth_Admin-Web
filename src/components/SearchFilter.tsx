import {
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterLabel?: string;
  filterValue?: string;
  filterOptions?: FilterOption[];
  onFilterChange?: (value: string) => void;
  onClear?: () => void;
}

export const SearchFilter = ({
  searchPlaceholder = 'Tìm kiếm...',
  searchValue,
  onSearchChange,
  filterLabel,
  filterValue,
  filterOptions,
  onFilterChange,
  onClear,
}: SearchFilterProps) => {
  const handleFilterChange = (event: SelectChangeEvent) => {
    if (onFilterChange) {
      onFilterChange(event.target.value);
    }
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      sx={{ mb: 3 }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          maxWidth: { sm: 400 },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: 'background.paper',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={onClear}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {filterOptions && onFilterChange && (
        <FormControl size="small" sx={{ minWidth: 150 }}>
          {filterLabel && (
            <InputLabel id="filter-select-label" sx={{ fontSize: 14 }}>
              {filterLabel}
            </InputLabel>
          )}
          <Select
            labelId="filter-select-label"
            value={filterValue || ''}
            label={filterLabel}
            onChange={handleFilterChange}
            sx={{ borderRadius: 2, bgcolor: 'background.paper', fontSize: 14 }}
            startAdornment={
              <InputAdornment position="start">
                <FilterListIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
              </InputAdornment>
            }
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ fontSize: 14 }}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Stack>
  );
};
