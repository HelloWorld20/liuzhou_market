import Vue from 'vue';
import Router from 'vue-router';

import Category from '@/pages/Category';
import Login from '@/pages/Login';
import Goods from '@/pages/Goods';
import HomeManage from '@/pages/HomeManage';
import Order from '@/pages/Order';
import Crawler from '@/pages/Crawler';
import HousePrise from '@/pages/HousePrise';
import UserManage from '@/pages/UserManage';

Vue.use(Router);
const router = new Router({
	routes: [
		{
			path: '/',
			name: '',
			component: Login
		},
		{
			path: '/Category',
			name: 'Category',
			component: Category
		},
		{
			path: '/Login',
			name: 'Login',
			component: Login
		},
		{
			path: '/HomeManage',
			name: 'HomeManage',
			component: HomeManage
		},
		{
			path: '/Goods',
			name: 'Goods',
			component: Goods
		},
		{
			path: '/Order',
			name: 'Order',
			component: Order
		},
		{
			path: '/Crawler',
			name: 'Crawler',
			component: Crawler
		}, {
			path: '/HousePrise',
			name: 'HousePrise',
			component: HousePrise
		}, {
			path: '/UserManage',
			name: 'UserManage',
			component: UserManage
		},
		{
			path: '*',
			name: '*',
			component: Login
		}
	]
});

export default router;
