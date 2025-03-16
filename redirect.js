module.exports = (req, res) => {
    let { url } = req;

    if (url.startsWith("/v1")) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.statusCode = 200;
        res.end("OK");
        return;
    }

    let redirectTo = "/v1" + (url !== "/" ? url : "");

    res.writeHead(308, {
        Location: redirectTo,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
    });
    res.end();
};