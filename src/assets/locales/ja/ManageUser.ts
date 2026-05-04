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
    inactive: 'Tạm dừng',
    banned: 'Bị cấm',
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
      validation: {
        nameRequired: 'Tên người dùng không được để trống',
        emailRequired: 'Email không được để trống',
        emailInvalid: 'Địa chỉ email không đúng định dạng',
        phoneRequired: 'Số điện thoại không được để trống',
        phoneInvalid: 'Số điện thoại phải từ 10-11 số',
        passwordRequired: 'Mật khẩu không được để trống',
        passwordMin: 'Mật khẩu phải có ít nhất 8 ký tự',
      },
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
        user: 'Người dùng',
        admin: 'Admin',
        doctor: 'Bác sĩ',
      },
      status: {
        label: 'Trạng thái',
        active: 'Hoạt động',
        inactive: 'Tạm dừng',
        banned: 'Bị cấm',
      },
    },
    buttons: {
      cancel: 'Hủy bỏ',
      submit: 'Lưu thay đổi',
    },
    messages: {
      success: 'Cập nhật thành công!',
      connectionError: 'Có lỗi xảy ra khi kết nối đến máy chủ!',
      invalidInput: 'Thông tin nhập vào không hợp lệ!',
      delete: 'Xóa tài khoản thành công!',
    },
  },
  ModalConfirm: {
    delete: {
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa tài khoản này không? Hành động này không thể hoàn tác.',
      confirm: 'Xác nhận xóa',
      cancel: 'Hủy bỏ',
    },
  },
};
