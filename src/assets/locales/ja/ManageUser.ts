export default {
  title: 'Quản lý người dùng',
  description: 'Danh sách tất cả người dùng trong hệ thống',
  buttonAdd: 'Thêm',
  noData: 'Không tìm thấy người dùng nào',
  searchPlaceholder: 'Tìm kiếm tên, email hoặc số điện thoại...',
  filterLabel: 'Trạng thái',
  filterOptions: {
    all: 'Tất cả trạng thái',
    active: 'Hoạt động',
    inactive: 'Không hoạt động',
    banned: 'Đã chặn',
  },
  columns: {
    id: 'ID',
    name: 'Tên người dùng',
    email: 'Email',
    phoneNumber: 'Số điện thoại',
    role: 'Vai trò',
    status: 'Trạng thái',
    actions: 'Thao tác',
  },
  ModalCreate: {
    title: 'Tạo tài khoản mới',
    avatar: {
      caption: 'Nhấp vào biểu tượng để tải lên ảnh đại diện',
    },
    fields: {
      name: {
        label: 'Tên người dùng',
        placeholder: 'Nhập họ và tên đầy đủ',
      },
      email: {
        label: 'Email',
        placeholder: 'example@gmail.com',
      },
      phone: {
        label: 'Số điện thoại',
        placeholder: '098...',
      },
      password: {
        label: 'Mật khẩu',
        placeholder: '••••••••',
      },
    },
    buttons: {
      cancel: 'Hủy bỏ',
      submit: 'Tạo tài khoản',
      processing: 'Đang xử lý...',
    },
    messages: {
      success: 'Tạo tài khoản thành công!',
      connectionError: 'Có lỗi xảy ra khi kết nối đến máy chủ!',
      invalidInput: 'Thông tin nhập vào không hợp lệ!',
    },
  },
  ModalUpdate: {
    title: 'Chỉnh sửa thông tin',
    avatar: {
      caption: 'Thay đổi ảnh đại diện',
    },
    fields: {
      name: 'Tên người dùng',
      email: 'Email',
      phone: 'Số điện thoại',
      role: {
        label: 'Vai trò',
        user: 'User',
        admin: 'Admin',
        doctor: 'Bác sĩ',
      },
      status: {
        label: 'Trạng thái',
        active: 'Hoạt động',
        inactive: 'Không hoạt động',
      },
    },
    buttons: {
      cancel: 'Hủy bỏ',
      submit: 'Lưu thay đổi',
    },
  },
};
