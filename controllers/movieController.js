const axios = require('axios');
const List = require('../models/List');

exports.search = async (req, res) => {
    const query = req.query.query;
    const page = req.query.page || 1;

    if (!query) {
        req.flash('error_msg', 'Please enter a search query');
        return res.redirect('/');
    }

    const user = req.session.userId;
    var results = [];
    if(req.session.loggedin){
        try{
            results = await List.findAll({where: {userId: user}, order:[['name', 'ASC']]});
        }catch (err){
            res.status(500).send(err.message);
        }
    }
    
    axios.get(`http://www.omdbapi.com/?s=${query}&type=movie&page=${page}&apikey=${process.env.OMDB_API_KEY}`)
        .then(response => {
            const movies = response.data.Search;
            const totalResults = response.data.totalResults;
            const totalPages = Math.ceil(totalResults / 10);
        res.render('search', { user: user, query: query, title: 'Result', lists: results, movies, currentPage: parseInt(page), totalPages });
    }).catch(err => {
        res.send(err);
    });
};

exports.details = async (req, res) => {
    const imdbID = req.params.imdbID;
    
    const userId = req.session.userId;
    var results = [];
    if(req.session.loggedin){
        try{
            results = await List.findAll({where: {userId: userId}, order:[['name', 'ASC']]});
        }catch (err){
            res.status(500).send(err.message);
        }
    }
    axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}`)
        .then(response => {
        res.render('details', { user: userId, lists: results, title: 'Movie Detail', movie: response.data });
    }).catch(err => {
        res.send(err);
    });
};
