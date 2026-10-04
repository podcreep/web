

export function formatTime(seconds): string {
  if (!seconds) {
    return "--:--";
  }

  const hours = Math.floor(seconds / 3600);
  const min = Math.floor((seconds - hours * 3600) / 60);
  const sec = Math.round(seconds - (min * 60) - (hours * 3600));
  let str = "";
  if (hours > 0) {
    str += hours + ":";
  }
  if (min < 10) {
    str += "0";
  }
  str += min + ":";
  if (sec < 10) {
    str += "0";
  }
  str += sec;
  return str;
}
