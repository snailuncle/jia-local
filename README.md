# jia

## Version1

#### 框架思想

1. 所有脚本都是一个流程
2. 每个流程有若干工作
3. 框架定义了两个个基础类: flow, work

#### 框架使用

1. `git clone https://github.com/snailuncle/jia.git`
2. 入口文件是 main.js
3. 运行项目
4. 自带的 demo 流程是 Q 群发言, 工作列表是 打开 QQ-->点击输入框-->发言

#### 备注

1. 该框架使用 autojs 版本 7.0.3-7 开发
2. 由于后期我要使用 webpack 打包, 所以多个配置文件无法做到动态加载, 请在脚本中自行导入所需配置文件, 具体参考 main.js
3. 如果有好的建议, 请提 issue, 或者联系本人 QQ203118908

## Version2

```
/**
 * @作者 家
 * @QQ 203118908
 * @简介 脚本目录结构
 */
```

目录结构

```
0. main 入口文件
1. init 中检查版本以及下载 app 界面配置文件
2. controller 脚本整体逻辑
3. service 业务逻辑
4. lib 业务无关的函数集合
5. config 配置文件
6. app 界面信息
7. middleware 是一些独立的脚本, 用于在 main.js 之前执行, 比如验证账号之类的, 脚本尽量独立, 互不干扰
```

脚本写的差不多了, 就剩下维护的话,  
一般就是改 app 界面信息, 比如抖音三天两头更新脚本更换控件的 id

app 的界面信息可以单独做一个文件, 因为变化的快;  
放在 workConfig 中了, 因为只有 workConfig 才需要这些 id 信息;  
app 的界面信息 结构可以这样设计

```
{
  "适配版本号列表": ["9.8.5"],
  "版本号 9_8_5": {
    "首页_右侧_头像_id": "emq"
  }
}

```

workConfig 中是写每个工作具体内容的地方,  
service 是写工作中某件事的具体逻辑的地方.  
`one flow = work1 + work2 + work3`  
`one work = service1 + service2 + service3`

## version3

`jia\baseClass\Work.js`中有一个变量`workConfigDefault`  
 是用来设置 work 的默认属性的.

本仓库地址`https://github.com/snailuncle/jia-local`  
 用法大致相同于`https://github.com/snailuncle/jia.git`
