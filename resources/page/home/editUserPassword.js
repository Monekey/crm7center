/**
 * 修改用户手机
 * @version  v1.0
 * @createTime: 2016-06-26
 * @createAuthor zuoxh
 * @updateHistory
 *
 *
 */
define(function( require ){
    var ngAMD = require( "ngAMD" );
	ngAMD.controller( "editUserPasswordCtrl",
    	["$scope",
    	 "$state",
    	 "$rootScope",
    	 "ajaxService",
		 "userModel",
		 "modalService",
		 "$uibModalInstance",
		 'getCookieService',
       function($scope,$state,$rootScope,ajaxService,userModel,modalService,$uibModalInstance,getCookieService){
		//初始化警告、错误等提示信息
    	$scope.tipMsg={};
		//sessionId
    	var sessionId = getCookieService.getCookie("CRMSESSIONID");
        //声明会员实体
        $scope.user={
        		userId:userModel.userId,//用户id
        		oldPassword:'',//旧密码
    			newPassword:'',	//新密码
    			newRepassword:'',//重复新密码
        		sessionId:sessionId,
        		isValidNewpassword:false
        		
        }
        
        //验证新密码
        $scope.validatePasswd=function(user){
        	user.isValidNewpassword=false;
        	var result =false;
        	if( !(/^\d{1,6}$/.test(user.newRepassword))){
        		$scope.tipMsg.repassword="请再输一遍新密码!";
        		result = true;
        	}else{
        		if(user.newRepassword != user.newPassword){
    			$scope.tipMsg.repassword="新密码与确认密码不一致！";
        		 result = true;
        		}else{
        			user.isValidNewpassword=true;
        		}
        	}
        	return result;
        }
        
        
        /**
         * 保存操作，保存成功后，提示信息，并关闭模态框
         */
        $scope.saveEditPassword =function(user){
        	
        	if(!user.oldPassword || user.oldPassword == ''){
        		modalService.info({title:'提示', content:'请输入原系统密码！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	if(!user.newPassword || user.newPassword == ''){
        		modalService.info({title:'提示', content:'请输入修改后新密码！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	if(!user.newRepassword || user.newRepassword == ''){
        		modalService.info({title:'提示', content:'请再输一遍新密码！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	if(user.newRepassword != user.newPassword){
        		modalService.info({title:'提示', content:'新密码与确认密码不一致！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	ajaxService.AjaxPost(user,"usermanager/archuser/saveEditUserPassword.do").then(
    			function (result) {
    				if(result.status){
    					 modalService.info({content:'保存密码成功!', type: 'ok'});
    					 $uibModalInstance.close(result);
    					 
    				}
                }
    	    );
        	
        }
        
        /**
         * 取消操作，关闭模态框
         */
        $scope.cancel = function(){
            $uibModalInstance.dismiss('cancel');
        };
       
        
    }]);
});