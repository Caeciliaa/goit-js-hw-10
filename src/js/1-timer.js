import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: 'Y-m-d H:i',
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates);
  },
};

iziToast.settings({
  timeout: 2500,
  resetOnHover: true,
  icon: 'material-icons',
  class: 'custom-toast',
  icon: 'icon-person',
  color: '#ef4040',
  titleSize: '16px',
  titleColor: '#fff',
  titleLineHeight: '1.5',
  messageColor: '#fff',
  messageSize: '16px',
  messageLineHeight: '1.5',
  position: 'topRight',
  progressBarColor: '#b51b1b',
  theme: 'light',
  progressBar: true,
  close: false,
});

const startBtn = document.querySelector('[data-start]');
const TimeElements = {
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  days: document.querySelector('[data-days]'),
};

let userSelectedDate;
let interval;
startBtn.disabled = true;

const currentTime = new Date();

flatpickr('#datetime-picker', options);

function checkDate(selectedDates) {
  const selectedDate = selectedDates[0];
  if (selectedDate <= currentTime) {
    iziToast.show({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    startBtn.disabled = true;
  } else {
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  }
}

function updateTimer({ days, hours, minutes, seconds }) {
  TimeElements.days.textContent = String(days).padStart(2, '0');
  TimeElements.hours.textContent = String(hours).padStart(2, '0');
  TimeElements.minutes.textContent = String(minutes).padStart(2, '0');
  TimeElements.seconds.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
  interval = setInterval(() => {
    const now = new Date();
    const delta = userSelectedDate - now;

    if (delta <= 0) {
      clearInterval(interval);
      iziToast.success({
        title: 'Done',
        message: 'Time is up!',
      });
      return;
    }

    const timeLeft = convertMs(delta);
    updateTimer(timeLeft);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', startTimer);
