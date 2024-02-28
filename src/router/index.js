import { createRouter,createWebHashHistory } from "vue-router"
import LoginVue from "@/views/Login.vue"
import LayoutVue from "@/views/Layout.vue"
import ArticleCategoryVue from "@/views/article/ArticleCategory.vue"
import ArticleManageVue from "@/views/article/ArticleManage.vue"
import UserAvatarVue from "@/views/user/UserAvatar.vue"
import UserInfoVue from "@/views/user/UserInfo.vue"
import UserResetPasswordVue from "@/views/user/UserResetPassword.vue"

const routers = [
    { path: '/login', component: LoginVue },
    { path: '/', component: LayoutVue,redirect:'/article/manage' ,children:[
        {path: '/article/category',component: ArticleCategoryVue},
        {path: '/article/manage',component: ArticleManageVue},
        {path: '/user/avatar',component: UserAvatarVue},
        {path: '/user/info',component: UserInfoVue},
        {path: '/user/resetpassword',component: UserResetPasswordVue},
    ]},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routers

})

export default router


