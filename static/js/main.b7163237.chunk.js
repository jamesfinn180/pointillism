(this.webpackJsonppointillism=this.webpackJsonppointillism||[]).push([[0],{17:function(t,e,a){},18:function(t,e,a){},20:function(t,e,a){"use strict";a.r(e);var s=a(1),i=a.n(s),n=a(7),c=a.n(n),r=(a(17),a(5)),o=a(8),l=a(6),u=a(9),g=a(10),h=a(12),j=a(11),d=(a(18),a(0)),m=function(t){Object(h.a)(a,t);var e=Object(j.a)(a);function a(t){var s;return Object(u.a)(this,a),(s=e.call(this,t)).getGists=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:20;if(s.state.allowFetch){s.setState({allowFetch:!1});var e="https://api.github.com/gists/public?page=".concat(s.state.gPage,"&per_page=").concat(t);fetch(e,{method:"GET",cache:"default",headers:{Accept:"application/vnd.github.v3+json","If-None-Match":s.state.etag}}).then((function(t){var e=t.headers.get("etag")||"";if(s.setState({etag:e}),t.ok)return t.json();if(304===t.status)return[];throw 403===t.status?new Error("Rate limit exceeded. Try again in an hour: "+t.status):new Error("Response status = "+t.status)})).then((function(t){var e=[];e.push.apply(e,Object(l.a)(s.state.gistData).concat(Object(l.a)(t))),s.setState({allowFetch:!0,gistData:e,gPage:s.state.gPage+1})})).catch((function(t){var e="Sorry an error has occured: "+(t.message||"");s.setState({allowFetch:!0,gistData:[{owner:{avatar_url:"https://upload.wikimedia.org/wikipedia/commons/3/34/ErrorMessage.png"},files:Object(o.a)({},e,{})}]})}))}},s.state={gistData:[],gPage:1,etag:"",allowFetch:!0},s}return Object(g.a)(a,[{key:"componentDidMount",value:function(){this.getGists(20)}},{key:"render",value:function(){return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)(v,{gistData:this.state.gistData,allowFetch:this.state.allowFetch,getGists:this.getGists})})}}]),a}(s.Component);function v(t){var e=t.gistData,a=t.allowFetch,i=t.getGists,n=Object(s.useState)(!1),c=Object(r.a)(n,2),o=c[0],l=c[1],u=Object(s.useState)(""),g=Object(r.a)(u,2),h=g[0],j=g[1],m=function(t){j(t),l(!0)};return Object(d.jsxs)("div",{className:"main",onScroll:function(t){var e=t.target,a=e.clientHeight;e.scrollHeight-a<=e.scrollTop+300&&i(20)},children:[Object(d.jsxs)("ul",{className:"list",children:[e.map((function(t,e){var a=Object.keys(t.files).join(" ");return Object(d.jsx)(f,{avatarUrl:t.owner.avatar_url,fileNames:a,handleGistClicked:m},e)})),a?null:Object(d.jsx)(b,{})]}),Object(d.jsx)(p,{showAvatar:o,avaUrl:h,setShowAvatar:l})]})}function f(t){var e=t.avatarUrl,a=t.fileNames,s=t.handleGistClicked;return Object(d.jsxs)("li",{className:"list__item",onClick:function(){return s(e)},children:[Object(d.jsx)("img",{className:"list__item__avatar",src:e,alt:"User avatar"}),Object(d.jsx)("p",{className:"list__item__text",children:a})]})}function b(){return Object(d.jsx)("li",{className:"list__item list__item--loading",children:Object(d.jsx)("img",{className:"list__item__loading-icon",src:"https://i.gifer.com/ZZ5H.gif",alt:"Loading icon"})})}function p(t){var e=t.showAvatar,a=t.avaUrl,s=t.setShowAvatar;return Object(d.jsx)("img",{className:"large-icon ".concat(e?"large-icon--reveal":"large-icon--hide"),src:a,alt:"Owner avatar icon",onTransitionEnd:function(){return s(!1)}})}var O=m,w=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,21)).then((function(e){var a=e.getCLS,s=e.getFID,i=e.getFCP,n=e.getLCP,c=e.getTTFB;a(t),s(t),i(t),n(t),c(t)}))};c.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(O,{})}),document.getElementById("root")),w()}},[[20,1,2]]]);
//# sourceMappingURL=main.b7163237.chunk.js.map