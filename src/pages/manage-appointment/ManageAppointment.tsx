import {
  Card,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
  TablePagination,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import Main from '../../layouts/Main';
import { HeaderPage } from '../../components/HeaderPage';
import AppointmentKpiBadges from './components/AppointmentKpiBadges';
import AppointmentFilters from './components/AppointmentFilters';
import ModalAppointmentDetail from './components/ModalAppointmentDetail';
import { useManageAppointmentHooks } from './ManageAppointment.hooks';

const ManageAppointment = () => {
  const {
    t,
    appointments,
    loading,
    page,
    rowsPerPage,
    totalElements,
    keyword,
    setKeyword,
    date,
    setDate,
    status,
    setStatus,
    kpiData,
    handleChangePage,
    handleChangeRowsPerPage,
    openDetail,
    selectedAppointment,
    handleOpenDetail,
    handleCloseDetail,
  } = useManageAppointmentHooks();

  const renderStatusChip = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Chip label={t('status.PENDING')} color="warning" size="small" />;
      case 'CONFIRMED':
        return <Chip label={t('status.CONFIRMED')} color="info" size="small" />;
      case 'COMPLETED':
        return <Chip label={t('status.COMPLETED')} color="success" size="small" />;
      case 'CANCELLED':
        return <Chip label={t('status.CANCELLED')} color="error" size="small" />;
      default:
        return null;
    }
  };

  return (
    <Main>
      <HeaderPage title={t('title')} description={t('description')} />

      <Box mt={3}>
        <AppointmentKpiBadges kpi={kpiData} t={t} />

        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', p: 3 }}>
          <AppointmentFilters
            t={t}
            date={date}
            setDate={setDate}
            status={status}
            setStatus={setStatus}
            keyword={keyword}
            setKeyword={setKeyword}
          />

          {loading && <LinearProgress sx={{ mb: 2 }} />}

          <TableContainer>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 60 }}>
                    {t('columns.stt')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 180 }}>
                    {t('columns.patient')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 200 }}>
                    {t('columns.doctor')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 160 }}>
                    {t('columns.time')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {t('columns.totalAmount')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', textAlign: 'center' }}>
                    {t('columns.status')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', textAlign: 'center' }}>
                    {t('columns.actions')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appointment, index) => (
                  <TableRow
                    key={appointment.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {appointment.patientName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        SĐT: {appointment.patientPhone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {appointment.doctorName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {appointment.specialty}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{appointment.appointmentDate}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {appointment.timeSlot}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} color="primary">
                        {appointment.totalAmount.toLocaleString('vi-VN')}đ
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{renderStatusChip(appointment.status)}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Tooltip title={t('buttons.viewDetail')}>
                          <IconButton
                            size="small"
                            color="info"
                            onClick={() => handleOpenDetail(appointment)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && appointments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
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
      </Box>

      <ModalAppointmentDetail
        key={selectedAppointment?.id || 'modal'}
        open={openDetail}
        onClose={handleCloseDetail}
        appointment={selectedAppointment}
        t={t}
      />
    </Main>
  );
};

export default ManageAppointment;
