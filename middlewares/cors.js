const allowCrossOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'http://59.110.40.182');
    res.header("Access-Control-Allow-Methods", 'GET,POST');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", 'Content-Type');
    next();
}

export default allowCrossOrigin