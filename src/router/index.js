import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Brand from '@/components/Brand'
import BrandArea from '@/components/BrandArea'
import Details from '@/components/Details'
import Cart from '@/components/Cart'
import Mine from '@/components/Mine'
import Search from '@/components/Search'
import About from '@/components/About'
import OrderSet from '@/components/OrderSet'
import MyOrder from '@/components/MyOrder'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home',
            // meta: {
            //     title: '首页'
            // },
        },
        {
            path: '/home',
            name: 'Home',
            meta: {
                title: '首页'
            },
            component: Home
        },
        {
            path: '/brand',
            name: 'Brand',
            component: Brand
        },
        {
            path: '/brand/:bid',
            name: 'BrandArea',
            component: BrandArea
        }
        ,
        {
            path: '/details/:id',
            name: 'Details',
            component: Details
        },
        ,
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        ,
        {
            path: '/my',
            name: 'Mine',
            component: Mine,
        },
        {
            path: '/my/about',
            name: 'About',
            component: About,
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/order-set',
            name: 'OrderSet',
            component: OrderSet
        },
        {
            path: '/my-order',
            name: 'MyOrder',
            component: MyOrder
        },
        
    ]
})
