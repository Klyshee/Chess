const redis = require('redis');

const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost', // Используйте переменные окружения
  port: process.env.REDIS_PORT || 6379,
});

client.on('error', (err) => {
  console.error('Redis error: ', err);
});

const setValue = (key, value) => {
  return new Promise((resolve, reject) => {
    client.set(key, value, (err, reply) => {
      if (err) {
        return reject(err);
      }
      resolve(reply);
    });
  });
};


const getValue = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) {
        return reject(err);
      }
      resolve(reply);
    });
  });
};

const deleteValue = (key) => {
  return new Promise((resolve, reject) => {
    client.del(key, (err, reply) => {
      if (err) {
        return reject(err);
      }
      resolve(reply);
    });
  });
};

module.exports = {
  setValue,
  getValue,
  deleteValue,
};
