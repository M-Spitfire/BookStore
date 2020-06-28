<!--  -->
<template>
<div>
  <div id="header">
			<img class="logo_img" alt="" src="../assets/img/logo.gif" >
			<span class="wel_word">Online Book Store</span>
			<div>
				<span v-if="loginStatus">欢迎<span class="um_span">{{username}}</span>光临尚硅谷书城</span>
				<span v-else>
					<router-link to="/login">登录</router-link>
					<router-link to="/register">注册</router-link>
				</span>
				<router-link to="/cart">购物车</router-link>
				<router-link to="/manager">管理</router-link>
			</div>
	</div>

	<hr style="FILTER: alpha(opacity=100,finishopacity=0,style=3)" width="100%" color=#987cb9 SIZE=2>

	<div id="main">
		<div id="book">
			<div class="book_cond">
				<form action="" method="get">
					price:<input id="min" type="text" v-model="min" placeholder="0"> RMB -
						<input id="max" type="text" v-model="max" placeholder="0"> RMB
						<input type="button" @click="queryByPrice()" />
				</form>
			</div>
			<div style="text-align: center">
				<span>there are 3 goods in your cart.   </span>
				<div>
					added <span style="color: red">time histore</span> into cart
				</div>
			</div>

			<div>
				<span v-for="book in bookList" :key="book.id" class="b_list">
					<div class="img_div">
						<img class="book_img" alt="" src="../assets/img/default.jpg" />
					</div>
					<div class="book_info">
						<div class="book_name">
							<span class="sp1">书名:</span>
							<span class="sp2">{{book.name}}</span>
						</div>
						<div class="book_author">
							<span class="sp1">作者:</span>
							<span class="sp2">{{book.author}}</span>
						</div>
						<div class="book_price">
							<span class="sp1">价格:</span>
							<span class="sp2">￥{{book.price}}</span>
						</div>
						<div class="book_sales">
							<span class="sp1">销量:</span>
							<span class="sp2">{{book.sales}}</span>
						</div>
						<div class="book_amount">
							<span class="sp1">库存:</span>
							<span class="sp2">{{book.stock}}</span>
						</div>
						<div class="book_add">
							<button>加入购物车</button>
						</div>
					</div>
				</span>
			</div>
			
		</div>
		
		
		<el-pagination
			@size-change="handleSizeChange"  
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-size="sizePage"
			layout="prev, pager, next, jumper"
			:total="totalCount"
			background
		>
		</el-pagination>
	
	</div>
	
	<div id="bottom">
		<span>
			atguigu BookStore.Copyright &copy;2015
		</span>
	</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
	min:0,
	max:0,
	sizePage:4,
	currentPage:1,
	totalCount:0,
	bookList:[],
	username:'',
	loginStatus:false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	queryByPrice(){
		let self = this;

		this.$axios({
			method:'post',
			url:'/BookStore/manager',
			data:{
				'action':'getNumOfBooks',
				'min':self.min,
				'max':self.max
			}
		})
		.then((result) => {
			this.totalCount = result.data.num;
			// console.log('1.',this.totalCount);
		}).catch((err) => {
			console.log(err);
		});

		self.currentPage = 1;
		this.$axios({
			method:'post',
			url:'/BookStore/manager',
			data:{
				'action':'queryForPage',
				'min':self.min,
				'max':self.max,
				'currentPage':0,
				'pageSize':self.sizePage
			}
		})
		.then((result) => {
			// console.log(result);
			this.bookList = result.data;
		}).catch((err) => {
			console.log(err);
		});
	},

	handleSizeChange(size){this.sizePage = size},

	handleCurrentChange(index){
		this.currentPage = index;
		let self = this;
		this.$axios({
			method:'post',
			url:'/BookStore/manager',
			data:{
				'action':'queryForPage',
				'min':self.min,
				'max':self.max,
				'currentPage':self.currentPage - 1,
				'pageSize':self.sizePage
			}
		})
		.then((result) => {
			// console.log(result);
			this.bookList = result.data;
		}).catch((err) => {
			console.log(err);
		});
	},
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
	//获取一共有几本书，初始化分页器
	this.$axios({
		method:'post',
		url:'/BookStore/manager',
		data:{
			"action":"getNumOfBooks",
			'min':0,
			'max':0
		}
	})
	.then((result) => {
		// console.log(result);
		this.totalCount = result.data.num;
	}).catch((err) => {
		console.log(err);
	});

	//获取第一页的书的信息
	this.$axios({
		method:'post',
		url:'/BookStore/manager',
		data:{
			'action':'queryForPage',
			'min':0,
			'max':0,
			'currentPage':0,
			'pageSize':4
		}
	})
	.then((result) => {
		console.log(result);
		this.bookList = result.data;
	}).catch((err) => {
		console.log(err);
	});

	//获取登录信息
	this.$axios({
		method:'post',
		url:'/BookStore/userService',
		data:{
			'action':'getLoginInfo'
		}
	})
	.then((result) => {
		// console.log(result.data);
		this.username = result.data.username;
		this.loginStatus = result.data.loginStatus;
	}).catch((err) => {
		console.log(err);
	});
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/*// @import url(); 引入公共css类*/
/* @import url("../static/css/style.css"); */
</style>