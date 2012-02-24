
var areaData = {
	hotCity :{
	    1099: "北京市",
	    1671: "郑州市",
	    1909: "武汉市",
	    2251: "苏州市",
	    2611: "上海市",
	    2615: "广州市",
	    2619: "深圳市",
	    2665: "东莞市",
	    2675: "佛山市",
	    2854: "青岛市",
	    3079: "成都市",
	    3257: "天津市",
	    3263: "重庆市",
	    3479: "杭州市",
	    3486: "宁波市"
	},
	parent:{
	    1099: 1098,
	    1671: 1670,
	    1909: 1908,
	    2251: 2177,
	    2611: 2610,
	    2615: 2614,
	    2619: 2614,
	    2665: 2614,
	    2675: 2614,
	    2854: 2847,
	    3079: 3078,
	    3257: 3256,
	    3263: 3262,
	    3479: 3478,
	    3486: 3478
	},
	province:{
		'A-G':{1002:"安徽省",1098:"北京",1103:"福建省",1181:"甘肃省",1277:"广西壮族自治区",1382:"贵州省",2614:"广东省",3262:"重庆",4853:"澳门特别行政区"},
		'H-K':{1474:"海南省",1511:"河北省",1670:"河南省",1816:"黑龙江省",1908:"湖北省",2002:"湖南省",2118:"吉林省",2177:"江苏省",2258:"江西省"},
		'L-S':{2361:"辽宁省",2434:"内蒙古自治区",2536:"宁夏回族自治区",2561:"青海省",2610:"上海",2728:"山西省",2847:"山东省",2973:"陕西省",3078:"四川省"},
		'T-Z':{3256:"天津",3290:"西藏自治区",3371:"新疆维吾尔自治区",3478:"浙江省",3559:"云南省",4846:"香港特别行政区",4858:"台湾省"}
	},

	city:{
		1002:{1003:"合肥市",1008:"芜湖市",1013:"蚌埠市",1018:"淮南市",1021:"马鞍山市",1024:"淮北市",1027:"铜陵市",1030:"安庆市",1040:"黄山市",1046:"滁州市",1054:"阜阳市",1061:"宿州市",1067:"巢湖市",1073:"六安市",1080:"亳州市",1085:"池州市",1090:"宣城市"},
		1098:{1099:"北京市"},
		2614:{2615:"广州市",2619:"深圳市",2621:"珠海市",2623:"汕头市",2628:"韶关市",2638:"河源市",2645:"梅州市",2654:"惠州市",2660:"汕尾市",2665:"东莞市",2667:"中山市",2669:"江门市",2675:"佛山市",2677:"阳江市",2682:"湛江市",689:"茂名市",2695:"肇庆市",2703:"清远市",2712:"潮州市",2716:"揭阳市",2722:"云浮市"}
	},
	county:{
		1003:{1005:"长丰县",1006:"肥东县",1007:"肥西县",4448:"包河区",4449:"庐阳区",4450:"蜀山区",4451:"瑶海区"},
		1099:{1101:"密云县",1102:"延庆县",4390:"昌平区",4391:"怀柔区",4476:"朝阳区",4477:"崇文区",4478:"大兴区",4479:"东城区",4480:"房山区",4481:"丰台区",4482:"海淀区",4483:"门头沟区",4484:"平谷区",4485:"石景山区",4486:"顺义区",4487:"通州区",4488:"西城区",4489:"宣武区"},
		2615:{2617:"从化市",2618:"增城市",4398:"海珠区",4532:"白云区",4533:"番禺区",4534:"花都区",4535:"黄埔区",4536:"荔湾区",4537:"萝岗区",4538:"南沙区",4539:"天河区",4540:"越秀区"},
		2675:{4527:"禅城区",4530:"三水区",4529:"南海区",4528:"高明区",4531:"顺德区"} 
	}
};


//apple.liut@alibaba-inc.com; shirley.liut@alibaba-inc.com; mingfang.zengmf@alibaba-inc.com; sabrina.lil@alibaba-inc.com; chen.huangfc@alibaba-inc.com; cat.zhengtt@alibaba-inc.com; monica.wangll@alibaba-inc.com; caraline.liuys@alibaba-inc.com; kena.xingkn@alibaba-inc.com; wb_chenss.ciic@alibaba-inc.com; fei.dingf@alibaba-inc.com; kamali.wangxf@alibaba-inc.com; sandy.guofs@alibaba-inc.com; wb_tianling.ciic@alibaba-inc.com; wenjing.ma@alibaba-inc.com; xinyu.wengxy@alibaba-inc.com;wenxia.yewx@alibaba-inc.com; wb_wangsq.ciic@alibaba-inc.com; caihong.qich@alibaba-inc.com;jingjin.huangjj@alibaba-inc.com; zsamea.yinx@alibaba-inc.com; linhua.liulh@alibaba-inc.com; ruilian.marl@alibaba-inc.com;wei.panw@alibaba-inc.com; haiying.luohy@alibaba-inc.com; miao.luom@alibaba-inc.com; pingping.liupp@alibaba-inc.com;victorie.wangyf@alibaba-inc.com; rong.wangr@alibaba-inc.com; yanbin.wenyb@alibaba-inc.com; he.chengh@alibaba-inc.com; qingqing.panqq@alibaba-inc.com;duo.hed@alibaba-inc.com; zewen.caizw@alibaba-inc.com; lihong.zenglh@alibaba-inc.com; jinjin.panjj@alibaba-inc.com; cherry.zhouq@alibaba-inc.com; xiaolei.liuxl@alibaba-inc.com; xuan.sunx@alibaba-inc.com; mingfen.xiamf@alibaba-inc.com;sindy.zhul@alibaba-inc.com; serena.dongss@alibaba-inc.com;qiuling.maoql@alibaba-inc.com; xiaoyu.shaxy@alibaba-inc.com; yaoya.xuyy@alibaba-inc.com; wb_liuqing.yu@alibaba-inc.com; li.qiaol@alibaba-inc.com; rita.wangl@alibaba-inc.com; monica.wum@alibaba-inc.com; xiaoyun.zhangxy@alibaba-inc.com; jerry.shir@alibaba-inc.com;lishar.xuls@alibaba-inc.com; meifang.qianmf@alibaba-inc.com; wenzhuo.zhaowz@alibaba-inc.com; zhao.qianz@alibaba-inc.com; yaling.lvyl@alibaba-inc.com; wenqin.bianwq@alibaba-inc.com; smile.chenyy@alibaba-inc.com; susanna.yanl@alibaba-inc.com; xing.zhengx@alibaba-inc.com; wb_chenmn.ciic@alibaba-inc.com; saier.yuse@alibaba-inc.com; amy.xulp@alibaba-inc.com; wb_chenmo.ciic@alibaba-inc.com; wenjin.wangwj@alibaba-inc.com; manqing.xumq@alibaba-inc.com; jackie.tangj@alibaba-inc.com; yan.liaoy@alibaba-inc.com; haiting.longht@alibaba-inc.com; wenyan.xiewy@alibaba-inc.com; shanshan.qiss@alibaba-inc.com; yun.xiaoy@alibaba-inc.com; 