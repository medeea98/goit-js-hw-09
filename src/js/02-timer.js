import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const elements = {
  startBtn: document.querySelector('[data-start]'),
  datePicker: document.querySelector('#datetime-picker'),
  countdownDisplay: {
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]')
  }
};
let timer = null;
const datePicker = flatpickr(elements.datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0].getTime();
    if (chosenDate <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      elements.startBtn.disabled = true;
      return;
    }
    elements.startBtn.disabled = false;
    elements.startBtn.addEventListener('click', () => initiateCountdown(chosenDate));
  }
});
function initiateCountdown(targetTime) {
  elements.startBtn.disabled = true;
  timer = setInterval(() => {
    const presentTime = Date.now();
    const remainingTime = targetTime - presentTime;
    if (remainingTime <= 0) {
      clearInterval(timer);
      Notiflix.Notify.success('The countdown has finished!');
      return;
    }
    refreshDisplay(remainingTime);
  }, 1000);
}
function refreshDisplay(time) {
  const timeParts = convertMilliseconds(time);
  Object.keys(timeParts).forEach(part => {
    elements.countdownDisplay[`${part}El`].textContent = formatWithZero(timeParts[part]);
  });
}
function convertMilliseconds(milliseconds) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(milliseconds / day),
    hours: Math.floor((milliseconds % day) / hour),
    minutes: Math.floor((milliseconds % day % hour) / minute),
    seconds: Math.floor((milliseconds % day % hour % minute) / second)
  };
}
function formatWithZero(value) {
  return String(value).padStart(2, '0');
}
