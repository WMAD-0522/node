import db from "../models/index.js";

const commentController = {};

const createComment = (req, res) => {
    // Validate request

    if(!req.body.comment && !req.body.title) {
        res.status(400).send({
            message: "Title and Comment cannot be empty!"
        })
        return;
    }

    const comment = {
        title: req.body.title,
        comment: req.body.comment,
        // employeeId: req.body.employeeId
        employeeId: req.body.employeeId
    };

    db.comments.create(comment)
        .then(data => {
            // res.send(data);
            // res.status(201).send(data);
            res.redirect("/api/employee/" + req.body.employeeId);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Comment record"
            });
        });
};

const findAllComments = (req, res) => {
    db.comments.findAll({ include: ["employee"], order: [["createdAt", "DESC"]] })
        .then(data => {
            res.status(200).send(data);
            // res.render("pages/home", { departments: data })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving the Comments"
            });
        })
};

const deleteCommentById = (req, res) => {
    const id = req.params.id;

    db.comments.destroy({
        where: { id: id }
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Comment was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Comment with id=" + id
        });
    });
};

commentController.createComment = createComment;
commentController.findAllComments = findAllComments;
commentController.deleteCommentById = deleteCommentById;

export default commentController;