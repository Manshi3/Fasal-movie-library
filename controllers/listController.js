const List = require('../models/List');
const Movie = require('../models/Movie');

// exports.myLists = (req, res) => {
//   const userId = req.session.userId;

//   db.query('SELECT * FROM lists WHERE user_id = ?', [userId], (err, results) => {
//     if (err) throw err;
//     res.render('/', { lists: results });
//   });
// };

exports.createList = async (req, res) => {
    const { name, isPublic } = req.body;
    const userId = req.session.userId;
    const isPublicVal = isPublic ? 1 : 0;

    try {
        const existingList = await List.findOne({where: {name: name, userId: userId}});
        if(existingList){
            req.flash('error_msg', 'List with same name already exists');
            return res.redirect('/');
        }
        const list = await List.create({name, isPublic: isPublicVal, userId: userId});
        req.flash('success_msg', 'List created successfully');
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteList = async (req, res) => {
    const listId = req.params.listId;

    try{
        const listdeleteout = await List.destroy({where: {id: listId}});
        req.flash('success_msg', 'List deleted successfully');
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.addToList = async (req, res) => {
    const { imdbId , listId, title, year, poster} = req.body;

    try {
        const existingMovie = await Movie.findOne({where: {movieId: imdbId, listId: listId}});
        if(existingMovie){
            req.flash('error_msg', 'Movie already in the list');
            return res.redirect(`/lists/${listId}`);
        }
        await Movie.create({ movieId: imdbId, title, year, poster, listId: listId});
        req.flash('success_msg', 'Movie added to list successfully');
        res.redirect(`/lists/${listId}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deletefromList = async (req, res) => {
    const listId = req.params.listId;
    const id = req.params.id;
    console.log("id:", id);

    try{
        const moviedeleteout = await Movie.destroy({where: {id: id}});
        req.flash('success_msg', 'Movie from list deleted successfully');
        res.redirect(`/lists/${listId}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.viewList = async (req, res) => {
    const listId = req.params.listId;
    
    try {
        const listdata = await List.findOne({ where: {id: listId}});
        if(req.session.loggedin){
            const results = await Movie.findAll({ where: { listId: listId } });
            res.render('list', { user: req.session.userId, listname: listdata.name, title: 'Movie List' , movies: results });
        }
        else if(listdata.isPublic){
            const results = await Movie.findAll({ where: { listId: listId } });
            res.render('list', { user: null, listname: listdata.name, title: 'Movie List' , movies: results });
        }
        else{
            return res.status(500).send('Private List');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};
