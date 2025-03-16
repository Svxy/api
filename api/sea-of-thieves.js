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

  const ratToken = process.env.RAT_TOKEN;
  if (!ratToken) {
    return res.status(500).json({ error: 'RAT token is misconfigured.' });
  }

  const endpoints = [
    "reputation", "balance", "captaincy", "chest", "overview"
  ];

  const allData = {};

  try {
    const fetchDataPromises = endpoints.map(async (endpoint) => {
      try {
        const response = await fetch(`https://www.seaofthieves.com/api/profilev2/${endpoint}`, {
          headers: {
            'Referer': 'https://www.seaofthieves.com/',
            'Cookie': `rat=${ratToken}`,
            'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });

        if (response.ok) {
          allData[endpoint] = await response.json();
        } else {
          allData[endpoint] = { error: `Failed to fetch ${endpoint} data` };
        }
      } catch (error) {
        allData[endpoint] = { error: `Error fetching ${endpoint} data: ${error.message}` };
      }
    });

    await Promise.all(fetchDataPromises);

    res.status(200).json(allData);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: `Error fetching data: ${error.message}` });
  }
};

module.exports = handler;