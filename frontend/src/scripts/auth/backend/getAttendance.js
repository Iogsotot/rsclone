async function getAttendance() {
  const url = 'https://rs-clone.herokuapp.com/';

  const res = await fetch(`${url}chart`);
  return res.json();
}

export default getAttendance;
