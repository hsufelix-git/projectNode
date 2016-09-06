// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = function(app) {

	/**
	 * 路由配置例子

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
	*/
	console.info('get in router');

	app.get('/', function (req, res, next) {
		//  使用render就是要使用ejs模板引擎（现在使用的模板后缀是html）
		//  第一个参数index就是index.ejs（现在使用的模板后缀是index.html）
		//  title就是改页面里面的所有title变量的值都是Express
		res.render('index', { title: '首页' });
	});

	app.get('/login', function (req, res, next) {
		res.render('login', { title: '登录' });
	});

	app.get('/logout', function (req, res, next) {
		res.render('logout', { title: '退出' });
	});

	app.get('/register', function (req, res, next) {
		res.render('register', { title: '注册' });
	});

	app.post('/register', function (req, res, next) {
		var postData =  {
			username : req.body.username,
			password : req.body.password
		}
		console.log(postData);
		
		res.send("注册成功。");
	});
};

//module.exports = router;
