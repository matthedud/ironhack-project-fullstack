
class EndTImer {
  constructor(end) {
    this.end = end;
    this.intervalId = null;
  }

  start(clock) {
    this.intervalId = setInterval(() => {
      if (clock) {
        const timeLeft = this.end - new Date().getTime()
        const minutes = this.computeTwoDigitNumber(this.getMinutes(timeLeft));
        const seconds = this.computeTwoDigitNumber(this.getSeconds(timeLeft));
        this.printTime(clock, minutes, seconds);
      }
    }, 10);
  }

  getMinutes(timeLeft) {
    return Math.floor(timeLeft / 60000);
  }
  getSeconds(timeLeft) {
    return Math.floor((timeLeft % 60000) / 1000);
  }

  computeTwoDigitNumber(value) {
    const stringValue = value.toString();
    return stringValue.padStart(2,0);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  printTime(clock, minutes, seconds) {
    clock.textContent = `${minutes}:${seconds}`
  }
}

