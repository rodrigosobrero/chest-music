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
  var previousDate = new Date(previous);
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

export { classNames, formatDate, formatTime, firstLetterUpperCase, timeDifference }
