import Notiflix from 'notiflix';
document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault();
  const delay = parseInt(this.delay.value, 10);
  const step = parseInt(this.step.value, 10);
  const amount = parseInt(this.amount.value, 10);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + step * (i - 1))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.3 ? resolve({ position, delay }) : reject({ position, delay });
    }, delay);
  });
}
