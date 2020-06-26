import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/user/login'
import login_success from '@/components/user/login_success'
import register from '@/components/user/register'
import register_success from '@/components/user/login_success'
import order from '@/components/order/order'
import cart from '@/components/cart/cart'
import checkout from '@/components/cart/checkout'
import book_edit from '@/components/manager/book_edit'
import book_manager from '@/components/manager/book_manager'
import manager from '@/components/manager/manager'
import order_manager from '@/components/manager/order_manager'
import fileupload from '@/components/fileupload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/login_success',
      name: 'login_success',
      component: login_success
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/register_success',
      name: 'register_success',
      component: register_success
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: checkout
    },
    {
      path: '/book_edit',
      name: 'book_edit',
      component: book_edit
    },
    {
      path: '/book_manager',
      name: 'book_manager',
      component: book_manager
    },
    {
      path: '/manager',
      name: 'manager',
      component: manager
    },
    {
      path: '/order_manager',
      name: 'order_manager',
      component: order_manager
    },
    {
      path: '/fileupload',
      name: 'fileupload',
      component: fileupload
    }
  ]
})
