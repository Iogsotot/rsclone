async function getAttendance() {
  const url = 'https://rs-clone.herokuapp.com/';
  const year = new Date().getFullYear();

  const res = await fetch(`${url}chart/${year}`);
  return res.json();
}

export default getAttendance;
