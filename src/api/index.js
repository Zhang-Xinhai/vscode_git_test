import ajax from './ajax'

export const reqLogin=(username,password)=>ajax('/login',{username,password},'POST')

export const reqAddUser=(user)=>ajax('/manage/user/add',user,'POST')

export const reqCategorys=(parentId)=>ajax('/manage/category/list',{parentId})

export const reqAddCategory=(categoryName,parentId)=>ajax('/manage/category/add',{categoryName,parentId},'POST')

export const reqUpdateCategory=({categoryId,categoryName})=>ajax('/manage/category/update',{categoryId,categoryName},'POST')

export const reqProducts=(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize})