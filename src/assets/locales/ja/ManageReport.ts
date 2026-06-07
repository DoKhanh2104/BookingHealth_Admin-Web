const ManageReport = {
  title: 'Báo cáo & Đối soát',
  description:
    'Theo dõi báo cáo doanh thu tài chính, hiệu suất vận hành hệ thống, tỷ lệ hủy lịch và tổng kết phản hồi đánh giá chất lượng.',
  filters: {
    title: 'Bộ lọc báo cáo',
    fromDate: 'Từ ngày',
    toDate: 'Đến ngày',
    specialty: 'Chuyên khoa',
    clinic: 'Phòng khám',
    allSpecialties: 'Tất cả chuyên khoa',
    allClinics: 'Tất cả phòng khám',
  },
  tabs: {
    financial: 'Doanh thu & Đối soát',
    performance: 'Hiệu suất vận hành',
    satisfaction: 'Đánh giá chất lượng',
  },
  btnExport: 'Xuất Báo Cáo Excel Doanh Thu',
  noData: 'Không có dữ liệu báo cáo trong khoảng thời gian đã chọn.',
  financial: {
    totalRevenue: 'Tổng doanh thu đối soát',
    totalTx: 'Tổng số giao dịch thành công',
    avgTxValue: 'Giá trị khám trung bình',
    columns: {
      stt: 'STT',
      appointmentId: 'Mã lịch hẹn',
      patientName: 'Bệnh nhân',
      doctorName: 'Bác sĩ',
      amount: 'Số tiền khám',
      paymentMethod: 'Phương thức',
      paymentTime: 'Thời gian thanh toán',
    },
    methods: {
      CASH: 'Tiền mặt',
      VNPAY: 'VNPay',
    },
  },
  performance: {
    summary: 'Phân tích tỷ lệ hủy lịch nhằm theo dõi bùng lịch và tối ưu hóa vận hành hệ thống.',
    columns: {
      stt: 'STT',
      name: 'Chuyên khoa / Bác sĩ',
      total: 'Tổng ca đặt',
      completed: 'Khám thành công',
      cancelled: 'Số ca bị hủy',
      cancelRate: 'Tỷ lệ hủy',
    },
    warning: 'Tỷ lệ hủy cao!',
  },
  satisfaction: {
    summary:
      'Đánh giá năng lực chuyên môn và thái độ dịch vụ của các bác sĩ qua phản hồi từ bệnh nhân.',
    columns: {
      stt: 'STT',
      doctorName: 'Bác sĩ',
      specialtyName: 'Chuyên khoa',
      totalReviews: 'Tổng lượt đánh giá',
      averageRating: 'Điểm số trung bình',
      negativeReviews: 'Đánh giá 1-2⭐',
    },
    flag: 'Cần cải thiện chất lượng!',
  },
  messages: {
    exportSuccess: 'Xuất tệp báo cáo Excel doanh thu thành công.',
    exportError: 'Không thể xuất tệp báo cáo Excel. Vui lòng thử lại sau.',
  },
  pagination: {
    rowsPerPage: 'Số hàng mỗi trang:',
  },
};

export default ManageReport;
