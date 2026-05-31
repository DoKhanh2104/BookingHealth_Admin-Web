import {
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
  Chip,
  Avatar,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Verified as VerifiedIcon,
  HourglassEmpty as HourglassEmptyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Main from '../../layouts/Main';
import { HeaderPage } from '../../components/HeaderPage';
import { useManageDoctorHooks } from './ManageDoctor.hooks';
import ModalDoctorDetail from './components/ModalDoctorDetail';
import ModalConfirm from '../manage-user/components/ModalConfirm';

const ManageDoctor = () => {
  const {
    t,
    doctors,
    loading,
    page,
    rowsPerPage,
    totalElements,
    keyword,
    statusFilter,
    handleStatusFilterChange,
    handleSearchChange,
    handleClearSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    openDetail,
    openApprove,
    openReject,
    openLock,
    selectedDoctor,
    handleOpenDetail,
    handleCloseDetail,
    handleOpenApprove,
    handleCloseApprove,
    handleOpenReject,
    handleCloseReject,
    handleOpenLock,
    handleCloseLock,
    handleApprove,
    handleReject,
    handleLock,
  } = useManageDoctorHooks();

  const navigate = useNavigate();

  return (
    <Main>
      <HeaderPage title={t('title')} description={t('description')} />

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', mt: 3, p: 2 }}>
        {/* Search Bar & Filter */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
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

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select value={statusFilter} onChange={handleStatusFilterChange} displayEmpty>
              <MenuItem value="ALL">
                {t('filter.all', { defaultValue: 'Tất cả trạng thái' })}
              </MenuItem>
              <MenuItem value="VERIFIED">
                {t('filter.verified', { defaultValue: 'Đã duyệt' })}
              </MenuItem>
              <MenuItem value="PENDING">
                {t('filter.pending', { defaultValue: 'Chờ duyệt' })}
              </MenuItem>
              <MenuItem value="LOCKED">{t('filter.locked', { defaultValue: 'Đã khóa' })}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading && <LinearProgress />}

        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#fff' }}>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', py: 2, width: 60 }}>
                  {t('columns.stt')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', py: 2, minWidth: 250 }}>
                  {t('columns.doctorInfo')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', py: 2 }}>
                  {t('columns.clinic')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'primary.main', py: 2 }}>
                  {t('columns.licenseNumber')}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: 'primary.main', py: 2, textAlign: 'center' }}
                >
                  {t('columns.status')}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    py: 2,
                    textAlign: 'center',
                    minWidth: 200,
                  }}
                >
                  {t('columns.actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor, index) => (
                <TableRow
                  key={doctor.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* STT */}
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>

                  {/* Thông tin bác sĩ: Avatar + Tên + Chuyên khoa */}
                  <TableCell sx={{ maxWidth: 120 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        src={doctor.avatar}
                        alt={doctor.fullName}
                        sx={{
                          width: 44,
                          height: 44,
                          border: '2px solid',
                          borderColor: 'divider',
                        }}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {doctor.fullName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {doctor.specialty}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Cơ sở công tác */}
                  <TableCell
                    sx={{
                      maxWidth: 230,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {doctor.clinicName ? (
                      <Chip
                        label={doctor.clinicName}
                        size="small"
                        clickable
                        onClick={() => navigate('/manage-clinic')}
                        sx={{
                          fontWeight: 500,
                          bgcolor: 'rgba(25, 118, 210, 0.08)',
                          color: 'primary.main',
                          border: '1px solid',
                          borderColor: 'rgba(25, 118, 210, 0.2)',
                          '&:hover': {
                            bgcolor: 'rgba(25, 118, 210, 0.16)',
                          },
                        }}
                      />
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.disabled"
                        sx={{ fontStyle: 'italic' }}
                      >
                        {t('noClinic')}
                      </Typography>
                    )}
                  </TableCell>

                  {/* Mã CCHN */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                      {doctor.licenseNumber || (
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.disabled"
                          sx={{ fontStyle: 'italic', fontFamily: 'inherit' }}
                        >
                          {t('noLicense')}
                        </Typography>
                      )}
                    </Typography>
                  </TableCell>

                  {/* Trạng thái */}
                  <TableCell align="center">
                    <Chip
                      icon={
                        doctor.status === 'VERIFIED' ? (
                          <VerifiedIcon sx={{ fontSize: 16 }} />
                        ) : doctor.status === 'LOCKED' ? (
                          <LockIcon sx={{ fontSize: 16 }} />
                        ) : (
                          <HourglassEmptyIcon sx={{ fontSize: 16 }} />
                        )
                      }
                      label={
                        doctor.status === 'VERIFIED'
                          ? t('status.verified')
                          : doctor.status === 'LOCKED'
                            ? t('status.locked', { defaultValue: 'Đã khóa' })
                            : t('status.pending')
                      }
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: 12,
                        bgcolor:
                          doctor.status === 'VERIFIED'
                            ? 'rgba(46, 125, 50, 0.1)'
                            : doctor.status === 'LOCKED'
                              ? 'rgba(211, 47, 47, 0.1)'
                              : 'rgba(237, 108, 2, 0.1)',
                        color:
                          doctor.status === 'VERIFIED'
                            ? '#2e7d32'
                            : doctor.status === 'LOCKED'
                              ? '#d32f2f'
                              : '#ed6c02',
                        '& .MuiChip-icon': {
                          color:
                            doctor.status === 'VERIFIED'
                              ? '#2e7d32'
                              : doctor.status === 'LOCKED'
                                ? '#d32f2f'
                                : '#ed6c02',
                        },
                      }}
                    />
                  </TableCell>

                  {/* Hành động */}
                  <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      {/* Xem chi tiết */}
                      <Tooltip title={t('buttons.viewDetail')}>
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => handleOpenDetail(doctor)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {/* Duyệt (chỉ hiện khi PENDING) */}
                      {doctor.status === 'PENDING' && (
                        <Tooltip title={t('buttons.approve')}>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleOpenApprove(doctor)}
                          >
                            <CheckCircleIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}

                      {/* Từ chối (chỉ hiện khi PENDING) */}
                      {doctor.status === 'PENDING' && (
                        <Tooltip title={t('buttons.reject')}>
                          <IconButton
                            size="small"
                            color="warning"
                            onClick={() => handleOpenReject(doctor)}
                          >
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}

                      {/* Khóa tài khoản (chỉ hiện khi VERIFIED) */}
                      {doctor.status === 'VERIFIED' && (
                        <Tooltip title={t('buttons.lock')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleOpenLock(doctor)}
                          >
                            <LockIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}

                      {/* Mở khóa (chỉ hiện khi LOCKED) */}
                      {doctor.status === 'LOCKED' && (
                        <Tooltip title={t('buttons.unlock', { defaultValue: 'Mở khóa' })}>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleOpenApprove(doctor)} // Dùng chung hàm duyệt để mở khóa (status 1)
                          >
                            <LockOpenIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && doctors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
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
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          sx={{ borderTop: '1px solid', borderColor: 'divider' }}
        />
      </Card>

      {/* Modal Chi tiết Bác sĩ */}
      <ModalDoctorDetail
        open={openDetail}
        onClose={handleCloseDetail}
        doctor={selectedDoctor}
        t={t}
      />

      {/* Modal Xác nhận Duyệt */}
      <ModalConfirm
        open={openApprove}
        onClose={handleCloseApprove}
        onConfirm={handleApprove}
        title={t('modals.approveTitle')}
        message={t('modals.approveContent')}
        confirmText={t('buttons.approve')}
        cancelText={t('buttons.cancel')}
        color="success"
      />

      {/* Modal Xác nhận Từ chối */}
      <ModalConfirm
        open={openReject}
        onClose={handleCloseReject}
        onConfirm={handleReject}
        title={t('modals.rejectTitle')}
        message={t('modals.rejectContent')}
        confirmText={t('buttons.reject')}
        cancelText={t('buttons.cancel')}
        color="warning"
      />

      {/* Modal Xác nhận Khóa */}
      <ModalConfirm
        open={openLock}
        onClose={handleCloseLock}
        onConfirm={handleLock}
        title={t('modals.lockTitle')}
        message={t('modals.lockContent')}
        confirmText={t('buttons.lock')}
        cancelText={t('buttons.cancel')}
        color="warning"
      />
    </Main>
  );
};

export default ManageDoctor;
