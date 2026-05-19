const ManagePatient = {
  title: 'Danh sách bệnh nhân',
  description:
    'Quản lý thông tin tài khoản bệnh nhân, theo dõi lịch sử đặt lịch và thực hiện khóa/mở khóa tài khoản chống spam.',
  searchPlaceholder: 'Tìm theo họ tên, số điện thoại...',
  noData: 'Không tìm thấy bệnh nhân nào.',
  columns: {
    stt: 'STT',
    fullName: 'Họ tên',
    phone: 'Số điện thoại',
    email: 'Email',
    status: 'Trạng thái',
    actions: 'Hành động',
  },
  status: {
    ACTIVE: 'Hoạt động',
    LOCKED: 'Đang khóa',
  },
  tooltips: {
    lock: 'Khóa tài khoản',
    unlock: 'Mở khóa tài khoản',
    history: 'Xem lịch sử đặt lịch',
  },
  messages: {
    lockSuccess: 'Đã khóa tài khoản của bệnh nhân {{name}} thành công.',
    unlockSuccess: 'Đã mở khóa tài khoản của bệnh nhân {{name}} thành công.',
  },
  historyModal: {
    title: 'Lịch sử đặt khám - Bệnh nhân: {{name}}',
    stats: {
      total: 'Tổng lịch đặt',
      completed: 'Thành công',
      cancelled: 'Đã hủy',
      noShow: 'Bùng hẹn (No-Show)',
    },
    table: {
      stt: 'STT',
      doctor: 'Bác sĩ',
      clinic: 'Phòng khám',
      dateTime: 'Ngày giờ khám',
      status: 'Trạng thái',
    },
    status: {
      COMPLETED: 'Thành công',
      CONFIRMED: 'Đã xác nhận',
      PENDING: 'Chờ duyệt',
      CANCELLED: 'Đã hủy',
      NO_SHOW: 'Bùng hẹn',
    },
    close: 'Đóng',
  },
};

export default ManagePatient;
