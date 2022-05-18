"use strict";(self.webpackChunkkubedl_website=self.webpackChunkkubedl_website||[]).push([[717],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var l=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,l,a=function(e,t){if(null==e)return{};var n,l,a={},r=Object.keys(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=l.createContext({}),u=function(e){var t=l.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return l.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},d=l.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,b=d["".concat(s,".").concat(m)]||d[m]||p[m]||r;return n?l.createElement(b,i(i({ref:t},c),{},{components:n})):l.createElement(b,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var u=2;u<r;u++)i[u]=n[u];return l.createElement.apply(null,i)}return l.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1630:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return c},default:function(){return d}});var l=n(7462),a=n(3366),r=(n(7294),n(3905)),i=["components"],o={sidebar_position:1},s="Install Using Helm",u={unversionedId:"installation/install-using-helm",id:"installation/install-using-helm",title:"Install Using Helm",description:"Install Helm",source:"@site/docs/installation/install-using-helm.md",sourceDirName:"installation",slug:"/installation/install-using-helm",permalink:"/docs/installation/install-using-helm",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/installation/install-using-helm.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/docs/intro"},next:{title:"Install Using YAML Files",permalink:"/docs/installation/install-using-yaml"}},c=[{value:"Install Helm",id:"install-helm",children:[],level:2},{value:"Install KubeDL",id:"install-kubedl",children:[],level:2},{value:"Uninstall KubeDL",id:"uninstall-kubedl",children:[],level:2},{value:"Delete all kubedl.io CRDs",id:"delete-all-kubedlio-crds",children:[],level:2},{value:"Enable specific job Kind",id:"enable-specific-job-kind",children:[],level:2}],p={toc:c};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,r.kt)("wrapper",(0,l.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"install-using-helm"},"Install Using Helm"),(0,r.kt)("h2",{id:"install-helm"},"Install Helm"),(0,r.kt)("p",null,"Helm is a package manager for Kubernetes. You can install helm with command below on MacOS"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"brew install helm\n")),(0,r.kt)("p",null,"Check the ",(0,r.kt)("a",{parentName:"p",href:"https://helm.sh/docs/intro/install/"},"helm website")," for more details."),(0,r.kt)("h2",{id:"install-kubedl"},"Install KubeDL"),(0,r.kt)("p",null,"From the root directory, run"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"helm install kubedl ./helm/kubedl --create-namespace -n kubedl-system\n")),(0,r.kt)("p",null,"Running the command from master branch uses the ",(0,r.kt)("a",{parentName:"p",href:"https://hub.docker.com/r/kubedl/kubedl/tags?page=1&ordering=last_updated"},"daily docker image.")),(0,r.kt)("p",null,"You can override default values defined in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/alibaba/kubedl/blob/master/helm/kubedl/values.yaml"},"values.yaml")," with ",(0,r.kt)("inlineCode",{parentName:"p"},"--set")," flag.\nFor example, set the custom cpu/memory resource:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"helm install kubedl ./helm/kubedl --create-namespace -n kubedl-system  --set resources.requests.cpu=1024m --set resources.requests.memory=2Gi\n")),(0,r.kt)("p",null,"Helm will install CRDs and KubeDL controller under ",(0,r.kt)("inlineCode",{parentName:"p"},"kubedl-system")," namespace."),(0,r.kt)("h2",{id:"uninstall-kubedl"},"Uninstall KubeDL"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"helm uninstall kubedl -n kubedl-system\n")),(0,r.kt)("h2",{id:"delete-all-kubedlio-crds"},"Delete all kubedl.io CRDs"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl get crd | grep kubedl.io | cut -d ' ' -f 1 | xargs kubectl delete crd\n")),(0,r.kt)("h2",{id:"enable-specific-job-kind"},"Enable specific job Kind"),(0,r.kt)("p",null,"KubeDL supports all kinds of jobs(tensorflow, pytorch etc.) in a single Kubernetes operator. You can selectively enable the kind of jobs to support.\nThere are three options:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Default option. Just install the job CRDs required. KubeDL will automatically enable the corresponding job controller."),(0,r.kt)("li",{parentName:"ol"},"Set env ",(0,r.kt)("inlineCode",{parentName:"li"},"WORKLOADS_ENABLE")," in KubeDL container. The value is a list of job types to be enabled. For example, ",(0,r.kt)("inlineCode",{parentName:"li"},"WORKLOADS_ENABLE=TFJob,PytorchJob")," means only Tensorflow and Pytorch Job are enabled."),(0,r.kt)("li",{parentName:"ol"},"Set startup flags ",(0,r.kt)("inlineCode",{parentName:"li"},"--workloads")," in KubeDL container command args. The value is a list of job types to be enabled like ",(0,r.kt)("inlineCode",{parentName:"li"},"--workloads TFJob,PytorchJob"),".")))}d.isMDXComponent=!0}}]);