let localhostDev = false;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
let _host = localhostDev ? 'http://127.0.0.1:8000' : 'https://api.blog.ruixinglong.net';
let httpUrl = {
	articles: {
		'index': _host + '/v1/articles',
		'view': _host + '/v1/articles/',
		'create': _host + '/v1/articles',
		'update': _host + '/v1/articles/',
		'delete': _host + '/v1/articles/'
	},
	article_categories: {
		'index': _host + '/v1/article-categories',
		'view': _host + '/v1/article-categories/',
		'create': _host + '/v1/article-categories',
		'update': _host + '/v1/article-categories/',
		'delete': _host + '/v1/article-categories/'
	},
	qiniu: {
		'token': _host + '/v1/qiniu/token',
	},
	files: {
		'view': _host + '/v1/files/',
		'create': _host + '/v1/files',
	},
	statistics: {
		'index': _host + '/v1/statistics',
	},
	auth: {
		'index': _host + '/v1/auth',
	},
	users: {
		'fetch': _host + '/v1/users/fetch',
	},
};
export const api = httpUrl
