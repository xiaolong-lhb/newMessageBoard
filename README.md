# newMessageBoard
创建表结构
create table users(
    id int primary key not null unique auto_increment,
    username varchar(45) not null unique,
    realname varchar(45) not null,
    password varchar(45) not null,
    status tinyint default 0
)
eigine = InnoDB
default charset=utf8
comments = '用户信息表'


# 使用vue3创建的留言板登录注册与主页简单界面

