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
    return years === 1 ? i18next.t('global.years_one', { count: years }) : i18next.t('global.years_other', { count: years });
  } else if (months > 0) {
    return months === 1 ? i18next.t('global.months_one', { count: months }) : i18next.t('global.months_other', { count: months });
  } else if (days > 0) {
    return days === 1 ? i18next.t('global.days_one', { count: days }) : i18next.t('global.days_other', { count: days });
  } else if (hours > 0) {
    return hours === 1 ? i18next.t('global.hours_one', { count: hours }) : i18next.t('global.hours_other', { count: hours });
  } else if (minutes > 0) {
    return minutes === 1 ? i18next.t('global.minutes_one', { count: minutes }) : i18next.t('global.minutes_other', { count: minutes });
  } else {
    return seconds === 1 ? i18next.t('global.seconds_one', { count: seconds }) : i18next.t('global.seconds_other', { count: seconds });
  }
}

function firstLetterUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatHours(seconds, decimals = 2) {
  const formated = `${parseFloat((seconds/3600)).toFixed(decimals)} hs`;

  return formated.replace('.', ':');

  // return `${parseFloat((seconds/3600)).toFixed(decimals)} hs`
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

function getUrlExtension(url) {
  if (url)
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

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
    } else if (daysDiff >= 1 && daysDiff < 7) {
      return `${i18next.t("global.days", { count: Math.floor(daysDiff) })}`
    } else {
      const month = dateObj.getMonth();
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();

      return `${i18next.t(`global.months.${month}`)} ${day}, ${year}`;
    }
  },
  bytes: (bytes) => {
    if (!bytes) return '0 MB';
    if (typeof bytes === 'string') bytes = parseInt(bytes);

    const mb = bytes / (1024 ** 2);
    const gb = bytes / (1024 ** 3);

    if (mb < 1024) {
      return `${mb.toFixed(2)} MB`;
    } else {
      return `${gb.toFixed(2)} GB`;
    }
  },
  time: (seconds) => {
    if (!seconds) return '0:00';
    if (typeof seconds === 'string') seconds = parseInt(seconds);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${formattedSeconds}`;
  },
  dateDdMmYyyy: (date) => {
    const dateFromTimestamp = new Date(parseInt(date) * 1000);

    const day = dateFromTimestamp.getDate();
    const month = dateFromTimestamp.getMonth();
    const year = dateFromTimestamp.getFullYear();

    return `${day} ${i18next.t(`global.months.${month}`)} ${year}`;
  }
}

const filter = (list, key) => {
  if (!list) return [];

  key = key.toLowerCase();

  return list.filter(item => {
    if (key === '') {
      return true;
    } else {
      return Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(key);
    }
  });
};

function getFreeTrialDays(start) {
  if (start) {
    const dateFromTimestamp = new Date(parseInt(start) * 1000);
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const thirtyDaysInMs = 30 * millisecondsInADay;
    const endDate = new Date(dateFromTimestamp.getTime() + thirtyDaysInMs);

    const day = endDate.getDate();
    const month = endDate.getMonth();
    const year = endDate.getFullYear();

    return `${day} ${i18next.t(`global.months.${month}`)} ${year}`;
  }
}

export {
  bytesToSize,
  classNames,
  filter,
  firstLetterUpperCase,
  format,
  formatBytes,
  formatHours,
  formatDate,
  formatTime,
  getUrlExtension,
  getFreeTrialDays,
  timeDifference,
}