const ManageNotification = {
  title: 'Quản lý thông báo',
  description:
    'Gửi thông báo, tin tức và cảnh báo hệ thống đến các nhóm đối tượng người dùng khác nhau (Bác sĩ, Bệnh nhân).',
  searchPlaceholder: 'Tìm theo tiêu đề thông báo...',
  noData: 'Không tìm thấy thông báo nào.',
  btnCreate: 'Tạo thông báo mới',
  columns: {
    stt: 'STT',
    title: 'Tiêu đề',
    content: 'Nội dung',
    type: 'Loại thông báo',
    target: 'Đối tượng nhận',
    createdAt: 'Ngày tạo',
    status: 'Trạng thái',
    actions: 'Hành động',
  },
  types: {
    SYSTEM: 'Hệ thống',
    PROMOTION: 'Khuyến mãi',
    MAINTENANCE: 'Bảo trì',
  },
  targets: {
    ALL: 'Tất cả người dùng',
    DOCTOR: 'Chỉ bác sĩ',
    PATIENT: 'Chỉ bệnh nhân',
  },
  status: {
    SENT: 'Đã gửi',
    DRAFT: 'Nháp',
  },
  tooltips: {
    delete: 'Xóa thông báo',
  },
  messages: {
    createSuccess: 'Đã gửi thông báo "{{title}}" đến nhóm đối tượng thành công.',
    draftSuccess: 'Đã lưu nháp thông báo "{{title}}" thành công.',
    deleteSuccess: 'Xóa thông báo thành công.',
    confirmDelete: 'Bạn có chắc chắn muốn xóa thông báo này không?',
  },
  createModal: {
    title: 'Tạo thông báo mới',
    titleField: 'Tiêu đề thông báo',
    contentField: 'Nội dung chi tiết',
    typeField: 'Loại thông báo',
    targetField: 'Đối tượng nhận',
    statusField: 'Trạng thái',
    placeholders: {
      title: 'Nhập tiêu đề thông báo ngắn gọn...',
      content: 'Nhập nội dung thông điệp chi tiết gửi đến người dùng...',
    },
    validation: {
      required: 'Trường này là bắt buộc.',
      titleRequired: 'Vui lòng nhập tiêu đề thông báo.',
      contentRequired: 'Vui lòng nhập nội dung thông báo.',
    },
    btnCancel: 'Hủy',
    btnDraft: 'Lưu nháp',
    btnSend: 'Gửi thông báo',
  },
};

export default ManageNotification;
