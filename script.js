const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeEls = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countDownTitle = '';
let countDownDate = '';
let countdownValue = Date;
let countdownActive;

const sec = 1000; // milliseconds
const min = sec * 60;
const hr = min * 60;
const day = hr * 24;

const setDatePickerMin = () => {
  const todayString = new Date().toISOString().split('T')[0];
  dateEl.setAttribute('min', todayString);
};

const updateDOM = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    // Hide input
    inputContainer.hidden = true;

    // If countdown ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countDownTitle} Finished on ${countDownDate}`;
      completeEl.hidden = false;
    } else {
      const days = Math.floor(distance / day);
      const hrs = Math.floor((distance % day) / hr);
      const mins = Math.floor((distance % hr) / min);
      const seconds = Math.floor((distance % min) / sec);

      countdownElTitle.textContent = countDownTitle;
      timeEls[0].textContent = days;
      timeEls[1].textContent = hrs;
      timeEls[2].textContent = mins;
      timeEls[3].textContent = seconds;

      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, 1000);
};

const updateCountdown = (e) => {
  e.preventDefault();

  // Pulling data from submitted forms
  countDownTitle = e.target[0].value;
  countDownDate = e.target[1].value;

  if (!countDownDate) return;

  countdownValue = new Date(countDownDate).getTime();

  updateDOM();
};

const resetCountdown = () => {
  completeEl.hidden = true;
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  countDownTitle = '';
  countDownDate = '';
};

// Event listeners
window.addEventListener('load', setDatePickerMin);

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', resetCountdown);
completeBtn.addEventListener('click', resetCountdown);
