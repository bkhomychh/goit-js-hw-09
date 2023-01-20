import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const startBtnRef = document.querySelector('[data-start]');
const valueDaysRef = document.querySelector('[data-days]');
const valueHoursRef = document.querySelector('[data-hours]');
const valueMinutesRef = document.querySelector('[data-minutes]');
const valueSecondsRef = document.querySelector('[data-seconds');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (!isDateValid(selectedDates[0])) {
      showError();
      return;
    }
    startBtnRef.disabled = false;
  },
};
const datePicker = flatpickr('#datetime-picker', options);

startBtnRef.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  const selectedDate = datePicker.selectedDates[0];

  //* Check the date again, because time may have passed
  if (!isDateValid(selectedDate)) {
    showError();
    return;
  }

  startBtnRef.disabled = true;

  const intervalId = setInterval(() => {
    const msDifference = selectedDate - Date.now();

    if (msDifference < 0) {
      clearInterval(intervalId);
      return;
    }

    const timeSet = convertMs(msDifference);

    valueDaysRef.textContent = addLeadingZero(timeSet.days);
    valueHoursRef.textContent = addLeadingZero(timeSet.hours);
    valueMinutesRef.textContent = addLeadingZero(timeSet.minutes);
    valueSecondsRef.textContent = addLeadingZero(timeSet.seconds);
  }, 1000);
}

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

function isDateValid(date) {
  if (date - Date.now() <= 0) {
    return false;
  }
  return true;
}

function showError() {
  Notify.failure('Please choose a date in the future');
  startBtnRef.disabled = true;
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
