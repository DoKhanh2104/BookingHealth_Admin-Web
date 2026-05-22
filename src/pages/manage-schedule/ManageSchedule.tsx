import {
  Card,
  Box,
  Tabs,
  Tab,
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Autocomplete,
  TextField,
  Button,
  Switch,
  Paper,
  TablePagination,
} from '@mui/material';
import {
  EventBusy as LeaveIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
  Add as AddIcon,
  InfoOutlined as InfoIcon,
} from '@mui/icons-material';
import Main from '../../layouts/Main';
import { HeaderPage } from '../../components/HeaderPage';
import { useManageScheduleHooks } from './ManageSchedule.hooks';
import ModalAddTimeSlot from './components/ModalAddTimeSlot';

// Simple custom component for Tab Panels
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`schedule-tabpanel-${index}`}
      aria-labelledby={`schedule-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ManageSchedule() {
  const {
    t,
    tabIndex,
    setTabIndex,

    clinics,
    doctors,

    // Tab 1: Leave approvals
    leaveRequests,
    leaveTotalElements,
    leavePage,
    leaveRowsPerPage,
    leaveStatusFilter,
    setLeaveStatusFilter,
    handleChangeLeavePage,
    handleChangeLeaveRowsPerPage,
    handleApproveLeave,
    handleRejectLeave,

    // Tab 2: Work schedules
    workSchedules,
    scheduleTotalElements,
    schedulePage,
    scheduleRowsPerPage,
    scheduleClinicId,
    setScheduleClinicId,
    scheduleDoctorId,
    setScheduleDoctorId,
    scheduleDate,
    setScheduleDate,
    handleChangeSchedulePage,
    handleChangeScheduleRowsPerPage,

    // Tab 3: Time slot configs
    timeSlots,
    slotTotalElements,
    slotPage,
    slotRowsPerPage,
    openAddSlotModal,
    setOpenAddSlotModal,
    handleChangeSlotPage,
    handleChangeSlotRowsPerPage,
    handleToggleSlotStatus,
    handleAddTimeSlot,
  } = useManageScheduleHooks();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Render leave request status badge
  const renderLeaveStatus = (status: 'PENDING' | 'APPROVED' | 'REJECTED') => {
    switch (status) {
      case 'PENDING':
        return (
          <Chip
            label={t('leaveApproval.status.PENDING')}
            color="warning"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        );
      case 'APPROVED':
        return (
          <Chip
            label={t('leaveApproval.status.APPROVED')}
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        );
      case 'REJECTED':
        return (
          <Chip
            label={t('leaveApproval.status.REJECTED')}
            color="error"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Main>
      <HeaderPage title={t('title')} description={t('description')} />

      <Box mt={3}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', p: 1 }}>
          {/* Tabs Bar */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1 }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="schedule management tabs"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: 15,
                  minHeight: 48,
                  textTransform: 'none',
                  pb: 1.5,
                },
              }}
            >
              <Tab
                icon={<LeaveIcon fontSize="small" />}
                iconPosition="start"
                label={t('tabs.leaveApproval')}
                id="schedule-tab-0"
              />
              <Tab
                icon={<CalendarIcon fontSize="small" />}
                iconPosition="start"
                label={t('tabs.workSchedule')}
                id="schedule-tab-1"
              />
              <Tab
                icon={<TimeIcon fontSize="small" />}
                iconPosition="start"
                label={t('tabs.timeSlotConfig')}
                id="schedule-tab-2"
              />
            </Tabs>
          </Box>

          <Box sx={{ px: 3 }}>
            {/* TAB 1: DUYỆT NGHỈ PHÉP */}
            <CustomTabPanel value={tabIndex} index={0}>
              <Box mb={3}>
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  {t('leaveApproval.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {t('leaveApproval.description')}
                </Typography>
              </Box>

              {/* Leave Filter Bar */}
              <Box mb={3} display="flex" gap={2} alignItems="center">
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel id="leave-status-select-label">
                    {t('leaveApproval.statusFilter')}
                  </InputLabel>
                  <Select
                    labelId="leave-status-select-label"
                    id="leave-status-select"
                    value={leaveStatusFilter}
                    label={t('leaveApproval.statusFilter')}
                    onChange={(e) => setLeaveStatusFilter(e.target.value)}
                  >
                    <MenuItem value="ALL">{t('leaveApproval.allStatuses')}</MenuItem>
                    <MenuItem value="PENDING">{t('leaveApproval.status.PENDING')}</MenuItem>
                    <MenuItem value="APPROVED">{t('leaveApproval.status.APPROVED')}</MenuItem>
                    <MenuItem value="REJECTED">{t('leaveApproval.status.REJECTED')}</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Leave Requests Table */}
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 2,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Table sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 60 }}>
                        {t('leaveApproval.columns.stt')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 150 }}>
                        {t('leaveApproval.columns.doctorName')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 180 }}>
                        {t('leaveApproval.columns.clinicName')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 130 }}>
                        {t('leaveApproval.columns.startDate')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 130 }}>
                        {t('leaveApproval.columns.endDate')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 200 }}>
                        {t('leaveApproval.columns.reason')}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: 'primary.main',
                          width: 120,
                          textAlign: 'center',
                        }}
                      >
                        {t('leaveApproval.columns.status')}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: 'primary.main',
                          width: 120,
                          textAlign: 'center',
                        }}
                      >
                        {t('leaveApproval.columns.actions')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaveRequests.map((req, idx) => (
                      <TableRow key={req.id} hover>
                        <TableCell>{leavePage * leaveRowsPerPage + idx + 1}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{req.doctorName}</TableCell>
                        <TableCell>{req.clinicName}</TableCell>
                        <TableCell>{req.startDate}</TableCell>
                        <TableCell>{req.endDate}</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                          >
                            {req.reason}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">{renderLeaveStatus(req.status)}</TableCell>
                        <TableCell align="center">
                          <Box display="flex" justifyContent="center" gap={1}>
                            {req.status === 'PENDING' ? (
                              <>
                                <Tooltip title={t('leaveApproval.buttons.approveTooltip')}>
                                  <IconButton
                                    size="small"
                                    color="success"
                                    onClick={() => handleApproveLeave(req.id)}
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
                                    <CheckIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title={t('leaveApproval.buttons.rejectTooltip')}>
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleRejectLeave(req.id)}
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
                                    <ClearIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            ) : (
                              <Typography
                                variant="caption"
                                color="text.disabled"
                                sx={{ fontStyle: 'italic' }}
                              >
                                --
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    {leaveRequests.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          align="center"
                          sx={{ py: 3, color: 'text.secondary' }}
                        >
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
                count={leaveTotalElements}
                rowsPerPage={leaveRowsPerPage}
                page={leavePage}
                onPageChange={handleChangeLeavePage}
                onRowsPerPageChange={handleChangeLeaveRowsPerPage}
                labelRowsPerPage="Số hàng mỗi trang:"
                sx={{ borderTop: 'none' }}
              />
            </CustomTabPanel>

            {/* TAB 2: THEO DÕI LỊCH TRỰC TOÀN HỆ THỐNG */}
            <CustomTabPanel value={tabIndex} index={1}>
              <Box
                mb={3}
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                flexWrap="wrap"
                gap={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700} color="text.primary">
                    {t('workSchedule.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {t('workSchedule.description')}
                  </Typography>
                </Box>
                <Chip
                  icon={<InfoIcon />}
                  label={t('workSchedule.viewOnlyBadge')}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 600, borderStyle: 'dashed' }}
                />
              </Box>

              {/* Master Schedule Filters */}
              <Box mb={3} p={2.5} sx={{ bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      id="schedule-clinic-autocomplete"
                      options={clinics}
                      getOptionLabel={(option) => option.name}
                      value={clinics.find((c) => c.id === scheduleClinicId) || null}
                      onChange={(_event, newValue) => {
                        setScheduleClinicId(newValue ? newValue.id : 'all');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t('workSchedule.filters.clinic')}
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="schedule-doctor-select-label">
                        {t('workSchedule.filters.doctor')}
                      </InputLabel>
                      <Select
                        labelId="schedule-doctor-select-label"
                        id="schedule-doctor-select"
                        value={scheduleDoctorId}
                        label={t('workSchedule.filters.doctor')}
                        onChange={(e) => setScheduleDoctorId(e.target.value as number | 'all')}
                      >
                        <MenuItem value="all">{t('workSchedule.filters.allDoctors')}</MenuItem>
                        {doctors.map((doc) => (
                          <MenuItem key={doc.id} value={doc.id}>
                            {doc.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="schedule-date-picker"
                      label={t('workSchedule.filters.date')}
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Master Schedule Table */}
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 2,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Table sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 60 }}>
                        {t('workSchedule.columns.stt')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 150 }}>
                        {t('workSchedule.columns.doctorName')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 200 }}>
                        {t('workSchedule.columns.clinicName')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 130 }}>
                        {t('workSchedule.columns.date')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 300 }}>
                        {t('workSchedule.columns.timeSlots')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workSchedules.map((schedule, idx) => (
                      <TableRow key={schedule.id} hover>
                        <TableCell>{schedulePage * scheduleRowsPerPage + idx + 1}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{schedule.doctorName}</TableCell>
                        <TableCell>{schedule.clinicName}</TableCell>
                        <TableCell>{schedule.date}</TableCell>
                        <TableCell>
                          <Box display="flex" flexWrap="wrap" gap={1}>
                            {schedule.timeSlots.map((slot, sIdx) => (
                              <Chip
                                key={sIdx}
                                label={slot}
                                size="small"
                                variant="outlined"
                                color="primary"
                                icon={<TimeIcon style={{ fontSize: 13 }} />}
                                sx={{
                                  borderRadius: 1.5,
                                  fontWeight: 500,
                                  px: 0.5,
                                  backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                }}
                              />
                            ))}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    {workSchedules.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          align="center"
                          sx={{ py: 3, color: 'text.secondary' }}
                        >
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
                count={scheduleTotalElements}
                rowsPerPage={scheduleRowsPerPage}
                page={schedulePage}
                onPageChange={handleChangeSchedulePage}
                onRowsPerPageChange={handleChangeScheduleRowsPerPage}
                labelRowsPerPage="Số hàng mỗi trang:"
                sx={{ borderTop: 'none' }}
              />
            </CustomTabPanel>

            {/* TAB 3: CẤU HÌNH KHUNG GIỜ HỆ THỐNG */}
            <CustomTabPanel value={tabIndex} index={2}>
              <Box
                mb={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700} color="text.primary">
                    {t('timeSlotConfig.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {t('timeSlotConfig.description')}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenAddSlotModal(true)}
                  sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none' }}
                >
                  {t('timeSlotConfig.buttons.addSlot')}
                </Button>
              </Box>

              {/* Time Slots Table */}
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 2,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Table sx={{ minWidth: 600 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 150 }}>
                        {t('timeSlotConfig.columns.code')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 150 }}>
                        {t('timeSlotConfig.columns.startTime')}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 150 }}>
                        {t('timeSlotConfig.columns.endTime')}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: 'primary.main',
                          width: 150,
                          textAlign: 'center',
                        }}
                      >
                        {t('timeSlotConfig.columns.status')}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: 'primary.main',
                          width: 120,
                          textAlign: 'center',
                        }}
                      >
                        {t('timeSlotConfig.columns.actions')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {timeSlots.map((slot) => (
                      <TableRow key={slot.id} hover>
                        <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {slot.code}
                        </TableCell>
                        <TableCell>{slot.startTime}</TableCell>
                        <TableCell>{slot.endTime}</TableCell>
                        <TableCell align="center">
                          {slot.isActive ? (
                            <Chip
                              label={t('timeSlotConfig.status.active')}
                              size="small"
                              sx={{
                                fontWeight: 600,
                                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                                color: 'success.dark',
                              }}
                            />
                          ) : (
                            <Chip
                              label={t('timeSlotConfig.status.inactive')}
                              color="default"
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip
                            title={
                              slot.isActive
                                ? t('timeSlotConfig.buttons.deactivate')
                                : t('timeSlotConfig.buttons.activate')
                            }
                          >
                            <Switch
                              checked={slot.isActive}
                              onChange={() => handleToggleSlotStatus(slot.id)}
                              color="success"
                              size="small"
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                    {timeSlots.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          align="center"
                          sx={{ py: 3, color: 'text.secondary' }}
                        >
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
                count={slotTotalElements}
                rowsPerPage={slotRowsPerPage}
                page={slotPage}
                onPageChange={handleChangeSlotPage}
                onRowsPerPageChange={handleChangeSlotRowsPerPage}
                labelRowsPerPage="Số hàng mỗi trang:"
                sx={{ borderTop: 'none' }}
              />
            </CustomTabPanel>
          </Box>
        </Card>
      </Box>

      {/* Add New Time Slot Modal */}
      <ModalAddTimeSlot
        open={openAddSlotModal}
        onClose={() => setOpenAddSlotModal(false)}
        onAdd={handleAddTimeSlot}
        t={t}
      />
    </Main>
  );
}
