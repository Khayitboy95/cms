const { Router } = require('express');
const router = Router();

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
})

router.get('/', (req, res) => {
    res.render('admin/index');
})

router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
})

module.exports = router;