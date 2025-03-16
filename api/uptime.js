const os = require('os');

const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const uptime = os.uptime();
  const currentTime = new Date().toISOString();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const loadAverage = os.loadavg();

  res.status(200).json({
    status: 'OK',
    message: 'Server Uptime Info',
    uptime: {
      seconds: uptime,
      hours: Math.floor(uptime / 3600),
      minutes: Math.floor((uptime % 3600) / 60),
    },
    currentTime,
    memory: {
      totalMemory: (totalMemory / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
      freeMemory: (freeMemory / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
    },
    loadAverage: {
      '1min': loadAverage[0],
      '5min': loadAverage[1],
      '15min': loadAverage[2],
    },
  });
};

module.exports = handler;