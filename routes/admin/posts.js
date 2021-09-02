const { Router } = require('express');
const router = Router();
const Post = require('./../../models/Post')
const { isEmpty, uploadDir } = require('./../../helpers/upload-helper');
const fs = require('fs');
const path = require('path');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {
    Post.find({}).lean().then(posts => {
        res.render('admin/posts/', {posts: posts});
    }).catch(err => {
        console.log(err);
    });
});

router.get('/create', (req, res) => {
    res.render('admin/posts/create');
});

router.get('/edit/:id', (req, res) => {
    Post.findOne({_id: req.params.id}).lean().then(post => {
        console.log(post);
        res.render('admin/posts/edit', {post: post});
    })
});

router.put('/edit/:id', (req, res) => {
    console.log(req.params.id);
    Post.findOne({_id: req.params.id}).then(post => {
        let allowComments = true;
        if(!req.body.allowComments){
            allowComments = false;
        }

        post.title = req.body.title;
        post.status = req.body.status;
        post.allowComments = allowComments;
        post.body = req.body.body;
        post.save(function(error, result){
            res.redirect('/admin/posts');
        })
    })
});



router.post('/create', (req, res) => {

    let filename = '';

    if(!isEmpty(req.files)){
        const file = req.files.file;
        filename = Date.now() + '-' + file.name;
        file.mv('./public/uploads/'+filename,(err) => {
            if(err) throw err;
        })
    }
    let allowComments = true;
    if(!req.body.allowComments){
        allowComments = false;
    }
    
    const newPost = Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body,
        file: filename
    })

    newPost.save().then(savedPost =>{
        res.redirect('/admin/posts')
    }).catch(err => {
        console.log(err);
    });
    
});

router.delete('/:id', (req, res) => {
    Post.findOne({_id: req.params.id}).then(post => {
        fs.unlink(uploadDir+post.file, (err) => {
            post.remove();
            res.redirect('/admin/posts');
        });
    });
});


module.exports = router;