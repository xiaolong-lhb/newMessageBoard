const express = require("express")
// const session = require("express-session")
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const cors =require('cors')
const app = express()
const oprateMysql = require('./connectDB.js')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const corsConfig = {
    origin:'http://localhost:5173',
    credentials:true,
  }
  
app.use(cors(corsConfig))
// app.use(session({
//     secret:'key board',
//     resave:false,
//     saveUninitialized:true
// }))
const secretKey = "Longyibin"

app.use(expressJwt.expressjwt({secret:secretKey,algorithms:["HS256"]}).unless({path:['/loginweb','/registweb']}))
//判断用户是否已经登录

app.get('/islogin', (req,res)=>{
    // const url = req.url
    // const fpath = path.join(__dirname,'../HTML',url)
    // fs.readFile(fpath,'utf-8',(err,dataStr)=>{
    //     if(err)
    //         res.end('error')
    //     else
    //         res.end(dataStr)
    // })
    //res.setHeader('Access-Control-Allow-Origin','*')
    
    //res.setHeader('Authorization: ','Bearer'+ JSON.parse(window.localStorage.getItem('token')))
    res.send({
        status:200,
        ...req.auth
    })

})

//用户接收用户注册时传过来的数据
app.post('/registweb',(req,res)=>{
    //res.setHeader('Access-Control-Allow-Origin','*')
    const userinfo = {username:req.body.username,realname:req.body.realname,password:req.body.psw}
    const sql = 'insert into users set ?'
    const result = oprateMysql.db_Insert(sql,userinfo)
    result.then((value)=>{
        if(value){
            res.send({
                message:'注册成功，返回登录界面',
                status:200
            })
        }
    },(error)=>{
        res.send({
            message:error,
            status:404
        })
    })
})

//用于接收用户登录时传过来的数据
app.post('/loginweb',(req,res)=>{
    //res.setHeader('Access-Control-Allow-Origin','*')
    // res.setHeader('Authorization: ','Bearer'+ JSON.parse(window.localStorage.getItem('token')))
    // 对数据库进行遍历并返回一个数组
    // console.log(req.body)
    const userList = oprateMysql.db_Query(`select * from users where username='${req.body.username}' and password='${req.body.psw}'`)
    userList.then((value)=>{
        if(value.length !== 0){
            const tokenstr = jwt.sign({username:req.body.username},secretKey,{expiresIn:'1h'})
                res.send({
                status:0,
                msg:'用户登录成功',
                token:'Bearer '+tokenstr
            })           
        }else{
            res.send({
                status:1,
                msg:'未找到该用户，请重新注册'
            }) 
            }
    },(error)=>{
        console.log(error)
        res.send({status:404,msg:'系统错误'})
    })
    
    
})
// 用于接收用户提交的留言信息
app.post('/submitList',(req,res)=>{
    const listinfo = req.body
    const sql = 'insert into message_list set ?'
    const result = oprateMysql.db_Insert(sql,listinfo)
    result.then((value)=>{
        if(value){
            res.send({
                message:'留言成功，现在返回留言列表',
                status:200
            })
        }
    },(error)=>{
        res.send({
            message:error,
            status:404
        })
    })
})
// 用于返回用户名
app.get('/submitList',(req,res)=>{
    res.send({
        username:req.auth.username,
        status:200
    })
})
// 用于返回个人信息
app.get('/getPerson',(req,res)=>{
    //res.setHeader('Access-Control-Allow-Origin','*')
    // const sql = `select * from users where username=${req.body.username}`
    // const userList = oprateMysql.db_Query(sql)
    const sql = `select * from users where username='${req.auth.username}'`
    const userList = oprateMysql.db_Query(sql)
    //console.log(userList)
    userList.then((value)=>{
        //console.log(value)
        res.send({
            username:req.auth.username,
            realname:value[0].realname,
            status:200
        })
        //console.log(value[0].realname)
    })
})
// 用于返回所有的列表信息
app.get('/getList',(req,res)=>{
    const sql = 'select * from message_list'
    const messageLists = oprateMysql.db_Query(sql)
    messageLists.then((value)=>{
        res.send({
            lists:value,
            status:200
        })
    })
})
//用于返回详情列表的单个列表信息
app.post('/getListDetail',(req,res)=>{
    //console.log(req.body.id)
    const sql = `select * from message_list where idmessage_list=${req.body.id}`
    try {
        const listDetail = oprateMysql.db_Query(sql)
        listDetail.then((value)=>{
            res.send({
                detail:value[0],
                status:200
            })
        })
    } catch (error) {
        console.log(err)
    }
})
// 用于更新数据库中的点赞数
app.post('/insertLikes',(req,res)=>{
    //console.log(req.body)
    const likeinfo = {user_like:req.auth.username,status:1,list_id:req.body.idmessage_list}
    const sql1 = `update message_list set messageLikes=? where idmessage_list=?`
    const sql2 = `insert into likes_list set ?`
        oprateMysql.db_Update(sql1,[req.body.messageLikes,req.body.idmessage_list])
        oprateMysql.db_Insert(sql2,likeinfo)
        res.send({
            status:200
        })
    
})
// 用于获取该条留言的回复信息
app.post('/getReply',(req,res)=>{
    const sql = `select * from reply_list where list_id=${req.body.listid}`
    //console.log(sql)
    try {
        const replyinfo = oprateMysql.db_Query(sql)
        replyinfo.then((value)=>{
            //console.log(value)
            res.send({
                replyinfos:value,
                status:200
            })
        })
    } catch (error) {
        console.log(error)
    }
})
// 用于对某条特定信息插入新的回复
app.post('/insertReply',(req,res)=>{
    const sql1 = `select * from reply_list where replyPerson='${req.auth.username}' and list_id=${req.body.listid}`
    const sql3 = `update message_list set messageReplys=? where idmessage_list=?`
    // console.log(sql1)
    // console.log(req.body)
    // console.log(sql3)
    // console.log([req.body.replynum,req.body.listid])
    oprateMysql.db_Query(sql1).then((value)=>{
        if(value.length<5){
            const sql2 = `insert into reply_list set ?`
            const replyinfo = {replyPerson:req.auth.username,replyTime:req.body.replyTime,replyContent:req.body.replyContent,list_id:req.body.listid}
            // console.log(sql3)
            // console.log([req.body.replynum,req.body.idmessage_list])
            oprateMysql.db_Update(sql3,[req.body.replynum,req.body.listid])
            oprateMysql.db_Insert(sql2,replyinfo).then((value)=>{
                res.send({
                    status:200
                })
            })
        }       
        else{
            res.send({
                message:'用户回复消息数量不可超过5条',
                status:404
            })
        }         
    })
})
// 用于判断用户是否已对该条留言点赞
app.post('/getIslike',(req,res)=>{
    const sql = `select * from likes_list where list_id=${req.body.id} and user_like='${req.auth.username}'`
    oprateMysql.db_Query(sql).then((value)=>{
        if(value.length !== 0){
            res.send({
                status:true
            })
        }else{
            res.send({
                status:false
            })
        }
    })
})
//捕获生成token值时生成的错误
app.use((err,req,res,next)=>{
    if(err.name=='unauthorizedError'){
        return res.send({
            status:401,
            message:"登录状态失效，请重新登录"
        })
    }
    res.send({
        status:500,
        message:"用户还未登录"
    })
})
//开启服务器端口
app.listen(80, ()=>{
    console.log("server running on 127.0.0.1")
})