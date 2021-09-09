<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData"  validateTrigger="bind" @submit="submit">
			<uni-forms-item name="goods_name" label="商品名称" required>
				<uni-easyinput v-model="formData.goods_name"  placeholder="请输入商品名称" />
			</uni-forms-item>
			<uni-forms-item name="price" label="商品价格" required>
				<uni-easyinput v-model="formData.price"  placeholder="请输入商品价格" />
			</uni-forms-item>
			<uni-forms-item name="discount" label="商品折扣" >
				<uni-easyinput v-model="formData.discount"  placeholder="请输入商品折扣" />
			</uni-forms-item>
		
			<view class="uni-button-group">
				<button  type="primary" class="uni-button" @click="submitForm">保存</button>
				<button class="uni-button">重置</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {validator} from '@/js_sdk/validator/uni-product-add.js';
	export default {
		data() {
			return {
				formData: {
					goods_name : "",
					price : "",
					discount : "",
				},
			}
		},
		methods: {
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
				const collection = db.collection('product-list').add({...value,category_id:'sfsdf'}).then(res=>{
					if(res.result.code==0){
						setTimeout(()=>{
							uni.hideLoading()
							uni.showToast({
								title:"新增成功"
							})
						},1000)
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .uni-forms-item__label {
		width: 100px !important;
	}
	
	.uni-button-group{
		button{
			width: 100px;
			margin-right: 20px;
		}
	}
</style>
