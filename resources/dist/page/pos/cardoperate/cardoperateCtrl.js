define(["angular"],function(angular){return angular.element(document.getElementsByTagName("body")[0]).css("background","#dee6f2"),["$scope","ajaxService","getCookieService","$rootScope","modalService","appConstant","$uibModal","register",function($scope,ajaxService,getCookieService,$rootScope,modalService,appConstant,$uibModal,register){var sessionId=getCookieService.getCookie("CRMSESSIONID");$scope.searchdata={paramValue:"",sessionId:""},$scope.editcard={cardTypeId:"",validateBeginTime:"",validateEndTime:""},$scope.annulcard={cardnumber:"",capitalamount:"",presentedamount:"",annulamount:"",sessionId:"",cardstatus:""},$scope.editUserBtn=!1,$scope.editCardBtn=!1,$scope.annulCardBtn=!1,$rootScope.posbuttens&&$rootScope.posbuttens.forEach(function(btn){btn.code==10100&&($scope.editUserBtn=!0),btn.code==10101&&($scope.editCardBtn=!0),btn.code==10102&&($scope.annulCardBtn=!0)}),$scope.editcarddiv=!1;var searchuserresult=$rootScope.searchuserresult;if(searchuserresult!=null){var data=angular.copy(searchuserresult);$rootScope.searchuserresult=null,$scope.memberhomeinfo=data,$rootScope.cardoperatetoeditusrmemberinfo=$scope.memberhomeinfo.memberInfoBean,$rootScope.currentuserinfo=$scope.memberhomeinfo}var searchparam=angular.copy($rootScope.paramValue);searchparam&&($scope.searchdata.paramValue=searchparam,$rootScope.paramValue="",$scope.searchdata.sessionId=$rootScope.sessionId,ajaxService.AjaxPost($scope.searchdata,"postrade/memberhome/memberhomeinfo.do").then(function(result){if(result.data!==null){var data=angular.copy(result.data);$scope.memberhomeinfo=data,$rootScope.cardoperatetoeditusrmemberinfo=$scope.memberhomeinfo.memberInfoBean,$rootScope.currentuserinfo=$scope.memberhomeinfo}else $rootScope.cardoperatetoeditusrmemberinfo=null,$rootScope.currentuserinfo=null})),$scope.getNation=function(type){if(type)return appConstant.nationList[type].name},$scope.editcard=function(){var html=['    <div class="card-update-modal">','        <div class="modal-header">',"            卡修改",'            <i class="iconfont" class="modal-close-icon" style="margin: 0px;font-size: 8px" ng-click="canceleditcard()">&#xe63c;</i>',"        </div>",'        <div class="modal-body ">','            <form class="form-horizontal" style="font-size: 14px;" autocomplete="off">','                <div class="form-group">',"                    <label>卡类型：</label>",'                    <div class="select-input-div">','                        <select class="form-control" name="editcardtype" id="editcardtype"','                                ng-selected="editcard.cardTypeId == selectcardtype.id"','                                ng-options="selectcardtype.id as selectcardtype.name for selectcardtype in editcardcomboList"','                                ng-model="editcard.cardTypeId" style="width:160px;">',"                        </select>","                    </div>","                </div>",'                <div class="form-group" ng-if="memberhomeinfo.cardInfoBean.validateType!==1">','                    <label style="">有效期：</label>','                    <div class="select-input-div" style="margin-bottom: -14px" >','                        <period start-time="editcard.validateBeginTimestr"','                                end-time="editcard.validateEndTimestr"></period>',"                    </div>","                </div>",'                <div class="modal-footer">','                    <button type="submit" class="btn btn-default main-all-btn-b" ng-click="confirmIneditcard()">',"                        确定","                    </button>",'                    <button type="button" class="btn btn-default main-all-btn-w" ng-click="canceleditcard()">',"                        取消","                    </button>","                </div>","            </form>","        </div>","    </div>"].join(""),modalInstance=$uibModal.open({animation:!0,template:html,size:"editCard",resolve:{},controller:["$scope","$rootScope","$uibModalInstance","modalService",function($scope,$rootScope,$uibModalInstance,modalService){$rootScope.currentuserinfo&&($scope.memberhomeinfo=angular.copy($rootScope.currentuserinfo),$scope.editcard=angular.copy($scope.memberhomeinfo.cardInfoBean),$scope.editcard.validateBeginTimestr=$scope.editcard.validateBeginTime,$scope.editcard.validateEndTimestr=$scope.editcard.validateEndTime,console.log($scope.editcard.validateBeginTimestr),console.log($scope.editcard.validateEndTimestr),$scope.editcard.cardTypeId=$scope.editcard.cardTypeId+"",ajaxService.AjaxPost({sessionId:$rootScope.sessionId,pageCount:1e3},"postrade/memberhome/allCardTypeCombo.do").then(function(result){$scope.editcardcomboList=result.data})),$scope.confirmIneditcard=function(){var oldeditcard=angular.copy($scope.memberhomeinfo.cardInfoBean),newcardtype=$('select[id="editcardtype"]').find("option:selected").text();$scope.editcard&&$scope.editcard.cardTypeId!=oldeditcard.cardTypeId&&ajaxService.AjaxPost({sessionId:$rootScope.sessionId,memberHomeBean:$scope.memberhomeinfo,newCardTypeId:$scope.editcard.cardTypeId,oldCardTypeId:oldeditcard.cardTypeId},"postrade/card/modifyCardType.do").then(function(result){result.status===1&&($rootScope.currentuserinfo.cardInfoBean.cardTypeId=$scope.editcard.cardTypeId,$rootScope.currentuserinfo.cardInfoBean.cardType=newcardtype)});var oldvalidateBeginTimestr=(new Date(oldeditcard.validateBeginTime)).getTime(),oldvalidateEndTimestr=(new Date(oldeditcard.validateEndTime)).getTime(),currvalidateBeginTimestr=(new Date($scope.editcard.validateBeginTimestr)).getTime(),currvalidateEndTimestr=(new Date($scope.editcard.validateEndTimestr)).getTime();(oldvalidateBeginTimestr!=currvalidateBeginTimestr||oldvalidateEndTimestr!=currvalidateEndTimestr)&&ajaxService.AjaxPost({sessionId:$rootScope.sessionId,memberHomeBean:$scope.memberhomeinfo,newValidateEndTime:currvalidateEndTimestr,newValidateBeginTime:currvalidateBeginTimestr,oldValidateBeginTime:oldvalidateBeginTimestr,oldValidateEndTime:oldvalidateEndTimestr},"postrade/card/modifyCardValiDate.do").then(function(result){result.status===1&&($rootScope.currentuserinfo=result.data)}),$uibModalInstance.dismiss("cancel"),modalService.info({content:"修改成功!",type:"ok"})},$scope.canceleditcard=function(){$uibModalInstance.dismiss("cancel")}}]})},$scope.annulCard=function(){var html=['<div class="card-update-modal">','        <div class="modal-header">',"            退卡",'            <i class="iconfont" class="modal-close-icon" ng-click="cancelannulcard()">&#xe63c;</i>',"        </div>",'        <div class="modal-body">','            <form class="form-horizontal" style="font-size:16px;margin-top: 20px;" autocomplete="off">','           <div class="form-group" style="margin-left: 15px;">',"                <span>卡号：</span>",'                <span ng-bind="annulcard.cardnumber"></span>',"            </div>",'           <div class="form-group" style="margin-left: 15px;">',"                <span>剩余本金(元)：</span>",'                <span ng-bind="annulcard.capitalamount"></span>',"            </div>",'           <div class="form-group" style="margin-left: 15px;">',"                <span>剩余赠送金额(元)：</span>",'                <span ng-bind="annulcard.presentedamount"></span>',"            </div>",'            <div class="form-group" style="margin-left: 15px;">',"                <span>退卡金额(元)：</span>",'                <span ng-bind="annulcard.annulamount" style="color:#4ec261;"></span>',"            </div>",'            <div class="modal-footer">','                <button type="submit" class="btn btn-default main-all-btn-b" ng-click="confirmannulcard()">',"                    确定","                </button>",'                <button type="button" class="btn btn-default main-all-btn-w" ng-click="cancelannulcard()">',"                    取消","                </button>","            </div>","            </form>","        </div>","    </div>"].join(""),modalInstance=$uibModal.open({animation:!0,template:html,size:"sm",resolve:{},controller:["$scope","$rootScope","$uibModalInstance","$state","ajaxService","modalService",function($scope,$rootScope,$uibModalInstance,$state,ajaxService,modalService){$scope.annulcard={cardnumber:"",capitalamount:"",presentedamount:"",annulamount:"",sessionId:"",cardstatus:"",saving:""},$scope.memberhomeinfo=angular.copy($rootScope.currentuserinfo),$scope.annulcard.cardnumber=$scope.memberhomeinfo.cardInfoBean.number,ajaxService.AjaxPost({cardNumber:$scope.annulcard.cardnumber,sessionId:sessionId},"postrade/card/getAnnulCardAmount.do").then(function(result){result.data!==null&&result.status===1&&($scope.annulcard.capitalamount=result.data.capitalAmount,$scope.annulcard.presentedamount=result.data.presentedAmount,$scope.annulcard.annulamount=result.data.capitalAmount,$scope.annulcard.saving=result.data.saving,$scope.annulcard.cardstatus=$scope.memberhomeinfo.cardInfoBean.cardStatus)}),$scope.confirmannulcard=function(){var updata={capitalAmount:"",presentedAmount:"",cardNumber:""};if($scope.annulcard.cardstatus!==101){$uibModalInstance.dismiss("cancel"),modalService.info({title:"提示",content:"此卡状态不满足退卡条件！",size:"sm",type:"confirm"});return}if($scope.annulcard.saving!==1){$uibModalInstance.dismiss("cancel"),modalService.info({title:"提示",content:"此卡无储值功能不允许退卡！",size:"sm",type:"confirm"});return}updata.capitalAmount=$scope.annulcard.capitalamount,updata.presentedAmount=$scope.annulcard.presentedamount,updata.cardNumber=$scope.annulcard.cardnumber,ajaxService.AjaxPost({annulCardBean:updata,memberHomeBean:$scope.memberhomeinfo,sessionId:$rootScope.sessionId},"postrade/card/annulCard.do").then(function(result){result.status===1&&(modalService.info({content:"退卡成功!",type:"ok"}),ajaxService.AjaxPost({sessionId:$rootScope.sessionId,paramValue:$scope.memberhomeinfo.cardInfoBean.number},"postrade/memberhome/memberhomeinfo.do").then(function(result){if(result.data!==null){var data=angular.copy(result.data);$scope.memberhomeinfo=data,$rootScope.cardoperatetoeditusrmemberinfo=$scope.memberhomeinfo.memberInfoBean,$rootScope.currentuserinfo=$scope.memberhomeinfo}else $rootScope.cardoperatetoeditusrmemberinfo=null,$rootScope.currentuserinfo=null}),$uibModalInstance.dismiss("cancel")),$uibModalInstance.dismiss("cancel")})},$scope.cancelannulcard=function(){$uibModalInstance.dismiss("cancel")}}]})}}]});