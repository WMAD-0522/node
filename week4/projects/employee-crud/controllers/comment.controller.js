import db from "../models/index.js";

const commentController = {};

const createComment = (req, res) => {
    // validate comment
    if(!req.body.title && !req.body.comment){
        res.status(400).send({
            message: "Title and Comment are required to send!"
        })
        return;
    }

    const comment = {
        title: req.body.title,
        comment: req.body.comment,
        employeeId: req.body.employeeId
    }

    db.comments.create(comment)
    // INSERT INTO comments (title, comment, employeeId) VALUES (comment.title, comment.comment, comment.employeeId)
        .then(data => {
            res.redirect("/profile/" + req.body.employeeId)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating comment!"
            })
        })
};

const getComments = (req, res) => {
    db.comments.findAll()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating comment!"
            })
        })
};

const getCommentsById = (req, res) => {};

const deleteCommentById = (req, res) => {};

commentController.createComment = createComment;
commentController.getComments = getComments;
commentController.getCommentsById = getCommentsById;
commentController.deleteCommentById = deleteCommentById;

export default commentController;