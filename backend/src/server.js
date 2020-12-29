const { connectToDB } = require('./common/db.client');
const { recordError } = require('./common/handling');
const { PORT } = require('./common/config');
const app = require('./app');

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT} ---- ${new Date()}`)
  );

  process.on('uncaughtException', err => {
    const template = `Uncaught Exception at: ${err}\n\n`;

    recordError(template);

    console.error(`Uncaught Exception at: ${err}`);
  });

  process.on('unhandledRejection', reason => {
    const template = `Unhandled Rejection at: '${reason}\n\n`;

    recordError(template);

    console.error('Unhandled Rejection at: ', reason.name, reason.message);
  });
});
