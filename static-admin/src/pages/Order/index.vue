<template>
	<section class="order">
		<h1 class="title">订单管理</h1>
		<el-form
			v-model="form"
			label-position="left"
			inline
			class="order-search-expand"
		>
			<el-form-item prop="status" label="订单状态:" label-width="150px">
				<el-select v-model="form.status">
					<el-option :key="-2" label="无" :value="-2">无</el-option>
					<el-option :key="123" label="需要操作" :value="123"
						>需要操作</el-option
					>
					<el-option :key="0" :label="constant.status['0']" :value="0"
						>未支付</el-option
					>
					<el-option :key="1" :label="constant.status['1']" :value="1"
						>已支付</el-option
					>
					<el-option :key="2" :label="constant.status['2']" :value="2"
						>商家接单</el-option
					>
					<el-option :key="3" :label="constant.status['3']" :value="3"
						>正在配送</el-option
					>
					<el-option :key="4" :label="constant.status['4']" :value="4"
						>配送完成</el-option
					>
				</el-select>
			</el-form-item>
			<el-form-item prop="nickName" label="用户昵称:" label-width="150px">
				<el-input v-model="form.nickName"></el-input>
			</el-form-item>
			<el-form-item
				prop="orderName"
				label="订单姓名:"
				label-width="150px"
			>
				<el-input v-model="form.orderName"></el-input>
			</el-form-item>
			<el-form-item
				prop="orderPhone"
				label="订单手机号:"
				label-width="150px"
			>
				<el-input v-model="form.orderPhone"></el-input>
			</el-form-item>
			<el-form-item
				prop="deleverPhone"
				label="快递员手机号:"
				label-width="150px"
			>
				<el-input v-model="form.deleverPhone"></el-input>
			</el-form-item>
			<el-form-item prop="timeKey" label="时间分类:" label-width="150px">
				<el-select v-model="form.timeKey">
					<el-option :key="-1" label="无" :value="-2">无</el-option>
					<el-option
						key="createTime"
						label="创建时间"
						value="createTime"
						>配送完成</el-option
					>
					<el-option
						key="updateTime"
						label="修改时间"
						value="updateTime"
						>修改时间</el-option
					>
					<el-option key="payTime" label="支付时间" value="payTime"
						>修改时间</el-option
					>
					<el-option
						key="acceptTime"
						label="接单时间"
						value="acceptTime"
						>接单时间</el-option
					>
					<el-option
						key="deleverTime"
						label="配送时间"
						value="deleverTime"
						>配送时间</el-option
					>
					<el-option
						key="dealTime"
						label="订单完成时间"
						value="dealTime"
						>订单完成时间</el-option
					>
				</el-select>
			</el-form-item>
			<el-form-item
				prop="timeRange"
				label="时间范围:"
				label-width="150px"
			>
				<el-date-picker
					v-model="form.timeRange"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					align="right"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSearch">搜索</el-button>
				<el-button @click="handleReset">重置</el-button>
			</el-form-item>
		</el-form>

		<el-divider></el-divider>

		<el-pagination
			background
			layout="prev, pager, next"
			:total="totalPage"
			@current-change="pageChange"
		></el-pagination>

		<el-table
			border
			style="width: 100%"
			:data="tableData"
			@row-click="handleTableClick"
			:row-class-name="tableRowClassName"
			ref="table"
		>
			<el-table-column width="100" type="expand">
				<template slot-scope="props">
					<el-form
						label-position="left"
						inline
						class="order-table-expand"
					>
						<el-form-item label="订单ID">
							<span>{{ props.row.orderId }}</span>
						</el-form-item>
						<el-form-item label="用户昵称">
							<span>{{ props.row.nickName }}</span>
						</el-form-item>
						<el-form-item label="配送姓名">
							<span>{{ props.row.orderName }}</span>
						</el-form-item>
						<el-form-item label="配送电话">
							<span>{{ props.row.orderPhone }}</span>
						</el-form-item>
						<el-form-item label="配送地址">
							<span>{{ props.row.orderAddr }}</span>
						</el-form-item>
						<el-form-item label="留言：">
							<span>{{ props.row.desc }}</span>
						</el-form-item>
						<el-form-item label="订单总价格：">
							<span
								><b style="color: #F56C6C"
									>{{ props.row.orderPriseAll }}元</b
								></span
							>
						</el-form-item>
						<el-form-item label="订单状态">
							<el-tag>{{
								constant.status[props.row.status]
							}}</el-tag>
						</el-form-item>
						<el-form-item label="创建时间">
							<span>{{
								timeFormatRaw(props.row.createTime)
							}}</span>
						</el-form-item>
						<el-form-item label="更新时间">
							<span>{{
								timeFormatRaw(props.row.updateTime)
							}}</span>
						</el-form-item>
						<el-form-item label="支付时间">
							<span>{{ timeFormatRaw(props.row.payTime) }}</span>
						</el-form-item>
						<el-form-item label="接单时间时间">
							<span>{{
								timeFormatRaw(props.row.acceptTime)
							}}</span>
						</el-form-item>
						<el-form-item label="配送时间">
							<span>{{
								timeFormatRaw(props.row.deleverTime)
							}}</span>
						</el-form-item>
						<el-form-item label="交易完成时间">
							<span>{{ timeFormatRaw(props.row.dealTime) }}</span>
						</el-form-item>
						<el-form-item label="支付id">
							<span>{{ props.row.payId || '无' }}</span>
						</el-form-item>
					</el-form>
					<el-table
						border
						style="width: 100%"
						:data="props.row.goods"
					>
						<el-table-column
							label="图片"
							prop="goodsImage"
							width="170"
						>
							<template slot-scope="scope">
								<el-image
									style="width: 100px; height: 100px"
									:src="
										getImageLocation(
											scope.row.goodsImage[0]
										)
									"
									:preview-src-list="
										getImageLocation(scope.row.goodsImage)
									"
								/>
							</template>
						</el-table-column>
						<el-table-column
							label="商品名称"
							prop="goodsName"
							width="170"
						></el-table-column>
						<el-table-column
							label="商品数量"
							prop="goodsNum"
							width="170"
						></el-table-column>
						<el-table-column
							label="单价"
							prop="goodsPrise"
							width="170"
						></el-table-column>
						<el-table-column
							label="总价"
							prop="goodsTotalPrise"
							width="170"
						></el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column label="订单状态" prop="orderId">
				<template slot-scope="scope">
					<el-tag>{{ constant.status[scope.row.status] }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="订单id" prop="orderId"></el-table-column>
			<el-table-column label="用户昵称" prop="nickName"></el-table-column>
			<el-table-column
				label="送货用户名"
				prop="orderName"
			></el-table-column>
			<el-table-column
				label="送货手机号"
				prop="orderPhone"
			></el-table-column>
			<el-table-column
				label="送货地址"
				prop="orderAddr"
			></el-table-column>

			<el-table-column label="留言" prop="desc"></el-table-column>
			<el-table-column label="操作" fixed="right" width="150">
				<template slot-scope="scope">
					<el-button
						@click="handleUpdate(scope.row)"
						type="primary"
						size="small"
						:plain="getHandleBtnStatus(scope.row)"
						:disabled="getHandleBtnStatus(scope.row)"
						>{{ getHandleBtnText(scope.row) }}</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
import {
	Table,
	TableColumn,
	Popover,
	Pagination,
	Image,
	Form,
	FormItem,
	Input,
	InputNumber,
	DatePicker,
	MessageBox
} from 'element-ui';
import { getOrder, updateOrder } from '../../http/apis';
import moment from 'moment';
import * as constant from './constant';
import * as _ from 'lodash';
export default {
	data() {
		return {
			tableData: [],
			form: {
				status: '',
				nickName: '',
				orderName: '',
				orderPhone: '',
				deleverPhone: '',
				timeKey: '',
				timeRange: []
			},
			currentPage: 0,
			totalPage: 1,
			selectedRow: [],
			constant
		};
	},
	components: {
		[Table.name]: Table,
		[TableColumn.name]: TableColumn,
		[Popover.name]: Popover,
		[Image.name]: Image,
		[Pagination.name]: Pagination,
		[Form.name]: Form,
		[FormItem.name]: FormItem,
		[Input.name]: Input,
		[InputNumber.name]: InputNumber,
		[DatePicker.name]: DatePicker
	},
	created() {
		this.updateTable();
	},
	methods: {
		async updateTable() {
			const orderList = await getOrder({
				pageNo: this.currentPage,
				status: this.form.status === -2 ? undefined : this.form.status,
				timeKey: this.form.timeKey ? this.form.timeKey : undefined,
				startTime: this.form.timeRange[0]
					? new Date(this.form.timeRange[0]).getTime()
					: undefined,
				endTime: this.form.timeRange[1]
					? new Date(this.form.timeRange[1]).getTime()
					: undefined,
				nickName: this.form.nickName ? this.form.nickName : undefined,
				orderName: this.form.orderName
					? this.form.orderName
					: undefined,
				orderPhone: this.form.orderPhone
					? this.form.orderPhone
					: undefined,
				deleverPhone: this.form.deleverPhone
					? this.form.deleverPhone
					: undefined
			});
			this.tableData = orderList.list;
			this.totalPage = orderList.totalPage;
		},
		handleSearch() {
			this.updateTable();
		},
		handleReset() {
			this.form = {
				status: '',
				nickName: '',
				orderName: '',
				orderPhone: '',
				deleverPhone: '',
				timeKey: '',
				timeRange: []
			};
			this.updateTable();
		},
		async pageChange(page) {
			this.currentPage = page - 1;
			this.updateTable();
		},
		handleTableClick(row, column, event) {
			// if (column && column.label === '操作') return;
			// this.$refs['table'].toggleRowExpansion(row);
		},
		handleUpdate(row) {
			MessageBox.confirm('操作会修改订单状态，确定修改？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: true
			}).then(async() => {
				// 如果是接单和派送，则可以修改配送员手机号
				if (row.status === 2 || row.status === 3) {
					MessageBox.prompt('请输入送货员手机号', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						inputPlaceholder: '非必填'
					}).then(async({ value: phone }) => {
						console.log('prompt', phone);
						await updateOrder(row.orderId, phone);
						await this.updateTable();
						this.$message({
							type: 'info',
							message: '操作成功'
						});
					});
				} else {
					await updateOrder(row.orderId);
					await this.updateTable();
					this.$message({
						type: 'info',
						message: '操作成功'
					});
				}
			});
		},
		getHandleBtnText(row) {
			let text = '';
			switch (row.status + '') {
				case '-1':
					text = '重新激活';
					break;
				case '0':
					text = '等待支付';
					break;
				case '1':
					text = '确认接单';
					break;
				case '2':
					text = '确认配送';
					break;
				case '3':
					text = '确认配送完成';
					break;
				case '4':
					text = '已完成';
					break;
			}
			return text;
		},
		getHandleBtnStatus(row) {
			return row.status === 0 || row.status === 4;
		},
		timeFormat(row, el) {
			if (!row[el.property]) return '';
			return moment(Number(row[el.property])).format(
				'YYYY-MM-DD HH:mm:ss'
			);
		},
		timeFormatRaw(time) {
			if (!time) return '无';
			return moment(Number(time)).format('YYYY-MM-DD HH:mm:ss');
		},
		tableRowClassName({ row, rowIndex }) {
			if (row.status === 1) {
				return 'success-row';
			} else if (row.status === 2) {
				return 'warning-row';
			}
		},
		getImageLocation(url) {
			if (_.isArray(url)) {
				return url.map(v => {
					return `${location.protocol}//${v}`;
				});
			}
			return `${location.protocol}//${url}`;
		}
	}
};
</script>

<style lang="less" src="./index.less"></style>
