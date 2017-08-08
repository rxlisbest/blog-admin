let localhostDev = true;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
let _host = localhostDev ? 'http://127.0.0.1:8000' : 'http://xxx.com';
let httpUrl = {
	article: {
		'index': _host + '/v1/article',
		'view': _host + '/v1/article/',
		'create': _host + '/v1/article',
		'update': _host + '/v1/article/',
		'delete': _host + '/v1/article/'
	},
	qiniu: {
		'token': _host + '/v1/qiniu/token',
	},
	file: {
		'view': _host + '/v1/file/',
		'create': _host + '/v1/file',
	},
	statistic: {
		'index': _host + '/v1/statistic',
	},
	auth: {
		'index': _host + '/v1/auth',
	},
	user: {
		'fetch': _host + '/v1/user/fetch',
	},
};
export const api = httpUrl