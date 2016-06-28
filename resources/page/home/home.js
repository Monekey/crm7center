/**
 * 后台和报表内容区通用页面
 * @version  v1.0
 * @createTime: 2016/5/5 0005
 * @createAuthor LSZ
 * @updateHistory
 *                2016/5/5 0005  LSZ   create
 *                2016/6/16  LSZ  update 优化tab系列的操作
 */
define(["rippleButton"], function (rippleButton) {
    // var ripple = require("rippleButton");
    return ["$scope", "$rootScope", "register",'$state',function ($scope, $rootScope, register, $state) {

        $scope.tabStatus = "pullRight";
        $scope.dynamicPopover = {
            templateUrl: 'resources/page/home/menuPopover.html'
        };

        $scope.setCurrentGroup= function(group){
            $scope.currentGroup = group;
        };

        $scope.onClickLeftTab = function(group,tab){
            $scope.currentGroup = group;

           register.gotoPage(group);
        };
        $scope.onClickTab = function (tab) {
            $scope.tab = tab;
           register.gotoPage(tab);

        };

        $scope.onClickGroup = function(group){
            $scope.currentGroup = group;
            register.gotoPage(group);
        };
        $scope.checkActive=function(menu){
            var state = menu.routing?menu.routing.split(';')[0]:'null';
            if($state.includes(state)===true){
                return true;
            }else{
                return false;
            }
        }
    }];
});