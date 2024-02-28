<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
//控制注册与登录表单的显示， 默认显示注册
import { ElMessage } from 'element-plus'

const registData = ref({
    username: '',
    password: '',
    repassword: ''
})

const loginData = ref({
    username: '',
    password: ''
})

const isRegister = ref(false)


const registclik = async () => {

    const result = await userRegisterService(registData.value);
    ElMessage.success(result.message ? result.message : "注册成功");
}

import { useRouter } from 'vue-router';
import {useTokenStores} from '@/stores/token.js'
const TokenStores = useTokenStores();
const router = useRouter();

const loginclick = async () => {
    const result = await userLoginService(loginData.value);
    ElMessage.success(result.message ? result.message : "登陆成功");
    // TokenStores.setToken(result.data);
    TokenStores.setToken(result.data);
    console.log(TokenStores.token);
    router.push('/');
}


const checkPass = (rules, value, callback) => {
    if (value === '') {
        callback(new Error("请再次输入密码!"));
    } else if (value !== registData.value.password) {
        callback(new Error("两次输入密码不一致!"))
    } else {
        callback()
    }

}
const inputrules = {
    username: [
        {
            required: true,
            message: '请输入用户名！',
            trigger: "blur"
        },
        {
            min: 4,
            max: 16,
            message: '长度为4-16非空字符!',
            trigger: "blur"
        }
    ],
    password: [
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
    repassword: [
        {
            validator: checkPass, trigger: 'blur'
        }]
}

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registData" :rules="inputrules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registData.password"></el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                        v-model="registData.repassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="registclik">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" :model="loginData" :rules="inputrules" v-else>
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" v-model="loginData.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" v-model="loginData.password" type="password"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="loginclick">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>