<template>
	<view class="fix-top-window product-list">
		<view class="uni-header">
			<view class="uni-group">
				<button class="uni-button" type="primary" size="mini"
					@click="navigateTo('./add')">新增</button>
				<button class="uni-button" type="warn" size="mini" :disabled="!selectedIndexs.length"
					@click="delTable">删除</button>
			</view>
		</view>
		<view class="uni-container">
			<unicloud-db ref="udb" collection="product-list"
				field="goods_name,category,price,discount,cost,remain_count,month_sell_count,total_sell_count,keywords,goods_desc,goods_thumb,add_date,score,remarks,is_on_sale,is_hot"
				:where="where" page-data="replace" :orderby="orderby" :getcount="true" :page-size="options.pageSize"
				:page-current="options.pageCurrent" v-slot:default="{data,pagination,loading,error,options}"
				:options="options" loadtime="manual">

				<uni-table ref="table" :loading="loading" :emptyText="error.message || $t('common.empty')" border stripe
					type="selection" @selection-change="selectionChange" class="table-pc">
					<uni-tr>
						<uni-th align="center">名称</uni-th>
						<uni-th align="center">类别</uni-th>

						<uni-th align="center">价格</uni-th>
						<uni-th align="center">折扣</uni-th>
						<uni-th align="center">成本</uni-th>

						<uni-th align="center">库存</uni-th>
						<uni-th align="center">月销量</uni-th>
						<uni-th align="center">总销量</uni-th>

						<uni-th align="center">关键字</uni-th>
						<uni-th align="center">描述</uni-th>

						<uni-th align="center">封面</uni-th>
						<uni-th align="center">创建日期</uni-th>
						<uni-th align="center">上架日期</uni-th>
						<uni-th align="center">好评指数</uni-th>

						<uni-th align="center">是否上架</uni-th>
						<uni-th align="center">是否热销</uni-th>

						<uni-th align="center" >操作</uni-th>
					</uni-tr>

					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">{{item.goods_name}}</uni-td>
						<uni-td align="center">{{item.category}}</uni-td>

						<uni-td align="center">{{item.price}}</uni-td>
						<uni-td align="center">{{item.discount}}</uni-td>
						<uni-td align="center">{{item.cost}}</uni-td>

						<uni-td align="center">{{item.remain_count}}</uni-td>
						<uni-td align="center">{{item.month_sell_count}}</uni-td>
						<uni-td align="center">{{item.total_sell_count}}</uni-td>

						<uni-td align="center">{{item.keywords}}</uni-td>
						<uni-td align="center">{{item.goods_desc}}</uni-td>

						<uni-td align="center">{{item.goods_thumb}}</uni-td>
						<uni-td align="center">{{item.create_date}}</uni-td>
						<uni-td align="center">{{item.add_date}}</uni-td>
						<uni-td align="center">{{item.score}}</uni-td>

						<uni-td align="center">{{item.is_on_sale}}</uni-td>
						<uni-td align="center">{{item.is_hot}}</uni-td>
						<uni-td align="center">{{item.is_hot}}</uni-td>

					</uni-tr>

				</uni-table>
				<view class="uni-pagination-box">
					<!-- #ifndef MP -->
					<picker class="select-picker" mode="selector" :value="pageSizeIndex" :range="pageSizeOption"
						@change="changeSize">
						<button type="default" size="mini" :plain="true">
							<text>{{pageSizeOption[pageSizeIndex]}} {{$t('common.piecePerPage')}}</text>
							<uni-icons class="select-picker-icon" type="arrowdown" size="12" color="#999"></uni-icons>
						</button>
					</picker>
					<!-- #endif -->
					<uni-pagination :page-size="pagination.size" v-model="pagination.current" :total="pagination.count"
						@change="onPageChanged" />
				</view>
			</unicloud-db>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	// 表查询配置
	const dbOrderBy = 'register_date desc' // 排序字段
	const dbSearchFields = ['username', 'role_name', 'mobile', 'email'] // 支持模糊搜索的字段列表

	export default {
		data() {
			return {
				query: '',
				where: '',
				orderby: dbOrderBy,
				orderByFieldName: "",
				selectedIndexs: [],
				pageSizeIndex: 0,
				pageSizeOption: [20],
				imageStyles: {
					width: 64,
					height: 64
				},
				options: {
					pageSize: 1
				}
			}

		},
		onLoad() {
			this._filter = {}
		},
		onReady() {
			this.$refs.udb.loadData()
		},
		watch: {
			pageSizeIndex: {
				immediate: true,
				handler(val, old) {
					this.options.pageSize = this.pageSizeOption[val]
					this.options.pageCurrent = 1
					this.$nextTick(() => {
						this.loadData()
					})
				}
			}
		},
		methods: {
			changeSize(e) {
				this.pageSizeIndex = e.detail.value
			},
			loadData(clear = true) {
				this.$refs.udb.loadData({
					clear
				})
			},
			onPageChanged(e) {
				this.selectedIndexs.length = 0
				this.$refs.table.clearSelection()
				this.$refs.udb.loadData({
					current: e.current
				})
			},
			navigateTo(url, clear) {
				// clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
				uni.navigateTo({
					url,
					events: {
						refreshData: () => {
							  this.loadData(clear)
						}
					}
				})
			},
			// 多选处理
			selectedItems() {
				var dataList = this.$refs.udb.dataList
				return this.selectedIndexs.map(i => dataList[i]._id)
			},
			// 批量删除
			delTable() {
				this.$refs.udb.remove(this.selectedItems(), {
					success: (res) => {
						this.$refs.table.clearSelection()
					}
				})
			},
			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			confirmDelete(id) {
				this.$refs.udb.remove(id, {
					success: (res) => {
						this.$refs.table.clearSelection()
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.product-list{}

</style>