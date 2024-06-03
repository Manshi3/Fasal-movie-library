const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const List = require('./List');

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    movieId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.STRING,
    },
    poster: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
});

Movie.belongsTo(List, { foreignKey: 'listId' });
List.hasMany(Movie, { foreignKey: 'listId' });

module.exports = Movie;
