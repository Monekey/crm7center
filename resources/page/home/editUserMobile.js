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
	ngAMD.controller( "editUserMobileCtrl",
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
        		phone:userModel.phone,//手机号
        		orginalPhone:userModel.phone,//手机号
        		smsCode:'',//短信校验码
        		sessionId:sessionId,
        		isValidCode:false //是否有效的短信验证码
        }
        //改变手机号
        $scope.changePhone = function(user){
        	user.isValidCode= false;
        	user.smsCode='';
        }
        //获取短信验证码
        $scope.getSmsCode = function(user){
        	user.smsCode = '';
        	user.isValidCode=false;
        	if(!user.phone || user.phone == ''
        		|| !/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(user.phone)){
        		modalService.info({title:'提示', content:'请输入11位手机号！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	if(user.phone == user.orginalPhone){
        		modalService.info({title:'提示', content:'手机号未发生变化，不需要获取验证码！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	//调用获取短信
    		ajaxService.AjaxPost({mobile: user.phone, sessionId: sessionId}, 'common/sms/getSmsCode.do').then(function (result) {
                if(result.status){
                	modalService.info({content:'获取验证码成功！', type: 'ok'});
                }
            });
        }
        
      //验证验证码是否有效
        $scope.checkSmsCode = function(user){
        	user.isValidCode=false;
        	if(user.smsCode && user.smsCode != ''){
        		//参数
        		var param ={smsCode: user.smsCode,mobile: user.phone,sessionId: sessionId};
        		ajaxService.AjaxPost(param, 'common/sms/checkSmsCode.do').then(function (result) {
                    if(result.status && result.smsCodeStatus){
                    	user.isValidCode=true;
                    }
                });
        	}
        }
        
        //保存修改用户手机号
        $scope.saveEditPhone = function(user){
        	if(!user.phone ||user.phone =='' ||!/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(user.phone)){
        		modalService.info({title:'提示', content:'请输入11位手机号！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	if(user.phone == user.orginalPhone){
        		modalService.info({title:'提示', content:'手机号未发生变化，不需要获取验证码！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	if(!user.smsCode ||user.smsCode =='' ||!user.isValidCode){
        		modalService.info({title:'提示', content:'请输入有效的短信验证码！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	if(!user.password ||user.password ==''){
        		modalService.info({title:'提示', content:'请输入系统密码！', size:'sm', type: 'confirm'});
        		return false;
        	}
        	
        	ajaxService.AjaxPost(user,"usermanager/archuser/saveEditUserPhone.do").then(
    			function (result) {
    				if(result.status){
    					 modalService.info({content:'保存手机号成功!', type: 'ok'});
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