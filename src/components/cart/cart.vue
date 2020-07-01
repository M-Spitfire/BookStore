<!--  -->
<template>
<div>
  <div id="header">
			<img class="logo_img" alt="" src="../../assets/img/logo.gif" >
			<span class="wel_word">购物车</span>
			<div>
				<span v-if="loginStatus">欢迎<span class="um_span">{{username}}</span>光临尚硅谷书城</span>
        <router-link to="/order">订单</router-link>
        <router-link to="/">首页</router-link>
				<el-button type="text" @click="logout()">注销</el-button>
			</div>
	</div>
	
	<div id="main">
	
		<table>
			<tr>
				<td>商品名称</td>
				<td>数量</td>
				<td>单价</td>
				<td>金额</td>
				<td>操作</td>
			</tr>		
			<tr v-for="book in bookList" :key="book.id">
				<td>{{book.name}}</td>
				<td>{{book.count}}</td>
				<td>{{book.price}}</td>
				<td>{{book.count * book.price}}</td>
				<td><button @click="deleteItem(book)">删除</button></td>
			</tr>	
			
			<tr>
				<td colspan="5" v-if="bookList.length == 0">cart is empty!</td>
			</tr>	
			
			
		</table>
		
		<div class="cart_info" v-if="bookList.length != 0">
			<span class="cart_span">购物车中共有<span class="b_count">{{numOfBooks}}</span>件商品</span>
			<span class="cart_span">总金额<span class="b_price">{{totalPrice}}</span>元</span>
			<span class="cart_span"><button @click="clear()">清空购物车</button></span>
			<span class="cart_span"><button @click="checkout()">去结账</button></span>
		</div>
	
	</div>
	
	<div id="bottom">
		<span>
			尚硅谷书城.Copyright &copy;2015
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
	username:'',
	loginStatus:false,
	bookList:[],
	numOfBooks:0,
	totalPrice:0
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	checkout(){
		if(!this.loginStatus){
			this.$message({
				message:'未登录状态下无法生成订单',
				type:'warning'
			})
			return;
		}
		this.$router.push('/checkout');
	},
	deleteItem(book){
		this.$axios({
			method:'post',
			url:'/BookStore/cartService',
			data:{
				'action':'deleteItem',
				'id':book.id
			}
		})
		.then((result) => {
			this.$router.go(0);
		}).catch((err) => {
			console.log(err);
		});
	},

	clear(){
		this.$axios({
			method:'post',
			url:'/BookStore/cartService',
			data:{
				'action':'clear'
			}
		})
		.then((result) => {
			this.$router.go(0);
		}).catch((err) => {
			console.log(err);
		});
	},

	logout(){
		console.log('logout...');
		this.$axios({
			method:'post',
			url:'/BookStore/userService',
			data:{
				'action':'logout'
			}
		})
		.then((result) => {
			this.login_info = result.data.info;
			this.$message(result.data.info)
			if(result.data.state == 6){
				this.$router.push("/")
			}
		}).catch((err) => {
			console.log(err);
		});
	}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
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

	this.$axios({
		method:'post',
		url:'/BookStore/cartService',
		data:{
			'action':'getCart'
		}
	})
	.then((result) => {
		let cart = result.data;
		this.numOfBooks = cart.numOfBooks;
		this.totalPrice = cart.totalPrice;
		let books = cart.books;
		for(let index in books){
			this.bookList.push(books[index]);
		}
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

</style>