import {
  Card,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  Paper,
  TablePagination,
  Avatar,
  InputAdornment,
  LinearProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  LockOutlined as LockIcon,
  LockOpenOutlined as UnlockIcon,
  VisibilityOutlined as EyeIcon,
} from '@mui/icons-material';
import Main from '../../layouts/Main';
import { HeaderPage } from '../../components/HeaderPage';
import { useManagePatientHooks } from './ManagePatient.hooks';
import ModalPatientHistory from './components/ModalPatientHistory';

// Simple function to generate colors for avatars
function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name: string) {
  const parts = name.split(' ');
  const initials =
    parts.length > 1 ? `${parts[parts.length - 2][0]}${parts[parts.length - 1][0]}` : parts[0][0];

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 36,
      height: 36,
      fontSize: 14,
      fontWeight: 600,
    },
    children: initials.toUpperCase(),
  };
}

export default function ManagePatient() {
  const {
    t,
    searchQuery,
    setSearchQuery,
    patients,
    totalPatients,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleToggleLock,
    openHistory,
    selectedPatient,
    selectedPatientHistory,
    historyLoading,
    loading,
    handleOpenHistory,
    handleCloseHistory,
  } = useManagePatientHooks();

  const renderStatus = (status: 'ACTIVE' | 'LOCKED') => {
    if (status === 'ACTIVE') {
      return (
        <Chip
          label={t('status.ACTIVE')}
          size="small"
          sx={{
            fontWeight: 600,
            backgroundColor: 'rgba(46, 125, 50, 0.1)',
            color: 'success.dark',
          }}
        />
      );
    } else {
      return (
        <Chip
          label={t('status.LOCKED')}
          size="small"
          sx={{
            fontWeight: 600,
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            color: 'error.dark',
          }}
        />
      );
    }
  };

  return (
    <Main>
      <HeaderPage title={t('title')} description={t('description')} />

      <Box mt={3}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', p: 3 }}>
          {/* Filters/Search Bar */}
          <Box mb={3} display="flex" gap={2} alignItems="center">
            <TextField
              size="small"
              variant="outlined"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: 320 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Patients Listing Table */}
          {loading && <LinearProgress sx={{ mb: 2 }} />}
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}
          >
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 60 }}>
                    {t('columns.stt')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 200 }}>
                    {t('columns.fullName')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 160 }}>
                    {t('columns.phone')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 220 }}>
                    {t('columns.email')}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: 'primary.main', width: 140, textAlign: 'center' }}
                  >
                    {t('columns.status')}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: 'primary.main', width: 140, textAlign: 'center' }}
                  >
                    {t('columns.actions')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient, idx) => (
                  <TableRow key={patient.id} hover>
                    <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar {...stringAvatar(patient.fullName)} />
                        <Typography variant="body2" fontWeight={600} color="text.primary">
                          {patient.fullName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{patient.phone}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell align="center">{renderStatus(patient.status)}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={1}>
                        {/* Lock / Unlock account */}
                        {patient.status === 'ACTIVE' ? (
                          <Tooltip title={t('tooltips.lock')}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleToggleLock(patient.id)}
                              sx={{
                                border: '1px solid',
                                borderColor: 'error.light',
                                backgroundColor: 'error.50',
                                '&:hover': {
                                  backgroundColor: 'error.main',
                                  color: '#fff',
                                },
                              }}
                            >
                              <LockIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title={t('tooltips.unlock')}>
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleToggleLock(patient.id)}
                              sx={{
                                border: '1px solid',
                                borderColor: 'success.light',
                                backgroundColor: 'success.50',
                                '&:hover': {
                                  backgroundColor: 'success.main',
                                  color: '#fff',
                                },
                              }}
                            >
                              <UnlockIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}

                        {/* View history booking */}
                        <Tooltip title={t('tooltips.history')}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenHistory(patient)}
                            sx={{
                              border: '1px solid',
                              borderColor: 'primary.light',
                              backgroundColor: 'primary.50',
                              '&:hover': {
                                backgroundColor: 'primary.main',
                                color: '#fff',
                              },
                            }}
                          >
                            <EyeIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {patients.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                      {t('noData')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalPatients}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số hàng mỗi trang:"
            sx={{ borderTop: 'none', mt: 1 }}
          />
        </Card>
      </Box>

      {/* Patient History Modal */}
      <ModalPatientHistory
        open={openHistory}
        onClose={handleCloseHistory}
        patient={selectedPatient}
        appointments={selectedPatientHistory}
        loading={historyLoading}
        t={t}
      />
    </Main>
  );
}
