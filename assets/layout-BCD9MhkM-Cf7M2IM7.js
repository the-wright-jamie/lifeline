import{L as b}from"./graph-Cnp1io4t-BjOgrYAk.js";import{_ as jn,b as $,y as Tn,f as Cn,L as J,I as s,a as hn,U as nn,P as m,E as k,v as T,M as Sn,p as gn,s as $n,S as R}from"./_baseUniq-v35O2o7d-B6ey0920.js";import{f as N,V as Fn,v as Gn,d as Vn,u as M,t as vn,g as p,o as I,m as ln,h as U,r as Bn,X as F}from"./_basePickBy-CyGFI_ex-C890y4ev.js";import{an as qn,ao as Yn,ap as zn,aq as z,ar as pn,as as wn,at as An,au as A,av as Dn,aw as Jn,ax as Un,ay as Hn,az as Kn}from"./index-BlkFWPs9.js";function Qn(n){return Yn(zn(n,void 0,N),n+"")}var Zn=1,Wn=4;function Xn(n){return Sn(n,Zn|Wn)}function nr(n,r){return n==null?n:Jn(n,gn(r),Un)}function rr(n,r){return n&&hn(n,gn(r))}function er(n,r){return n>r}function C(n,r){var e={};return r=J(r),hn(n,function(t,o,i){Dn(e,o,r(t,o,i))}),e}function y(n){return n&&n.length?vn(n,pn,er):void 0}function H(n,r){return n&&n.length?vn(n,J(r),Bn):void 0}function tr(n,r){var e=n.length;for(n.sort(r);e--;)n[e]=n[e].value;return n}function or(n,r){if(n!==r){var e=n!==void 0,t=n===null,o=n===n,i=nn(n),a=r!==void 0,u=r===null,d=r===r,c=nn(r);if(!u&&!c&&!i&&n>r||i&&a&&d&&!u&&!c||t&&a&&d||!e&&d||!o)return 1;if(!t&&!i&&!c&&n<r||c&&e&&o&&!t&&!i||u&&e&&o||!a&&o||!d)return-1}return 0}function ir(n,r,e){for(var t=-1,o=n.criteria,i=r.criteria,a=o.length,u=e.length;++t<a;){var d=or(o[t],i[t]);if(d){if(t>=u)return d;var c=e[t];return d*(c=="desc"?-1:1)}}return n.index-r.index}function ar(n,r,e){r.length?r=$(r,function(i){return wn(i)?function(a){return Tn(a,i.length===1?i[0]:i)}:i}):r=[pn];var t=-1;r=$(r,An(J));var o=Fn(n,function(i,a,u){var d=$(r,function(c){return c(i)});return{criteria:d,index:++t,value:i}});return tr(o,function(i,a){return ir(i,a,e)})}function ur(n,r){return Gn(n,r,function(e,t){return Cn(n,t)})}var j=Qn(function(n,r){return n==null?{}:ur(n,r)}),dr=Math.ceil,cr=Math.max;function sr(n,r,e,t){for(var o=-1,i=cr(dr((r-n)/(e||1)),0),a=Array(i);i--;)a[++o]=n,n+=e;return a}function fr(n){return function(r,e,t){return t&&typeof t!="number"&&z(r,e,t)&&(e=t=void 0),r=F(r),e===void 0?(e=r,r=0):e=F(e),t=t===void 0?r<e?1:-1:F(t),sr(r,e,t)}}var E=fr(),L=qn(function(n,r){if(n==null)return[];var e=r.length;return e>1&&z(n,r[0],r[1])?r=[]:e>2&&z(r[0],r[1],r[2])&&(r=[r[0]]),ar(n,jn(r),[])}),hr=0;function K(n){var r=++hr;return $n(n)+r}function gr(n,r,e){for(var t=-1,o=n.length,i=r.length,a={};++t<o;){var u=t<i?r[t]:void 0;e(a,n[t],u)}return a}function vr(n,r){return gr(n||[],r||[],Hn)}class lr{constructor(){var r={};r._next=r._prev=r,this._sentinel=r}dequeue(){var r=this._sentinel,e=r._prev;if(e!==r)return rn(e),e}enqueue(r){var e=this._sentinel;r._prev&&r._next&&rn(r),r._next=e._next,e._next._prev=r,e._next=r,r._prev=e}toString(){for(var r=[],e=this._sentinel,t=e._prev;t!==e;)r.push(JSON.stringify(t,pr)),t=t._prev;return"["+r.join(", ")+"]"}}function rn(n){n._prev._next=n._next,n._next._prev=n._prev,delete n._next,delete n._prev}function pr(n,r){if(n!=="_next"&&n!=="_prev")return r}var wr=Kn(1);function mr(n,r){if(n.nodeCount()<=1)return[];var e=yr(n,r||wr),t=br(e.graph,e.buckets,e.zeroIdx);return N(p(t,function(o){return n.outEdges(o.v,o.w)}))}function br(n,r,e){for(var t=[],o=r[r.length-1],i=r[0],a;n.nodeCount();){for(;a=i.dequeue();)G(n,r,e,a);for(;a=o.dequeue();)G(n,r,e,a);if(n.nodeCount()){for(var u=r.length-2;u>0;--u)if(a=r[u].dequeue(),a){t=t.concat(G(n,r,e,a,!0));break}}}return t}function G(n,r,e,t,o){var i=o?[]:void 0;return s(n.inEdges(t.v),function(a){var u=n.edge(a),d=n.node(a.v);o&&i.push({v:a.v,w:a.w}),d.out-=u,D(r,e,d)}),s(n.outEdges(t.v),function(a){var u=n.edge(a),d=a.w,c=n.node(d);c.in-=u,D(r,e,c)}),n.removeNode(t.v),i}function yr(n,r){var e=new b,t=0,o=0;s(n.nodes(),function(u){e.setNode(u,{v:u,in:0,out:0})}),s(n.edges(),function(u){var d=e.edge(u.v,u.w)||0,c=r(u),f=d+c;e.setEdge(u.v,u.w,f),o=Math.max(o,e.node(u.v).out+=c),t=Math.max(t,e.node(u.w).in+=c)});var i=E(o+t+3).map(function(){return new lr}),a=t+1;return s(e.nodes(),function(u){D(i,a,e.node(u))}),{graph:e,buckets:i,zeroIdx:a}}function D(n,r,e){e.out?e.in?n[e.out-e.in+r].enqueue(e):n[n.length-1].enqueue(e):n[0].enqueue(e)}function xr(n){var r=n.graph().acyclicer==="greedy"?mr(n,e(n)):kr(n);s(r,function(t){var o=n.edge(t);n.removeEdge(t),o.forwardName=t.name,o.reversed=!0,n.setEdge(t.w,t.v,o,K("rev"))});function e(t){return function(o){return t.edge(o).weight}}}function kr(n){var r=[],e={},t={};function o(i){Object.prototype.hasOwnProperty.call(t,i)||(t[i]=!0,e[i]=!0,s(n.outEdges(i),function(a){Object.prototype.hasOwnProperty.call(e,a.w)?r.push(a):o(a.w)}),delete e[i])}return s(n.nodes(),o),r}function Er(n){s(n.edges(),function(r){var e=n.edge(r);if(e.reversed){n.removeEdge(r);var t=e.forwardName;delete e.reversed,delete e.forwardName,n.setEdge(r.w,r.v,e,t)}})}function O(n,r,e,t){var o;do o=K(t);while(n.hasNode(o));return e.dummy=r,n.setNode(o,e),o}function Nr(n){var r=new b().setGraph(n.graph());return s(n.nodes(),function(e){r.setNode(e,n.node(e))}),s(n.edges(),function(e){var t=r.edge(e.v,e.w)||{weight:0,minlen:1},o=n.edge(e);r.setEdge(e.v,e.w,{weight:t.weight+o.weight,minlen:Math.max(t.minlen,o.minlen)})}),r}function mn(n){var r=new b({multigraph:n.isMultigraph()}).setGraph(n.graph());return s(n.nodes(),function(e){n.children(e).length||r.setNode(e,n.node(e))}),s(n.edges(),function(e){r.setEdge(e,n.edge(e))}),r}function en(n,r){var e=n.x,t=n.y,o=r.x-e,i=r.y-t,a=n.width/2,u=n.height/2;if(!o&&!i)throw new Error("Not possible to find intersection inside of the rectangle");var d,c;return Math.abs(i)*a>Math.abs(o)*u?(i<0&&(u=-u),d=u*o/i,c=u):(o<0&&(a=-a),d=a,c=a*i/o),{x:e+d,y:t+c}}function S(n){var r=p(E(bn(n)+1),function(){return[]});return s(n.nodes(),function(e){var t=n.node(e),o=t.rank;m(o)||(r[o][t.order]=e)}),r}function Or(n){var r=I(p(n.nodes(),function(e){return n.node(e).rank}));s(n.nodes(),function(e){var t=n.node(e);ln(t,"rank")&&(t.rank-=r)})}function _r(n){var r=I(p(n.nodes(),function(i){return n.node(i).rank})),e=[];s(n.nodes(),function(i){var a=n.node(i).rank-r;e[a]||(e[a]=[]),e[a].push(i)});var t=0,o=n.graph().nodeRankFactor;s(e,function(i,a){m(i)&&a%o!==0?--t:t&&s(i,function(u){n.node(u).rank+=t})})}function tn(n,r,e,t){var o={width:0,height:0};return arguments.length>=4&&(o.rank=e,o.order=t),O(n,"border",o,r)}function bn(n){return y(p(n.nodes(),function(r){var e=n.node(r).rank;if(!m(e))return e}))}function Ir(n,r){var e={lhs:[],rhs:[]};return s(n,function(t){r(t)?e.lhs.push(t):e.rhs.push(t)}),e}function Pr(n,r){return r()}function Rr(n){function r(e){var t=n.children(e),o=n.node(e);if(t.length&&s(t,r),Object.prototype.hasOwnProperty.call(o,"minRank")){o.borderLeft=[],o.borderRight=[];for(var i=o.minRank,a=o.maxRank+1;i<a;++i)on(n,"borderLeft","_bl",e,o,i),on(n,"borderRight","_br",e,o,i)}}s(n.children(),r)}function on(n,r,e,t,o,i){var a={width:0,height:0,rank:i,borderType:r},u=o[r][i-1],d=O(n,"border",a,e);o[r][i]=d,n.setParent(d,t),u&&n.setEdge(u,d,{weight:1})}function Lr(n){var r=n.graph().rankdir.toLowerCase();(r==="lr"||r==="rl")&&yn(n)}function Mr(n){var r=n.graph().rankdir.toLowerCase();(r==="bt"||r==="rl")&&jr(n),(r==="lr"||r==="rl")&&(Tr(n),yn(n))}function yn(n){s(n.nodes(),function(r){an(n.node(r))}),s(n.edges(),function(r){an(n.edge(r))})}function an(n){var r=n.width;n.width=n.height,n.height=r}function jr(n){s(n.nodes(),function(r){V(n.node(r))}),s(n.edges(),function(r){var e=n.edge(r);s(e.points,V),Object.prototype.hasOwnProperty.call(e,"y")&&V(e)})}function V(n){n.y=-n.y}function Tr(n){s(n.nodes(),function(r){B(n.node(r))}),s(n.edges(),function(r){var e=n.edge(r);s(e.points,B),Object.prototype.hasOwnProperty.call(e,"x")&&B(e)})}function B(n){var r=n.x;n.x=n.y,n.y=r}function Cr(n){n.graph().dummyChains=[],s(n.edges(),function(r){Sr(n,r)})}function Sr(n,r){var e=r.v,t=n.node(e).rank,o=r.w,i=n.node(o).rank,a=r.name,u=n.edge(r),d=u.labelRank;if(i!==t+1){n.removeEdge(r);var c=void 0,f,h;for(h=0,++t;t<i;++h,++t)u.points=[],c={width:0,height:0,edgeLabel:u,edgeObj:r,rank:t},f=O(n,"edge",c,"_d"),t===d&&(c.width=u.width,c.height=u.height,c.dummy="edge-label",c.labelpos=u.labelpos),n.setEdge(e,f,{weight:u.weight},a),h===0&&n.graph().dummyChains.push(f),e=f;n.setEdge(e,o,{weight:u.weight},a)}}function $r(n){s(n.graph().dummyChains,function(r){var e=n.node(r),t=e.edgeLabel,o;for(n.setEdge(e.edgeObj,t);e.dummy;)o=n.successors(r)[0],n.removeNode(r),t.points.push({x:e.x,y:e.y}),e.dummy==="edge-label"&&(t.x=e.x,t.y=e.y,t.width=e.width,t.height=e.height),r=o,e=n.node(r)})}function Q(n){var r={};function e(t){var o=n.node(t);if(Object.prototype.hasOwnProperty.call(r,t))return o.rank;r[t]=!0;var i=I(p(n.outEdges(t),function(a){return e(a.w)-n.edge(a).minlen}));return(i===Number.POSITIVE_INFINITY||i===void 0||i===null)&&(i=0),o.rank=i}s(n.sources(),e)}function P(n,r){return n.node(r.w).rank-n.node(r.v).rank-n.edge(r).minlen}function xn(n){var r=new b({directed:!1}),e=n.nodes()[0],t=n.nodeCount();r.setNode(e,{});for(var o,i;Fr(r,n)<t;)o=Gr(r,n),i=r.hasNode(o.v)?P(n,o):-P(n,o),Vr(r,n,i);return r}function Fr(n,r){function e(t){s(r.nodeEdges(t),function(o){var i=o.v,a=t===i?o.w:i;!n.hasNode(a)&&!P(r,o)&&(n.setNode(a,{}),n.setEdge(t,a,{}),e(a))})}return s(n.nodes(),e),n.nodeCount()}function Gr(n,r){return H(r.edges(),function(e){if(n.hasNode(e.v)!==n.hasNode(e.w))return P(r,e)})}function Vr(n,r,e){s(n.nodes(),function(t){r.node(t).rank+=e})}function kn(n,r,e){wn(r)||(r=[r]);var t=(n.isDirected()?n.successors:n.neighbors).bind(n),o=[],i={};return s(r,function(a){if(!n.hasNode(a))throw new Error("Graph does not have node: "+a);En(n,a,e==="post",i,t,o)}),o}function En(n,r,e,t,o,i){Object.prototype.hasOwnProperty.call(t,r)||(t[r]=!0,e||i.push(r),s(o(r),function(a){En(n,a,e,t,o,i)}),e&&i.push(r))}function Br(n,r){return kn(n,r,"post")}function qr(n,r){return kn(n,r,"pre")}x.initLowLimValues=W;x.initCutValues=Z;x.calcCutValue=Nn;x.leaveEdge=_n;x.enterEdge=In;x.exchangeEdges=Pn;function x(n){n=Nr(n),Q(n);var r=xn(n);W(r),Z(r,n);for(var e,t;e=_n(r);)t=In(r,n,e),Pn(r,n,e,t)}function Z(n,r){var e=Br(n,n.nodes());e=e.slice(0,e.length-1),s(e,function(t){Yr(n,r,t)})}function Yr(n,r,e){var t=n.node(e),o=t.parent;n.edge(e,o).cutvalue=Nn(n,r,e)}function Nn(n,r,e){var t=n.node(e),o=t.parent,i=!0,a=r.edge(e,o),u=0;return a||(i=!1,a=r.edge(o,e)),u=a.weight,s(r.nodeEdges(e),function(d){var c=d.v===e,f=c?d.w:d.v;if(f!==o){var h=c===i,g=r.edge(d).weight;if(u+=h?g:-g,Ar(n,e,f)){var v=n.edge(e,f).cutvalue;u+=h?-v:v}}}),u}function W(n,r){arguments.length<2&&(r=n.nodes()[0]),On(n,{},1,r)}function On(n,r,e,t,o){var i=e,a=n.node(t);return r[t]=!0,s(n.neighbors(t),function(u){Object.prototype.hasOwnProperty.call(r,u)||(e=On(n,r,e,u,t))}),a.low=i,a.lim=e++,o?a.parent=o:delete a.parent,e}function _n(n){return U(n.edges(),function(r){return n.edge(r).cutvalue<0})}function In(n,r,e){var t=e.v,o=e.w;r.hasEdge(t,o)||(t=e.w,o=e.v);var i=n.node(t),a=n.node(o),u=i,d=!1;i.lim>a.lim&&(u=a,d=!0);var c=R(r.edges(),function(f){return d===un(n,n.node(f.v),u)&&d!==un(n,n.node(f.w),u)});return H(c,function(f){return P(r,f)})}function Pn(n,r,e,t){var o=e.v,i=e.w;n.removeEdge(o,i),n.setEdge(t.v,t.w,{}),W(n),Z(n,r),zr(n,r)}function zr(n,r){var e=U(n.nodes(),function(o){return!r.node(o).parent}),t=qr(n,e);t=t.slice(1),s(t,function(o){var i=n.node(o).parent,a=r.edge(o,i),u=!1;a||(a=r.edge(i,o),u=!0),r.node(o).rank=r.node(i).rank+(u?a.minlen:-a.minlen)})}function Ar(n,r,e){return n.hasEdge(r,e)}function un(n,r,e){return e.low<=r.lim&&r.lim<=e.lim}function Dr(n){switch(n.graph().ranker){case"network-simplex":dn(n);break;case"tight-tree":Ur(n);break;case"longest-path":Jr(n);break;default:dn(n)}}var Jr=Q;function Ur(n){Q(n),xn(n)}function dn(n){x(n)}function Hr(n){var r=O(n,"root",{},"_root"),e=Kr(n),t=y(k(e))-1,o=2*t+1;n.graph().nestingRoot=r,s(n.edges(),function(a){n.edge(a).minlen*=o});var i=Qr(n)+1;s(n.children(),function(a){Rn(n,r,o,i,t,e,a)}),n.graph().nodeRankFactor=o}function Rn(n,r,e,t,o,i,a){var u=n.children(a);if(!u.length){a!==r&&n.setEdge(r,a,{weight:0,minlen:e});return}var d=tn(n,"_bt"),c=tn(n,"_bb"),f=n.node(a);n.setParent(d,a),f.borderTop=d,n.setParent(c,a),f.borderBottom=c,s(u,function(h){Rn(n,r,e,t,o,i,h);var g=n.node(h),v=g.borderTop?g.borderTop:h,l=g.borderBottom?g.borderBottom:h,w=g.borderTop?t:2*t,_=v!==l?1:o-i[a]+1;n.setEdge(d,v,{weight:w,minlen:_,nestingEdge:!0}),n.setEdge(l,c,{weight:w,minlen:_,nestingEdge:!0})}),n.parent(a)||n.setEdge(r,d,{weight:0,minlen:o+i[a]})}function Kr(n){var r={};function e(t,o){var i=n.children(t);i&&i.length&&s(i,function(a){e(a,o+1)}),r[t]=o}return s(n.children(),function(t){e(t,1)}),r}function Qr(n){return T(n.edges(),function(r,e){return r+n.edge(e).weight},0)}function Zr(n){var r=n.graph();n.removeNode(r.nestingRoot),delete r.nestingRoot,s(n.edges(),function(e){var t=n.edge(e);t.nestingEdge&&n.removeEdge(e)})}function Wr(n,r,e){var t={},o;s(e,function(i){for(var a=n.parent(i),u,d;a;){if(u=n.parent(a),u?(d=t[u],t[u]=a):(d=o,o=a),d&&d!==a){r.setEdge(d,a);return}a=u}})}function Xr(n,r,e){var t=ne(n),o=new b({compound:!0}).setGraph({root:t}).setDefaultNodeLabel(function(i){return n.node(i)});return s(n.nodes(),function(i){var a=n.node(i),u=n.parent(i);(a.rank===r||a.minRank<=r&&r<=a.maxRank)&&(o.setNode(i),o.setParent(i,u||t),s(n[e](i),function(d){var c=d.v===i?d.w:d.v,f=o.edge(c,i),h=m(f)?0:f.weight;o.setEdge(c,i,{weight:n.edge(d).weight+h})}),Object.prototype.hasOwnProperty.call(a,"minRank")&&o.setNode(i,{borderLeft:a.borderLeft[r],borderRight:a.borderRight[r]}))}),o}function ne(n){for(var r;n.hasNode(r=K("_root")););return r}function re(n,r){for(var e=0,t=1;t<r.length;++t)e+=ee(n,r[t-1],r[t]);return e}function ee(n,r,e){for(var t=vr(e,p(e,function(c,f){return f})),o=N(p(r,function(c){return L(p(n.outEdges(c),function(f){return{pos:t[f.w],weight:n.edge(f).weight}}),"pos")})),i=1;i<e.length;)i<<=1;var a=2*i-1;i-=1;var u=p(new Array(a),function(){return 0}),d=0;return s(o.forEach(function(c){var f=c.pos+i;u[f]+=c.weight;for(var h=0;f>0;)f%2&&(h+=u[f+1]),f=f-1>>1,u[f]+=c.weight;d+=c.weight*h})),d}function te(n){var r={},e=R(n.nodes(),function(u){return!n.children(u).length}),t=y(p(e,function(u){return n.node(u).rank})),o=p(E(t+1),function(){return[]});function i(u){if(!ln(r,u)){r[u]=!0;var d=n.node(u);o[d.rank].push(u),s(n.successors(u),i)}}var a=L(e,function(u){return n.node(u).rank});return s(a,i),o}function oe(n,r){return p(r,function(e){var t=n.inEdges(e);if(t.length){var o=T(t,function(i,a){var u=n.edge(a),d=n.node(a.v);return{sum:i.sum+u.weight*d.order,weight:i.weight+u.weight}},{sum:0,weight:0});return{v:e,barycenter:o.sum/o.weight,weight:o.weight}}else return{v:e}})}function ie(n,r){var e={};s(n,function(o,i){var a=e[o.v]={indegree:0,in:[],out:[],vs:[o.v],i};m(o.barycenter)||(a.barycenter=o.barycenter,a.weight=o.weight)}),s(r.edges(),function(o){var i=e[o.v],a=e[o.w];!m(i)&&!m(a)&&(a.indegree++,i.out.push(e[o.w]))});var t=R(e,function(o){return!o.indegree});return ae(t)}function ae(n){var r=[];function e(i){return function(a){a.merged||(m(a.barycenter)||m(i.barycenter)||a.barycenter>=i.barycenter)&&ue(i,a)}}function t(i){return function(a){a.in.push(i),--a.indegree===0&&n.push(a)}}for(;n.length;){var o=n.pop();r.push(o),s(o.in.reverse(),e(o)),s(o.out,t(o))}return p(R(r,function(i){return!i.merged}),function(i){return j(i,["vs","i","barycenter","weight"])})}function ue(n,r){var e=0,t=0;n.weight&&(e+=n.barycenter*n.weight,t+=n.weight),r.weight&&(e+=r.barycenter*r.weight,t+=r.weight),n.vs=r.vs.concat(n.vs),n.barycenter=e/t,n.weight=t,n.i=Math.min(r.i,n.i),r.merged=!0}function de(n,r){var e=Ir(n,function(f){return Object.prototype.hasOwnProperty.call(f,"barycenter")}),t=e.lhs,o=L(e.rhs,function(f){return-f.i}),i=[],a=0,u=0,d=0;t.sort(ce(!!r)),d=cn(i,o,d),s(t,function(f){d+=f.vs.length,i.push(f.vs),a+=f.barycenter*f.weight,u+=f.weight,d=cn(i,o,d)});var c={vs:N(i)};return u&&(c.barycenter=a/u,c.weight=u),c}function cn(n,r,e){for(var t;r.length&&(t=M(r)).i<=e;)r.pop(),n.push(t.vs),e++;return e}function ce(n){return function(r,e){return r.barycenter<e.barycenter?-1:r.barycenter>e.barycenter?1:n?e.i-r.i:r.i-e.i}}function Ln(n,r,e,t){var o=n.children(r),i=n.node(r),a=i?i.borderLeft:void 0,u=i?i.borderRight:void 0,d={};a&&(o=R(o,function(l){return l!==a&&l!==u}));var c=oe(n,o);s(c,function(l){if(n.children(l.v).length){var w=Ln(n,l.v,e,t);d[l.v]=w,Object.prototype.hasOwnProperty.call(w,"barycenter")&&fe(l,w)}});var f=ie(c,e);se(f,d);var h=de(f,t);if(a&&(h.vs=N([a,h.vs,u]),n.predecessors(a).length)){var g=n.node(n.predecessors(a)[0]),v=n.node(n.predecessors(u)[0]);Object.prototype.hasOwnProperty.call(h,"barycenter")||(h.barycenter=0,h.weight=0),h.barycenter=(h.barycenter*h.weight+g.order+v.order)/(h.weight+2),h.weight+=2}return h}function se(n,r){s(n,function(e){e.vs=N(e.vs.map(function(t){return r[t]?r[t].vs:t}))})}function fe(n,r){m(n.barycenter)?(n.barycenter=r.barycenter,n.weight=r.weight):(n.barycenter=(n.barycenter*n.weight+r.barycenter*r.weight)/(n.weight+r.weight),n.weight+=r.weight)}function he(n){var r=bn(n),e=sn(n,E(1,r+1),"inEdges"),t=sn(n,E(r-1,-1,-1),"outEdges"),o=te(n);fn(n,o);for(var i=Number.POSITIVE_INFINITY,a,u=0,d=0;d<4;++u,++d){ge(u%2?e:t,u%4>=2),o=S(n);var c=re(n,o);c<i&&(d=0,a=Xn(o),i=c)}fn(n,a)}function sn(n,r,e){return p(r,function(t){return Xr(n,t,e)})}function ge(n,r){var e=new b;s(n,function(t){var o=t.graph().root,i=Ln(t,o,e,r);s(i.vs,function(a,u){t.node(a).order=u}),Wr(t,e,i.vs)})}function fn(n,r){s(r,function(e){s(e,function(t,o){n.node(t).order=o})})}function ve(n){var r=pe(n);s(n.graph().dummyChains,function(e){for(var t=n.node(e),o=t.edgeObj,i=le(n,r,o.v,o.w),a=i.path,u=i.lca,d=0,c=a[d],f=!0;e!==o.w;){if(t=n.node(e),f){for(;(c=a[d])!==u&&n.node(c).maxRank<t.rank;)d++;c===u&&(f=!1)}if(!f){for(;d<a.length-1&&n.node(c=a[d+1]).minRank<=t.rank;)d++;c=a[d]}n.setParent(e,c),e=n.successors(e)[0]}})}function le(n,r,e,t){var o=[],i=[],a=Math.min(r[e].low,r[t].low),u=Math.max(r[e].lim,r[t].lim),d,c;d=e;do d=n.parent(d),o.push(d);while(d&&(r[d].low>a||u>r[d].lim));for(c=d,d=t;(d=n.parent(d))!==c;)i.push(d);return{path:o.concat(i.reverse()),lca:c}}function pe(n){var r={},e=0;function t(o){var i=e;s(n.children(o),t),r[o]={low:i,lim:e++}}return s(n.children(),t),r}function we(n,r){var e={};function t(o,i){var a=0,u=0,d=o.length,c=M(i);return s(i,function(f,h){var g=be(n,f),v=g?n.node(g).order:d;(g||f===c)&&(s(i.slice(u,h+1),function(l){s(n.predecessors(l),function(w){var _=n.node(w),X=_.order;(X<a||v<X)&&!(_.dummy&&n.node(l).dummy)&&Mn(e,w,l)})}),u=h+1,a=v)}),i}return T(r,t),e}function me(n,r){var e={};function t(i,a,u,d,c){var f;s(E(a,u),function(h){f=i[h],n.node(f).dummy&&s(n.predecessors(f),function(g){var v=n.node(g);v.dummy&&(v.order<d||v.order>c)&&Mn(e,g,f)})})}function o(i,a){var u=-1,d,c=0;return s(a,function(f,h){if(n.node(f).dummy==="border"){var g=n.predecessors(f);g.length&&(d=n.node(g[0]).order,t(a,c,h,u,d),c=h,u=d)}t(a,c,a.length,d,i.length)}),a}return T(r,o),e}function be(n,r){if(n.node(r).dummy)return U(n.predecessors(r),function(e){return n.node(e).dummy})}function Mn(n,r,e){if(r>e){var t=r;r=e,e=t}var o=n[r];o||(n[r]=o={}),o[e]=!0}function ye(n,r,e){if(r>e){var t=r;r=e,e=t}return!!n[r]&&Object.prototype.hasOwnProperty.call(n[r],e)}function xe(n,r,e,t){var o={},i={},a={};return s(r,function(u){s(u,function(d,c){o[d]=d,i[d]=d,a[d]=c})}),s(r,function(u){var d=-1;s(u,function(c){var f=t(c);if(f.length){f=L(f,function(w){return a[w]});for(var h=(f.length-1)/2,g=Math.floor(h),v=Math.ceil(h);g<=v;++g){var l=f[g];i[c]===c&&d<a[l]&&!ye(e,c,l)&&(i[l]=c,i[c]=o[c]=o[l],d=a[l])}}})}),{root:o,align:i}}function ke(n,r,e,t,o){var i={},a=Ee(n,r,e,o),u=o?"borderLeft":"borderRight";function d(h,g){for(var v=a.nodes(),l=v.pop(),w={};l;)w[l]?h(l):(w[l]=!0,v.push(l),v=v.concat(g(l))),l=v.pop()}function c(h){i[h]=a.inEdges(h).reduce(function(g,v){return Math.max(g,i[v.v]+a.edge(v))},0)}function f(h){var g=a.outEdges(h).reduce(function(l,w){return Math.min(l,i[w.w]-a.edge(w))},Number.POSITIVE_INFINITY),v=n.node(h);g!==Number.POSITIVE_INFINITY&&v.borderType!==u&&(i[h]=Math.max(i[h],g))}return d(c,a.predecessors.bind(a)),d(f,a.successors.bind(a)),s(t,function(h){i[h]=i[e[h]]}),i}function Ee(n,r,e,t){var o=new b,i=n.graph(),a=Pe(i.nodesep,i.edgesep,t);return s(r,function(u){var d;s(u,function(c){var f=e[c];if(o.setNode(f),d){var h=e[d],g=o.edge(h,f);o.setEdge(h,f,Math.max(a(n,c,d),g||0))}d=c})}),o}function Ne(n,r){return H(k(r),function(e){var t=Number.NEGATIVE_INFINITY,o=Number.POSITIVE_INFINITY;return nr(e,function(i,a){var u=Re(n,a)/2;t=Math.max(i+u,t),o=Math.min(i-u,o)}),t-o})}function Oe(n,r){var e=k(r),t=I(e),o=y(e);s(["u","d"],function(i){s(["l","r"],function(a){var u=i+a,d=n[u],c;if(d!==r){var f=k(d);c=a==="l"?t-I(f):o-y(f),c&&(n[u]=C(d,function(h){return h+c}))}})})}function _e(n,r){return C(n.ul,function(e,t){if(r)return n[r.toLowerCase()][t];var o=L(p(n,t));return(o[1]+o[2])/2})}function Ie(n){var r=S(n),e=A(we(n,r),me(n,r)),t={},o;s(["u","d"],function(a){o=a==="u"?r:k(r).reverse(),s(["l","r"],function(u){u==="r"&&(o=p(o,function(h){return k(h).reverse()}));var d=(a==="u"?n.predecessors:n.successors).bind(n),c=xe(n,o,e,d),f=ke(n,o,c.root,c.align,u==="r");u==="r"&&(f=C(f,function(h){return-h})),t[a+u]=f})});var i=Ne(n,t);return Oe(t,i),_e(t,n.graph().align)}function Pe(n,r,e){return function(t,o,i){var a=t.node(o),u=t.node(i),d=0,c;if(d+=a.width/2,Object.prototype.hasOwnProperty.call(a,"labelpos"))switch(a.labelpos.toLowerCase()){case"l":c=-a.width/2;break;case"r":c=a.width/2;break}if(c&&(d+=e?c:-c),c=0,d+=(a.dummy?r:n)/2,d+=(u.dummy?r:n)/2,d+=u.width/2,Object.prototype.hasOwnProperty.call(u,"labelpos"))switch(u.labelpos.toLowerCase()){case"l":c=u.width/2;break;case"r":c=-u.width/2;break}return c&&(d+=e?c:-c),c=0,d}}function Re(n,r){return n.node(r).width}function Le(n){n=mn(n),Me(n),rr(Ie(n),function(r,e){n.node(e).x=r})}function Me(n){var r=S(n),e=n.graph().ranksep,t=0;s(r,function(o){var i=y(p(o,function(a){return n.node(a).height}));s(o,function(a){n.node(a).y=t+i/2}),t+=i+e})}function it(n,r){var e=Pr;e("layout",()=>{var t=e("  buildLayoutGraph",()=>Ye(n));e("  runLayout",()=>je(t,e)),e("  updateInputGraph",()=>Te(n,t))})}function je(n,r){r("    makeSpaceForEdgeLabels",()=>ze(n)),r("    removeSelfEdges",()=>We(n)),r("    acyclic",()=>xr(n)),r("    nestingGraph.run",()=>Hr(n)),r("    rank",()=>Dr(mn(n))),r("    injectEdgeLabelProxies",()=>Ae(n)),r("    removeEmptyRanks",()=>_r(n)),r("    nestingGraph.cleanup",()=>Zr(n)),r("    normalizeRanks",()=>Or(n)),r("    assignRankMinMax",()=>De(n)),r("    removeEdgeLabelProxies",()=>Je(n)),r("    normalize.run",()=>Cr(n)),r("    parentDummyChains",()=>ve(n)),r("    addBorderSegments",()=>Rr(n)),r("    order",()=>he(n)),r("    insertSelfEdges",()=>Xe(n)),r("    adjustCoordinateSystem",()=>Lr(n)),r("    position",()=>Le(n)),r("    positionSelfEdges",()=>nt(n)),r("    removeBorderNodes",()=>Ze(n)),r("    normalize.undo",()=>$r(n)),r("    fixupEdgeLabelCoords",()=>Ke(n)),r("    undoCoordinateSystem",()=>Mr(n)),r("    translateGraph",()=>Ue(n)),r("    assignNodeIntersects",()=>He(n)),r("    reversePoints",()=>Qe(n)),r("    acyclic.undo",()=>Er(n))}function Te(n,r){s(n.nodes(),function(e){var t=n.node(e),o=r.node(e);t&&(t.x=o.x,t.y=o.y,r.children(e).length&&(t.width=o.width,t.height=o.height))}),s(n.edges(),function(e){var t=n.edge(e),o=r.edge(e);t.points=o.points,Object.prototype.hasOwnProperty.call(o,"x")&&(t.x=o.x,t.y=o.y)}),n.graph().width=r.graph().width,n.graph().height=r.graph().height}var Ce=["nodesep","edgesep","ranksep","marginx","marginy"],Se={ranksep:50,edgesep:20,nodesep:50,rankdir:"tb"},$e=["acyclicer","ranker","rankdir","align"],Fe=["width","height"],Ge={width:0,height:0},Ve=["minlen","weight","width","height","labeloffset"],Be={minlen:1,weight:1,width:0,height:0,labeloffset:10,labelpos:"r"},qe=["labelpos"];function Ye(n){var r=new b({multigraph:!0,compound:!0}),e=Y(n.graph());return r.setGraph(A({},Se,q(e,Ce),j(e,$e))),s(n.nodes(),function(t){var o=Y(n.node(t));r.setNode(t,Vn(q(o,Fe),Ge)),r.setParent(t,n.parent(t))}),s(n.edges(),function(t){var o=Y(n.edge(t));r.setEdge(t,A({},Be,q(o,Ve),j(o,qe)))}),r}function ze(n){var r=n.graph();r.ranksep/=2,s(n.edges(),function(e){var t=n.edge(e);t.minlen*=2,t.labelpos.toLowerCase()!=="c"&&(r.rankdir==="TB"||r.rankdir==="BT"?t.width+=t.labeloffset:t.height+=t.labeloffset)})}function Ae(n){s(n.edges(),function(r){var e=n.edge(r);if(e.width&&e.height){var t=n.node(r.v),o=n.node(r.w),i={rank:(o.rank-t.rank)/2+t.rank,e:r};O(n,"edge-proxy",i,"_ep")}})}function De(n){var r=0;s(n.nodes(),function(e){var t=n.node(e);t.borderTop&&(t.minRank=n.node(t.borderTop).rank,t.maxRank=n.node(t.borderBottom).rank,r=y(r,t.maxRank))}),n.graph().maxRank=r}function Je(n){s(n.nodes(),function(r){var e=n.node(r);e.dummy==="edge-proxy"&&(n.edge(e.e).labelRank=e.rank,n.removeNode(r))})}function Ue(n){var r=Number.POSITIVE_INFINITY,e=0,t=Number.POSITIVE_INFINITY,o=0,i=n.graph(),a=i.marginx||0,u=i.marginy||0;function d(c){var f=c.x,h=c.y,g=c.width,v=c.height;r=Math.min(r,f-g/2),e=Math.max(e,f+g/2),t=Math.min(t,h-v/2),o=Math.max(o,h+v/2)}s(n.nodes(),function(c){d(n.node(c))}),s(n.edges(),function(c){var f=n.edge(c);Object.prototype.hasOwnProperty.call(f,"x")&&d(f)}),r-=a,t-=u,s(n.nodes(),function(c){var f=n.node(c);f.x-=r,f.y-=t}),s(n.edges(),function(c){var f=n.edge(c);s(f.points,function(h){h.x-=r,h.y-=t}),Object.prototype.hasOwnProperty.call(f,"x")&&(f.x-=r),Object.prototype.hasOwnProperty.call(f,"y")&&(f.y-=t)}),i.width=e-r+a,i.height=o-t+u}function He(n){s(n.edges(),function(r){var e=n.edge(r),t=n.node(r.v),o=n.node(r.w),i,a;e.points?(i=e.points[0],a=e.points[e.points.length-1]):(e.points=[],i=o,a=t),e.points.unshift(en(t,i)),e.points.push(en(o,a))})}function Ke(n){s(n.edges(),function(r){var e=n.edge(r);if(Object.prototype.hasOwnProperty.call(e,"x"))switch((e.labelpos==="l"||e.labelpos==="r")&&(e.width-=e.labeloffset),e.labelpos){case"l":e.x-=e.width/2+e.labeloffset;break;case"r":e.x+=e.width/2+e.labeloffset;break}})}function Qe(n){s(n.edges(),function(r){var e=n.edge(r);e.reversed&&e.points.reverse()})}function Ze(n){s(n.nodes(),function(r){if(n.children(r).length){var e=n.node(r),t=n.node(e.borderTop),o=n.node(e.borderBottom),i=n.node(M(e.borderLeft)),a=n.node(M(e.borderRight));e.width=Math.abs(a.x-i.x),e.height=Math.abs(o.y-t.y),e.x=i.x+e.width/2,e.y=t.y+e.height/2}}),s(n.nodes(),function(r){n.node(r).dummy==="border"&&n.removeNode(r)})}function We(n){s(n.edges(),function(r){if(r.v===r.w){var e=n.node(r.v);e.selfEdges||(e.selfEdges=[]),e.selfEdges.push({e:r,label:n.edge(r)}),n.removeEdge(r)}})}function Xe(n){var r=S(n);s(r,function(e){var t=0;s(e,function(o,i){var a=n.node(o);a.order=i+t,s(a.selfEdges,function(u){O(n,"selfedge",{width:u.label.width,height:u.label.height,rank:a.rank,order:i+ ++t,e:u.e,label:u.label},"_se")}),delete a.selfEdges})})}function nt(n){s(n.nodes(),function(r){var e=n.node(r);if(e.dummy==="selfedge"){var t=n.node(e.e.v),o=t.x+t.width/2,i=t.y,a=e.x-o,u=t.height/2;n.setEdge(e.e,e.label),n.removeNode(r),e.label.points=[{x:o+2*a/3,y:i-u},{x:o+5*a/6,y:i-u},{x:o+a,y:i},{x:o+5*a/6,y:i+u},{x:o+2*a/3,y:i+u}],e.label.x=e.x,e.label.y=e.y}})}function q(n,r){return C(j(n,r),Number)}function Y(n){var r={};return s(n,function(e,t){r[t.toLowerCase()]=e}),r}export{it as o};