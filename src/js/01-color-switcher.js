const start = document.querySelector("[data-start]")
const stop = document.querySelector("[data-stop]")
let colorChange = null;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
start.addEventListener('click', function() {
    if (colorChange !== null) {
        return;}
    
    colorChange = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    this.disabled = true; 
} )
  stop.addEventListener('click', function() {
    clearInterval(colorChange);
    colorChange = null;
    startButton.disabled = false; 
});