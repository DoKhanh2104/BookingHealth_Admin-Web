import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
  TablePagination,
  Box,
  Card,
  Tooltip,
  LinearProgress,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Map as MapIcon,
} from '@mui/icons-material';
import Main from '../../layouts/Main';
import { HeaderPage } from '../../components/HeaderPage';
import { useManageClinicHooks } from './ManageClinic.hooks';
import ModalCreateClinic from './components/ModalCreateClinic';
import ModalUpdateClinic from './components/ModalUpdateClinic';
import ModalConfirm from '../manage-user/components/ModalConfirm'; // Tái sử dụng ModalConfirm

const ManageClinic = () => {
  const {
    t,
    clinics,
    loading,
    page,
    rowsPerPage,
    totalElements,
    keyword,
    handleSearchChange,
    handleClearSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    openCreate,
    openUpdate,
    openDelete,
    selectedClinic,
    handleOpenCreate,
    handleCloseCreate,
    handleOpenUpdate,
    handleCloseUpdate,
    handleOpenDelete,
    handleCloseDelete,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useManageClinicHooks();

  return (
    <Main>
      <HeaderPage
        title={t('title')}
        description={t('description')}
        button={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2 }}
            onClick={handleOpenCreate}
          >
            {t('buttons.create')}
          </Button>
        }
      />

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', mt: 3, p: 2 }}>
        {/* Search Bar */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder={t('searchPlaceholder')}
            value={keyword}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: keyword && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch} edge="end">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading && <LinearProgress />}

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#fff' }}>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', py: 2 }}>
                  {t('columns.stt')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', py: 2 }}>
                  {t('columns.name')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', py: 2 }}>
                  {t('columns.address')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', py: 2 }}>
                  {t('columns.map')}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: 'primary.main', py: 2, textAlign: 'center' }}
                >
                  {t('columns.doctorCount')}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: 'primary.main', py: 2, textAlign: 'center' }}
                >
                  {t('columns.actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clinics.map((clinic, index) => (
                <TableRow
                  key={clinic.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{clinic.clinicName}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        maxWidth: 300,
                      }}
                    >
                      {clinic.address || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {clinic.longitude != null && clinic.latitude != null ? (
                      <Tooltip title={`${clinic.latitude}, ${clinic.longitude}`}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps?q=${clinic.latitude},${clinic.longitude}`,
                              '_blank',
                            )
                          }
                        >
                          <MapIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <MapIcon fontSize="small" color="disabled" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {clinic.soLuongBacSi !== undefined ? clinic.soLuongBacSi : 0}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Tooltip title={t('buttons.edit')}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenUpdate(clinic)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('buttons.delete')}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleOpenDelete(clinic)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && clinics.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    Chưa có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          sx={{ borderTop: '1px solid', borderColor: 'divider' }}
        />
      </Card>

      <ModalCreateClinic open={openCreate} onClose={handleCloseCreate} onConfirm={handleCreate} />

      <ModalUpdateClinic
        key={selectedClinic?.id || 'update-modal'}
        open={openUpdate}
        onClose={handleCloseUpdate}
        onConfirm={handleUpdate}
        clinic={selectedClinic}
      />

      <ModalConfirm
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleDelete}
        title={t('modals.deleteTitle')}
        message={t('modals.deleteContent')}
        confirmText={t('buttons.delete')}
        cancelText={t('buttons.cancel')}
        color="error"
      />
    </Main>
  );
};

export default ManageClinic;
