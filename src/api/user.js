import request from '@/utils/request.js'


export const userRegisterService = (regist)=>
{   
    const params = new URLSearchParams();
    for(let key in regist)
    {
        params.append(key,regist[key]);
    }
    return request.post("/user/register",params)
}

export const userLoginService = (login)=>
{   
    const params = new URLSearchParams();
    for(let key in login)
    {
        params.append(key,login[key]);
    }
    return request.post("/user/login",params)
}

//获取个人信息
export const userInfoGetService = ()=>{
    return request.get('/user/userInfo');
}

//修改个人信息
export const userInfoUpdateService = (userInfo)=>{
    return request.put('/user/update',userInfo)
}

//修改头像
export const userAvatarUpdateService=(avatarUrl)=>{
    let params = new URLSearchParams();
    params.append('avatar',avatarUrl)
    return request.patch('/user/avatar',params)
}

export const userPasswordUpdateService=(params)=>{
    return request.patch('/user/updatePwd',params)
}


