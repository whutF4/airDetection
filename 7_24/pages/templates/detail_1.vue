<template>
	<view class="content">
		<view v-for="(item,index) in info" :key="index">
			<label class="element" v-if="item.key == '处理人员'">
				<text class="classify">{{item.key}}</text>
				<text class="classV">
					<select>
						<option  v-for="(it, index) in item.value" :key="index">{{it}}</option>
					</select>
				</text>
				
			</label>
			<label class="element" v-else>
				<text class="classify">{{item.key}}</text>
				<text class="classV">{{item.value}}</text>
			</label>
		</view>
		<view>
			<button class="btn" type="warn">取消</button>
			<button class="btn" type="primary">确认</button>
		</view>
	</view>
</template>

<script>
	import Vue from "vue"
	export default{
		data(){
			return{
				info:[
					{'key': "订单号", 'value': '1101'},
					{'key': "处理范围", 'value': '未知'},
					{'key': "日期", 'value': this.getTime()},
					{'key': "客户姓名", 'value': '张三'},
					{'key': "处理地点", 'value': '未知'},
					{'key': "处理人员", 'value': ['小张', '小李', '小王']},
					{'key': "联系方式", 'value': '13837809876'},
					{'key': "处理时间", 'value': '3-9'},
					{'key': "费用", 'value': '10000'},
					{'key': "其他", 'value': '其他'},
				],
				
			}
		},
		methods:{
			getTime(){
				let yy = new Date().getFullYear();
				let MM = new Date().getMonth()+1;
				let dd = new Date().getDate();
				let hh = new Date().getHours()
				let mm = new Date().getMinutes()<10? '0'+new Date().getMinutes():new Date().getMinutes();
				return yy + '/' + MM + '/' + dd + ' ' + hh + ':' + mm;
			},
			
		},
		
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		font-size: 1.2em;
		line-height: 1.5em;
		margin: 5%;
		
		/* align-items: center; */
		/* justify-content: center; */
	}
	.content .classify{
		width: 30%;
	}
	.btn{
		float: left;
		align-items: center;
		margin-top: 5%;
		margin-left: 20%;
		
	}
</style>
