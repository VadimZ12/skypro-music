export const formatDurationInMin = (duration: number) => {
  const durationMin = Math.floor(duration / 60);
  const durationSec = Math.floor(duration % 60);
  return `${durationMin}:${
    durationSec < 10 ? `0${durationSec}` : `${durationSec}`
  }`;
};