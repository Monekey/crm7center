define(["require","css!company_css","css!score_rule_css"],function(require){var ngAMD=require("ngAMD");return ngAMD.controller("companyCtrl",["$scope","ajaxService","$rootScope","register","appConstant",function($scope,ajaxService,$rootScope,register,appConstant){function getCompany(){ajaxService.AjaxPost({sessionId:sessionId},"baseData/companyManager/load.do").then(function(result){$scope.company=result.data,$scope.company.city="",$scope.company.ifEnable==1?$scope.company.ifEnable=="已开通":$scope.company.ifEnable=="未开通";var cityId=($scope.company.cityId+"").substr(0,4),cityName;require(["../../../lib/city/"+($scope.company.cityId+"").substr(0,2)],function(city,callBack){city.subAreas.forEach(function(cityed){if(cityed.id==cityId){$scope.company.city=cityed.name,$scope.$apply();return}})})})}var sessionId=$rootScope.sessionId,result={};$scope.edit=register.getRoot("修改"),getCompany(),$scope.openNew=function(company){company.callback=function a(callback){getCompany()};var param={title:"修改集团信息",id:"company"+company.id,template:"basedata/companymanager/companyEdit.html",ctrl:"basedata/companymanager/companyEdit",ctrlName:"companyUpdateCtrl",ng_show:!1,type:"single",from:10009};register.addToTabs(param,company)}}]),"companyCtrl"});