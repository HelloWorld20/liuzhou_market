import {
	getCategory,
	getGoods,
	getUserInfo,
	getHome,
	getCart
} from '../http/apis';

export default {
	getCategory({
		state,
		commit
	}) {
		if (state.category.length > 0) {
			return state.category;
		} else {
			return getCategory().then(res => {
				commit('updateCategory', res);
				return res;
			});
		}
	},
	getGoods({
		state,
		commit
	}, id) {
		if (state.goods[id]) {
			return state.goods[id];
		} else {
			return getGoods({
				category: id
			}).then(res => {
				commit('updateGoods', {
					key: id,
					value: res
				});
				return res;
			});
		}
	},
	getUserInfo({
		state,
		commit
	}) {
		if (state.userInfo) {
			return state.userInfo;
		} else {
			return getUserInfo().then(res => {
				commit('updateUserInfo', res);
				return res;
			});
		}
	},
	getHomeInfo({
		state, commit
	}) {
		if (state.homeInfo) {
			return state.homeInfo;
		} else {
			return getHome().then(res => {
				console.log('getHomeInfo', res);
				commit('updateHomeInfo', res);
				return res;
			});
		}
	},
	getCartData({
		state, commit
	}) {
		if (state.homeInfo) {
			return state.cartData;
		} else {
			return getCart().then(res => {
				commit('updateCartData', res);
				return res;
			});
		}
	}
};
