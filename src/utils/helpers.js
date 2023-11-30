import { useEffect } from 'react';
import i18next from 'i18next';

function classNames(classes) {
  const toBeClasses = Object.keys(classes).map((key) =>
    classes[key] === true ? key : '',
  );
  return toBeClasses.join(' ');
}

function formatDate(date) {
  if (date && typeof date === 'string')
    date = parseInt(date);

  console.log(date);

  const dateFormat = new Date(date * 1000);
  const month = dateFormat.toLocaleString('default', { month: 'short' });
  const day = dateFormat.getDay();
  const year = dateFormat.getFullYear();

  return `${month} ${day}, ${year}`;
}

function formatTime(seconds) {
    // Calculate the whole minutes
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;

}
function timeDifference(previousTimestamp) {

  var current = new Date();
  var previousDate = new Date(previousTimestamp * 1000);
  var elapsed = current.getTime() - previousDate.getTime(); // Diferencia en milisegundos
  var seconds = Math.floor(elapsed / 1000); // Total de segundos
  var minutes = Math.floor(seconds / 60); // Total de minutos
  var hours = Math.floor(minutes / 60); // Total de horas
  var days = Math.floor(hours / 24); // Total de días
  var months = Math.floor(days / 30.44); // Aproximadamente 30.44 días en un mes
  var years = Math.floor(months / 12); // Total de años

  if (years > 0) {
    return years + (years === 1 ? ' year' : ' years') + ' ago';
  } else if (months > 0) {
    return months + (months === 1 ? ' month' : ' months') + ' ago';
  } else if (days > 0) {
    return days + (days === 1 ? ' day' : ' days') + ' ago';
  } else if (hours > 0) {
    return hours + (hours === 1 ? ' hour' : ' hours') + ' ago';
  } else if (minutes > 0) {
    return minutes + (minutes === 1 ? ' minute' : ' minutes') + ' ago';
  } else {
    return seconds + (seconds === 1 ? ' second' : ' seconds') + ' ago';
  }
}

function firstLetterUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
// function bytesToSize(bytes) {
//   if (!bytes) return '0 MB'

//   const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte'];

//   const navigatorLocal = navigator.languages && navigator.languages.length >= 0 ? navigator.languages[0] : 'en-US'
//   const unitIndex = Math.max(0, Math.min(Math.floor(Math.log(bytes) / Math.log(1000)), units.length - 1));

//   return Intl.NumberFormat(navigatorLocal, {
//     style: 'unit',
//     unit: units[unitIndex]
//   }).format(bytes / (1000 ** unitIndex))
// }

// function bytesToSize(bytes,decimalPoint) {
//   if(bytes == 0) return '0 Bytes';
//   var k = 1000,
//       dm = decimalPoint || 2,
//       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
//       i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
// }

function bytesToSize(bytes) {
  if (!bytes) return '0 MB';

  const k = bytes / (1024 ** 2);

  return parseFloat(k).toFixed(2) + ' MB';
}

const format = {
  /**
   * Format date to Mon D, YYYY
   * @param {number} date - Timestamp (1701282568)
   */
  date: (date) => {
    if (!date) return;
    if (typeof date === 'string') date = parseInt(date);
  
    const dateObj = new Date(date * 1000);
    const today = new Date();

    const timeDiff = today.getTime() - dateObj.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff < 1) {
      const hoursDiff = Math.abs(today - dateObj) / 36e5;

      return `${i18next.t("global.hours", { count: Math.floor(hoursDiff) })}`
    } else if (daysDiff < 7 ) {
      return `${i18next.t("global.days", { count: Math.floor(daysDiff) })}`
    } else {
      const month = dateObj.getMonth();
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();
    
      return `${i18next.t(`global.months.${month}`)} ${day}, ${year}`;
    }
  }
}

export {
  bytesToSize,
  classNames,
  firstLetterUpperCase,
  format,
  formatBytes,
  formatDate,
  formatTime,
  timeDifference,
}