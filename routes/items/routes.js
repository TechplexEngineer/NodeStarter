module.exports = function(router){

	var base = 'items';
	var path = '/'+base;

	// -- READ --
	router.get(path, function(req, res) {

		var db = req.db;
		var collec = db.get(base);

		collec.find({},{ sort : [['name', 'asc']]},function(e,docs){
			if (!e) {
				res.render(base+'/list', {
					title: 'Items',
					data: docs,
				});
			} else {
				res.render('error',{message:e});
			}
		});

	});

	// -- CREATE --
	router.get(path+'/add', function(req, res) {

		res.render(base+'/add_edit', {
			title: 'Add an Item',
			data: {
				name:'',
				desc:''
			},
		});

	});
	router.post(path+'/add', function(req, res) {

		var db = req.db;
		var collec = db.get(base);

		collec.insert(req.body, function (err, count, status) {
			res.redirect(path)
		})

	});

	// -- UPDATE --
	router.get(path+'/edit/:id', function(req, res) {

		var db = req.db;
		var collec = db.get(base);

		collec.findById(req.params.id, function(e, doc){
			if (!e) {
				res.render(base+'/add_edit', {
					title: 'Edit an Item',
					data: doc
				});
			} else {
				res.render('error',{message:e});
			}
		});

	});
	router.post(path+'/edit/:id', function(req, res) {

		var db = req.db;
		var collec = db.get(base);

		collec.update(req.params.id, {$set:req.body}, function (err, count, status) {
			res.redirect(path)
		})

	});
	// -- DELETE --
	router.get(path+'/delete/:id', function(req, res) {

		var db = req.db;
		var collec = db.get(base);

		collec.findById(req.params.id, function(e, doc){
			if (!e) {
				res.render(base+'/delete', {
					title: 'Are you sure you want to delete?',
					data: doc
				});
			} else {
				res.render('error',{message:e});
			}
		});

	});
	router.post(path+'/delete/:id', function(req, res) {

		var db = req.db;
		var collec = db.get(base);

		if ('action-delete' in req.body) {

			collec.remove({_id:req.params.id}, function (err, count, status) {
			})
		}
		res.redirect(path)

	});

	return router;
}
