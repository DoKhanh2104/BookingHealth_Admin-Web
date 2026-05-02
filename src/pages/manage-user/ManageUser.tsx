import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Chip,
  IconButton,
  TablePagination,
  Box,
  Card,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Main from '../../layouts/Main';
import { HeaderPage } from '../../components/HeaderPage';
import { SearchFilter } from '../../components/SearchFilter';
import { useManageUserHooks } from './ManageUser.hooks';
import ModalCreateUser from './components/ModalCreateUser';
import ModalUpdateUser from './components/ModalUpdateUser';

const ManageUser = () => {
  const {
    t,
    columns,
    users,
    loading,
    total,
    page,
    rowsPerPage,
    searchQuery,
    statusFilter,
    filterOptions,
    isCreateModalOpen,
    isUpdateModalOpen,
    selectedUser,
    handleOpenCreateModal,
    handleOpenUpdateModal,
    handleCloseModals,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearchChange,
    handleFilterChange,
    handleClear,
    getRoleColor,
    getStatusColor,
    refreshUsers,
  } = useManageUserHooks();

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
            onClick={handleOpenCreateModal}
          >
            {t('buttonAdd')}
          </Button>
        }
      />

      <SearchFilter
        searchPlaceholder={t('searchPlaceholder')}
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        filterLabel={t('filterLabel')}
        filterValue={statusFilter}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onClear={handleClear}
      />

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' }}>
        {loading && <LinearProgress />}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#fff' }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    sx={{ fontWeight: 600, color: 'primary.main', py: 2 }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      color={getRoleColor(user.role)}
                      variant="outlined"
                      sx={{ fontWeight: 500, minWidth: 70, justifyContent: 'center' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      size="small"
                      color={getStatusColor(user.status)}
                      sx={{ fontWeight: 500, minWidth: 80, justifyContent: 'center' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenUpdateModal(user)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
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
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          sx={{ borderTop: '1px solid', borderColor: 'divider' }}
        />
      </Card>

      <ModalCreateUser
        open={isCreateModalOpen}
        onClose={handleCloseModals}
        onSuccess={refreshUsers}
      />

      <ModalUpdateUser
        open={isUpdateModalOpen}
        onClose={handleCloseModals}
        onSuccess={refreshUsers}
        user={selectedUser}
      />
    </Main>
  );
};

export default ManageUser;
