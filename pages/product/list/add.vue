<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" validateTrigger="bind" @submit="submit">
			<uni-forms-item name="category_id" label="类别" required>
				<uni-easyinput v-model="formData.category_id" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item name="goods_name" label="商品名称" required>
				<uni-easyinput v-model="formData.goods_name" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item name="keywords" label="关键字">
				<uni-easyinput v-model="formData.keywords" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item name="goods_desc" label="商品描述">
				<uni-easyinput v-model="formData.goods_desc" placeholder="请输入" />
			</uni-forms-item>

			<uni-forms-item name="price" label="商品价格" required>
				<uni-easyinput v-model="formData.price" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item name="cost" label="商品成本">
				<uni-easyinput v-model="formData.cost" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item name="discount" label="商品折扣">
				<uni-easyinput v-model="formData.discount" placeholder="请输入" />
			</uni-forms-item>

			<uni-forms-item name="remain_count" label="库存数量">
				<uni-easyinput v-model="formData.remain_count" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item name="month_sell_count" label="月销量">
				<uni-easyinput v-model="formData.month_sell_count" placeholder="请输入" />
			</uni-forms-item>

			<uni-forms-item name="remark" label="商品备注">
				<uni-easyinput v-model="formData.remark" placeholder="请输入" />
			</uni-forms-item>

			<uni-forms-item name="is_on_sale" label="是否上架">
				<switch :checked="formData.is_on_sale" />
			</uni-forms-item>
			<uni-forms-item name="is_new" label="是否新品">
				<switch :checked="formData.is_new" />
			</uni-forms-item>
			<uni-forms-item name="is_hot" label="是否热销">
				<switch :checked="formData.is_hot" />
			</uni-forms-item>
			<uni-forms-item name="goods_thumb" label="商品封面">
				<uni-file-picker v-model="formData.goods_thumb" fileMediatype="image" mode="grid" @success="successThumb"  @fail="fail"  @delete="deleteFile" />
			</uni-forms-item>	
			<uni-forms-item  name="goods_banner_imgs" label="商品图片">
				<uni-file-picker v-model="formData.goods_banner_imgs" fileMediatype="image" mode="grid" @success="successBanner"  @fail="fail"  @delete="deleteFile" />
			</uni-forms-item>	
		</uni-forms>
		<view class="uni-button-group">
			<button type="primary" class="uni-button" @click="submitForm">保存</button>
			<button class="uni-button">重置</button>
		</view>
	</view>
</template>

<script>
	import {
		validator
	} from '@/js_sdk/validator/uni-product-add.js';
	export default {
		data() {
			return {
				formData: {
					goods_name: "",
					price: "",
					discount: "",
					goods_banner_imgs:[],
					goods_thumb:[]
				},
			}
		},
		methods: {
			// 上传成功
			successBanner(e) {
				let imgs =  Array.isArray(e.tempFilePaths)?e.tempFilePaths:[e.tempFilePaths];
				imgs = new Set(imgs)
				this.formData.goods_banner_imgs = [...imgs]
				uni.showToast({
					title:'上传成功'
				})
			},
			successThumb(e) {
				let imgs =  Array.isArray(e.tempFilePaths)?e.tempFilePaths:[e.tempFilePaths];
				imgs = new Set(imgs)
				this.formData.goods_thumb =  [...imgs]
				console.log(this.formData.goods_thumb)
				uni.showToast({
					title:'上传成功'
				})
			},
			// 上传失败
			fail(e) {
				uni.showToast({
					title:'上传失败'
				})
			},
			// 删除图片
			deleteFile(e){
				console.log(e)
			},
			/**
			 * 触发表单提交
			 */
			submitForm() {
				this.$refs.form.submit();
			},
			/**
			 * 表单提交
			 * @param {Object} event 回调参数 Function(callback:{value,errors})
			 */
			submit(event) {
				const {
					value,
					errors
				} = event.detail
				// 表单校验失败页面会提示报错 ，要停止表单提交逻辑
				if (errors) return false;
				uni.showLoading({
					title: '提交中...',
					mask: true
				})
				const db = uniCloud.database();
				const collection = db.collection('product-list').add({
					...value,
					category_id: 'sfsdf'
				}).then(res => {
					if (res.result.code == 0) {
						setTimeout(() => {
							uni.showToast({
								title: "新增成功"
							})
						}, 1000)
					} else {

					}
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: err
					})
				}).finally(res1 => {
					uni.hideLoading()
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .uni-forms-item__label {
		width: 90px !important;
		text-align: right;
	}

	.uni-button-group {
		button {
			width: 100px;
			margin-right: 20px;
		}
	}

	::v-deep .uni-forms {
		max-width: 80% !important;
		overflow: hidden;
		margin: auto;
	}

	.uni-forms .uni-forms-item {
		width: 400px;
		float: left;
		margin-right: 20px;
	}

	.uni-button-group {
		max-width: 80%;
		margin: auto;
	}
</style>
