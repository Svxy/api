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

  res.status(200).send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>v1</title>

    <meta property="og:title" content="v1">
    <meta property="og:url" content="https://api.sneaky.sh/v1"/>
    <meta property="og:type" content="website"/>
    <meta property="og:description" content="A serverless API hosted on Vercel, allows me to fetch various data for this page and other projects"/>

    <meta name="description" content="A serverless API hosted on Vercel, allows me to fetch various data for this page and other projects"/>
    <meta name="keywords" content="sneaky, sneakydev, svxy, tnyavnto, hacking, ethical hacking, hacking tutorials, programming, programming tutorials, c++, html, css, javascript, python, web development, software engineering, coding, tech"/>
    <meta name="robots" content="noindex,nofollow">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>

    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-37GBGMW65Q');
    </script>

    <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap" rel="stylesheet">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body {
        height: 100%;
        width: 100%;
        font-family: 'Anonymous Pro', monospace;
        overflow: auto;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(15, 15, 15, 1));
        color: #fff;
      }

      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      .content {
        text-align: center;
        max-width: 75%;
        margin: 50px auto;
        padding: 20px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
      }

      h1 {
        font-size: 3rem;
        color: #ff3333;
        margin-bottom: 20px;
      }

      p {
        color: #c9c9c9;
        margin-bottom: 20px;
      }

      .features {
        margin-top: 20px;
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .features li {
        background-color: rgba(0, 0, 0, 0.6);
        margin: 10px 0;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
        color: #ff3333;
        width: 80%;
        text-align: left;
        transition: background 0.2s ease-in-out;
      }

      .features li:hover {
        background-color: rgba(255, 51, 51, 0.1);
      }

      a {
        font-weight: bold;
        text-decoration: underline;
        color: #ff3333;
      }

      footer {
        text-align: center;
        padding: 20px;
        margin-top: 40px;
      }

      .back-link {
        font-size: 1.2rem;
        text-decoration: none;
        color: #ff3333;
        padding: 10px 20px;
        border: 2px solid #ff3333;
        border-radius: 8px;
        display: inline-block;
        transition: background 0.2s ease-in-out;
      }

      .back-link:hover {
        background: #ff3333;
        color: #0f0f0f;
      }

      @media (max-width: 768px) {
        h1 {
          font-size: 2.5rem;
        }

        .features li {
          width: 90%;
        }

        footer {
          padding: 15px;
        }
      }

      @media (max-width: 480px) {
        h1 {
          font-size: 2rem;
        }

        .features li {
          width: 95%;
        }
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h1>v1</h1>
      <p>This is a simple API I use for personal projects, hosted on Vercel (lol). But, it has some cool features that you might find useful or interesting:</p>

      <ul class="features">
        <li><a href="./v1/health" target="_blank"><strong>/v1/health</strong>: Used to ensure the API is running</a></li>
        <li><a href="./v1/uptime" target="_blank"><strong>/v1/uptime</strong>: Used to monitor API uptime & system stats</a></li>
        <li><a href="./v1/whoami" target="_blank"><strong>/v1/whoami</strong>: Used to retrieve info about one's self</a></li>
        <li><a href="./v1/wakafetch" target="_blank"><strong>/v1/wakafetch</strong>: Used to fetch my WakaTime stats</a></li>
        <li><a href="./v1/sea-of-thieves" target="_blank"><strong>/v1/sea-of-thieves</strong>: Used to fetch my Sea of Thieves stats</a></li>
      </ul>

      <footer>
        <p><a href="https://sneaky.sh" class="back-link">Back to Main Site</a></p>
      </footer>
    </div>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-37GBGMW65Q"></script>

  </body>
</html>
  `);
};

module.exports = handler;