const requestLogger = (req, res, next) => {
  const { method, url, headers, body } = req;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`);
  console.log('Headers:', headers);

  if (method === 'POST' || method === 'PUT') {
    console.log('Body:', body);
  }

  const start = process.hrtime();

  res.on('finish', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    console.log(`Response Status: ${res.statusCode}`);
    console.log(`Response Time: ${durationInMilliseconds.toLocaleString()} ms`);
  });

  next();
};

const getDurationInMilliseconds = (start) => {
  const [seconds, nanoseconds] = process.hrtime(start);
  return (seconds * 1000) + (nanoseconds / 1e6);
};

module.exports = requestLogger;
