const url = 'https://rs-clone.herokuapp.com/';
const date = new Date();
const year = date.getFullYear();
const fullDate = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;

export default async function handlerAttendance() {
  const response = await fetch(`${url}chart/${fullDate}`);
  const { data } = await response.json();
  
  if (!data) {
    const response = await fetch(`${url}chart`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ year: fullDate, allAttendance: 1 }),
    });
    const result = await response.json();
    console.log('POST result', result);
  } else {
    const response = await fetch(`${url}chart/${fullDate}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ year: fullDate, allAttendance: data.allAttendance + 1 }),
    });
    const result = await response.json();
    console.log('PUT result', result);
  }
}
