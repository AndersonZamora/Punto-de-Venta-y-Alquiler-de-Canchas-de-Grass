import Swal from 'sweetalert2';

export const successAlert = (message: string) => {
    Swal.fire({
        icon: "success",
        timer: 5000,
        title: message,
        showConfirmButton: true
    });
}

export const errorAlert = (message: string) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 9000,
        text: message,
    });
}

export const loadingAlert = (message: string) => {

    Swal.fire({
        title: message,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        },
    })
}

export const closeAlert = () => Swal.close();


