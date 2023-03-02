import Swal from "../../node_modules/sweetalert2/src/sweetalert2.js";

// Sử dụng thư viện SweetAlert2 để tạo các thông báo alert
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000
})

// Thông báo thực hiện thao tác thành công
export function alertSuccess(alert) {
    return Toast.fire({
        icon: 'success',
        title: alert
    })
}


// Thông báo thực hiện thao tác thất bại
export function alertFail(alert) {
    return Toast.fire({
        icon: 'error',
        title: alert
    })
}


// Thông báo xác nhận xóa data
export function warningDelete() {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
    });
}