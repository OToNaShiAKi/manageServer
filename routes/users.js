const router = require("koa-router")();
const { init } = require("./../model/Error");

router.prefix("/users");

router.post("/login", (ctx) => {
    const info = ctx.request.body;
    try {
        const result = await User.Login(info);
        if (result.status === 200) ctx.session.user = result.data;
        ctx.body = result;
    } catch (err) {
        ctx.body = init(err);
    }
})

module.exports = router;
