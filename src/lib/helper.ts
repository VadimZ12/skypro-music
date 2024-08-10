export function timer (value:number) {
    const currentMinutes = Math.floor(value / 60);
    const currentSeconds = Math.floor(value % 60);
    return `${currentMinutes}:${
      currentSeconds < 10 ? "0" + currentSeconds : currentSeconds
    }`
  }