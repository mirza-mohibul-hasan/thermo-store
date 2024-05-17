const clgLogger = (message) => {
  console.log(new Date().toISOString() + " - " + message);
};

module.exports = clgLogger;
