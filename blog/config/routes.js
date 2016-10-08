// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var ModelUser = require('../model/user');

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



	app.use(function(req,res,next){
		app.locals.user = req.session.user;
		// if(!app.locals.user){
		// 	res.redirect('/login');
		// }
		next();
	});

	//  使用render就是要使用ejs模板引擎（现在使用的模板后缀是html）
	//  第一个参数index就是index.ejs（现在使用的模板后缀是index.html）
	//  title就是改页面里面的所有title变量的值都是Express
	app.get('/', function (req, res, next) {

		res.render('index', { title: '首页' });
	});

	app.get('/login', function (req, res, next) {
		res.render('login', { title: '登录' });
	});

	app.post('/login', function (req, res, next) {
		var postData =  {
			username : req.body.username
		}
		ModelUser.findOne(postData,function(err,data){
			if(err){
				console.info(err);
			}
			if(data){
				if(data.password == req.body.password){
					req.session.user =  data;
					res.redirect('/index');
				}else{
					res.send('用户名或密码错误，请重新输入');
				}
			}else{
				res.send('用户名或密码错误，请重新输入');
			}
		});
	});

	app.get('/index', function (req, res, next) {
		res.render('index', { title: '首页' });
	});

	app.get('/logout', function (req, res, next) {
		delete req.session.user;
		res.redirect('/index');
	});

	app.get('/register', function (req, res, next) {
		res.render('register', { title: '注册' });
	});

	app.post('/register', function (req, res, next) {
		var postData =  {
			username : req.body.username,
			password : req.body.password
		}

		ModelUser.findOne({username:postData.username},function(err,data){
			if(err){
				console.info(err);
			}

			if(data){
				res.send('名称已被注册，请重新输入注册名称');
			}else{
				ModelUser.create(postData,function(err,doc){
					if(err){
						console.info(err);
					}
					res.send(doc);
				});
			}
		});


		
		//console.log(postData);
		
		//res.send("注册成功。");
	});

	app.get('/user/:_id', function (req, res, next) {
		var userId = req.param('_id');
		console.info('ididididididididi-----'+userId);
		//if(userId){
			res.render('./user/center', { title: '用户中心' });
		//}
		
	});
};

//module.exports = router;
