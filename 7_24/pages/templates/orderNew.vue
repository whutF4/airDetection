<template>
	
	<view class="container">
		
		<uni-list class="top1">
			<uni-list-item @click="orderInfo">
				<view class="orderInfo">
					<view class="front">订单号</view><input value="1234567" disabled="true" />
				</view>
			</uni-list-item>
			<!-- <view class="orderInfo" @click="orderInfo" data-target="orderInfo">订单详情</view> -->
			<uni-popup ref="orderInfo" type="top">
				<uni-list>
					<uni-list-item :showArrow="false">
						<view class="orderInfo">
							<view class="front">订单号</view><input value="1234567" disabled="true" />
						</view>
					</uni-list-item>
					<uni-list-item :showArrow="false">
						<view class="orderInfo">
							<view class="front">客户名</view><input value="小李" disabled="true" />
						</view>
					</uni-list-item>
					<uni-list-item :showArrow="false">
						<view class="orderInfo">
							<view class="front">电话</view><input value="13837801111" disabled="true" />
						</view>
					</uni-list-item>
					<uni-list-item :showArrow="false">
						<view class="orderInfo">
							<view class="front">地址</view><input value="武汉市洪山区珞狮路122号" disabled="true" />
						</view>
					</uni-list-item>
					<uni-list-item :showArrow="false">
						<view class="orderInfo">
							<view class="front">约定时间</view><input value="2020-01-01" disabled="true" />
						</view>
					</uni-list-item>
					<uni-list-item :showArrow="false">
						<view class="orderInfo">
							<view class="front">特殊污染源</view><input value="甲醛" disabled="true" />
						</view>
					</uni-list-item>
					<!-- <uni-list-item title="客户名" note="小李" :showArrow="false"></uni-list-item>
					<uni-list-item title="电话" note="13837801111" :showArrow="false"></uni-list-item>
					<uni-list-item title="地址" note="武汉市洪山区珞狮路122号" :showArrow="false"></uni-list-item>
					<uni-list-item title="约定时间" note="2020-01-01" :showArrow="false"></uni-list-item>
					<uni-list-item title="特殊污染源" note="甲醛" :showArrow="false"></uni-list-item> -->
				</uni-list>
			</uni-popup>
			
			<uni-list-item>
				<view class="orderInfo">
					<view class="front">设备</view>
					<view class="machineClassify">
						<picker @change="machine" :value="0" :range="machineClassify">
						<button type="primary" size="mini">{{machineClassify[machineClassifyIndex]}}</button>
						</picker>
					</view>
					<view class="machines">
						<picker @change="machine1" :range="machineSelect">
						<button type="default" size="mini">{{machineSelect[machinesIndex]}}</button>
						</picker>
					</view>
				</view>
			</uni-list-item>
			
			<uni-list-item>
				<view class="orderInfo">
					<view class="front">药剂选择</view>
					<view class="machineClassify">
						<picker @change="medicinal" :value="0" :range="medicinalClassify">
						<button type="primary" size="mini">{{medicinalClassify[medicinalClassifyIndex]}}</button>
						</picker>
					</view>
					<view class="machines">
						<picker @change="medicinal1" :range="medicinalSelect">
						<button type="default" size="mini">{{medicinalSelect[medicinalsIndex]}}</button>
						</picker>
					</view>
				</view>
			</uni-list-item>
			
			<uni-list-item :showBadge="true" badgeText="XX未选中">
				<view class="orderInfo">
					<view class="front">装备提醒</view>
				</view>
			</uni-list-item>
			<uni-list-item >
				<view class="orderInfo">
					<view class="front">图纸信息</view>
					<view>点击预览图片</view>
				</view>
			</uni-list-item>
			
			<uni-list-item >
				<view class="orderInfo">
					<view class="front">仪器管理</view>
					<view>点击编译</view>
				</view>
			</uni-list-item>
			
			<uni-list-item >
				<view class="orderInfo">
					<view class="front">结束倒计时</view>
					<uni-countdown :showDay="false" :hour="8" :minute="30" :second="30" color="#FFFFFF" backgroundColor="#00B26A"></uni-countdown>
				</view>
			</uni-list-item>
			
			<uni-list-item :showArrow="false">
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						图片上传
					</view>
					<view class="action">
						{{imgList.length}}/4
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						 <image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</uni-list-item>
		</uni-list>
		
		
		
		
		
	</view>
	
</template>

<script>

	export default{
		data(){
			return{
				machineClassify: ['类别', '类别一', '类别二'],
				machines: [['默认'], ['A', 'B', 'C'], ['一', '二', '三']],
				machineSelect: ['默认'],
				machineClassifyIndex: 0,
				machinesIndex: 0,
				
				medicinalClassify: ['类别', '类别一', '类别二'],
				medicinals: [['默认'], ['A', 'B', 'C'], ['一', '二', '三']],
				medicinalSelect: ['默认'],
				medicinalClassifyIndex: 0,
				medicinalsIndex: 0,
				imgList: [],
			}
		},
		methods:{
			orderInfo(e){
				console.log(e)
				// if(e.target.dataset.target == "orderInfo"){
					this.$refs.orderInfo.open();
				// }
			},
			machine(e){
				console.log(e.target.value);
				this.machineClassifyIndex = e.target.value;
				this.machineSelect = this.machines[e.target.value];
				console.log(this.machineSelect)
			},
			machine1(e){
				console.log(e.target.value);
				this.machinesIndex = e.target.value;
			},
			medicinal(e){
				console.log(e.target.value);
				this.medicinalClassifyIndex = e.target.value;
				this.medicinalSelect = this.medicinals[e.target.value];
			},
			medicinal1(e){
				console.log(e.target.value);
				this.medicinalsIndex = e.target.value;
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
		}
		
	}
</script>

<style>
	@import "../../colorui/main.css";
	@import "../../colorui/icon.css";
	
	.orderInfo{
		display: flex;
		flex-wrap: nowrap;
		font-size: large;
		/* align-items: center; */
		/* background-color: #DD524D; */
	}
	.orderInfo .front{
		width: 30%;
		/* margin-right: 5%; */
	}
	.orderInfo .machineClassify{
		margin-right: 10%;
	}
	.margin-top, .cu-form-group{
		margin-top: -2%;
		margin-left: -4%;
	}
	
</style>