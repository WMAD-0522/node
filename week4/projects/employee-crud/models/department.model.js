const department = (sequelize, Sequelize) => {
    const Department = sequelize.define("department", {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        }
    })

    return Department;
};

export default department;