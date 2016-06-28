define(["require","ngAMD","shopSelector","css!emp_css"],function(require){var ngAMD=require("ngAMD"),shopselector=require("shopSelector"),emp_css=require("css!emp_css");ngAMD.controller("editEmpController",["$scope","$rootScope","ajaxService","$uibModal","$log","register","shopSelectorService","modalService",function($scope,$rootScope,ajaxService,$uibModal,$log,register,shopSelectorService,modalService){function convertModalShop(shops){var newShops=[];for(var i=0;i<shops.length;i++){var shop={};shop.shopId=shops[i].code,shop.shopName=shops[i].showName,shop.bindStatus=shops[i].bindFlg,shop.empId=data.empId,newShops.push(shop)}return newShops}function convertModalShop1(shops){var newShops1=[];for(var i=0;i<shops.length;i++){var shop={};shop.code=shops[i].shopId,shop.showName=shops[i].shopName,shop.bindFlg=shops[i].bindStatus,newShops1.push(shop)}return newShops1}function deletePropertyHashKey(arr){for(var i=0;i<arr.length;i++)delete arr[i].$$hashKey;return arr}var copy=[],sessionId=$rootScope.sessionId,data=$rootScope.TabsData;$scope.from=data.from;var param={sessionId:sessionId,empId:data.empId};$scope.employeeUpdate={empInfo:{}};var initItems=[];ajaxService.AjaxPost(param,"userManager/empManager/load.do").then(function(result){$scope.empInfo=result.data,$scope.roleName=$scope.empInfo.roleName;var str=JSON.stringify(result.data.shopIds);copy=eval("("+str+")"),$scope.employeeUpdate.empInfo.shopIds=result.data.shopIds,initItems=angular.copy($scope.employeeUpdate.empInfo.shopIds),$scope.changeItems=[]});var flg=0;$scope.showModal=function(){var showFlg=1;flg+=1,flg<=1&&(initItems=convertModalShop1(initItems));var currentItems=convertModalShop1($scope.employeeUpdate.empInfo.shopIds),paramSet={serviceType:"shop",shop:{brand:1,city:2,ajaxUrl:"baseData/shopManager/getShopTree.do"},initItems:initItems,currentItems:currentItems,showFlg:1};shopSelectorService.openShopModal(paramSet).then(function(result){$scope.employeeUpdate.empInfo.shopIds=convertModalShop(result.allSelectedItems),console.log($scope.employeeUpdate.empInfo.shopIds),$scope.changeItems=convertModalShop(result.changeItems),console.log($scope.changeItems)})},$scope.createNew=function(){register.openTabWithRequest({id:10025},{})};var param1={sessionId:sessionId};ajaxService.AjaxPost(param1,"usermanager/rolemanager/getRoleCombo.do").then(function(result){$scope.roleList=result.data}),$scope.confirmUpdate=function(){var roleId,roleList=$scope.roleList;for(var a=0;a<roleList.length;a++)$scope.roleName==roleList[a].showName&&(roleId=roleList[a].value);$scope.employeeUpdate.empInfo.shopIds=deletePropertyHashKey($scope.employeeUpdate.empInfo.shopIds);var shopIds="";$scope.changeItems!=null?shopIds=$scope.changeItems:shopIds=[];var submit={};submit.sessionId=sessionId,submit.shopIds=shopIds,submit.roleId=roleId,submit.empName=document.getElementById("empName").value,submit.empId=data.empId,ajaxService.AjaxPost(submit,"userManager/empManager/edit.do").then(function(result){result&&result.status===1&&(selectExchanges=[],modalService.info({title:"提示",content:"修改成功!",size:"sm",type:"ok"}),data.callback(),register.switchTab({id:$scope.from}))})},$scope.cancelIn=function(){register.switchTab({id:$scope.from})},$scope.toggleAnimation=function(){$scope.animationsEnabled=!$scope.animationsEnabled},commonScope=$scope}])});