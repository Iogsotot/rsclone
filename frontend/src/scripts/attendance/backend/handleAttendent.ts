const url = 'https://rs-clone.herokuapp.com/';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const fullDate = new Date();
const date = fullDate.getDate();
const month = fullDate.getMonth();
const year = fullDate.getFullYear();

const stringId = `${addZero(date)}${addZero(month)}${year}`;
const stringDate = `${date} ${MONTHS[month]} ${year}`;

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

export default async function handlerAttendance() {
  const response = await fetch(`${url}chart/${stringId}`);
  const { data, ok } = await response.json();

  if (!ok) {
    const response = await fetch(`${url}chart`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: stringId, attendance: 1, date: stringDate }),
    });
    return response.json();
  } else {
    const response = await fetch(`${url}chart/${stringId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, attendance: data.attendance + 1 }),
    });
    return response.json();
  }
}
