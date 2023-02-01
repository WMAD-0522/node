const employee = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        fullName: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        salary: {
            type: Sequelize.INTEGER,
        },
        overTime: {
            type: Sequelize.BOOLEAN,
        }
    })
    return Employee;
};

export default employee;