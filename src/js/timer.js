import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { split } from 'postcss/lib/list';

const timerButton = document.querySelector('.timerButton');

let selectedDate = null;

flatpickr('.timerInput', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if (selectedDate < Date.now()) {
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'bottomRight',
                timeout: 3000,
            });
            timerButton.disabled = true;
        } else {
            timerButton.disabled = false;
        }
    },
});

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

timerButton.addEventListener('click', () => {
    timerButton.disabled = true;
    const timer = setInterval(() => {
        const time = selectedDate - Date.now();
        const { days, hours, minutes, seconds } = convertMs(time);
        // console.log(splitSeconds);
        document.querySelector('[data-days]').textContent =
            String(days).length > 1 ? days : '0' + days;
        document.querySelector('[data-hours]').textContent =
            String(hours).length > 1 ? hours : '0' + hours;
        document.querySelector('[data-minutes]').textContent =
            String(minutes).length > 1 ? minutes : '0' + minutes;
        document.querySelector('[data-seconds]').textContent =
            String(seconds).length > 1 ? seconds : '0' + seconds;
        if (time < 1000) {
            clearInterval(timer);
        }
    });
});
