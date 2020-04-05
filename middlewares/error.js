import createError from "http-errors";

export const notFound = (req, res, next) => {
    const err = createError(404);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message || '服务器内部错误'
    })
}

export const error = (err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message || '服务器内部错误'
    })
}