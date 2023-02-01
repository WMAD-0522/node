const comment = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        title: {
            type: Sequelize.STRING,
        },
        comment: {
            type: Sequelize.STRING,
        },
    })
    return Comment;
};

export default comment;