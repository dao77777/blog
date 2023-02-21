# 抽象

## 技术层面

不同前端应用之间的通信: 页面跳转, App唤起, 内部小程序调用, 扫描二维码

controller层, service层, dao层

VO: 面向不同的前端, 如PC, 手机

DTO(data transfer object): 数据传输对象, 根据功能分 params dto, return dto, 以下是returns dto通用属性
- counts
- pageNo
- pageSize

PO(persistence object): 持久化对象

## 业务动作

查询Query
- 查询方式: 模糊搜索, 精确搜索, 分类搜索, 范围搜索, 高级搜索, 排序, 分页
- 查询结果: 单查询, 多查询, 级联查询, 聚合查询

变动Mutation: 创建, 批量创建, 更改, 删除, 批量删除

## 业务模型

### 通用

**内容管理**

- id: 索引
- sortId: 排序索引
- contentStatus(变更记录): 草稿/未发布/已发布
- isCensored(变更记录): 是否审核
- isDeleted(变更记录): 是否软删除
- classify: 分类/多级分类
- tags: 标签
- 模板实体
  - name: 模板名称
  - isDefault: 是否默认
  - ...原属性

**版本管理**

表变更记录
- createdAt
- updatedAt

行为主体
- xxxBy: xxx发起者
- xxxInfo: xxx发起信息

属性变更记录
- xxxUpdatedAt(行为主体): xxx更新时间

属性变更历史记录
- xxxRecord[]
  - xxxUpdatedAt(行为主体): xxx更新时间

**状态关系**

- 任务调度
  - name: 名称
  - schedule: 定时时间
  - callback: 回调
  - payload: 负载
- 状态机
  - 形式一
    - xxxStatus(属性变更记录): 状态
  - 形式二
    - xxxStatusRecord[]
      - xxxStatus(属性变更历史记录): 状态
- 异步任务
  - xxxTask(属性变更历史记录): 任务状态, pending/success/failed
  - xxxTaskAutoFinishedAt: 任务自动结束时间
  - xxxTaskRetryId: 任务失败重试ID
  - xxxTaskRetryTimes: 任务失败重试次数
  - xxxTaskCurrentRetryTimes: 任务当前重试次数

### 主体

用户
- 用户信息
  - nickname: 昵称
  - avatar: 头像
  - gender: 性别
  - birthday: 生日
  - location: 地区
  - intro: 简介
- 下线信息
  - lastLoginAt: 最后登录时间
  - lastLoginIp: 最后登录IP
  - lastLoginDevice: 最后登录设备
- 个人认证
  - username: 用户名
  - password: 密码
  - phonenumber: 手机
  - email: 邮箱
- 三方认证
  - wechat: 微信
  - qq: QQ
  - weibo: 微博
  - tiktok: 抖音
  - github: github
  - facebook: facebook
  - twitter: twitter
  - google: google
  - linkedin: linkedin
  - instagram: instagram
  - pinterest: pinterest
  - youtube: youtube
  - snapchat: snapchat

公司
- companyName: 公司名称
- companyIntro: 公司简介
- brandLogo: 品牌logo
- identityFrontImage: 身份证正面照
- identityBackImage: 身份证反面照
- businessLicenseImage: 营业执照照片
- companyAddress: 公司地址
- contactName: 联系人名称
- contactPhonenumber: 联系电话
- contactEmail: 联系邮箱

### 权限

菜单

角色
- B2C的角色属性
  - role: 角色
  - name: 角色名称
- B2B的角色属性
  - role: 角色
  - name: 角色名称
  - company: 公司
  - department: 部门
  - position: 职位
- B2B2C的角色属性
  - role: 角色
  - name: 角色名称
  - company: 公司
  - department: 部门
  - position: 职位

### 媒资

- url: 媒资地址
- name: 媒资名称
- type: 媒资类型
- size: 媒资大小
- bucket: 存储桶
- path: 存储路径

### 电子商务

商品(发布, 审核)
- 商品类型
- 商品规格
- 商品参数
- productSN: 货号
- name: 商品名称
- image: 商品主图
- gallery: 商品轮播图
- description: 商品描述
- price: 商品价格
- promotion_price: 商品促销价格
- unit: 商品单位
- weight: 商品重量
- stock: 商品库存
- services: 商品服务
- keywords: 商品关键字
- note: 商品备注

- 单商品订单
- 多商品订单
- 单卖家订单
- 多卖家订单

订单
- orderSN: 订单编号
- orderName: 订单名称
- note: 订单备注
- status: 订单状态, 待付款/待发货/待收货/待评价/已完成/已取消/已退款/发起退货
- 交易对像
  - buyer: 买家
  - seller: 卖家
