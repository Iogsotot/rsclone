function recordError(template) {
  console.error('Error:', template);
  throw new Error(template);
}

function handling(fn) {
  return async (req, res) => {
    const timeDate = `time: ${new Date()}`;
    const url = `\nurl: ${req.originalUrl}`;
    const method = `\nmethod: ${req.method}`;
    const query = `\nquery: ${JSON.stringify(req.query, null, 2)}`;
    let body;
    if (req.body.password) {
      const hidePass = req.body.password.replace(/./g, '*');
      body = `\nbody: ${JSON.stringify(
        { ...req.body, password: hidePass },
        null,
        2
      )}`;
    } else {
      body = `\nbody: ${JSON.stringify(req.body, null, 2)}`;
    }
    const params = `\nparams: ${JSON.stringify(req.params, null, 2)}`;

    const logging = `${timeDate}${url}${method}${query}${params}${body}\n\n`;

    process.stdout.write(logging);

    fn.call(this, req, res);
  };
}

module.exports = {
  handling,
  recordError
};
