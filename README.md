# 地球坐标系 (WGS-84)到火星坐标系 (GCJ-02) Javascript版 #

##背景
第一次开发跟地图相关的应用，一开始定位获得经纬度什么的还比较顺利，直到要在地图上显示出来的时候发现位置标记跟理想的不同，虽已提前了解也预料到，但本以为某某地图会提供相关的API实现，翻了一个晚上文档都没有看到，于是就只能自己动手寻找相关算法实现，貌似没有找到Javascript版本，于是有了该移植版本。

##快速开始

引入脚本

	<script src="src/js/wgs2mars.min.js"></script>

调用代码

	var gcjloc = transformFromWGSToGCJ(119.3122312,26.0240049);

返回GCJ-02坐标对象

	｛lng: 119.31705425869873, lat: 26.02096344048847｝

## 致谢

感谢科普和其他语言版本开源作者的贡献！

###坐标系科普：

[【高德地图API】如何解决坐标转换，坐标偏移？](http://segmentfault.com/blog/gaodelbs/1190000000498434 "【高德地图API】如何解决坐标转换，坐标偏移？")

###该版本算法参考了以下两位的相关实现：

C#版：[地球坐标系 (WGS-84) 到火星坐标系 (GCJ-02) 的转换算法](http://blog.csdn.net/coolypf/article/details/8686588 "地球坐标系 (WGS-84) 到火星坐标系 (GCJ-02) 的转换算法")

C语言版：[ChinaMapShift](https://github.com/Dronaldo17/ChinaMapShift/blob/master/algorithm/china_shift.c "ChinaMapShift")

##免责声明

该Javascript版本算法是基于网络上公开已知的其他语言算法实现的移植版本，作者不对其准确性和合法性做保证，**请在遵守国家保密法的前提下自行斟酌使用**。