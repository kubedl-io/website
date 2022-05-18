"use strict";(self.webpackChunkkubedl_website=self.webpackChunkkubedl_website||[]).push([[8859],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return p}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=o.createContext({}),s=function(e){var t=o.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=s(e.components);return o.createElement(d.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,d=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),c=s(n),p=r,h=c["".concat(d,".").concat(p)]||c[p]||u[p]||a;return n?o.createElement(h,l(l({ref:t},m),{},{components:n})):o.createElement(h,l({ref:t},m))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,l=new Array(a);l[0]=c;var i={};for(var d in t)hasOwnProperty.call(t,d)&&(i[d]=t[d]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var s=2;s<a;s++)l[s]=n[s];return o.createElement.apply(null,l)}return o.createElement.apply(null,n)}c.displayName="MDXCreateElement"},8430:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return d},metadata:function(){return s},toc:function(){return m},default:function(){return c}});var o=n(7462),r=n(3366),a=(n(7294),n(3905)),l=["components"],i={sidebar_position:3},d="Quick Start",s={unversionedId:"model/usage",id:"model/usage",title:"Quick Start",description:"Create a ModelVersion from training job",source:"@site/docs/model/usage.md",sourceDirName:"model",slug:"/model/usage",permalink:"/docs/model/usage",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/model/usage.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Design",permalink:"/docs/model/design"},next:{title:"Backing Storage",permalink:"/docs/model/storage"}},m=[{value:"Create a ModelVersion from training job",id:"create-a-modelversion-from-training-job",children:[],level:2},{value:"Create a ModelVersion Manually",id:"create-a-modelversion-manually",children:[],level:2},{value:"Tutorial",id:"tutorial",children:[],level:2}],u={toc:m};function c(e){var t=e.components,n=(0,r.Z)(e,l);return(0,a.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"quick-start"},"Quick Start"),(0,a.kt)("h2",{id:"create-a-modelversion-from-training-job"},"Create a ModelVersion from training job"),(0,a.kt)("p",null,"KubeDL training already supports generating a ModelVersion when the job completes. Thus, a model image is\nautomatically generated after job succeeds."),(0,a.kt)("p",null,"To enable this feature, the TensorFlow job spec needs to set the ",(0,a.kt)("inlineCode",{parentName:"p"},"modelVersion")," field like the example below:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: "training.kubedl.io/v1alpha1"\nkind: "TFJob"\nmetadata:\n  name: "distributed-tfjob"\nspec:\n  cleanPodPolicy: None\n  # modelVersion defines the location where the model is stored.\n  modelVersion:\n    # The model name for the model version\n    modelName: mymodel\n    # The dockerhub repo to push the generated image\n    imageRepo: jianhe6/mymodel\n    storage:\n      # Use hostpath, NFS is also supported.\n      localStorage:\n        # The host path for storing the generated model.\n        # Each job should have its own unique parent folder, in this case, \'mymodel\', so that multiple ModelVersions are not collided into the same folder.\n        path: /models/mymodel\n        # The mounted path inside the container.\n        # The training code is expected to export the model under this path, such as storing the tensorflow saved_model.\n        mountPath: /kubedl-model\n        # The node where the chief worker run to store the model\n        nodeName: kind-control-plane\n  tfReplicaSpecs:\n    Worker:\n      replicas: 3\n      restartPolicy: Never\n      template:\n        spec:\n          containers:\n            - name: tensorflow\n              image: kubedl/tf-mnist-estimator-api:v0.1\n              imagePullPolicy: Always\n              command:\n                - "python"\n                - "/keras_model_to_estimator.py"\n                - "/tmp/tfkeras_example/" # model checkpoint dir\n                - "/kubedl-model"         # export dir for the saved_model format\n')),(0,a.kt)("p",null,"This example uses hostpath volume. The training code will first generate the model artifacts under ",(0,a.kt)("inlineCode",{parentName:"p"},"/kubedl-model")," inside the training\ncontainer. Correspondingly, the model will be preset on the local host path ",(0,a.kt)("inlineCode",{parentName:"p"},"/models/mymodel"),".\nThen KubeDL creates a ModelVersion CR that triggers a Kaniko container to generate an image that contains the model artifacts at ",(0,a.kt)("inlineCode",{parentName:"p"},"/kubedl-model"),", and also push that to docker hub at",(0,a.kt)("inlineCode",{parentName:"p"},"modelhub/mnist"),"."),(0,a.kt)("p",null,"Note that the training code needs to specify ",(0,a.kt)("inlineCode",{parentName:"p"},"/kubedl_model")," as the model export path (the same as the mountPath in storage)."),(0,a.kt)("p",null,"KubeDL also creates a Model object with the ModelVersion's ownerReference pointing the Model."),(0,a.kt)("h2",{id:"create-a-modelversion-manually"},"Create a ModelVersion Manually"),(0,a.kt)("p",null,"A ModelVersion can also be created manually pointing to an existing external storage."),(0,a.kt)("p",null,"This ",(0,a.kt)("inlineCode",{parentName:"p"},"ModelVersion")," CR will generate a model image at ",(0,a.kt)("inlineCode",{parentName:"p"},"modelhub/model1")," in dockerhub, including the model artifacts from ",(0,a.kt)("inlineCode",{parentName:"p"},"node1"),"'s local path at ",(0,a.kt)("inlineCode",{parentName:"p"},"/foo")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-YAML"},"apiVersion: model.kubedl.io/v1alpha1\nkind: ModelVersion\nmetadata:\n  name: mv-4\n  namespace: default\nspec:\n  modelName: model1\n  createdBy: user1\n  imageRepo: modelhub/model1\n  storage:\n    localStorage:\n      path: /foo\n      nodeName: node1\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:"script",script:!0},"kubectl get mv (short for modelversion)\nNAME                       MODEL    IMAGE                   CREATED-BY   FINISH-TIME\nmv-4                       model1   modelhub/model1:v1c072   user1        2021-04-19T21:45:29Z\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:"script",script:!0},"kubectl describe mv mv-4\n\n...\nSpec:\n  Created By:  user1\n  Image Repo:  modelhub/model1\n  Model Name:  model1\n  Storage:\n    Local Storage:\n      Node Name:  node1\n      Path:       /foo\nStatus:\n  Finish Time:        2021-04-19T21:45:29Z\n  Image:              modelhub/model1:v1c072\n  Image Build Phase:  ImageBuildSucceeded\n  Message:            Image build succeeded.\n")),(0,a.kt)("h2",{id:"tutorial"},"Tutorial"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"An e2e tutorial from KubeDL training, model and serving. ","[Go->]",'({{< ref "docs/tutorial/tutorial" >}})'),(0,a.kt)("li",{parentName:"ul"},"An e2e video tutorial. ","[Go->]",'({{< ref "docs/tutorial/video" >}})')))}c.isMDXComponent=!0}}]);