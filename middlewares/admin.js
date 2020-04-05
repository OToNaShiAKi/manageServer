const check = (req, res, next) => {
    const path = req.path.toLowerCase();
    if (!path.includes('api') || req.session.adminId) return next();
    else res.json({
        status: 0,
        message: '未登录不可访问！'
    })

};

export default check;