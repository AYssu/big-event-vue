import request from '@/utils/request.js'


export const articleCategoryListService = () => {
    //通过请求头Authorization携带token
    return request.get('/category')
}

export const addCategoryService = (args)=>
{
    return request.post('/category',args);
}

export const fixCategoryService = (args)=>
{
    return request.put('/category',args);
}

export const delectCategoryService = (args)=>
{
    return request.delete('/category?id='+args);
}

//文章列表查询
export const articleListService = (params) => {
    return request.get('/article', { params: params })
}

//添加文章
export const articleAddService = (articleModel)=>{
    return request.post('/article',articleModel)
}

//修改文章
export const articleEditService = (articleModel)=>{
    return request.post('/article/edit',articleModel)
}
//删除文章
export const articleDeleteService = (articleModel)=>{
    return request.post('/article/delete',articleModel)
}