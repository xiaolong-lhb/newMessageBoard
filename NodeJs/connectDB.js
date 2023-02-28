//  引入mysql模块
const mysql = require('mysql')
//  建立与数据库的连接
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'admin123',
    database:'my_db_message'
})
console.log('数据库已连接')
//  测试是否连接到了数据库
// db.query('select 1',(err,result)=>{
//     if(err) console.log(err.message)
//     else console.log(result)
// })
module.exports = {
// 查询数据库函数
    db_Query(sql){       
            return new Promise((resolve,reject)=>{
                db.query(sql,(err,results)=>{
                    if(err) reject(err)
                    else{
                        //console.log(results)
                        resolve(results)
                    }
                })
            })
        },
    // 插入数据库函数
    db_Insert(userinfo){
        return new Promise((resolve,reject)=>{
            db.query('insert into users set ?',userinfo,(err,results)=>{
                if(err){
                    console.log(err.message)
                    reject(err.message)
                }else if(results.affectedRows === 1) resolve(true)
                else reject('wrong message')
            })
        })
    },
    // 更新数据库函数
    db_Update(userinfo){
        return new Promise((resolve,reject)=>{
            db.query('update users set ? where id=?',userinfo,(err,results)=>{
                if(err){
                    // console.log(err.message)
                    reject(err.message)
                } 
                else if(results.affectedRows === 1) resolve(true)
                else reject('wrong message')
            })
        })       
    },
    // 删除数据库函数f
    db_Delete(uid){
        return new Promise((resolve, reject) => {
            db.query('delete users where id=?',uid,(err,results)=>{
                if(err){
                    reject(err.message)
                } 
                else if(results.affectedRows === 1) resolve(true)
                else reject('wrong message')
            })
        })        
    }
}
