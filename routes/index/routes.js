module.exports = function(router){

	// -- READ --
	router.get('/', function(req, res) {

		res.render('index/list', {
					title: 'Items',
					data: {},
				});

	});


	return router;
}
