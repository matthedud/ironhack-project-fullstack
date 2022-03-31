
class Chronometer {
  constructor(timeLeft= gameLength) {
    this.timeLeft = timeLeft;
    this.currentTime = 0;
    this.intervalId = null;
  }

  start(clock) {
    console.log('start');
    this.intervalId = setInterval(() => {
      this.timeLeft--;
      this.currentTime++
      if (clock) {
        const minutes = this.computeTwoDigitNumber(this.getMinutes());
        const seconds = this.computeTwoDigitNumber(this.getSeconds());
        const milliSeconds = this.computeTwoDigitNumber(this.getMilliSeconds());
        this.printTime(clock, minutes, seconds, milliSeconds);
      }
    }, 10);// precision au centieme de second
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

  printTime(clock, minutes, seconds, milliSeconds) {
    clock.textContent = `${minutes}:${seconds}:${milliSeconds}`
  }
  
  split() {
    const minutes = this.computeTwoDigitNumber(this.getMinutes());
    const secondes = this.computeTwoDigitNumber(this.getSeconds());
    const milliSeconds = this.computeTwoDigitNumber(this.getMilliSeconds());
    return `${minutes}:${secondes}:${milliSeconds}`;
  }
}

