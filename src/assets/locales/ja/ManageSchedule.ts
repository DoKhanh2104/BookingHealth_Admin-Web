export default {
  title: 'Quản lý lịch làm việc',
  description:
    'Duyệt đơn nghỉ phép bác sĩ, theo dõi lịch trực toàn hệ thống và cấu hình khung giờ chuẩn',
  tabs: {
    leaveApproval: 'Duyệt nghỉ phép',
    workSchedule: 'Theo dõi lịch trực toàn sàn',
    timeSlotConfig: 'Cấu hình khung giờ',
  },
  leaveApproval: {
    title: 'Duyệt yêu cầu nghỉ phép của Bác sĩ',
    description:
      'Bác sĩ báo nghỉ phép cần được Admin phê duyệt để hệ thống tự động khóa lịch khám tương ứng.',
    statusFilter: 'Lọc trạng thái',
    allStatuses: 'Tất cả trạng thái',
    status: {
      PENDING: 'Chờ duyệt',
      APPROVED: 'Đã duyệt',
      REJECTED: 'Đã từ chối',
    },
    columns: {
      stt: 'STT',
      doctorName: 'Tên bác sĩ',
      clinicName: 'Phòng khám',
      startDate: 'Ngày bắt đầu',
      endDate: 'Ngày kết thúc',
      reason: 'Lý do nghỉ',
      status: 'Trạng thái',
      actions: 'Hành động',
    },
    buttons: {
      approveTooltip: 'Phê duyệt đơn nghỉ phép',
      rejectTooltip: 'Từ chối đơn nghỉ phép',
    },
    messages: {
      approveSuccess: 'Đã duyệt đơn nghỉ phép của bác sĩ {name} thành công!',
      rejectSuccess: 'Đã từ chối đơn nghỉ phép của bác sĩ {name}!',
    },
  },
  workSchedule: {
    title: 'Theo dõi lịch làm việc toàn hệ thống',
    description:
      'Master Schedule hiển thị tổng quan bác sĩ đang mở lịch trực theo ngày và phòng khám (View-only)',
    filters: {
      clinic: 'Chọn phòng khám',
      doctor: 'Chọn bác sĩ',
      date: 'Chọn ngày khám',
      allClinics: 'Tất cả phòng khám',
      allDoctors: 'Tất cả bác sĩ',
    },
    columns: {
      stt: 'STT',
      doctorName: 'Bác sĩ',
      clinicName: 'Phòng khám',
      date: 'Ngày khám',
      timeSlots: 'Các khung giờ hoạt động',
    },
    viewOnlyBadge: 'Chỉ xem',
  },
  timeSlotConfig: {
    title: 'Cấu hình Khung giờ hệ thống',
    description:
      'Định nghĩa khung giờ khám chuẩn cho toàn sàn. Thời gian khám thường cách nhau 30 phút.',
    columns: {
      stt: 'STT',
      code: 'Mã khung giờ',
      startTime: 'Thời gian bắt đầu',
      endTime: 'Thời gian kết thúc',
      status: 'Trạng thái',
      actions: 'Thao tác',
    },
    buttons: {
      addSlot: 'Thêm khung giờ mới',
      deactivate: 'Tắt hoạt động',
      activate: 'Bật hoạt động',
    },
    status: {
      active: 'Đang áp dụng',
      inactive: 'Ngưng áp dụng',
    },
    modals: {
      addTitle: 'Thêm Khung Giờ Mới',
      code: 'Mã khung giờ (Ví dụ: KG09)',
      startTime: 'Thời gian bắt đầu (Giờ:Phút)',
      endTime: 'Thời gian kết thúc (Giờ:Phút)',
      cancel: 'Hủy bỏ',
      submit: 'Tạo mới',
      validation: {
        required: 'Vui lòng điền đầy đủ thông tin!',
        timeCompare: 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu!',
        codeDuplicate: 'Mã khung giờ này đã tồn tại!',
      },
      success: 'Thêm mới khung giờ {code} thành công!',
    },
    messages: {
      toggleSuccess: 'Cập nhật trạng thái khung giờ thành công!',
    },
  },
  buttons: {
    search: 'Tìm kiếm',
    close: 'Đóng',
    save: 'Lưu',
  },
  noData: 'Không tìm thấy dữ liệu phù hợp',
};
