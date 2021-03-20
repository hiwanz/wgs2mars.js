# 地球坐标系 (WGS-84)到火星坐标系 (GCJ-02) Javascript版 [![Build Status](https://travis-ci.org/hiwanz/wgs2mars.js.svg?branch=master)](https://travis-ci.org/hiwanz/wgs2mars.js)

## 开发调试

项目开发依赖nodejs环境，下载代码后，可以在命令行下切换到项目目录执行

    npm i
    npm start

浏览器会自动打开[http://localhost:1024/](http://localhost:1024/)，允许浏览器定位，查看示例纠偏效果。

若出现端口冲突，请修改webpack.config.js文件。
若未安装nodejs，可以直接到demo目录下用浏览器打开index.html文件，查看默认设置的坐标纠偏效果。

## 通过script引入

引入脚本

    <script src="lib/wgs2mars.min.js"></script>

调用代码（参数分别为经度和纬度）;

    var gcjloc = transformFromWGSToGCJ(119.3122312,26.0240049);

返回GCJ-02坐标对象

    {lng: 119.31705425869873, lat: 26.02096344048847}

## 作为node模块引入

可通过npm install下载作为node模块引入

    npm install wgs2mars --save-dev

然后在项目中引入
    
    let transform = require('wgs2mars');
    let gcjloc = transform(119.3122312,26.0240049);// 返回{lng: 119.31705425869873, lat: 26.02096344048847}

## 致谢

感谢其他语言版本开源作者的贡献！

### 地图官方坐标系转换：

目前各个地图服务提供商都开放了转换服务，推荐使用官方的API

[【高德地图API】](http://lbs.amap.com/api/javascript-api/reference/lnglat-to-address/#t2 "【高德地图API】")
[【百度地图API】](http://lbsyun.baidu.com/index.php?title=webapi/guide/changeposition "【百度地图API】")

### 该版本算法参考了以下几个项目的相关实现：

C#版：[地球坐标系 (WGS-84) 到火星坐标系 (GCJ-02) 的转换算法](http://blog.csdn.net/coolypf/article/details/8686588 "地球坐标系 (WGS-84) 到火星坐标系 (GCJ-02) 的转换算法")

C语言版：[ChinaMapShift](https://github.com/Dronaldo17/ChinaMapShift/blob/master/algorithm/china_shift.c "ChinaMapShift")

点在多边形内算法：[PNPOLY - Point Inclusion in Polygon Test](https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html "PNPOLY - Point Inclusion in Polygon Test")

中国区域判断为粗略计算，边界数据中会排除台湾，香港什么的你懂的。如下图：

![中国区域判断](in-china-region.png)

## 免责声明

该Javascript版本算法是基于网络上公开已知的其他语言算法实现的移植版本，作者不对其准确性和合法性做保证。