- 金额
  - totalAmount: 订单总金额
  - payAmount: 订单支付金额
  - freightAmount: 运费金额
- 全局营销信息
  - couponAmount: 优惠券金额
  - promotionAmount: 促销金额
  - integrationAmount: 积分金额
  - discountAmount: 折扣金额
  - integration: 可获得的积分
  - growth: 可获得的成长值
  - useIntegration: 下单使用的积分
  - promotionInfo: 促销活动信息
- 跨店营销信息(数组)
  - goodsIds(数组)
  - couponAmount: 优惠券金额
  - promotionAmount: 促销金额
  - integrationAmount: 积分金额
  - discountAmount: 折扣金额
  - integration: 可获得的积分
  - growth: 可获得的成长值
  - useIntegration: 下单使用的积分
  - promotionInfo: 促销活动信息
- 单商品营销信息(数组)
  - goodsId
  - couponAmount: 优惠券金额
  - promotionAmount: 促销金额
  - integrationAmount: 积分金额
  - discountAmount: 折扣金额
  - integration: 可获得的积分
  - growth: 可获得的成长值
  - useIntegration: 下单使用的积分
  - promotionInfo: 促销活动信息
- 订单项
  - productItems: 订单项(数组)
- 支付订单
  - payOrder: 支付订单
- 物流
  - Logistics: 物流
- 发票
  - invoice: 发票

订单项
- productSN: 货号
- name: 商品名称
- image: 商品主图
- gallery: 商品轮播图
- description: 商品描述
- price: 商品价格
- promotion_price: 商品促销价格
- unit: 商品单位
- weight: 商品重量
- stock: 商品库存
- services: 商品服务
- keywords: 商品关键字
- note: 商品备注

支付订单(任务, 状态变更元数据)
- payOrderSN: 外部支付订单编号
- amount: 订单支付金额
- currency: 币种
- type: 支付方式, 微信/支付宝

物流(任务)
- deliverySN: 物流单号
- deliveryCompany: 物流公司
- autoConfirmDay: 自动确认时间
- 地址信息(模板)
  - receiverName: 收货人姓名
  - receiverPhonenumber: 收货人电话
  - receiverPostCode: 收货人邮编
  - receiverProvince: 收货人省份
  - receiverCity: 收货人市
  - receiverRegion: 收货人区/县
  - receiverTown: 收货人街道/镇
  - receiverDetailAddress: 收货人详细地址

退货单(任务)
- order: 售后对应订单
- afterSaleSN: 售后编号
- amount: 退款金额
- reason: 退货原因
- status: 退货状态, 审核中/待收货/待退款/已完成/已拒绝

发票(任务)
- 发票详情
  - invoiceType: 发票类型, 电子发票/纸质发票
  - headerType: 发票抬头类型, 个人/公司
  - header: 发票抬头
  - taxNumber: 发票税号
  - content: 发票内容
  - amount: 发票金额
  - provider: 发票提供方
- 收件人信息
  - receiverName: 收票人姓名
  - receiverPhonenumber: 收票人电话
  - receiverEmail: 收票人邮箱

取消订单, 退款, 退货

交易流程: 提交订单 -> 待付款(取消订单) -> 待发货(退款) -> 已发货 -> 交易完成(退货)

退货流程: 待审核 -> 待收货 -> 待退款

交易流程
- 单店: 用户加入购物车, 然后下单, 此时生成系统订单以及三方支付订单(此时可以取消订单), 然后付款(此时可以退款), 付款后商家发货, 用户收货后确认收货或者系统自动确认收货(此时可以退货)
- 多商家入驻: 用户加入购物车, 形成不同商家多个购物车, 然后生成多个系统订单以及一个三方支付订单, 付款后, 分账流入各个商家账户, 并发货, 用户收货后确认收货或者系统自动确认收货

如何定义一个人
- 姓名
- 身份证号
- 手机号
- 邮箱号
- 地址: 省, 市, 区/县, 街道/镇, 详细地址

退单
- 营销手段
  - 提高客单量
    - 秒杀
    - 预售: 预售价, 定金(膨胀金)
    - 团购/拼团
    - 积分: 实物兑换, 抽奖兑换, 优惠券兑换, 抵现, 换购
    - 优惠券: 满减券, 折扣券, 兑换券, 礼品券, 店铺优惠券, 品类优惠券, 跨店优惠券
    - 砍价
    - 抽奖
    - 小游戏
    - 分销: 社区分销, 微店
    - 分享: 有偿分享, 无偿分享
    - 直播带货
    - 会员卡
  - 提高客单价
    - 品牌效应

任务调度

# 杂

数据字典表dictionary: 给枚举类型加描述

数据字典表
