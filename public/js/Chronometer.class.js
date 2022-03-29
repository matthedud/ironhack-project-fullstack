const clockEl = document.getElementById("clock")
const gameLength = 100*60 //1 minute


class Chronometer {
  constructor(timeLeft= gameLength) {
    this.timeLeft = timeLeft;
    this.currentTime = 0;
    this.intervalId = null;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.timeLeft--;
      this.currentTime++
      if (clockEl) {
        const minutes = this.computeTwoDigitNumber(this.getMinutes());
        const seconds = this.computeTwoDigitNumber(this.getSeconds());
        const milliSeconds = this.computeTwoDigitNumber(this.getMilliSeconds());
        this.printTime(clockEl, minutes, seconds, milliSeconds);
      }
    }, 10);
  }

  getMinutes() {
    return Math.floor(this.timeLeft / 6000);
  }
  getSeconds() {
    return Math.floor((this.timeLeft % 6000) / 100);
  }
  getMilliSeconds() {
    return (this.timeLeft % 6000) % 100;
  }

  computeTwoDigitNumber(value) {
    const stringValue = value.toString();
    return stringValue.padStart(2,0);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  reset(printTime) {
    this.timeLeft = 0;
    if (printTime) {
      printTime('00', '00', '00');
    }
  }

  printTime(clockEl, minutes, seconds, milliSeconds) {
    clockEl.textContent = `${minutes}:${seconds}:${milliSeconds}`
  }
  
  split() {
    const minutes = this.computeTwoDigitNumber(this.getMinutes());
    const secondes = this.computeTwoDigitNumber(this.getSeconds());
    const milliSeconds = this.computeTwoDigitNumber(this.getMilliSeconds());
    return `${minutes}:${secondes}:${milliSeconds}`;
  }
}

