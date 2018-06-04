var vm = new Vue({
	el:"#details",
	data:{
		detailsList:[],
	},
	filters:{

	},
	mounted:function(){
			this.detailsWeb();
	},
	methods:{
		detailsWeb:function(){
			var _this = this;
			this.$http.get("http://test.sanrenxi.com/goods/detailWeb",{params:{"gid":1000001}}).then(function(res){
				res.body.data.detailPic = res.body.data.detailPic.split(',')
				res.body.data.banner = res.body.data.banner.split(',')
				_this.detailsList = res.body.data;
			});
		}
	},
});

var www = 'http://sanrenxi.com/';

var vm = new Vue({
	el:"#home",
	data:{
		homeList:[],
		bannerList:[],
		promotionList:[],
		brandsList:[],
		choujianList:[]
	},
	filters:{

	},
	mounted:function(){
		this.home();
	},
	methods:{
		home:function(){
			var _this = this;
			this.$http.get("http://test.sanrenxi.com/goods/home").then(function(res){
				_this.promotionList = res.body.data;
				_this.bannerList = res.body.data.banners;
				_this.homeList = res.body.data.goodsInfo;
				_this.brandsList = res.body.data.brands;
			});
		},
	}
});

var vm = new Vue({
	el:"#my",
	data:{
		myList:[]
	},
	filters:{

	},
	mounted:function(){
		this.my();
	},
	methods:{
		my:function(){
			var _this = this;
			this.$http.get("http://test.sanrenxi.com/user/userCenter").then(function(res){
				_this.myList = res.body.data;
			})
		}
	}
});


// var vm = new Vue({
// 	el:'#brand',
// 	data:{
// 		brandList:[],
// 	},
// 	filters:{

// 	},
// 	mounted:function(){
// 		this.brand();
// 	},
// 	methods:{
// 		brand:function(){
// 			var _this = this;
// 			this.$http.get("http://test.sanrenxi.com/goods/getCategory").then(function(res){
// 				_this.brandList = res.body.data;
// 			})
// 		}
// 	}
// });


var vm = new Vue({
	el:'#brand',
	data:{
		informationList:[],
	},
	filters:{

	},
	mounted:function(){
		this.information();
	},
	methods:{
		information:function(){
			var _this = this;
			this.$http.get("http://test.sanrenxi.com/goods/getGoodsByclId").then(function(res){
				_this.informationList = res.body.data.pages;
			})
		}
	}
});



var vm = new Vue({
	el:'#brand-area',
	data:{
		brandAreaList:[],
		brandTopImg:[]
	},
	filters:{

	},
	mounted:function(){
		this.brandArea();
	},
	methods:{
		brandArea:function(){
			var _this = this;
			this.$http.get("http://test.sanrenxi.com/goods/getBrandGoods",{params:{"bid":3}}).then(function(res){
				_this.brandTopImg = res.body.data;
				_this.brandAreaList = res.body.data.goods;

			})
		}
	}
});
















































