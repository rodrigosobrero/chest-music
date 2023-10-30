function classNames(classes) {
  const toBeClasses = Object.keys(classes).map((key) =>
    classes[key] === true ? key : '',
  );
  return toBeClasses.join(' ');
}

function formatDate(date) {
  const dateFormat = new Date(date);
  const month = dateFormat.toLocaleString('default', { month: 'short' });
  const day = dateFormat.getDay();
  const year = dateFormat.getFullYear();

  return `${month} ${day}, ${year}`;
}

function formatTime(seconds) {
  return (seconds / 60).toFixed(2).toString().replace('.', ':');
}
function timeDifference(previous) {
  var current = new Date();
  var previousDate = new Date(parseInt(previous));
  var elapsed = current - previousDate;
  var months = Math.floor(elapsed / 2629746000); // Aproximadamente 30.44 días en un mes
  var days = Math.floor((elapsed % 2629746000) / 86400000); // 24 horas en un día
  if (months > 3 ) {
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    return previousDate.toLocaleDateString('en-US', options);
  } else if (months >= 1) {
    return months + ' month ago';
  } else if (days >= 2) {
    return days + ' days ago';
  } else if (days === 1) {
    return '1 day ago';
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
function bytesToSize(bytes) {
  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte'];

  const navigatorLocal = navigator.languages && navigator.languages.length >= 0 ? navigator.languages[0] : 'en-US'
  const unitIndex = Math.max(0, Math.min(Math.floor(Math.log(bytes) / Math.log(1000)), units.length - 1));

  return Intl.NumberFormat(navigatorLocal, {
    style: 'unit',
    unit: units[unitIndex]
  }).format(bytes / (1000 ** unitIndex))
}

export { classNames, formatDate, formatTime, firstLetterUpperCase, bytesToSize, timeDifference, formatBytes }
