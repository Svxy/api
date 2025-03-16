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

  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'WakaTime API key misconfigured.' });
  }

  try {
    const last7DaysRes = await fetch(`https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${apiKey}`);
    if (!last7DaysRes.ok) throw new Error('Failed to fetch last 7 days stats');
    const last7DaysData = await last7DaysRes.json();

    const allTimeRes = await fetch(`https://wakatime.com/api/v1/users/current/stats/all_time?api_key=${apiKey}`);
    if (!allTimeRes.ok) throw new Error('Failed to fetch all time stats');
    const allTimeData = await allTimeRes.json();

    const topLanguages = allTimeData.data.languages
      ? allTimeData.data.languages
          .sort((a, b) => b.total_seconds - a.total_seconds)
          .map(lang => lang.name)
          .slice(0, 5)
          .join(', ')
      : '';

    const topEditor = allTimeData.data.editors
      ? allTimeData.data.editors
          .sort((a, b) => b.total_seconds - a.total_seconds)
          .map(editor => editor.name)
          .slice(0, 1)
          .join(', ')
      : '';

    const topOperatingSystem = allTimeData.data.operating_systems
      ? allTimeData.data.operating_systems
          .sort((a, b) => b.total_seconds - a.total_seconds)
          .map(os => os.name)
          .slice(0, 1)
          .join(', ')
      : '';

    const allTimeCodingTime = allTimeData.data.total_seconds
      ? (allTimeData.data.total_seconds / 3600).toFixed(2)
      : '';

    const last7DaysCodingTime = (last7DaysData.data.total_seconds / 3600).toFixed(2) || '0.00';

    res.status(200).json({
      allTime: {
        codingTime: allTimeCodingTime,
        topLanguages: topLanguages,
        topEditor: topEditor,
        topOperatingSystem: topOperatingSystem,
      },
      last7Days: {
        codingTime: last7DaysCodingTime,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: `Error fetching WakaTime stats: ${error.message}` });
  }
};

module.exports = handler;