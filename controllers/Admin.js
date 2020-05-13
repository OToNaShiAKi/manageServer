import Admin from "./../models/Admin";

class AdminController {
    Login(req, res, next) {
        const account = req.body.account;
        Admin.find({
            $or: [{
                name: account
            }, {
                phone: account
            }],
            password: req.body.password
        }, "name phone")
            .then(admin => {
                if (admin.length) {
                    req.session.adminId = admin[0]._id
                    res.json({
                        status: 200,
                        message: '登陆成功',
                        admin: admin[0]
                    })
                } else throw {
                    status: -1,
                    message: '用户名或密码错误'
                }
            })
            .catch(err => next(err));
    }
    Register(req, res, next) {
        Admin.find({
            $or: [
                { name: req.body.name },
                { phone: req.body.phone }
            ]
        })
            .then(admin => {
                if (admin.length)
                    throw {
                        status: -1,
                        message: "用户名或手机号已被占用",
                    };
                else {
                    const admin = new Admin(req.body);
                    return admin.save();
                }
            })
            .then(admin => {
                req.session.adminId = admin._id
                res.json({
                    status: 200,
                    message: "用户注册成功",
                    _id: admin._id
                });
            })
            .catch(err => next(err));
    }
    EditInfo(req, res, next) {
        let update = req.body;
        Admin.find({
            $or: [
                { name: update.name },
                { phone: update.phone }
            ],
            _id: { $ne: update._id }
        }).then(admins => {
            if (admins.length)
                throw {
                    status: -1,
                    message: "用户名或手机号已被占用"
                }
            else {
                delete update._id;
                return Admin.findById(req.body._id || req.session.adminId).updateOne(update)
            }
        }).then(admin => {
            if (req.body.password) req.session.destroy()
            res.json({
                status: 200,
                message: '更新信息成功'
            })
        }).catch(err => next(err));
    }
}

export default new AdminController();