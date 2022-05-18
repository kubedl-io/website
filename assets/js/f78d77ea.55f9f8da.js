"use strict";(self.webpackChunkkubedl_website=self.webpackChunkkubedl_website||[]).push([[2421],{3905:function(e,r,t){t.d(r,{Zo:function(){return s},kt:function(){return m}});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=n.createContext({}),p=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},s=function(e){var r=p(e.components);return n.createElement(l.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=p(t),m=o,y=d["".concat(l,".").concat(m)]||d[m]||u[m]||a;return t?n.createElement(y,i(i({ref:r},s),{},{components:t})):n.createElement(y,i({ref:r},s))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=d;var c={};for(var l in r)hasOwnProperty.call(r,l)&&(c[l]=r[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var p=2;p<a;p++)i[p]=t[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},2081:function(e,r,t){t.r(r),t.d(r,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return s},default:function(){return d}});var n=t(7462),o=t(3366),a=(t(7294),t(3905)),i=["components"],c={sidebar_position:2},l="PyTorch",p={unversionedId:"training/workloads/pytorch",id:"training/workloads/pytorch",title:"PyTorch",description:"Example",source:"@site/docs/training/workloads/pytorch.md",sourceDirName:"training/workloads",slug:"/training/workloads/pytorch",permalink:"/docs/training/workloads/pytorch",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/training/workloads/pytorch.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Tensorflow",permalink:"/docs/training/workloads/tensorflow"},next:{title:"Mars",permalink:"/docs/training/workloads/mars"}},s=[{value:"Example",id:"example",children:[],level:2},{value:"CRD Spec",id:"crd-spec",children:[],level:2}],u={toc:s};function d(e){var r=e.components,t=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"pytorch"},"PyTorch"),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: training.kubedl.io/v1alpha1\nkind: "PyTorchJob"\nmetadata:\n  name: "pytorch-dist-sendrecv-example"\n  namespace: "kubedl"\nspec:\n  pytorchReplicaSpecs:\n    Master:\n      replicas: 1\n      restartPolicy: ExitCode\n      template:\n        spec:\n          containers:\n            - name: pytorch\n              image: kubedl/pytorch-dist-example\n              imagePullPolicy: Always\n    Worker:\n      replicas: 2\n      restartPolicy: ExitCode\n      template:\n        spec:\n          containers:\n            - name: pytorch\n              image: kubedl/pytorch-dist-example\n              imagePullPolicy: Always\n')),(0,a.kt)("h2",{id:"crd-spec"},"CRD Spec"),(0,a.kt)("p",null,"Check the CRD definition. ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/alibaba/kubedl/blob/master/apis/training/v1alpha1/pytorchjob_types.go"},"Go ->")))}d.isMDXComponent=!0}}]);