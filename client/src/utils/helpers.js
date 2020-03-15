export function formatDate(date) {
  const dateObj = new Date(parseInt(date));
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return month + "-" + day + "-" + year;
}
