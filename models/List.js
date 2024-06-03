const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const List = sequelize.define('List', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
});

List.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(List, { foreignKey: 'userId' });

sequelize.sync().then(() => {
    console.log('List table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = List;
