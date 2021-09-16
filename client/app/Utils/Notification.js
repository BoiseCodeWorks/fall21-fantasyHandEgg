export function toast(title = 'Your player has been removed', icon = 'success') {
  // eslint-disable-next-line no-undef
  Swal.fire({
    position: 'top-right',
    icon: icon,
    toast: true,
    title: title,
    showConfirmButton: false,
    timer: 1500
  })
}
