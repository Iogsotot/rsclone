const url = 'https://rs-clone.herokuapp.com/';
const year = new Date().getFullYear();

const handlerAttendance = async (dataObj) => {
  try {
    const { data } = dataObj;

    if (!data) {
      await fetch(`${url}chart`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year, allAttendance: 1 }),
      });
    } else {
      const { allAttendance } = data;

      await fetch(`${url}chart/${year}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year, allAttendance: allAttendance + 1 }),
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = handlerAttendance;
