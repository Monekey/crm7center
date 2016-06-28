/**
 * 我的首页
 * @version  v1.0
 * @createTime: 2016-04-20
 * @createAuthor liyd
 * @updateHistory
 *            2016-06-24 liuzy 图表切换代码复用
 *
 * @note 列表页:myindex
 */

define(function (require) {
    require("css!myindex_css");
    //var echart = require("echart");
    //var macarons = require("macarons");
    ////var add2ctrl = require( "myindex/myindexfour/myindexfour" );

   return [
        '$scope',
        "ajaxService",
        "$rootScope",
        "register",
        function ($scope, ajaxService, $rootScope, register) {
            var sessionId = $rootScope.sessionId;
            //var sessionId = getCookie("CRMSESSIONID");
            ajaxService.AjaxPost({
                sessionId: sessionId,
                data: 1
            }, "index/busiSMS/load.do").then(function (result) {

                $scope.surplusCount = result.showCount;
                $scope.showName = result.showName;
                $scope.showURL = result.showLogo;

            });

            ajaxService.AjaxPost({
                showCount: 5,
                sessionId: sessionId
            }, "index/sysMsg/load.do").then(function (result) {
                $scope.list = result.pageInfo.list;
            });

            $scope.isShow = function (hot) {
                if (hot == 1) {
                    return "block";
                }
                else {
                    return "none";
                }
            };
            //var companyId=0;

            ajaxService.AjaxPost({
                sessionId: sessionId
            }, "index/memberReport/load.do").then(function (result) {
                $scope.memberCount = result.data.memberCount;
                $scope.toDayMemberCount = result.data.toDayMemberCount;
                $scope.toDayConsume = result.data.toDayConsume;

                if (result.data.addMemberCount == '-') {
                    $scope.addMemberCount = result.data.addMemberCount;
                    $_true("#addMemberCount").remove();
                } else if (result.data.addMemberCount >= 0) {
                    $scope.addMemberCount = result.data.addMemberCount + '%';
                    $scope.addMemberCountImg = '&#xe62e;';
                    $scope.addMemberCountChose = '1';
                } else {
                    $scope.addMemberCount = -result.data.addMemberCount + '%';
                    $scope.addMemberCountImg = '&#xe62d';
                    $scope.addMemberCountChose = '2';
                }

                if (result.data.addDayConsume == '-') {
                    $scope.addDayConsume = result.data.addDayConsume;
                    $_true("#addDayConsume").remove();
                } else if (result.data.addDayConsume >= 0) {
                    $scope.addDayConsume = result.data.addDayConsume + '%';
                    $scope.addDayConsumeImg = '&#xe62e;';
                    $scope.addDayConsumeChose = '1';
                } else {
                    $scope.addDayConsume = -result.data.addDayConsume + '%';
                    $scope.addDayConsumeImg = '&#xe62d;';
                    $scope.addDayConsumeChose = '2';
                }


                companyId = result.companyId;

                init_setEchars($scope.chartParam);

            });


            $scope.addWarning = function () {
                $scope.conditions = {};
                register.openTabWithRequest({id: 10043}, {});//穿透时调用的方法,id为目标tab功能id,第二个参数为显示类型及显示条件（searchType搜索的下拉条件 searchTypeValue搜索框内的内容）
            };

            $scope.allMember = function () {
                register.openTabWithRequest({id: 10013}, {select: 'all'});
            };

            $scope.todayMember = function () {
                register.openTabWithRequest({id: 10013}, {select: 'toDay'});
            };

            $scope.todayTrans = function () {
                register.openTabWithRequest({id: 10015}, {select: 'toDay'});
            };

        }
    ];
});