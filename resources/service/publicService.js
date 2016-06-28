/**
 * tab切换的所有方法
 * @version  v1.0
 * @createAuthor LSZ
 * @updateHistory
 *       2016/3/8  LSZ  create
 *       2016/5/6  LSZ  update 增加切换顶部系统显示方法
 */
define(["ngAMD","require"],function (ngAMD,require) {
    var angular = require("angular");

    var publicService = angular.module("public", []);
    //为不是左侧主导航的其他按钮，比如修改，新增按钮，弹出的新tabs注册controller用的
    publicService.service("register", ["$rootScope", "$compile", '$state',function ($rootScope, $compile, $state) {
        var self = this;

        this.gotoPage = function(one){
            var state = one.routing.split(';')[0];
            var url = one.routing.split(';')[1];
            if (!$state.get(state)) {
                console.log($rootScope.stateProvider);
                $rootScope.stateProvider.state(state, ngAMD.route({
                    url: url,
                    templateUrl: 'resources/page/' + one.template,
                    controllerUrl: one.ctrl
                }));
            }
            $state.go(state);
        };
        var self = this;
        //可以多开tabs的id的后缀
        this.tabindex = 0;

        this.openChildTab = function(ctrlObj, data) {
            $rootScope.tabs.push(ctrlObj);
            require(['text!' + ctrlObj.template], function (html) {

                require([ctrlObj.ctrl], function (rtObj) {
                    $rootScope.$apply(function(){
                        angular.element(self.getDomObjById("container")).append(html);
                        if(data){
                            data.from = ctrlObj.from;
                            $rootScope.TabsData = data;
                            angular.element(self.getLastChild("container")).attr("ng-controller", ctrlObj.ctrlName);
                        }else{
                            angular.element(self.getLastChild("container")).attr("ng-controller", rtObj);
                        }

                        angular.element(self.getLastChild("container")).attr("id", ctrlObj.id);
                        $compile(self.getDomObjById(ctrlObj.id))($rootScope);

                    });
                });
            });
        };

        this.getDomObjById = function (selector) {
            return document.getElementById(selector);
        };
        this.getLastChild = function (selector) {
            var length = document.getElementById("container").children.length;
            return document.getElementById("container").children[length - 1];
        };
        this.commonFunction = function (tab) {
            var tabs = $rootScope.tabs;
            for (var i = 0; i < tabs.length; i++) {
                if (tab.id !== tabs[i].id) {
                    tabs[i].ng_show = false;
                    angular.element(this.getDomObjById(tabs[i].id)).addClass('ng-hide');
                } else {
                    tabs[i].ng_show = true;
                    angular.element(this.getDomObjById(tabs[i].id)).removeClass('ng-hide');
                }
            }
            self.checkTabsScale();
        };
        /*切换顶部系统显示*/
        this.switchSystemName = function () {
            $rootScope.tabs = [];
            $rootScope.overlay = true;
            $rootScope.systemNow = $rootScope.systems[0];
            $rootScope.navs = $rootScope.systemNow.navs;
        };
        /*公共的获取按钮权限方法*/
        this.getRoot = function (name) {
            //var flag = false;
            //
            //$rootScope.tabs.forEach(function (tab) {
            //    if (tab.ng_show == true) {
            //
            //        if ($rootScope.authority[tab.id]) {
            //            $rootScope.authority[tab.id].forEach(function (root) {
            //                if (root.showName === name) {
            //                    flag = true;
            //                    return false;
            //                }
            //            });
            //        }
            //    }
            //});
            //if (flag) {
            //    return true;
            //}
            //return false;
            return true;
        };
    }]);

    /**
     * 验证两次密码一致性指令
     * 在第二次输入密码的input内加上
     * ensure-password="首次密码input的id"
     */
    publicService.directive('ensurePassword', function () {
        return {
            require: '^ngModel',
            link: function (scope, element, attrs, ngModel)
            {
                var setEnsurePassword = function (bool) {
                    ngModel.$setValidity('ensurePassword',bool);
                };
                ngModel.$parsers.push(function (val) {
                    var firstPwd = $('#'+attrs.ensurePassword);
                    firstPwd.off('keyup');
                    firstPwd.on('keyup', function () {
                        scope.$apply(function () {
                            setEnsurePassword(firstPwd.val()===val);
                        });
                    });
                    setEnsurePassword(firstPwd.val()===val);
                    return val;
                });
            }
        };
    });
    return publicService;
});