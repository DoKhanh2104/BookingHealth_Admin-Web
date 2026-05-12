export default {
  title: 'Quản lý Chuyên khoa',
  description: 'Quản lý danh sách chuyên khoa',
  columns: {
    id: 'ID',
    name: 'Tên chuyên khoa',
    description: 'Mô tả',
    actions: 'Hành động',
  },
  buttons: {
    create: 'Thêm chuyên khoa',
    edit: 'Sửa',
    delete: 'Xóa',
    cancel: 'Hủy',
    save: 'Lưu',
  },
  modals: {
    createTitle: 'Thêm Chuyên Khoa Mới',
    editTitle: 'Cập nhật Chuyên Khoa',
    deleteTitle: 'Xác nhận xóa',
    deleteContent:
      'Bạn có chắc chắn muốn xóa chuyên khoa này không? Hành động này không thể hoàn tác.',
  },
  validation: {
    nameRequired: 'Tên chuyên khoa không được để trống',
  },
  messages: {
    fetchSuccess: 'Tải danh sách thành công',
    fetchError: 'Lỗi khi tải danh sách',
    createSuccess: 'Thêm chuyên khoa thành công',
    createError: 'Lỗi khi thêm chuyên khoa',
    updateSuccess: 'Cập nhật chuyên khoa thành công',
    updateError: 'Lỗi khi cập nhật chuyên khoa',
    deleteSuccess: 'Xóa chuyên khoa thành công',
    deleteError: 'Lỗi khi xóa chuyên khoa',
  },
};
