define(["require","css!score_rule_css","css!../../../assets/css/shops","ngAMD"],function(require){var app=require("css!score_rule_css"),shopCss=require("css!../../../assets/css/shops"),ngAMD=require("ngAMD");return ngAMD.controller("terminalCtrl",["$scope","appConstant","register","$rootScope",function($scope,appConstant,register,$rootScope){var sessionId=$rootScope.sessionId;$scope.conditions={ajaxUrl:"baseData/terminalManager/list.do",request:{sessionId:sessionId,pageNo:"1",pageCount:appConstant.pageSet.numPerPage},filter:[],select:{requestFiled:"searchType",options:[{name:"门店名称",state:!0,value:1},{name:"门店号",state:!1,value:3},{name:"终端号",state:!1,value:2}]},search:{requestFiled:"searchTypeValue",request:{sessionId:sessionId}}},$scope.pageSet={title:"终端列表",currentPage:appConstant.pageSet.currentPage,maxSize:appConstant.pageSet.maxSize,numPerPage:appConstant.pageSet.numPerPage,table:[{field:"index",desc:"编号"},{field:"id",desc:"终端号码"},{field:"name",desc:"终端名称",column:"name"},{field:["openTime"],desc:"开通时间",filter:"formatDateToDay",column:"open_time"},{desc:"状态",field:"ifEnable",filter:"tranTerminalStatus",column:"if_enable",isRender:!0},{field:"shopId",desc:"门店编号",column:"shop_id"},{field:"shopName",desc:"门店名称",column:"shopName"}],task:[]},$scope.openNew=function(shop){shop.callback=function a(callback){callback()},register.addToTabs({title:"修改门店信息",id:"shop"+shop.id,template:"basedata/shopmanager/shopEdit.html",ctrl:"basedata/shopmanager/shopEdit",ctrlName:"shopUpdateCtrl",ng_show:!1,type:"single",from:10010},shop)}}]),"terminalCtrl"});