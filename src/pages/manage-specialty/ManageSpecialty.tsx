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
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Main from '../../layouts/Main';
import { HeaderPage } from '../../components/HeaderPage';
import { useManageSpecialtyHooks } from './ManageSpecialty.hooks';
import ModalCreateSpecialty from './components/ModalCreateSpecialty';
import ModalUpdateSpecialty from './components/ModalUpdateSpecialty';
import ModalConfirm from '../manage-user/components/ModalConfirm'; // Tái sử dụng ModalConfirm

const ManageSpecialty = () => {
  const {
    t,
    specialties,
    loading,
    page,
    rowsPerPage,
    totalElements,
    handleChangePage,
    handleChangeRowsPerPage,
    openCreate,
    openUpdate,
    openDelete,
    selectedSpecialty,
    handleOpenCreate,
    handleCloseCreate,
    handleOpenUpdate,
    handleCloseUpdate,
    handleOpenDelete,
    handleCloseDelete,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useManageSpecialtyHooks();

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

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', mt: 3 }}>
        {loading && <LinearProgress />}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#fff' }}>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', py: 2 }}>
                  {t('columns.id')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', py: 2 }}>
                  {t('columns.name')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', py: 2 }}>
                  {t('columns.description')}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: 'primary.main', py: 2, textAlign: 'center' }}
                >
                  {t('columns.actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {specialties.map((specialty) => (
                <TableRow
                  key={specialty.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{specialty.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{specialty.specialtyName}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        maxWidth: 500,
                      }}
                    >
                      {specialty.description || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Tooltip title={t('buttons.edit')}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenUpdate(specialty)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('buttons.delete')}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleOpenDelete(specialty)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && specialties.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
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

      <ModalCreateSpecialty
        open={openCreate}
        onClose={handleCloseCreate}
        onConfirm={handleCreate}
      />

      <ModalUpdateSpecialty
        key={selectedSpecialty?.id || 'update-modal'}
        open={openUpdate}
        onClose={handleCloseUpdate}
        onConfirm={handleUpdate}
        specialty={selectedSpecialty}
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

export default ManageSpecialty;
