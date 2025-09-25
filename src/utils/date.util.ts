import dayjs from 'dayjs';

export const convertUTCDay = (value?: Date | string) => {
  let date = new Date();
  if (value) {
    date = new Date(value);
  }
  const dayName = dayjs(date).format('dddd');
  const day = dayjs(date).format('DD');
  const month = dayjs(date).format('MMMM');
  const year = dayjs(date).format('YYYY');
  return `${dayName} ${day} ${month}, ${year}`;
};

export const convertUTCDate = (value?: Date | string) => {
  let date = new Date();
  if (value) {
    date = new Date(value);
  }

  return dayjs(date).format('MMM-DD-YYYY');
};

export const convertDDMMYYYY = (value?: Date | string) => {
  let date = new Date();
  if (value) {
    date = new Date(value);
  }
  return dayjs(date).format('DD/MM/YYYY');
};

export const convertHHMMSSDDMMYYYY = (value?: Date | string) => {
  let date = new Date();
  if (value) {
    date = new Date(value);
  }
  return dayjs(date).format('HH:mm:ss DD/MM/YYYY');
};


export const convertHHMM = (value?: Date | string) => {
  let date = new Date();
  if (value) {
    date = new Date(value);
  }
  return dayjs(date).format('HH:mm');
};

export const formatSecondsToMMSS = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  const mm = String(minutes).padStart(2, '0')
  const ss = String(secs).padStart(2, '0')
  return `${mm}:${ss}`
}
