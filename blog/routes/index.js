// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = function(app) {

	app.get('/', function (req, res, next) {
		//  使用render就是要使用ejs模板引擎
		//  第一个参数index就是index.ejs
		//  title就是改页面里面的所有title变量的值都是Express
		res.render('index', { title: 'Expressss' });
	});

	app.get('/felix', function (req, res, next) {
		// 使用send则直接输出不需要使用模板引擎ejs或jade
		res.send("hello felix");
	});
};

//module.exports = router;
