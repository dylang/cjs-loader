"use strict";var S=require("path"),y=require("fs"),F=require("module"),r=require("@esbuild-kit/core-utils"),i=require("get-tsconfig");function f(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var m=f(S),N=f(y),u=f(F);const P=/^\.{0,2}\//,E=/\.[cm]?tsx?$/,O=`${m.default.sep}node_modules${m.default.sep}`,l=process.env.ESBK_TSCONFIG_PATH?{path:process.env.ESBK_TSCONFIG_PATH,config:i.parseTsconfig(process.env.ESBK_TSCONFIG_PATH)}:i.getTsconfig(),b=l==null?void 0:l.config,_=l&&i.createPathsMatcher(l),h=r.installSourceMapSupport(),j=r.compareNodeVersion([13,2,0])>=0||r.compareNodeVersion([12,20,0])>=0&&r.compareNodeVersion([13,0,0])<0;function v(e,s){process.send&&process.send({type:"dependency",path:s});let t=N.default.readFileSync(s,"utf8");if(s.endsWith(".cjs")&&j){const o=r.transformDynamicImport(t);o&&(t=r.applySourceMap(o,s,h))}else{const o=r.transformSync(t,s,{tsconfigRaw:b});t=r.applySourceMap(o,s,h)}e._compile(t,s)}const T=u.default._extensions;[".js",".ts",".tsx",".jsx"].forEach(e=>{T[e]=v}),Object.defineProperty(T,".mjs",{value:v,enumerable:!1});const x=r.compareNodeVersion([16,0,0])>=0||r.compareNodeVersion([14,18,0])>=0,d=u.default._resolveFilename;u.default._resolveFilename=function(e,s,t,o){if(!x&&e.startsWith("node:")&&(e=e.slice(5)),_&&!P.test(e)&&!(s!=null&&s.filename.includes(O))){const a=_(e);for(const n of a){const p=g.call(this,n,s,t,o);if(p)return p;try{return d.call(this,n,s,t,o)}catch{}}}const c=g.call(this,e,s,t,o);return c||d.call(this,e,s,t,o)};function g(e,s,t,o){const c=r.resolveTsPath(e);if(s&&E.test(s.filename)&&c)try{return d.call(this,c,s,t,o)}catch(a){const{code:n}=a;if(n!=="MODULE_NOT_FOUND"&&n!=="ERR_PACKAGE_PATH_NOT_EXPORTED")throw a}}
