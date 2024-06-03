const express = require('express');
const router = express.Router();
const List = require('../models/List');

router.get("/", async (req, res) => {
	if (req.session.loggedin) {
		const userId = req.session.userId;
		try{
			const lists = await List.findAll({where: {userId: userId}, order: [['name', 'ASC']]});
			res.render('home', { user: userId, title: 'Home', lists: lists });
		} catch (err) {
			res.status(500).send(err.message);
		}
	} else {
		res.render('home', { user: null, title: 'Home', lists: [] });
	}
});

module.exports = router;