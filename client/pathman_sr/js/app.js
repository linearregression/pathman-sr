var configFn,app;configFn=function(e,t){e.theme("default").primaryPalette("blue").accentPalette("light-blue"),t.setBaseUrl("http://localhost:8020")},configFn.$inject=["$mdThemingProvider","RestangularProvider"],app=angular.module("pathmanApp",["ngMaterial","restangular","md.data.table"]),app.config(configFn),function(e){var t=function(e,t,a){this.debug=!0,this.defaultMethod="toast",this.displayMDToast=function(e){a.show({hideDelay:1e4,position:"bottom right",controller:"ErrorHandlerCtrl",templateUrl:"templates/error-views/toast.tpl.html",locals:{errData:e}})},this.displayMDDialog=function(e){var a=angular.element(document.body);t.show({parent:a,controller:"ErrorHandlerCtrl",templateUrl:"templates/error-views/dialog.tpl.html",clickOutsideToClose:!0,locals:{errData:e}})},this.displayPopupByDefault=function(e){switch(this.defaultMethod){case"toast":this.displayMDToast(e);break;case"dialog":this.displayMDDialog(e)}},this.log=function(t,a){a=a||!1;var o=!0;if(a)if(a===!0)this.displayPopupByDefault(t);else{if(a.hasOwnProperty("type"))switch(a.type){case"dialog":this.displayMDDialog(t);break;case"toast":this.displayMDToast(t);break;case"default":this.displayPopupByDefault(t);break;case"hide":}else this.displayPopupByDefault(t);a.hasOwnProperty("allowToLogInConsole")&&(o="boolean"==typeof a.allowToLogInConsole?a.allowToLogInConsole:!1)}this.debug&&o&&e.error("Error occurred.",t)}};t.$inject=["$log","$mdDialog","$mdToast"],e.service("ErrorHandlerService",t)}(app),function(e){var t=function(){function e(e,a){a=a||!1;for(var o in e)e.hasOwnProperty(o)&&(a?t.data[o]=angular.copy(e[o]):t.data[o]=e[o])}var t=this;this.multiSet=e,this.data={topologyData:null,pathListData:null,selectedPathData:null,selectedNodeData:null,selectedLinkData:null,topologyInitd:!1,pathListInitd:!1,sidePanel:!1,sidePanelName:null,autoPathSetupMode:null,pathSetupMode:null,pathSetupSelectedTab:null,pathDeploymentResult:null,pathSetupUpdateData:null,nxApp:null,nxTopology:null,openPanel:null}};t.$inject=[],e.service("SharedDataService",t)}(app),function(e){var t=function(){function e(e,t){for(var a=e,o=0;o<t.length;o++){if(!a.hasOwnProperty(t[o]))return!1;a=a[t[o]]}return!0}function t(e,t,a){var o;return function(){var n=this,r=arguments,i=function(){o=null,a||e.apply(n,r)},l=a&&!o;clearTimeout(o),o=setTimeout(i,t),l&&e.apply(n,r)}}function a(e){var t=0;return e.forEach(function(e){t+=e}),t}this.hasOwnPropertiesPath=e,this.debounce=t,this.arraySum=a};t.$inject=[],e.service("HelpersService",t)}(app),function(e){var t=function(e,t,a){function o(e,o){var n=t.all("pathman_sr");n.customPOST({request:[{option:"topo"}]}).then(function(t){if(a.hasOwnPropertiesPath(t,["response","0","topology"]))e(t.response[0].topology);else{var n={errCode:"GET_TOPOLOGY_INVALID",errTitle:"Couldn't read topology data",errMsg:"Topology data is invalid.",errResolution:"Make sure that protocols match.",errObj:t};o(n)}},function(e){var t={errCode:"GET_TOPOLOGY",errTitle:"Couldn't get topology data",errMsg:"You tried to read topology data from server, but for some reason it is being complicated at this point.",errResolution:"Check your connection, otherwise make sure if controller is up.",errObj:e};o(t)})}this.refreshTopology=o};t.$inject=["NextTopologyService","Restangular","HelpersService"],e.service("NetworkService",t)}(app),function(e){var t=function(e,t){function a(a,o){var n=e.all("pathman_sr");n.customPOST({request:[{option:"list_all"}]}).then(function(e){if(t.hasOwnPropertiesPath(e,["response","0","list"]))a(e.response[0].list);else{var n={errCode:"GET_PATH_LIST_INVALID",errTitle:"Couldn't read path list",errMsg:"Path list is invalid.",errResolution:"Make sure that protocols match.",errObj:e};o(n)}},function(e){console.log(e);var t={errCode:"GET_PATH_LIST",errTitle:"Couldn't get path list data",errMsg:"You tried to read path list from server, but for some reason it is being complicated at this point.",errResolution:"Check your connection, otherwise make sure if controller is up.",errObj:e};o(t)})}function o(a,o,n){var r=e.all("pathman_sr");r.customPOST({request:[{option:"path",src:a.source,dst:a.destination,metric:a.costMetric||"igp"}]}).then(function(e){if(t.hasOwnPropertiesPath(e,["response","0","path"])&&t.hasOwnPropertiesPath(e,["response","0","metric"]))o(e.response[0]);else{var a={errCode:"COMPUTE_PATH_LIST_INVALID",errTitle:"Couldn't read path list",errMsg:"Path list is invalid.",errResolution:"Make sure that protocols match.",errObj:e};n(a)}},function(e){var t={errCode:"COMPUTE_PATH_LIST",errTitle:"Couldn't compute path list",errMsg:"You tried to compute and read path list from server, but for some reason it is being complicated at this point.",errResolution:"Check your connection, otherwise make sure if controller is up.",errObj:e};n(t)})}function n(a,o,n){var r=e.all("pathman_sr");r.customPOST({request:[{option:"create",name:a.name,path:a.path}]}).then(function(e){var a;t.hasOwnPropertiesPath(e,["response","0","success"])?1==e.response[0].success?o(e.response[0]):(a={errCode:"DEPLOY_PATH_UNSUCCESSFUL",errTitle:"Couldn't deploy path",errMsg:"Response indicated the error in frontend-backend communication.",errResolution:"Review detailed response.",errObj:e},n(a)):(a={errCode:"DEPLOY_PATH_INVALID",errTitle:"Couldn't deploy path",errMsg:"Response was invalid when was trying to deploy path. Path is likely to not be deployed.",errResolution:"Make sure that protocols match.",errObj:e},n(a))},function(e){var t={errCode:"DEPLOY_PATH",errTitle:"Couldn't deploy path",errMsg:"You tried to deploy path, but for some reason it is being complicated at this point.",errResolution:"Check your connection, otherwise make sure if controller is up.",errObj:e};n(t)})}function r(a,o,n){var r=e.all("pathman_sr");r.customPOST({request:[{option:"update",name:a.name,path:a.path}]}).then(function(e){console.log(e),t.hasOwnPropertiesPath(e,["response","0","success"])?o(e.response[0]):(errData={errCode:"UPDATE_PATH_UNSUCCESSFUL",errTitle:"Couldn't update path",errMsg:"Response indicated the error in frontend-backend communication.",errResolution:"Review detailed response.",errObj:e},n(errData))},function(e){console.log(e);var t={errCode:"UPDATE_PATH",errTitle:"Couldn't update path",errMsg:"You tried to update path, but for some reason it is being complicated at this point.",errResolution:"Check your connection, otherwise make sure if controller is up.",errObj:e};n(t)})}function i(a,o,n){var r=e.all("pathman_sr");r.customPOST({request:[{option:"delete",name:a.name,node:a.node}]}).then(function(e){if(console.log(e),t.hasOwnPropertiesPath(e,["response","0"]))o(e.response[0]);else{var a={errCode:"REMOVE_PATH_INVALID",errTitle:"Couldn't remove path",errMsg:"Response was invalid when was trying to remove path. Path is likely to not be removed.",errResolution:"Make sure that protocols match.",errObj:e};n(a)}},function(e){console.log(data);var t={errCode:"REMOVE_PATH",errTitle:"Couldn't remove path",errMsg:"You tried to remove path, but for some reason it is being complicated at this point.",errResolution:"Check your connection, otherwise make sure if controller is up.",errObj:e};n(t)})}this.refreshPathList=a,this.computePathListByConfig=o,this.deployPath=n,this.updatePath=r,this.removePath=i};t.$inject=["Restangular","HelpersService"],e.service("PathListService",t)}(app),function(e,t){var a=function(t){function a(t){var a=t.getLayer("links").highlightedElements(),o=t.getLayer("nodes").highlightedElements();o.clear(),a.clear(),e.each(t.layers(),function(e){e.fadeIn(!0)},this)}function o(e){var t=e.getLayer("paths");return t.clear(),m._paths={},t}function n(){return new e.graphic.Topology({adaptive:!0,scalable:!0,nodeConfig:{label:"model.name",iconType:"router"},linkConfig:{linkType:"curve",width:4},theme:"blue",identityKey:"name",dataProcessor:"force",showIcon:!0,nodeInstanceClass:"ExtendedNode",tooltipManagerConfig:{nodeTooltipContentClass:"ExtendedNodeTooltip",showLinkTooltip:!1}})}function r(){e.define("ExtendedNode",e.graphic.Topology.Node,{view:function(e){return e.content.push([{name:"srBadge",type:"nx.graphic.Group",content:[{name:"srBadgeBg",type:"nx.graphic.Rect",props:{"class":"node-badge-circle",height:1}},{name:"srBadgeText",type:"nx.graphic.Text",props:{"class":"node-badge-text",y:1}}],props:{"class":"node-badge"}},{name:"pcepBadge",type:"nx.graphic.Group",content:[{name:"pcepBadgeBg",type:"nx.graphic.Rect",props:{"class":"node-badge-circle",height:1}},{name:"pcepBadgeText",type:"nx.graphic.Text",props:{"class":"node-badge-text",y:1}}],props:{"class":"node-badge"}}]),e},methods:{init:function(e){this.inherited(e);var t=this.topology().stageScale();this.view("label").setStyle("font-size",14*t)},setModel:function(e){this.inherited(e),this._drawBadges(this.model())},_drawBadges:function(e){var t,a,o,n,r,i,l,s,d,p,c,h,u,g,f;t=this.view("icon"),a=t.size(),o=t.scale(),n=this.view("srBadge"),r=this.view("srBadgeBg"),i=this.view("srBadgeText"),i.sets({text:"SR",visible:!0}),p=n.getBound(),c=Math.max(p.width-6,1),r.sets({width:c,"class":e.get("sr_enabled")?"node-badge-circle":"node-badge-circle-inactive",visible:!0}),r.setTransform(c/-2),h={x:a.width*o/3,y:a.height*o/2.5},n.setTransform(h.x,h.y),n.visible(!0),r.visible(!0),i.visible(!0),l=this.view("pcepBadge"),s=this.view("pcepBadgeBg"),d=this.view("pcepBadgeText"),d.sets({text:"PC",visible:!0}),u=l.getBound(),g=Math.max(u.width-6,1),s.sets({width:g,"class":e.get("pcep_enabled")?"node-badge-circle":"node-badge-circle-inactive",visible:!0}),s.setTransform(g/-2),f={x:a.width*o/-3,y:a.height*o/2.5},l.setTransform(f.x,f.y),l.visible(!0),s.visible(!0),d.visible(!0)}}})}function i(t,a,o){for(var n,r=t.getLayer("paths"),i=[],l="undefined"===m._colorTable.paths[o]?m._colorTable.paths._default:m._colorTable.paths[o],s=0;s<a.length;s++){var d=t.getNode(a[s]);d&&i.push(d)}if(n=m._nodesToLinks(t,i),n!==!1){var p=new e.graphic.Topology.Path({pathWidth:3,links:n,arrow:"cap",pathStyle:{fill:l}});r.addPath(p),m.removePathByType(t,o),m._paths[o]=p}}function l(e,t){var a;m._paths.hasOwnProperty(t)&&(a=e.getLayer("paths"),a.removePath(m._paths[t]),delete m._paths[t])}function s(t){var a,o;return a=new e.ui.Application,a.container(document.getElementById(t)),m._extendNodeClass(),m._extendTooltipPolicy(),m._extendNodeTooltip(),o=m.createTopoObject(),o.tooltipManager().tooltipPolicyClass("ExtendedTooltipPolicy"),o.attach(a),o.on("topologyGenerated",function(e,t){e.registerScene("extended-events","ExtendedEvents"),e.activateScene("extended-events")}),{nxApp:a,nxTopology:o}}function d(t,a,o){var n=t.getLinkSet(a.id(),o.id());return null!==n?e.util.values(n.links()):!1}function p(e,t){var a,o=[];return t.forEach(function(t){if("undefined"==typeof a)a=t;else if(t){var n=m._getLinksBetweenNodes(e,a,t);if(typeof n===!1)return!1;o.push(n[0]),a=t}}),o}function c(){e.define("ExtendedTooltipPolicy",e.graphic.Topology.TooltipPolicy,{properties:{topology:{},tooltipManager:{}},methods:{init:function(e){this.inherited(e),this.sets(e),this._tm=this.tooltipManager()},clickNode:function(e){this._tm.closeAll()},enterNode:function(e){var t=e.topology();t.tooltipManager().openNodeTooltip(e)},leaveNode:function(e){this._tm.closeAll()}}})}function h(){e.define("ExtendedNodeTooltip",e.ui.Component,{properties:{node:{set:function(t){function a(e){var t=[{label:"Name",value:e.name},{label:"PCEP enabled",value:void 0!==e.pcep_enabled?"yes":"no"},{label:"SR enabled",value:void 0!==e.sr_enabled?"yes":"no"},{label:"IP",value:e.ipaddress}];return e.sr_enabled&&t.push({label:"SID",value:e.sid}),t}var o=t.model(),n=new e.data.Collection(a(o.getData()));this.view("list").set("items",n),this.title(t.label())}},title:"",nodePayload:{},topology:{}},view:{content:[{name:"header",props:{"class":"n-topology-tooltip-header"},content:[{tag:"span",props:{"class":"n-topology-tooltip-header-text"},name:"title",content:"{#title}"}]},{name:"content",props:{"class":"n-topology-tooltip-content n-list"},content:[{name:"list",tag:"ul",props:{"class":"n-list-wrap",template:{tag:"li",props:{"class":"n-list-item-i",role:"listitem"},content:[{tag:"label",content:"{label}: "},{tag:"span",content:"{value}"}]}}}]}]},methods:{init:function(e){this.inherited(e)}}})}function u(e,t,a){t=t||null,a=a||null;var o=null;return e.getLayer("nodes").nodes().forEach(function(e){var n=e.model().getData();n[t]===a&&(o=e)}),o}function g(e,t){var a,o=[];return a=m.getNodeByParam(e,"name",t),null!==a&&a.eachConnectedNode(function(e){o.push(e.model().getData().name)}),o}function f(e,t,a){var o,n;return o=m.getNodeByParam(e,"name",t),n=m.getNodeByParam(e,"name",a),o&&n?m._getLinksBetweenNodes(e,o,n)[0]:!1}var m=this;this.fadeInAllLayers=a,this.clearPathLayer=o,this.createTopoObject=n,this.addPath=i,this.removePathByType=l,this.initTopology=s,this.findNeighborsByNodeName=g,this.getNodeByParam=u,this.getLinkBetweenNodesByNames=f,this._extendNodeClass=r,this._extendTooltipPolicy=c,this._getLinksBetweenNodes=d,this._nodesToLinks=p,this._extendNodeTooltip=h,this._paths={},this._colorTable={paths:{pathListHover:"#ffbf00",pathListSelected:"#ff7300",deployed:"#00ff00",deploymentFailed:"#ff0000",_default:"#3333cc"}}};a.$inject=["SharedDataService"],t.service("NextTopologyService",a)}(nx,app),function(e){var t=function(e,t,a){function o(e,o){var n=t.all("pathman_sr");n.customPOST({request:[{option:"topo"}]}).then(function(t){if(a.hasOwnPropertiesPath(t,["response","0","topology"]))e(t.response[0].topology);else{var n={errCode:"GET_TOPOLOGY_INVALID",errTitle:"Couldn't read topology data",errMsg:"Topology data is invalid.",errResolution:"Make sure that protocols match.",errObj:t};o(n)}},function(e){var t={errCode:"GET_TOPOLOGY",errTitle:"Couldn't get topology data",errMsg:"You tried to read topology data from server, but for some reason it is being complicated at this point.",errResolution:"Check your connection, otherwise make sure if controller is up.",errObj:e};o(t)})}this.refreshTopology=o};t.$inject=["NextTopologyService","Restangular","HelpersService"],e.service("NetworkService",t)}(app),function(e){var t=function(e,t,a,o,n){e.errData=t,e.closeDialog=function(){o.hide()},e.showMoreInfoInDialog=function(){e.closeToast(),n.log(e.errData,{type:"dialog",allowTologInConsole:!1})},e.closeToast=function(){a.hide().then(function(){})}};t.$inject=["$scope","errData","$mdToast","$mdDialog","ErrorHandlerService"],e.controller("ErrorHandlerCtrl",t)}(app),function(e){var t=function(e,t,a,o){function n(e){o.data.sidePanel=!1,o.data.sidePanelName=null,o.data.selectedPathData=null,o.data.pathSetupMode=null,o.data.topologyInitd&&(a.clearPathLayer(o.data.nxTopology),window.setTimeout(function(){o.data.nxTopology.adaptToContainer()},100))}e.closeSidePanel=n,e.shared=o.data};t.$inject=["$scope","$mdSidenav","NextTopologyService","SharedDataService"],e.controller("SidePanelCtrl",t)}(app),function(e){var t=function(e,t,a){e.shared=a.data,e.nodeData=null,e.prefixQuery={limit:10,page:1},e.$watch("shared.selectedNodeData",function(t){e.nodeData=t})};t.$inject=["$scope","NextTopologyService","SharedDataService"],e.controller("NodeDetailsCtrl",t)}(app),function(e){var t=function(e,t,a){e.nodeSearchQuery="";var o=$("#node-list-area"),n=function(e){this.scrollTop>0?o.addClass("fix-search"):o.removeClass("fix-search")};o.on("scroll",n)};t.$inject=["$scope","NextTopologyService","SharedDataService"],e.controller("NodeListCtrl",t)}(app),function(e){var t=function(e,t,a){e.shared=a.data,e.linkData=null,e.$watch("shared.selectedLinkData",function(t){e.linkData=t})};t.$inject=["$scope","NextTopologyService","SharedDataService"],e.controller("LinkDetailsCtrl",t)}(app),function(e){var t=function(e,t,a){e.linkSearchQuery="";var o=$("#link-list-area"),n=function(e){this.scrollTop>0?o.addClass("fix-search"):o.removeClass("fix-search")};o.on("scroll",n)};t.$inject=["$scope","NextTopologyService","SharedDataService"],e.controller("LinkListCtrl",t)}(app),function(e){var t=function(e,t,a){function o(e){console.log(e);var t={mode:"update",pathDetails:{source:e.path[0],destination:e.path[e.path.length-1],name:e.name}};return t}function n(a){e.pathData=a,null!==a&&"object"==typeof a&&a.hasOwnProperty("path")&&t.addPath(e.shared.nxTopology,a.path,"pathListSelected")}e.shared=a.data,e.pathData=null,e.selected=[],e.pathDetailsQuery={limit:10,page:1},e.makeArgsForUpdateReq=o,e.$watch("shared.selectedPathData",n)};t.$inject=["$scope","NextTopologyService","SharedDataService"],e.controller("PathDetailsCtrl",t)}(app),function(e){var t=function(e,t,a,o,n){function r(e,a,o){t.addPath(e,a,o)}function i(e){t.clearPathLayer(e)}function l(e,t,r,i){var l=n.confirm().title("Would you like to delete the path?").textContent("You are going to delete the path with ID: "+r+". Are you sure?").ariaLabel("Would you like to delete the path "+r).targetEvent(e).ok("Yes, delete it").cancel("No, I changed my mind");n.show(l).then(function(){function e(e){o.refreshPathList(function(e){a.data.pathListData=e,a.data.pathListInitd=!0},function(e){ErrorHandlerService.log(e,!0)})}function t(e){ErrorHandlerService.log(e,!0)}var n={name:r,node:i[0]};a.data.pathListInitd=!1,o.removePath(n,e,t)},function(){})}e.highlightPath=r,e.clearPathLayer=i,e.removePathConfirmDialog=l,e.shared=a.data,e.pathSearchQuery="";var s=$("#node-list-area"),d=function(e){this.scrollTop>0?s.addClass("fix-search"):s.removeClass("fix-search")};s.on("scroll",d)};t.$inject=["$scope","NextTopologyService","SharedDataService","PathListService","$mdDialog"],e.controller("PathListCtrl",t)}(app),function(e){var t=function(e,t,a,o,n,r){function i(t,r){function i(e){return e.name===this.node.name}var l,s,d,p,c,h,u,g=r.nodeData;l=e.manualPath.findIndex(i,{node:g}),-1!==l?(p=e.manualPath.length-1,0==l?(e.manualPath=[],e.manualPathMetrics=[]):l==p?(e.manualPath.splice(p,1),e.manualPathMetrics.splice(p-1)):(e.manualPath.splice(l+1),e.manualPathMetrics.splice(l))):e.manualPath.length>0?(s=a.findNeighborsByNodeName(o.data.nxTopology,e.manualPath[e.manualPath.length-1].name),-1!==s.indexOf(g.name)?g.sr_enabled?(c=e.manualPath[e.manualPath.length-1],h=a.getLinkBetweenNodesByNames(o.data.nxTopology,c.name,g.name),h&&(u=h.model().getData(),u.source==c.name?e.manualPathMetrics.push(u.sourceTraffic):e.manualPathMetrics.push(u.targetTraffic),e.manualPath.push(g))):(d={errCode:"SR_ENABLED_ONLY",errTitle:"Only SR-capable routers can perform this operation.",errMsg:"SR-disabled routers cannot be destinations or intermediate points.",errResolution:"Try it with the SR-capable one.",errObj:g},n.log(d,{type:"toast",allowToLogInConsole:!1})):(d={errCode:"NEIGHBORS_ONLY",errTitle:"Only neighborhood routers can be added to the path.",errMsg:'You can only add routers to the path, which are "visible" (neighbors of) the last added.',errResolution:"Choose a router from the last hop's neighborhood.",errObj:g},n.log(d,{type:"toast",allowToLogInConsole:!1}))):g.pcep_enabled?e.manualPath.push(g):(d={errCode:"PCEP_ENABLED_ONLY",errTitle:"Only PCEP-capable routers can perform this operation.",errMsg:"PCEP-disabled routers cannot be sources for outgoing traffic.",errResolution:"Try it with the PCEP-capable one.",errObj:g},n.log(d,{type:"toast",allowToLogInConsole:!1})),e.highlightPath(o.data.nxTopology,e.getNodeNamesOnly(e.manualPath),"pathListSelected")}function l(t,a){"path-setup"==a.panelName&&("manual"==o.data.pathSetupMode&&e.highlightPath(o.data.nxTopology,e.getNodeNamesOnly(e.manualPath),"pathListSelected"),"update"==o.data.pathSetupUpdateData.mode&&(console.log(o.data.pathSetupUpdateData),e.psForm={source:o.data.pathSetupUpdateData.pathDetails.source,destination:o.data.pathSetupUpdateData.pathDetails.destination}))}function s(){return e.hasOwnProperty("psForm")&&e.hasOwnProperty("autoPathForm")?e.autoPathForm.$invalid?!0:e.psForm.hasOwnProperty("source")&&e.psForm.hasOwnProperty("destination")?e.psForm.source==e.psForm.destination?!0:-1===e.validCostMetrics.indexOf(e.psForm.costMetric):!0:!0}function d(){e.autoPathFormLoadingStatus=!0,e.computedPaths=[],e.computedMetrics=[],a.clearPathLayer(o.data.nxTopology),e.isAutoPathFormInvalid()?e.autoPathFormLoadingStatus=!1:t.computePathListByConfig({source:e.psForm.source,destination:e.psForm.destination,costMetric:e.psForm.costMetric},function(t){e.autoPathFormLoadingStatus=!1,e.computedPaths=t.path,e.computedMetrics=t.metric},function(t){e.autoPathFormLoadingStatus=!1,n.log(t,!0)})}function p(e,t,o){a.clearPathLayer(e),Array.isArray(t)&&t.length>1&&a.addPath(e,t,o)}function c(e){a.clearPathLayer(e)}function h(t,n,r){o.data.autoPathSetupMode="register-path",o.data.pathDeploymentResult="inprogress",a.addPath(t,n,"pathListSelected"),e.pathSet=n,e.prForm={pathName:n[0]+" -> "+n[n.length-1]}}function u(e){o.data.autoPathSetupMode="search",a.clearPathLayer(e)}function g(e,t){a.removePathByType(e,t)}function f(r){function i(t){a.addPath(r,e.pathSet,"deployed"),o.data.pathDeploymentResult="success",e.refreshPathList()}function l(t){a.addPath(r,e.pathSet,"deploymentFailed"),o.data.pathDeploymentResult="error",e.refreshPathList(),n.log(t,!0)}var s={name:e.prForm.pathName,path:e.pathSet};a.removePathByType(r,"pathListSelected"),"update"==o.data.pathSetupUpdateData.mode?t.updatePath(s,i,l):t.deployPath(s,i,l)}function m(){t.refreshPathList(function(e){o.data.pathListData=e,o.data.pathListInitd=!0},function(e){n.log(e,!0)})}function y(t){var a=["auto","manual"];o.data.pathSetupMode=o.data.pathSetupSelectedTab=a.indexOf(t)>=0?t:null,"manual"==o.data.pathSetupMode&&e.manualPath.length>0&&e.highlightPath(o.data.nxTopology,e.getNodeNamesOnly(e.manualPath),"pathListSelected")}function P(t){e.manualPath=[],e.manualPathMetrics=[],a.clearPathLayer(t)}function v(e){var t=e.map(function(e){return e.name});return t}e.isAutoPathFormInvalid=s,e.computePaths=d,e.highlightPath=p,e.clearPathLayer=c,e.registerPath=h,e.backToSetup=u,e.removePathByType=g,e.deployPath=f,e.refreshPathList=m,e.onTabSelected=y,e.clearCurrentPath=P,e.getNodeNamesOnly=v,e.HelpersService=r,e.validCostMetrics=["igp","hops"],e.autoPathFormLoadingStatus=!1,e.computedPaths=[],e.computedMetrics=[],e.manualPath=[],e.manualPathMetrics=[],e.nodeFilter={pcepEnabled:{pcep_enabled:!0},srEnabled:{sr_enabled:"true"}},e.shared=o.data,o.data.autoPathSetupMode="search",e.$on("topo-select-node-manual",i),e.$on("openPanel",l)};t.$inject=["$scope","PathListService","NextTopologyService","SharedDataService","ErrorHandlerService","HelpersService"],e.controller("PathSetupCtrl",t)}(app),function(e){var t=function(e,t,a,o,n,r,i,l){function s(){i.data.openPanel=e.openPanel,e.initTopology(),e.initPathList()}function d(){n.refreshTopology(function(e){var t=o.initTopology("topology-container");i.multiSet({nxApp:t.nxApp,nxTopology:t.nxTopology},!1),i.data.topologyData=e,i.data.nxTopology.data(i.data.topologyData),i.data.topologyInitd=!0},function(e){l.log(e,!0)})}function p(){r.refreshPathList(function(e){i.data.pathListData=e,i.data.pathListInitd=!0},function(e){l.log(e,!0)})}function c(t,a){function n(){i.data.topologyInitd&&(window.setTimeout(function(){i.data.nxTopology.adaptToContainer()},100),o.clearPathLayer(i.data.nxTopology))}switch(a=a||null,"path-setup"!==t&&"manual"==i.data.pathSetupMode&&(i.data.pathSetupMode=null),n(),t){case"path-setup":i.data.pathSetupMode=i.data.pathSetupSelectedTab,i.data.pathSetupUpdateData="object"==typeof a&&null!==a?a:{mode:"default"},i.data.sidePanel=!0,i.data.sidePanelName=t;break;case"path-details":"object"==typeof a&&null!==a&&a.hasOwnProperty("pathData")&&(i.data.selectedPathData=a.pathData,i.data.sidePanel=!0,i.data.sidePanelName=t);break;case"node-details":"object"==typeof a&&null!==a&&a.hasOwnProperty("nodeData")&&(i.data.selectedNodeData=a.nodeData,i.data.sidePanel=!0,i.data.sidePanelName=t);break;case"link-details":"object"==typeof a&&null!==a&&a.hasOwnProperty("linkData")&&(i.data.selectedLinkData=a.linkData,i.data.sidePanel=!0,i.data.sidePanelName=t);break;default:i.data.sidePanel=!0,i.data.sidePanelName=t}e.$root.$broadcast("openPanel",{panelName:t})}e.init=s,e.initTopology=d,e.initPathList=p,e.openPanel=c,e.shared=i.data,e.init()};t.$inject=["$scope","$mdSidenav","$mdDialog","NextTopologyService","NetworkService","PathListService","SharedDataService","ErrorHandlerService"],e.controller("PathmanAppCtrl",t)}(app),function(e){var t=function(e,t,a,o){function n(){nx.define("ExtendedEvents",nx.graphic.Topology.DefaultScene,{methods:{clickNode:function(t,a){switch(o.data.pathSetupMode){case"manual":e.$apply(function(){e.$root.$broadcast("topo-select-node-manual",{nodeData:a.model().getData()})});break;default:e.$apply(function(){e.openPanel("node-details",{nodeData:a.model().getData()})})}},clickLink:function(t,a){e.$apply(function(){e.openPanel("link-details",{linkData:a.model().getData()})})}}})}e.shared=o.data,e.extendEvents=n,e.extendEvents()};t.$inject=["$scope","$rootScope","NextTopologyService","SharedDataService"],e.controller("NextTopologyCtrl",t)}(app);