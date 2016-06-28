/**
 * 修改用户邮箱
 * @version  v1.0
 * @createTime: 2016-06-26
 * @createAuthor zuoxh
 * @updateHistory
 *
 *
 */
define(function( require ){
    var ngAMD = require( "ngAMD" );
	ngAMD.controller( "editUserEmailCtrl",
    	["$scope",
    	 "$state",
    	 "$rootScope",
    	 "ajaxService",
		 "userModel",
		 "modalService",
		 "$uibModalInstance",
		 'getCookieService',
       function($scope,$state,$rootScope,ajaxService,userModel,modalService,$uibModalInstance,getCookieService){
    	
		//sessionId
    	var sessionId = getCookieService.getCookie("CRMSESSIONID");
        //声明会员实体
        $scope.user={
        		userId:userModel.userId,//用户id
        		email:userModel.email,//电子邮箱
        		orginalEmail:userModel.email,//电子邮箱
        		sessionId:sessionId,
        }
        
        
        
        /**
         * 保存操作，保存成功后，提示信息，并关闭模态框
         */
        $scope.saveEditEmail =function(user){
        	if(!user.email || user.email == '' || !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(user.email)){
        		modalService.info({title:'提示', content:'请输入邮箱账号！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	if(user.orginalEmail == user.email){
        		modalService.info({title:'提示', content:'邮箱账号没有发生变化，不需要重复保存！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	if(!user.password || user.password == ''){
        		modalService.info({title:'提示', content:'请输入系统密码！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	
        	ajaxService.AjaxPost(user,"usermanager/archuser/saveEditUserEmail.do").then(
        			function (result) {
        				if(result.status){
        					 modalService.info({content:'保存邮箱成功!', type: 'ok'});
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