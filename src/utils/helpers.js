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

function firstLetterUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { classNames, formatDate, formatTime, firstLetterUpperCase }