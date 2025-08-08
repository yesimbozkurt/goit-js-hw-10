import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { delay, state } = e.currentTarget.elements;
    const inputValue = Number(delay.value);
    const shouldResolve = state.value === 'fulfilled';

    const snackbar = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve(`✅ Fulfilled promise in ${inputValue}ms`,
                );
            } else {
                reject(`❌ Rejected promise in ${inputValue}ms`,
                );
            };
        }, inputValue);
    });
    snackbar
        .then((message) => {
            iziToast.success({
                title: 'Success',
                message: message,
                position: 'topRight',
                timeout: 3000,
            });
        })
        .catch((message) => {
            iziToast.error({
                title: 'Error',
                message: message,
                position: 'topRight',
                timeout: 3000,
            });
        });
    e.currentTarget.reset();
});
