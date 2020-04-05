const allowCrossOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'http://118.31.58.18');
    res.header("Access-Control-Allow-Methods", 'GET,POST');
    res.header("Access-Control-Allow-Headers", 'Content-Type');
    next();
}

export default allowCrossOrigin