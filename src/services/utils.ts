

export function formatTime(seconds): string {
  if (!seconds) {
    return "--:--";
  }

  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds - (min * 60));
  let str = "";
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
