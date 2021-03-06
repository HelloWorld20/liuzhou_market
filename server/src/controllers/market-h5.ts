/*
 * @Author: jianghong.wei
 * @Date: 2019-11-22 10:38:12
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-12-30 19:19:09
 * h5端市场controller
 */

import { createRouter, response, catchError } from '../modules';
import * as cateSrv from '../services/category';
import * as goodsSrv from '../services/goods';
import * as homeSrv from '../services/home-manage';
const router = createRouter();

// 获取所有分类
router.get(
	'/category',
	catchError(async (req, res) => {
		const result = await cateSrv.getCategory();
		response.json(res, result);
	})
);

// 获取商品，列表
router.get(
	'/goods',
	catchError(async (req, res, next) => {
		const { category, isRecommend } = req.query;
		const result = await goodsSrv.getAllGoods({
			category,
			isRecommend: isRecommend
				? isRecommend === 'true'
					? true
					: false
				: undefined
		});
		response.json(res, result);
	})
);

// 获取首页配置
router.get(
	'/home',
	catchError(async (req, res) => {
		const result = await homeSrv.getConfig();
		response.json(res, result[0]);
	})
);

router.get(
	'/recommend',
	catchError(async (req, res) => {
		const result = await goodsSrv.getRecommend();
		response.json(res, result);
	})
);

router.get(
	'/search',
	catchError(async (req, res) => {
		const { name } = req.query;
		const result = await goodsSrv.search(name);
		response.json(res, result);
	})
);

export default router;
