const express = require("express")
// const session = require("express-session")
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const cors = require('cors')
const app = express()
const oprateMysql = require('./connectDB.js')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
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
    res.setHeader('Access-Control-Allow-Origin','*')
    
    //res.setHeader('Authorization: ','Bearer'+ JSON.parse(window.localStorage.getItem('token')))
    console.log(req.auth)
    res.send({
        status:200,
        ...req.auth
    })

})

//用户接收用户注册时传过来的数据
app.post('/registweb',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    const userinfo = {username:req.body.username,realname:req.body.realname,password:req.body.psw}
    const result = oprateMysql.db_Insert(userinfo)
    result.then((value)=>{
        if(value){
            res.send({
                message:'注册成功，返回登录界面',
                status:value
            })
        }
    },(error)=>{
        res.send({
            message:error,
            status:false
        })
    })
})

//用于接收用户登录时传过来的数据
app.post('/loginweb',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    // res.setHeader('Authorization: ','Bearer'+ JSON.parse(window.localStorage.getItem('token')))
    // 对数据库进行遍历并返回一个数组
    // console.log(req.body)
    const userList = oprateMysql.db_Query(`select * from users where username='${req.body.username}' and password='${req.body.psw}'`)
    userList.then((value)=>{
        if(value.length !== 0){
            const tokenstr = jwt.sign({username:req.body.username},secretKey,{expiresIn:'10s'})
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