import {
  Card,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  DeleteOutline as DeleteIcon,
} from '@mui/icons-material';
import Main from '../../layouts/Main';
import { HeaderPage } from '../../components/HeaderPage';
import { useManageNotificationHooks } from './ManageNotification.hooks';
import ModalCreateNotification from './components/ModalCreateNotification';

export default function ManageNotification() {
  const {
    t,
    notifications,
    totalNotifications,
    searchQuery,
    setSearchQuery,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    openCreateModal,
    handleOpenCreate,
    handleCloseCreate,
    title,
    setTitle,
    content,
    setContent,
    type,
    setType,
    target,
    setTarget,
    errors,
    handleSendNotification,
    handleSaveDraft,
    handleDeleteNotification,
  } = useManageNotificationHooks();

  // Helper to render type chip
  const renderTypeChip = (notifType: typeof type) => {
    switch (notifType) {
      case 'SYSTEM':
        return (
          <Chip
            label={t('types.SYSTEM')}
            size="small"
            color="info"
            sx={{ fontWeight: 600, minWidth: 80 }}
          />
        );
      case 'PROMOTION':
        return (
          <Chip
            label={t('types.PROMOTION')}
            size="small"
            color="success"
            sx={{ fontWeight: 600, minWidth: 80 }}
          />
        );
      case 'MAINTENANCE':
        return (
          <Chip
            label={t('types.MAINTENANCE')}
            size="small"
            color="error"
            sx={{ fontWeight: 600, minWidth: 80 }}
          />
        );
      default:
        return null;
    }
  };

  // Helper to render target chip
  const renderTargetChip = (notifTarget: typeof target) => {
    switch (notifTarget) {
      case 'ALL':
        return (
          <Chip
            label={t('targets.ALL')}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        );
      case 'DOCTOR':
        return (
          <Chip
            label={t('targets.DOCTOR')}
            size="small"
            color="secondary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        );
      case 'PATIENT':
        return (
          <Chip
            label={t('targets.PATIENT')}
            size="small"
            color="warning"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        );
      default:
        return null;
    }
  };

  // Helper to render status chip
  const renderStatusChip = (status: 'SENT' | 'DRAFT') => {
    if (status === 'SENT') {
      return (
        <Chip
          label={t('status.SENT')}
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
          label={t('status.DRAFT')}
          size="small"
          sx={{
            fontWeight: 600,
            backgroundColor: 'rgba(158, 158, 158, 0.1)',
            color: 'text.secondary',
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
          {/* Action Row: Search and Create Button */}
          <Box mb={3} display="flex" justifyContent="space-between" alignItems="center" gap={2}>
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
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenCreate}
              sx={{ borderRadius: 2, px: 2.5, py: 1, fontWeight: 600 }}
            >
              {t('btnCreate')}
            </Button>
          </Box>

          {/* Notifications Table */}
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}
          >
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 60 }}>
                    {t('columns.stt')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', width: 220 }}>
                    {t('columns.title')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.main', minWidth: 260 }}>
                    {t('columns.content')}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: 'primary.main', width: 130, textAlign: 'center' }}
                  >
                    {t('columns.type')}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: 'primary.main', width: 150, textAlign: 'center' }}
                  >
                    {t('columns.target')}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: 'primary.main', width: 140, textAlign: 'center' }}
                  >
                    {t('columns.createdAt')}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: 'primary.main', width: 110, textAlign: 'center' }}
                  >
                    {t('columns.status')}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, color: 'primary.main', width: 80, textAlign: 'center' }}
                  >
                    {t('columns.actions')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.map((item, idx) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        {item.title}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                      {item.content.length > 90 ? `${item.content.slice(0, 90)}...` : item.content}
                    </TableCell>
                    <TableCell align="center">{renderTypeChip(item.type)}</TableCell>
                    <TableCell align="center">{renderTargetChip(item.target)}</TableCell>
                    <TableCell align="center" sx={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
                      {item.createdAt}
                    </TableCell>
                    <TableCell align="center">{renderStatusChip(item.status)}</TableCell>
                    <TableCell align="center">
                      <Tooltip title={t('tooltips.delete')}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteNotification(item.id)}
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
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {notifications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 3, color: 'text.secondary' }}>
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
            count={totalNotifications}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số hàng mỗi trang:"
            sx={{ borderTop: 'none', mt: 1 }}
          />
        </Card>
      </Box>

      {/* Create Notification Dialog */}
      <ModalCreateNotification
        open={openCreateModal}
        onClose={handleCloseCreate}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        type={type}
        setType={setType}
        target={target}
        setTarget={setTarget}
        errors={errors}
        onSend={handleSendNotification}
        onDraft={handleSaveDraft}
        t={t}
      />
    </Main>
  );
}
