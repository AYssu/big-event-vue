<script setup>
import { ref } from 'vue'

const passwordInfo = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
})

import { userPasswordUpdateService } from '@/api/user.js'
const checkPass = (rules, value, callback) => {
    if (value === '') {
        callback(new Error("请再次输入密码!"));
    } else if (value !== passwordInfo.value.new_pwd) {
        callback(new Error("两次输入密码不一致!"))
    } else {
        callback()
    }

}

const inputrules = {

    old_pwd: [
        {
            required: true,
            message: '请输入密码！',
            trigger: "blur"
        },
        {
            min: 4,
            max: 16,
            message: '长度为4-16非空字符!',
            trigger: "blur"
        }
    ], new_pwd: [
        {
            required: true,
            message: '请输入密码！',
            trigger: "blur"
        },
        {
            min: 4,
            max: 16,
            message: '长度为4-16非空字符!',
            trigger: "blur"
        }
    ],
    re_pwd: [
        {
            validator: checkPass, trigger: 'blur'
        }]
}
import { useTokenStores } from '@/stores/token.js'
const tokenStore = useTokenStores()
import {useRouter} from 'vue-router'
const router = useRouter()
import { useUserInfoStore } from '@/stores/user.js'
const userInfoStore = useUserInfoStore();

import { ElMessage } from 'element-plus'
const updatePassword = async () => {
    let result = await userPasswordUpdateService(passwordInfo.value)
    ElMessage.success(result.message ? result.message : '修改成功')
    userInfoStore.info = {}
    tokenStore.token = ''
    //跳转到登录页
    router.push('/login')
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>修改密码</span>
            </div>
        </template>
        <el-row>

            <el-col :span="12">
                <el-form :model="passwordInfo" :rules="inputrules" label-width="100px" size="large">
                    <el-form-item label="用户原密码" prop="old_pwd">
                        <el-input type="password" v-model="passwordInfo.old_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new_pwd">
                        <el-input type="password" v-model="passwordInfo.new_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入密码" prop="re_pwd">
                        <el-input type="password" v-model="passwordInfo.re_pwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword">提交修改</el-button>
                    </el-form-item>
                </el-form>


            </el-col>
        </el-row>
    </el-card>
</template>