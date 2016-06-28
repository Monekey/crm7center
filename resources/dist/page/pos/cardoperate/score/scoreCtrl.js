define(["require","angular","posService","pos/cardoperate/poppasswd/poppasswdCtrl","text!pos/cardoperate/poppasswd/poppasswd.html"],function(require){var angular=require("angular"),posService=require("posService"),poppasswdCtrl=require("pos/cardoperate/poppasswd/poppasswdCtrl"),poppasswdTemp=require("text!pos/cardoperate/poppasswd/poppasswd.html");return["$scope","$window","ajaxService","posService","getCookieService","$rootScope","modalService","$uibModal","$timeout",function($scope,$window,ajaxService,posService,getCookieService,$rootScope,modalService,$uibModal,$timeout){function trueSave(){ajaxService.AjaxPost($scope.rechargeScoreVo,"postrade/posCardAccount/saveRechargeScore.do").then(function(result){$scope.rechargeScoreVo.forbideSave=!1,result.status&&(modalService.info({content:"增加积分成功!",type:"ok"}),console.log(result.printInfo),$scope.entranceFrom==0?($scope.rechargeScoreVo={cardNo:"",tsCode:"",changeScore:"",scoreBalance:0,isValidScoreAccount:!1,sessionId:sessionId,forbideSave:!1},$scope.consumeScoreVo={cardNo:"",tsCode:"",changeScore:"",scoreBalance:0,isValidScoreAccount:!1,sessionId:sessionId,password:"",forbideSave:!1},$scope.cardNoDisabled=!1,$rootScope.cardoperatetoeditusrmemberinfo=null,$rootScope.currentuserinfo=null):($scope.getMemeberAndCardInfo($scope.rechargeScoreOper),posService.goBack()))},function(){$scope.rechargeScoreVo.forbideSave=!1})}function trueSave2(){ajaxService.AjaxPost($scope.consumeScoreVo,"postrade/posCardAccount/saveConsumeScore.do").then(function(result){$scope.consumeScoreVo.forbideSave=!1,result.status&&(modalService.info({content:"扣减积分成功!",type:"ok"}),console.log(result.printInfo),$scope.entranceFrom==0?($scope.rechargeScoreVo={cardNo:"",tsCode:"",changeScore:"",scoreBalance:0,isValidScoreAccount:!1,sessionId:sessionId,forbideSave:!1},$scope.consumeScoreVo={cardNo:"",tsCode:"",changeScore:"",scoreBalance:0,isValidScoreAccount:!1,sessionId:sessionId,password:"",forbideSave:!1},$scope.cardNoDisabled=!1,$rootScope.cardoperatetoeditusrmemberinfo=null,$rootScope.currentuserinfo=null):($scope.getMemeberAndCardInfo($scope.consumeScoreOper),posService.goBack()))},function(){$scope.consumeScoreVo.forbideSave=!1})}$scope.rechargeScoreOper=1,$scope.consumeScoreOper=2;var sessionId=getCookieService.getCookie("CRMSESSIONID");$scope.entranceFrom=0,$scope.cardNoDisabled=!1,$scope.rechargeScoreVo={cardNo:"",tsCode:"",changeScore:"",scoreBalance:0,isValidScoreAccount:!1,sessionId:sessionId,forbideSave:!1},$scope.consumeScoreVo={cardNo:"",tsCode:"",changeScore:"",scoreBalance:0,isValidScoreAccount:!1,sessionId:sessionId,password:"",forbideSave:!1},$scope.setFocus=function(eId){var setTimer=posService.setFocus(eId);$scope.$on("$destroy",function(){$timeout.cancel(setTimer)})},$scope.getScoreAccountInfo=function(cardNo){ajaxService.AjaxPost({cardNo:cardNo,sessionId:sessionId},"postrade/posCardAccount/getScoreAccount.do").then(function(result){result.status&&($scope.rechargeScoreVo.scoreBalance=result.scoreBalance,$scope.rechargeScoreVo.isValidScoreAccount=!0,$scope.consumeScoreVo.scoreBalance=result.scoreBalance,$scope.consumeScoreVo.isValidScoreAccount=!0)})},$rootScope.currentuserinfo&&($scope.entranceFrom=1,$scope.currUserInfo=$rootScope.currentuserinfo,$scope.rechargeScoreVo.cardNo=$scope.currUserInfo.cardInfoBean.number,$scope.consumeScoreVo.cardNo=$scope.currUserInfo.cardInfoBean.number,$scope.cardNoDisabled=!0,$scope.getScoreAccountInfo($scope.rechargeScoreVo.cardNo)),$scope.getMemeberAndCardInfo=function(operationType){var scoreVo=null;$scope.rechargeScoreOper==operationType?scoreVo=$scope.rechargeScoreVo:scoreVo=$scope.consumeScoreVo,$rootScope.cardoperatetoeditusrmemberinfo=null,$rootScope.currentuserinfo=null,$scope.rechargeScoreVo.scoreBalance=0,$scope.rechargeScoreVo.isValidScoreAccount=!1,$scope.consumeScoreVo.scoreBalance=0,$scope.consumeScoreVo.isValidScoreAccount=!1;if(!scoreVo.cardNo||scoreVo.cardNo==""||!/^(((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})|([1-9](\d{4,9}|\d{11,15})))$/.test(scoreVo.cardNo))return!1;ajaxService.AjaxPost({paramValue:scoreVo.cardNo,sessionId:sessionId},"postrade/memberhome/memberhomeinfo.do").then(function(result){if(result.status&&result.data){var data=result.data;$rootScope.cardoperatetoeditusrmemberinfo=data.memberInfoBean,$rootScope.currentuserinfo=data,$scope.currUserInfo=$rootScope.currentuserinfo,$scope.rechargeScoreVo.cardNo=$scope.currUserInfo.cardInfoBean.number,$scope.consumeScoreVo.cardNo=$scope.currUserInfo.cardInfoBean.number,$scope.getScoreAccountInfo($scope.currUserInfo.cardInfoBean.number)}})},$scope.saveRechargeScore=function(){$scope.rechargeScoreVo.forbideSave=!0;if(!$scope.rechargeScoreVo.cardNo||$scope.rechargeScoreVo.cardNo==""||!/[1-9](?:\d{0,9}|\d{11,15})/.test($scope.rechargeScoreVo.cardNo))return modalService.info({title:"提示",content:"获取不到正确卡号!",size:"sm",type:"confirm"}),$scope.rechargeScoreVo.forbideSave=!1,!1;if(!$scope.rechargeScoreVo.changeScore||$scope.rechargeScoreVo.changeScore==""||!/^[1-9]\d*$/.test($scope.rechargeScoreVo.changeScore))return modalService.info({title:"提示",content:"请输入正确的增加积分!",size:"sm",type:"confirm"}),$scope.rechargeScoreVo.forbideSave=!1,!1;if(!$scope.rechargeScoreVo.isValidScoreAccount)return modalService.info({title:"提示",content:"该会员卡没有开通积分功能或不存在积分账户，请核实!",size:"sm",type:"confirm"}),$scope.rechargeScoreVo.forbideSave=!1,!1;$scope.rechargeScoreVo.tsCode?trueSave():ajaxService.AjaxPost({sessionId:sessionId},"postrade/postscode/generatorTsCode.do").then(function(result){result.tsCode?($scope.rechargeScoreVo.tsCode=result.tsCode,trueSave()):$scope.rechargeScoreVo.forbideSave=!1},function(){$scope.rechargeScoreVo.forbideSave=!1})},$scope.saveConsumeScore=function(){$scope.consumeScoreVo.forbideSave=!0;if(!$scope.consumeScoreVo.cardNo||$scope.consumeScoreVo.cardNo==""||!/[1-9](?:\d{0,9}|\d{11,15})/.test($scope.consumeScoreVo.cardNo))return modalService.info({title:"提示",content:"获取不到正确卡号!",size:"sm",type:"confirm"}),$scope.consumeScoreVo.forbideSave=!1,!1;if(!$scope.consumeScoreVo.changeScore||$scope.consumeScoreVo.changeScore==""||!/^[1-9]\d*$/.test($scope.consumeScoreVo.changeScore))return modalService.info({title:"提示",content:"请输入正确的扣减积分!",size:"sm",type:"confirm"}),$scope.consumeScoreVo.forbideSave=!1,!1;if($scope.consumeScoreVo.changeScore>$scope.consumeScoreVo.scoreBalance)return modalService.info({title:"提示",content:"积分账户余额不足!",size:"sm",type:"confirm"}),$scope.consumeScoreVo.forbideSave=!1,!1;if(!$scope.consumeScoreVo.isValidScoreAccount)return modalService.info({title:"提示",content:"该会员卡没有开通积分功能或不存在积分账户，请核实!",size:"sm",type:"confirm"}),$scope.consumeScoreVo.forbideSave=!1,!1;poppasswdModal()};var checkConsumeTsCode=function(){$scope.consumeScoreVo.tsCode?trueSave2():ajaxService.AjaxPost({sessionId:sessionId},"postrade/postscode/generatorTsCode.do").then(function(result){result.tsCode?($scope.consumeScoreVo.tsCode=result.tsCode,trueSave2()):$scope.consumeScoreVo.forbideSave=!1},function(){$scope.consumeScoreVo.forbideSave=!1})},poppasswdModal=function(){var modalInstance=$uibModal.open({animation:!0,template:poppasswdTemp,size:"sm",controller:"poppasswdCtrl",resolve:{}});modalInstance.result.then(function(popPasswd){$scope.consumeScoreVo.password=popPasswd.password,checkConsumeTsCode()},function(data){$scope.consumeScoreVo.forbideSave=!1})};$scope.goBack=function(){$scope.entranceFrom==0&&($rootScope.cardoperatetoeditusrmemberinfo=null,$rootScope.currentuserinfo=null),posService.goBack()}}]});