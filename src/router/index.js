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
import Address from '@/components/Address'
import AddressEdit from '@/components/AddressEdit'
import OrderDetails from '@/components/OrderDetails'
import Share from '@/components/Share'
import Logistics from '@/components/Logistics'
import SetPassword from '@/components/SetPassword'
import Refund from '@/components/Refund'
import RefundSuccess from '@/components/RefundSuccess'
import SignIn from '@/components/SignIn';
import LoginTest from '@/components/LoginTest';


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'LoginTest',
            meta: { index: 1 },
            component: LoginTest
        },
        {
            path: '/home',
            name: 'Home',
            meta: { index: 1 },
            component: Home
        },
        {
            path: '/brand',
            name: 'Brand',
            meta: { index: 1 },
            component: Brand
        },
        {
            path: '/brand/:bid',
            name: 'BrandArea',
            meta: { index: 2 },
            component: BrandArea
        }
        ,
        {
            path: '/details/:id',
            name: 'Details',
            meta: { index: 3 },
            component: Details
        },
        ,
        {
            path: '/cart',
            name: 'Cart',
            meta: { index: 1 },
            component: Cart
        },
        ,
        {
            path: '/my',
            name: 'Mine',
            meta: { index: 1 },
            component: Mine,
        },
        {
            path: '/my/set-password',
            name: 'SetPassword',
            meta: { index: 2 },
            component: SetPassword,
        },

        {
            path: '/my/about',
            name: 'About',
            meta: { index: 3 },
            component: About,
        },
        {
            path: '/my/share',
            name: 'Share',
            meta: { index: 4 },
            component: Share
        },
        {
            path: '/search',
            name: 'Search',
            meta: { index: 4 },
            component: Search
        },
        {
            path: '/order-set',
            name: 'OrderSet',
            meta: { index: 4 },
            component: OrderSet
        },
        {
            path: '/my-order',
            name: 'MyOrder',
            meta: { index: 4 },
            component: MyOrder
        },
        {
            path: '/address',
            name: 'Address',
            meta: { index: 5 },
            component: Address
        },
        {
            path: '/address-edit',
            name: 'AddressEdit',
            meta: { index: 6 },
            component: AddressEdit
        },
        {
            path: '/order-details',
            name: 'OrderDetails',
            meta: { index: 7 },
            component: OrderDetails
        },
        {
            path: '/order/logistics',
            name: 'Logistics',
            meta: { index: 8 },
            component: Logistics
        },
        {
            path: '/order/refund',
            name: 'Refund',
            meta: { index: 8 },
            component: Refund
        },
        {
            path: '/order/refund-success',
            name: 'RefundSuccess',
            meta: { index: 9 },
            component: RefundSuccess
        },
        {
            path: '/sign-in',
            name: 'SignIn',
            meta: { index: 11 },
            component: SignIn
        },
    ]
})
