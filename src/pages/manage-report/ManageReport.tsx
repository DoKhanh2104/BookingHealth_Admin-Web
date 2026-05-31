import {
  Box,
  Card,
  Grid,
  Typography,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Download as DownloadIcon,
  TrendingUp as TrendingUpIcon,
  EventBusy as EventBusyIcon,
  Star as StarIcon,
  Assessment as AssessmentIcon,
  Money as MoneyIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import Main from '../../layouts/Main';
import { HeaderPage } from '../../components/HeaderPage';
import { useManageReportHooks } from './ManageReport.hooks';

export default function ManageReport() {
  const {
    t,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    specialtyId,
    setSpecialtyId,
    clinicId,
    setClinicId,
    tabValue,
    handleTabChange,
    loading,
    specialties,
    clinics,
    financialData,
    performanceData,
    satisfactionData,
    handleExportExcel,
    financialMetrics,
  } = useManageReportHooks();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <Main>
      <HeaderPage title={t('title')} description={t('description')} />

      {/* 1. Master Filter Bar */}
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.04)',
          p: 3,
          mb: 4,
          border: '1px solid #e2e8f0',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: '#334155',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <AssessmentIcon fontSize="small" sx={{ color: 'primary.main' }} />
          {t('filters.title')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label={t('filters.fromDate')}
              type="date"
              fullWidth
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label={t('filters.toDate')}
              type="date"
              fullWidth
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              label={t('filters.specialty')}
              fullWidth
              value={specialtyId}
              onChange={(e) => setSpecialtyId(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
            >
              <MenuItem value="all">{t('filters.allSpecialties')}</MenuItem>
              {specialties.map((spec) => (
                <MenuItem key={spec.id} value={spec.id}>
                  {spec.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              label={t('filters.clinic')}
              fullWidth
              value={clinicId}
              onChange={(e) => setClinicId(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
            >
              <MenuItem value="all">{t('filters.allClinics')}</MenuItem>
              {clinics.map((cli) => (
                <MenuItem key={cli.id} value={cli.id}>
                  {cli.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Card>

      {/* 2. Interactive MUI Tabs Selection */}
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: '#e2e8f0', bgcolor: '#f8fafc', px: 2, pt: 1 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="system metrics reports tabs"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: 15,
                minHeight: 48,
                textTransform: 'none',
                pb: 1.5,
                color: '#64748b',
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            <Tab label={t('tabs.financial')} value="financial" />
            <Tab label={t('tabs.performance')} value="performance" />
            <Tab label={t('tabs.satisfaction')} value="satisfaction" />
          </Tabs>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
            <CircularProgress size={45} color="primary" />
          </Box>
        ) : (
          <Box p={3}>
            {/* TAB 1: Financial Audit */}
            {tabValue === 'financial' && (
              <Box>
                {/* Financial Metric Cards Grid */}
                <Grid container spacing={3} mb={4}>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        borderRadius: 3.5,
                        p: 3,
                        bgcolor: 'rgba(26, 113, 180, 0.04)',
                        border: '1px solid rgba(26, 113, 180, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2.5,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          bgcolor: 'primary.main',
                          color: '#fff',
                          display: 'flex',
                        }}
                      >
                        <MoneyIcon />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                          {t('financial.totalRevenue')}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 800, color: '#1e293b', mt: 0.5 }}
                        >
                          {formatCurrency(financialMetrics.totalRevenue)}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        borderRadius: 3.5,
                        p: 3,
                        bgcolor: 'rgba(16, 185, 129, 0.04)',
                        border: '1px solid rgba(16, 185, 129, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2.5,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          bgcolor: '#10b981',
                          color: '#fff',
                          display: 'flex',
                        }}
                      >
                        <ReceiptIcon />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                          {t('financial.totalTx')}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 800, color: '#1e293b', mt: 0.5 }}
                        >
                          {financialMetrics.totalTransactions}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        borderRadius: 3.5,
                        p: 3,
                        bgcolor: 'rgba(245, 158, 11, 0.04)',
                        border: '1px solid rgba(245, 158, 11, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2.5,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          bgcolor: '#f59e0b',
                          color: '#fff',
                          display: 'flex',
                        }}
                      >
                        <TrendingUpIcon />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                          {t('financial.avgTxValue')}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 800, color: '#1e293b', mt: 0.5 }}
                        >
                          {formatCurrency(financialMetrics.avgValue)}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>

                {/* Table Title and Export Button Container */}
                <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#334155' }}>
                    {t('tabs.financial')}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handleExportExcel}
                    sx={{
                      borderRadius: 2.5,
                      textTransform: 'none',
                      fontWeight: 700,
                      bgcolor: '#10b981',
                      '&:hover': { bgcolor: '#059669' },
                      boxShadow: 'none',
                    }}
                  >
                    {t('btnExport')}
                  </Button>
                </Box>

                {/* Audit Grid Table */}
                <TableContainer
                  component={Paper}
                  sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #e2e8f0' }}
                >
                  <Table>
                    <TableHead sx={{ bgcolor: '#f8fafc' }}>
                      <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('financial.columns.stt')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('financial.columns.appointmentId')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('financial.columns.patientName')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('financial.columns.doctorName')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('financial.columns.amount')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('financial.columns.paymentMethod')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('financial.columns.paymentTime')}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {financialData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 6, color: '#94a3b8' }}>
                            {t('noData')}
                          </TableCell>
                        </TableRow>
                      ) : (
                        financialData.map((row, index) => (
                          <TableRow
                            key={row.appointmentId}
                            hover
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="center" sx={{ color: '#64748b', fontWeight: 500 }}>
                              {index + 1}
                            </TableCell>
                            <TableCell sx={{ color: '#475569', fontWeight: 600 }}>
                              {row.appointmentId}
                            </TableCell>
                            <TableCell sx={{ color: '#1e293b', fontWeight: 600 }}>
                              {row.patientName}
                            </TableCell>
                            <TableCell sx={{ color: '#475569', fontWeight: 500 }}>
                              {row.doctorName}
                            </TableCell>
                            <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>
                              {formatCurrency(row.amount)}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={row.paymentMethod}
                                size="small"
                                sx={{
                                  fontWeight: 700,
                                  bgcolor: 'rgba(16, 185, 129, 0.08)',
                                  color: '#10b981',
                                  border: '1px solid rgba(16, 185, 129, 0.15)',
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ color: '#64748b', fontSize: 13 }}>
                              {row.paymentTime
                                ? new Date(row.paymentTime).toLocaleString('vi-VN')
                                : ''}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* TAB 2: Operational Performance */}
            {tabValue === 'performance' && (
              <Box>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 3, fontSize: 14 }}>
                  {t('performance.summary')}
                </Typography>

                <TableContainer
                  component={Paper}
                  sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #e2e8f0' }}
                >
                  <Table>
                    <TableHead sx={{ bgcolor: '#f8fafc' }}>
                      <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('performance.columns.stt')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('performance.columns.name')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('performance.columns.total')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('performance.columns.completed')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('performance.columns.cancelled')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('performance.columns.cancelRate')}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {performanceData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 6, color: '#94a3b8' }}>
                            {t('noData')}
                          </TableCell>
                        </TableRow>
                      ) : (
                        performanceData.map((row, index) => {
                          const isHighCancelRate = row.cancelRate > 20;
                          return (
                            <TableRow
                              key={row.id}
                              hover
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell align="center" sx={{ color: '#64748b', fontWeight: 500 }}>
                                {index + 1}
                              </TableCell>
                              <TableCell sx={{ color: '#1e293b', fontWeight: 600 }}>
                                {row.doctorOrSpecialtyName}
                              </TableCell>
                              <TableCell sx={{ color: '#475569', fontWeight: 600 }}>
                                {row.total}
                              </TableCell>
                              <TableCell sx={{ color: '#10b981', fontWeight: 600 }}>
                                {row.completed}
                              </TableCell>
                              <TableCell sx={{ color: '#ef4444', fontWeight: 600 }}>
                                {row.cancelled}
                              </TableCell>
                              <TableCell>
                                <Box display="flex" alignItems="center" gap={1.5}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 800,
                                      color: isHighCancelRate ? '#ef4444' : '#475569',
                                    }}
                                  >
                                    {row.cancelRate}%
                                  </Typography>
                                  {isHighCancelRate && (
                                    <Chip
                                      icon={
                                        <EventBusyIcon
                                          sx={{ '&&': { color: '#ef4444', fontSize: 13 } }}
                                        />
                                      }
                                      label={t('performance.warning')}
                                      size="small"
                                      sx={{
                                        fontWeight: 700,
                                        bgcolor: 'rgba(239, 68, 68, 0.08)',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.15)',
                                        fontSize: 11,
                                      }}
                                    />
                                  )}
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* TAB 3: Satisfaction Quality Report */}
            {tabValue === 'satisfaction' && (
              <Box>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 3, fontSize: 14 }}>
                  {t('satisfaction.summary')}
                </Typography>

                <TableContainer
                  component={Paper}
                  sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #e2e8f0' }}
                >
                  <Table>
                    <TableHead sx={{ bgcolor: '#f8fafc' }}>
                      <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('satisfaction.columns.stt')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('satisfaction.columns.doctorName')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('satisfaction.columns.specialtyName')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('satisfaction.columns.totalReviews')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('satisfaction.columns.averageRating')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#475569' }}>
                          {t('satisfaction.columns.negativeReviews')}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {satisfactionData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 6, color: '#94a3b8' }}>
                            {t('noData')}
                          </TableCell>
                        </TableRow>
                      ) : (
                        satisfactionData.map((row, index) => {
                          const isLowSatisfaction = row.averageRating < 3.5;
                          return (
                            <TableRow
                              key={row.id}
                              hover
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell align="center" sx={{ color: '#64748b', fontWeight: 500 }}>
                                {index + 1}
                              </TableCell>
                              <TableCell sx={{ color: '#1e293b', fontWeight: 600 }}>
                                {row.doctorName}
                              </TableCell>
                              <TableCell sx={{ color: '#475569', fontWeight: 500 }}>
                                {row.specialtyName}
                              </TableCell>
                              <TableCell sx={{ color: '#475569', fontWeight: 600 }}>
                                {row.totalReviews}
                              </TableCell>
                              <TableCell>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Box display="flex" alignItems="center" sx={{ color: '#f59e0b' }}>
                                    <StarIcon fontSize="small" />
                                    <Typography
                                      variant="body2"
                                      sx={{ ml: 0.5, fontWeight: 800, color: '#1e293b' }}
                                    >
                                      {row.averageRating}
                                    </Typography>
                                  </Box>
                                  {isLowSatisfaction && (
                                    <Chip
                                      label={t('satisfaction.flag')}
                                      size="small"
                                      sx={{
                                        fontWeight: 700,
                                        bgcolor: 'rgba(239, 68, 68, 0.08)',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.15)',
                                        fontSize: 11,
                                      }}
                                    />
                                  )}
                                </Box>
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: row.negativeReviews > 0 ? '#ef4444' : '#64748b',
                                  fontWeight: 700,
                                }}
                              >
                                {row.negativeReviews}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        )}
      </Card>
    </Main>
  );
}
