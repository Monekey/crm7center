/**
 * 账号管理
 * @version  v1.0
 * @createTime: 2016/5/25 
 * @createAuthor zuoxh
 * @updateHistory
 */
define(function (require) {
	/*var rippleButton= require("rippleButton");*/
/*define(["rippleButton"], function (rippleButton) {*/
	//加载用户手机号编辑页面
	var angular = require("angular");
	var editUserMobileCtrl = require("home/editUserMobile");
    var editUserMobileTemp = require("text!home/editUserMobile.html");
    //加载用户电子邮箱编辑页面
    var editUserEmailCtrl = require("home/editUserEmail");
    var editUserEmailTemp = require("text!home/editUserEmail.html");
    //加载用户手密码编辑页面
    var editUserPasswordCtrl = require("home/editUserPassword");
    var editUserPasswordTemp = require("text!home/editUserPassword.html");
    return [
			'$uibModal',
			'ajaxService',
			'getCookieService',
			'modalService',
            '$scope',
            '$rootScope',
            'register',
            '$state',
	        function ($uibModal,ajaxService,getCookieService,modalService,$scope, $rootScope, register,$state) {
				var sessionId = getCookieService.getCookie("CRMSESSIONID");
		    	/*$rootScope.overlay = true;
		    	var rootUser = $rootScope.user;
		        $scope.user = angular.copy(rootUser);
		        $scope.user.sessionId=sessionId;
		        $scope.user.newUserName ='';
		        if($scope.user && $scope.user.userName){
		        	 $scope.user.newUserName = $scope.user.userName;
		        }
		        console.log($scope.user);*/
		        //编辑用户
		        $scope.editUser=function(user,operType){
		        	if(user && operType){
		        		if(operType == 'userName'){//修改用户名
		        			$scope.user.newUserName = $scope.user.userName;
		        			$scope.showEditUserName = true;
		        		}else if(operType == 'mobilePhone'){//修改手机号
		        			showEditMobileModal(user);
		        		}else if(operType == 'email'){//修改电子邮箱
		        			showEditEmailModal(user);
		        		}else if(operType == 'password'){//修改密码
		        			showEditPasswordModal(user);
		        		}
		        	}
		        }
		        //取消用户姓名修改
		        $scope.cancelEditUserName=function(user){
		        	$scope.user.newUserName ='';
        			$scope.showEditUserName = false;
		        }
		        //保存用户姓名修改
		        $scope.saveEditUserName=function(user){
		        	if(user.userName == user.newUserName){
		        		modalService.info({title:'提示', content:'姓名没有发生改变不需要保存！', size:'sm', type: 'confirm'});
		        		return false;
		        	}
		        	if(!user.newUserName ||user.newUserName=='' || 
		        			!/^[0-9a-zA-Z\u4E00-\u9FA5]{0,10}$/.test(user.newUserName)){
		        		modalService.info({title:'提示', content:'姓名可输入数字、英文、中文，长度10个以内！', size:'sm', type: 'confirm'});
		        		return false;
		        	}
		        	
		        	ajaxService.AjaxPost(user,"usermanager/archuser/saveEditUserName.do").then(
    	    			function (result) {
    	    				if(result.status){
    	    					user.userName = user.newUserName;
    	    					rootUser.userName = user.newUserName;
    	    					 modalService.info({content:'保存用户名成功!', type: 'ok'});
    	    				}
    	                }
	    	    	);
		        }
		        
		        /**
		         * 修改手机号模态窗
		         */
		       var showEditMobileModal = function(user) {
		            var modalInstance = $uibModal.open({
		                //受否加载动画
		                animation: true,
		                //模态框页面
		                template: editUserMobileTemp,
		                //模态框的尺寸
		                size: "md",
		                //模态框对应的controller
		                controller: 'editUserMobileCtrl',
		                //向模态框传递参数
		                resolve: {
		                	userModel: function () {
		                		var param = {userId:user.userId,phone:user.mobilePhone};
		                        return param;
		                    }
		                }
		
		            });
		            //处理模态框返回到当前页面的数据
		            modalInstance.result.then(function (editMobileRes) {
		                 if(editMobileRes.status){
		                	 //$scope.user.mobilePhone = editMobileRes.phone;
		    				 //rootUser.mobilePhone = editMobileRes.phone;
		                	 getCookieService.cleanCookie("CRMSESSIONID");
                             $state.go('login');
		                 }
		            });
		        };
		        
		        /**
		         * 修改电子邮箱
		         */
		       var showEditEmailModal = function(user) {
		            var modalInstance = $uibModal.open({
		                //受否加载动画
		                animation: true,
		                //模态框页面
		                template: editUserEmailTemp,
		                //模态框的尺寸
		                size: "md",
		                //模态框对应的controller
		                controller: 'editUserEmailCtrl',
		                //向模态框传递参数
		                resolve: {
		                	userModel: function () {
		                		var param = {userId:user.userId,email:user.email};
		                        return param;
		                    }
		                }
		
		            });
		            //处理模态框返回到当前页面的数据
		            modalInstance.result.then(function (editEmailRes) {
		                 if(editEmailRes.status){
		                	 //$scope.user.email = editEmailRes.email;
		    				 //rootUser.email = editEmailRes.email;
		                	 getCookieService.cleanCookie("CRMSESSIONID");
                             $state.go('login');
		                 }
		            });
		        };
		        
		        /**
		         * 修改密码
		         */
		       var showEditPasswordModal = function(user) {
		            var modalInstance = $uibModal.open({
		                //受否加载动画
		                animation: true,
		                //模态框页面
		                template: editUserPasswordTemp,
		                //模态框的尺寸
		                size: "md",
		                //模态框对应的controller
		                controller: 'editUserPasswordCtrl',
		                //向模态框传递参数
		                resolve: {
		                	userModel: function () {
		                		var param = {userId:user.userId};
		                        return param;
		                    }
		                }
		
		            });
		            //处理模态框返回到当前页面的数据
		            modalInstance.result.then(function (editPasswordRes) {
		                 if(editPasswordRes.status){
		                	/* $scope.user.password = editPasswordRes.password;
		    				 rootUser.password = editPasswordRes.password;*/
		                	 ajaxService.AjaxPost({sessionId: sessionId}, "login/logout.do").then(function (message) {
		                         if (message.status === 1) {
		                        	 getCookieService.cleanCookie("CRMSESSIONID");
		                             $state.go('login');
		                         }
		                     });
		                 }
		            });
		        };
		
		    }];
});