define(["require","ngAMD","angular","uploadService"],function(require){var ngAMD=require("ngAMD"),angular=require("angular"),upload=require("uploadService");ngAMD.controller("companyUpdateCtrl",["$scope","appConstant","ajaxService","register","uploadService","$rootScope","modalService",function($scope,appConstant,ajaxService,register,uploadService,$rootScope,modalService){var tabData=$rootScope.TabsData,data=angular.copy(tabData);$scope.company=data,$scope.from=data.from,$scope.division=appConstant.division;var provinceId=(data.cityId+"").substr(0,2);$scope.division.forEach(function(province){province.id==provinceId&&($scope.province=province,$scope.area=province.areas)});var cityId=(data.cityId+"").substr(0,4);require(["../../../lib/city/"+provinceId],function(city){$scope.province.subAreas=city.subAreas,city.subAreas.forEach(function(cityed){cityed.id==cityId&&($scope.city=cityed,cityed.subAreas.forEach(function(district){district.id==data.cityId&&($scope.district=district,$scope.$apply())}))})}),$scope.changeProvince=function(province){$scope.city="",$scope.district="",$scope.division.forEach(function(item){if(province.id==item.id){areas=item.areas,$scope.area=areas;return}}),province.id&&require(["../../../lib/city/"+province.id],function(city){province.subAreas=city.subAreas,$scope.$apply()})},$scope.saveCompany=function(company){var data={id:company.id,note:company.note,companyName:company.companyName,address:company.address,linkMan:company.linkMan,phone:company.phone,email:company.email,cityId:parseInt($scope.district.id)},param={companyBean:data,sessionId:$rootScope.sessionId};$scope.company.logo||$scope.company.logo==null?(param.companyBean.logo=$scope.company.logo,ajaxService.AjaxPost(param,"baseData/companyManager/update.do").then(function(result){modalService.info({content:"修改成功!",type:"ok"}).then(function(obj){obj.status=="ok"&&($scope.company.callback(),register.switchTab({id:$scope.from}))},function(){$scope.company.callback(),register.switchTab({id:$scope.from})})})):uploadService.uploadFile($scope.file,"baseData/companyManager/updateHasFile.do",param).then(function(result){modalService.info({content:"修改成功!",type:"ok"}).then(function(obj){obj.status=="ok"&&($scope.company.callback(),register.switchTab({id:$scope.from}))},function(){$scope.company.callback(),register.switchTab({id:$scope.from})})})},$scope.uploadCompanyImg=function(file,picId,fileId){$scope.company.logo="",$scope.file=file},$scope.cancel=function(){register.switchTab({id:$scope.from})}}])});