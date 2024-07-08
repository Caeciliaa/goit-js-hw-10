import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  timeout: 2500,
  resetOnHover: true,
  icon: false,
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

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(event.target.delay.value);
  const state = event.target.state.value;

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        message: ` ✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: '#34c540',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: '#d85858',
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
