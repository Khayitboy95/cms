const { Router } = require('express');
const router = Router();

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
})

router.get('/', (req, res) => {
    res.render('admin/index');
})


module.exports = router;