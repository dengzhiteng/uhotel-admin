export default {
	login: {
		url: '/pages/login/login' // 登录页面路径
	},
	index: {
		url: '/pages/index/index' // 登录后跳转的第一个页面
	},
	error: {
		url: '/pages/error/404' // 404 Not Found 错误页面路径
	},
	navBar: { // 顶部导航
		logo: '/static/logo.png', // 左侧 Logo
		links: [{ // 右侧链接
			text: 'topwindow.text.doc',
			url: 'https://uniapp.dcloud.net.cn/uniCloud/admin'
		}, {
			text: 'topwindow.text.plugin',
			url: 'https://ext.dcloud.net.cn/?cat1=7&cat2=74'
		}],
		debug: {
			enable: process.env.NODE_ENV !== 'production', //是否显示错误信息
			engine: [{ // 搜索引擎配置（每条错误信息后，会自动生成搜索链接，点击后跳转至搜索引擎）
				name: '百度',
				url: 'https://www.baidu.com/baidu?wd=ERR_MSG'
			}, {
				name: '谷歌',
				url: 'https://www.google.com/search?q=ERR_MSG'
			}]
		}
	},
	sideBar: { 
		// 左侧菜单
		// 配置静态菜单列表（放置在用户被授权的菜单列表下边）
		staticMenu: [
			{
				menu_id: "demo",
				text: '静态功能演示',
				icon: 'uni-icons-list',
				url: "",
				children: [{
					menu_id: "icons",
					text: '图标',
					icon: 'uni-icons-star',
					value: '/pages/demo/icons/icons',
				}, {
					menu_id: "table",
					text: '表格',
					icon: 'uni-icons-map',
					value: '/pages/demo/table/table',
				}]
			},
			{
				menu_id: "product",
				text: '商品管理',
				icon: 'uni-icons-home',
				children: [
					{
						menu_id: "icons1",
						text: '商品列表',
						value: '/pages/product/list/index',
					},
					
					{
						menu_id: "icons2",
						text: '订单中心',
						value: '/pages/product/supply/index',
					},				
					{
						menu_id: "icons2",
						text: '供应商管理',
						value: '/pages/product/order/index',
					},
				
				],
			},
			{
				menu_id: "user",
				text: '统计',
				icon:"uni-icons-shop",
				children: [
					{
						menu_id: "icons2",
						text: '销售数据',
					},
					{
						menu_id: "icons2",
						text: '商品分析',
					},
					{
						menu_id: "icons2",
						text: '用户数据统计',
					},
					{
						menu_id: "icons2",
						text: '留言反馈',
					},
				]
			},
			{
				menu_id: "user",
				text: '费用',
				icon:"uni-icons-map",
				children: [
					{
						menu_id: "icons2",
						text: '商品费用',
					},
					{
						menu_id: "icons2",
						text: '员工工资',
					},
					{
						menu_id: "icons2",
						text: '水电等杂项',
					},
				]
			},
			{
				menu_id: "system",
				text: '管理员',
				icon: 'uni-icons-person-filled',
				children: [{
						menu_id: "icons1",
						text: '用户列表',
						value: '/pages/system/user/list',
					},
					{
						menu_id: "icons1",
						text: '角色列表',
						value: '/pages/system/role/list',
					},
				]
			},
		]
	}
}
