import express from 'express';
import auth from '../middleware/auth.middleware.js';
import Post from '../modal/post.modal.js';

const router = express.Router();

router.get("/", auth, (req, res, next) => {
        const id = req.user;
    
        Post.find({user: id})
            .then(result => {
                res.status(200).json({
                    message: "Posts fetched successfully",
                    posts: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Something went wrong"
                });
            });
});

router.post("/", auth, (req, res, next) => {

    const { title, content } = req.body;
    const id = req.user;

    console.log(id);

    if(!title || !content || !id) {
        return res.status(400).json({
            message: "Please fill all the fields"
        });
    }

    const post = new Post({
        title,
        content,
        user: id
    });

    post.save()
        .then(result => {
            res.status(201).json({
                message: "Post created successfully",
                post: result
            });
        }
    )
    .catch(err => {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
    );

});

export default router;