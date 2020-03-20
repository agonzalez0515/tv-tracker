export function formatResponseDate(date) {
  const dateObj = new Date(parseInt(date));
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return month + "-" + day + "-" + year;
}

export function randomHexColor() {
  return (
    "#" +
    Math.random()
      .toString(16)
      .slice(2, 8)
      .toUpperCase()
  );
}
