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

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (ip === '::1' || ip === '127.0.0.1') {
    return res.status(200).json({
      status: 'OK',
      message: 'Localhost request detected',
      client: {
        ip,
        userAgent: req.headers['user-agent'],
        note: 'Cant fetch geolocation for localhost'
      }
    });
  }

  const userAgent = req.headers['user-agent'];
  const connectionInfo = req.connection;

  res.status(200).json({
    status: 'OK',
    message: 'Client Information',
    client: {
      ip,
      userAgent,
      remoteAddress: connectionInfo.remoteAddress,
      remotePort: connectionInfo.remotePort,
      localAddress: connectionInfo.localAddress,
      localPort: connectionInfo.localPort,
    },
  });
};

module.exports = handler;