import Swal from 'sweetalert2';

export function warningToastAlert(message) {
  return Swal.fire({
    position: 'top-end',
    icon: 'warning',
    text: message,
    showConfirmButton: false,
    timer: 4000,
    // backdrop: false,
    toast: true,
  });
}

export function errorToastAlert(message) {
  return Swal.fire({
    position: 'top-end',
    icon: 'error',
    text: message,
    showConfirmButton: false,
    timer: 4000,
    // backdrop: false,
    toast: true,
  });
}

export function successToastAlert(message) {
  return Swal.fire({
    position: 'top-end',
    icon: 'success',
    text: message,
    showConfirmButton: false,
    timer: 4000,
    // backdrop: false,
    toast: true,
  });
}
