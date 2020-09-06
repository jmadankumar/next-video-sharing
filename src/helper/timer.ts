export function formatTimer(time: number): string {
  let formatedTime = '';
  const timeInSeconds = Math.round(time);
  const seconds = timeInSeconds % 60;

  if (seconds) {
    formatedTime = ((seconds + '').length > 1 ? seconds : '0' + seconds) + formatedTime;
  } else {
    formatedTime = '00';
  }

  const minutes = Math.floor(timeInSeconds / 60);
  const formatedMinutes = minutes % 60;

  if (formatedMinutes) {
    formatedTime = formatedMinutes + ':' + formatedTime;
  } else {
    formatedTime = '00' + ':' + formatedTime;
  }

  const hours = Math.floor(minutes / 60);

  if (hours) {
    formatedTime = hours + ':' + formatedTime;
  }

  return formatedTime || '00:00';
}
