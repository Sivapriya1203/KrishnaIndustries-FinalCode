import{P as p,r as f,ak as ee,j as z,T as dr,h as gr,a6 as mr,a9 as yr,al as vr,am as br,c as hr,d as Dr}from"./index-14iq4arv.js";function M(e,r,t,n){function i(o){return o instanceof t?o:new t(function(u){u(o)})}return new(t||(t=Promise))(function(o,u){function l(d){try{s(n.next(d))}catch(v){u(v)}}function m(d){try{s(n.throw(d))}catch(v){u(v)}}function s(d){d.done?o(d.value):i(d.value).then(l,m)}s((n=n.apply(e,r||[])).next())})}function L(e,r){var t={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,i,o,u;return u={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(u[Symbol.iterator]=function(){return this}),u;function l(s){return function(d){return m([s,d])}}function m(s){if(n)throw new TypeError("Generator is already executing.");for(;u&&(u=0,s[0]&&(t=0)),t;)try{if(n=1,i&&(o=s[0]&2?i.return:s[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,s[1])).done)return o;switch(i=0,o&&(s=[s[0]&2,o.value]),s[0]){case 0:case 1:o=s;break;case 4:return t.label++,{value:s[1],done:!1};case 5:t.label++,i=s[1],s=[0];continue;case 7:s=t.ops.pop(),t.trys.pop();continue;default:if(o=t.trys,!(o=o.length>0&&o[o.length-1])&&(s[0]===6||s[0]===2)){t=0;continue}if(s[0]===3&&(!o||s[1]>o[0]&&s[1]<o[3])){t.label=s[1];break}if(s[0]===6&&t.label<o[1]){t.label=o[1],o=s;break}if(o&&t.label<o[2]){t.label=o[2],t.ops.push(s);break}o[2]&&t.ops.pop(),t.trys.pop();continue}s=r.call(e,t)}catch(d){s=[6,d],i=0}finally{n=o=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}}function Le(e,r){var t=typeof Symbol=="function"&&e[Symbol.iterator];if(!t)return e;var n=t.call(e),i,o=[],u;try{for(;(r===void 0||r-- >0)&&!(i=n.next()).done;)o.push(i.value)}catch(l){u={error:l}}finally{try{i&&!i.done&&(t=n.return)&&t.call(n)}finally{if(u)throw u.error}}return o}function $e(e,r,t){if(t||arguments.length===2)for(var n=0,i=r.length,o;n<i;n++)(o||!(n in r))&&(o||(o=Array.prototype.slice.call(r,0,n)),o[n]=r[n]);return e.concat(o||Array.prototype.slice.call(r))}var Ar=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]);function B(e,r){var t=Er(e);if(typeof t.path!="string"){var n=e.webkitRelativePath;Object.defineProperty(t,"path",{value:typeof r=="string"?r:typeof n=="string"&&n.length>0?n:e.name,writable:!1,configurable:!1,enumerable:!0})}return t}function Er(e){var r=e.name,t=r&&r.lastIndexOf(".")!==-1;if(t&&!e.type){var n=r.split(".").pop().toLowerCase(),i=Ar.get(n);i&&Object.defineProperty(e,"type",{value:i,writable:!1,configurable:!1,enumerable:!0})}return e}var wr=[".DS_Store","Thumbs.db"];function xr(e){return M(this,void 0,void 0,function(){return L(this,function(r){return re(e)&&Or(e.dataTransfer)?[2,_r(e.dataTransfer,e.type)]:Fr(e)?[2,Sr(e)]:Array.isArray(e)&&e.every(function(t){return"getFile"in t&&typeof t.getFile=="function"})?[2,jr(e)]:[2,[]]})})}function Or(e){return re(e)}function Fr(e){return re(e)&&re(e.target)}function re(e){return typeof e=="object"&&e!==null}function Sr(e){return be(e.target.files).map(function(r){return B(r)})}function jr(e){return M(this,void 0,void 0,function(){var r;return L(this,function(t){switch(t.label){case 0:return[4,Promise.all(e.map(function(n){return n.getFile()}))];case 1:return r=t.sent(),[2,r.map(function(n){return B(n)})]}})})}function _r(e,r){return M(this,void 0,void 0,function(){var t,n;return L(this,function(i){switch(i.label){case 0:return e.items?(t=be(e.items).filter(function(o){return o.kind==="file"}),r!=="drop"?[2,t]:[4,Promise.all(t.map(Pr))]):[3,2];case 1:return n=i.sent(),[2,Ke(Qe(n))];case 2:return[2,Ke(be(e.files).map(function(o){return B(o)}))]}})})}function Ke(e){return e.filter(function(r){return wr.indexOf(r.name)===-1})}function be(e){if(e===null)return[];for(var r=[],t=0;t<e.length;t++){var n=e[t];r.push(n)}return r}function Pr(e){if(typeof e.webkitGetAsEntry!="function")return He(e);var r=e.webkitGetAsEntry();return r&&r.isDirectory?Ve(r):He(e)}function Qe(e){return e.reduce(function(r,t){return $e($e([],Le(r),!1),Le(Array.isArray(t)?Qe(t):[t]),!1)},[])}function He(e){var r=e.getAsFile();if(!r)return Promise.reject("".concat(e," is not a File"));var t=B(r);return Promise.resolve(t)}function Cr(e){return M(this,void 0,void 0,function(){return L(this,function(r){return[2,e.isDirectory?Ve(e):Tr(e)]})})}function Ve(e){var r=e.createReader();return new Promise(function(t,n){var i=[];function o(){var u=this;r.readEntries(function(l){return M(u,void 0,void 0,function(){var m,s,d;return L(this,function(v){switch(v.label){case 0:if(l.length)return[3,5];v.label=1;case 1:return v.trys.push([1,3,,4]),[4,Promise.all(i)];case 2:return m=v.sent(),t(m),[3,4];case 3:return s=v.sent(),n(s),[3,4];case 4:return[3,6];case 5:d=Promise.all(l.map(Cr)),i.push(d),o(),v.label=6;case 6:return[2]}})})},function(l){n(l)})}o()})}function Tr(e){return M(this,void 0,void 0,function(){return L(this,function(r){return[2,new Promise(function(t,n){e.file(function(i){var o=B(i,e.fullPath);t(o)},function(i){n(i)})})]})})}var kr=function(e,r){if(e&&r){var t=Array.isArray(r)?r:r.split(","),n=e.name||"",i=(e.type||"").toLowerCase(),o=i.replace(/\/.*$/,"");return t.some(function(u){var l=u.trim().toLowerCase();return l.charAt(0)==="."?n.toLowerCase().endsWith(l):l.endsWith("/*")?o===l.replace(/\/.*$/,""):i===l})}return!0};function We(e){return zr(e)||Rr(e)||Ze(e)||Ir()}function Ir(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Rr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function zr(e){if(Array.isArray(e))return he(e)}function Be(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),t.push.apply(t,n)}return t}function Ne(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?arguments[r]:{};r%2?Be(Object(t),!0).forEach(function(n){Xe(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Be(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function Xe(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function W(e,r){return $r(e)||Lr(e,r)||Ze(e,r)||Mr()}function Mr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ze(e,r){if(e){if(typeof e=="string")return he(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return he(e,r)}}function he(e,r){(r==null||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function Lr(e,r){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var n=[],i=!0,o=!1,u,l;try{for(t=t.call(e);!(i=(u=t.next()).done)&&(n.push(u.value),!(r&&n.length===r));i=!0);}catch(m){o=!0,l=m}finally{try{!i&&t.return!=null&&t.return()}finally{if(o)throw l}}return n}}function $r(e){if(Array.isArray(e))return e}var Kr="file-invalid-type",Hr="file-too-large",Wr="file-too-small",Br="too-many-files",Nr=function(r){r=Array.isArray(r)&&r.length===1?r[0]:r;var t=Array.isArray(r)?"one of ".concat(r.join(", ")):r;return{code:Kr,message:"File type must be ".concat(t)}},Ge=function(r){return{code:Hr,message:"File is larger than ".concat(r," ").concat(r===1?"byte":"bytes")}},Ue=function(r){return{code:Wr,message:"File is smaller than ".concat(r," ").concat(r===1?"byte":"bytes")}},Gr={code:Br,message:"Too many files"};function er(e,r){var t=e.type==="application/x-moz-file"||kr(e,r);return[t,t?null:Nr(r)]}function rr(e,r,t){if(C(e.size))if(C(r)&&C(t)){if(e.size>t)return[!1,Ge(t)];if(e.size<r)return[!1,Ue(r)]}else{if(C(r)&&e.size<r)return[!1,Ue(r)];if(C(t)&&e.size>t)return[!1,Ge(t)]}return[!0,null]}function C(e){return e!=null}function Ur(e){var r=e.files,t=e.accept,n=e.minSize,i=e.maxSize,o=e.multiple,u=e.maxFiles,l=e.validator;return!o&&r.length>1||o&&u>=1&&r.length>u?!1:r.every(function(m){var s=er(m,t),d=W(s,1),v=d[0],O=rr(m,n,i),S=W(O,1),j=S[0],F=l?l(m):null;return v&&j&&!F})}function te(e){return typeof e.isPropagationStopped=="function"?e.isPropagationStopped():typeof e.cancelBubble<"u"?e.cancelBubble:!1}function Z(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,function(r){return r==="Files"||r==="application/x-moz-file"}):!!e.target&&!!e.target.files}function Ye(e){e.preventDefault()}function Yr(e){return e.indexOf("MSIE")!==-1||e.indexOf("Trident/")!==-1}function qr(e){return e.indexOf("Edge/")!==-1}function Jr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.navigator.userAgent;return Yr(e)||qr(e)}function x(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return function(n){for(var i=arguments.length,o=new Array(i>1?i-1:0),u=1;u<i;u++)o[u-1]=arguments[u];return r.some(function(l){return!te(n)&&l&&l.apply(void 0,[n].concat(o)),te(n)})}}function Qr(){return"showOpenFilePicker"in window}function Vr(e){if(C(e)){var r=Object.entries(e).filter(function(t){var n=W(t,2),i=n[0],o=n[1],u=!0;return tr(i)||(console.warn('Skipped "'.concat(i,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),u=!1),(!Array.isArray(o)||!o.every(nr))&&(console.warn('Skipped "'.concat(i,'" because an invalid file extension was provided.')),u=!1),u}).reduce(function(t,n){var i=W(n,2),o=i[0],u=i[1];return Ne(Ne({},t),{},Xe({},o,u))},{});return[{description:"Files",accept:r}]}return e}function Xr(e){if(C(e))return Object.entries(e).reduce(function(r,t){var n=W(t,2),i=n[0],o=n[1];return[].concat(We(r),[i],We(o))},[]).filter(function(r){return tr(r)||nr(r)}).join(",")}function Zr(e){return e instanceof DOMException&&(e.name==="AbortError"||e.code===e.ABORT_ERR)}function et(e){return e instanceof DOMException&&(e.name==="SecurityError"||e.code===e.SECURITY_ERR)}function tr(e){return e==="audio/*"||e==="video/*"||e==="image/*"||e==="text/*"||/\w+\/[-+.\w]+/g.test(e)}function nr(e){return/^.*\.[\w]+$/.test(e)}var rt=["children"],tt=["open"],nt=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],ot=["refKey","onChange","onClick"];function it(e){return ut(e)||ct(e)||or(e)||at()}function at(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ct(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ut(e){if(Array.isArray(e))return De(e)}function ve(e,r){return ft(e)||lt(e,r)||or(e,r)||st()}function st(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function or(e,r){if(e){if(typeof e=="string")return De(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return De(e,r)}}function De(e,r){(r==null||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function lt(e,r){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var n=[],i=!0,o=!1,u,l;try{for(t=t.call(e);!(i=(u=t.next()).done)&&(n.push(u.value),!(r&&n.length===r));i=!0);}catch(m){o=!0,l=m}finally{try{!i&&t.return!=null&&t.return()}finally{if(o)throw l}}return n}}function ft(e){if(Array.isArray(e))return e}function qe(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),t.push.apply(t,n)}return t}function g(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?arguments[r]:{};r%2?qe(Object(t),!0).forEach(function(n){Ae(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):qe(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function Ae(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function ne(e,r){if(e==null)return{};var t=pt(e,r),n,i;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],!(r.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}function pt(e,r){if(e==null)return{};var t={},n=Object.keys(e),i,o;for(o=0;o<n.length;o++)i=n[o],!(r.indexOf(i)>=0)&&(t[i]=e[i]);return t}var we=f.forwardRef(function(e,r){var t=e.children,n=ne(e,rt),i=ar(n),o=i.open,u=ne(i,tt);return f.useImperativeHandle(r,function(){return{open:o}},[o]),ee.createElement(f.Fragment,null,t(g(g({},u),{},{open:o})))});we.displayName="Dropzone";var ir={disabled:!1,getFilesFromEvent:xr,maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!0,autoFocus:!1};we.defaultProps=ir;we.propTypes={children:p.func,accept:p.objectOf(p.arrayOf(p.string)),multiple:p.bool,preventDropOnDocument:p.bool,noClick:p.bool,noKeyboard:p.bool,noDrag:p.bool,noDragEventsBubbling:p.bool,minSize:p.number,maxSize:p.number,maxFiles:p.number,disabled:p.bool,getFilesFromEvent:p.func,onFileDialogCancel:p.func,onFileDialogOpen:p.func,useFsAccessApi:p.bool,autoFocus:p.bool,onDragEnter:p.func,onDragLeave:p.func,onDragOver:p.func,onDrop:p.func,onDropAccepted:p.func,onDropRejected:p.func,onError:p.func,validator:p.func};var Ee={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function ar(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=g(g({},ir),e),t=r.accept,n=r.disabled,i=r.getFilesFromEvent,o=r.maxSize,u=r.minSize,l=r.multiple,m=r.maxFiles,s=r.onDragEnter,d=r.onDragLeave,v=r.onDragOver,O=r.onDrop,S=r.onDropAccepted,j=r.onDropRejected,F=r.onFileDialogCancel,N=r.onFileDialogOpen,G=r.useFsAccessApi,y=r.autoFocus,oe=r.preventDropOnDocument,xe=r.noClick,ie=r.noKeyboard,Oe=r.noDrag,_=r.noDragEventsBubbling,ae=r.onError,$=r.validator,K=f.useMemo(function(){return Xr(t)},[t]),Fe=f.useMemo(function(){return Vr(t)},[t]),ce=f.useMemo(function(){return typeof N=="function"?N:Je},[N]),U=f.useMemo(function(){return typeof F=="function"?F:Je},[F]),D=f.useRef(null),w=f.useRef(null),cr=f.useReducer(dt,Ee),Se=ve(cr,2),ue=Se[0],A=Se[1],ur=ue.isFocused,je=ue.isFileDialogActive,Y=f.useRef(typeof window<"u"&&window.isSecureContext&&G&&Qr()),_e=function(){!Y.current&&je&&setTimeout(function(){if(w.current){var c=w.current.files;c.length||(A({type:"closeDialog"}),U())}},300)};f.useEffect(function(){return window.addEventListener("focus",_e,!1),function(){window.removeEventListener("focus",_e,!1)}},[w,je,U,Y]);var T=f.useRef([]),Pe=function(c){D.current&&D.current.contains(c.target)||(c.preventDefault(),T.current=[])};f.useEffect(function(){return oe&&(document.addEventListener("dragover",Ye,!1),document.addEventListener("drop",Pe,!1)),function(){oe&&(document.removeEventListener("dragover",Ye),document.removeEventListener("drop",Pe))}},[D,oe]),f.useEffect(function(){return!n&&y&&D.current&&D.current.focus(),function(){}},[D,y,n]);var P=f.useCallback(function(a){ae?ae(a):console.error(a)},[ae]),Ce=f.useCallback(function(a){a.preventDefault(),a.persist(),V(a),T.current=[].concat(it(T.current),[a.target]),Z(a)&&Promise.resolve(i(a)).then(function(c){if(!(te(a)&&!_)){var b=c.length,h=b>0&&Ur({files:c,accept:K,minSize:u,maxSize:o,multiple:l,maxFiles:m,validator:$}),E=b>0&&!h;A({isDragAccept:h,isDragReject:E,isDragActive:!0,type:"setDraggedFiles"}),s&&s(a)}}).catch(function(c){return P(c)})},[i,s,P,_,K,u,o,l,m,$]),Te=f.useCallback(function(a){a.preventDefault(),a.persist(),V(a);var c=Z(a);if(c&&a.dataTransfer)try{a.dataTransfer.dropEffect="copy"}catch{}return c&&v&&v(a),!1},[v,_]),ke=f.useCallback(function(a){a.preventDefault(),a.persist(),V(a);var c=T.current.filter(function(h){return D.current&&D.current.contains(h)}),b=c.indexOf(a.target);b!==-1&&c.splice(b,1),T.current=c,!(c.length>0)&&(A({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),Z(a)&&d&&d(a))},[D,d,_]),q=f.useCallback(function(a,c){var b=[],h=[];a.forEach(function(E){var H=er(E,K),R=ve(H,2),le=R[0],fe=R[1],pe=rr(E,u,o),X=ve(pe,2),de=X[0],ge=X[1],me=$?$(E):null;if(le&&de&&!me)b.push(E);else{var ye=[fe,ge];me&&(ye=ye.concat(me)),h.push({file:E,errors:ye.filter(function(pr){return pr})})}}),(!l&&b.length>1||l&&m>=1&&b.length>m)&&(b.forEach(function(E){h.push({file:E,errors:[Gr]})}),b.splice(0)),A({acceptedFiles:b,fileRejections:h,type:"setFiles"}),O&&O(b,h,c),h.length>0&&j&&j(h,c),b.length>0&&S&&S(b,c)},[A,l,K,u,o,m,O,S,j,$]),J=f.useCallback(function(a){a.preventDefault(),a.persist(),V(a),T.current=[],Z(a)&&Promise.resolve(i(a)).then(function(c){te(a)&&!_||q(c,a)}).catch(function(c){return P(c)}),A({type:"reset"})},[i,q,P,_]),k=f.useCallback(function(){if(Y.current){A({type:"openDialog"}),ce();var a={multiple:l,types:Fe};window.showOpenFilePicker(a).then(function(c){return i(c)}).then(function(c){q(c,null),A({type:"closeDialog"})}).catch(function(c){Zr(c)?(U(c),A({type:"closeDialog"})):et(c)?(Y.current=!1,w.current?(w.current.value=null,w.current.click()):P(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):P(c)});return}w.current&&(A({type:"openDialog"}),ce(),w.current.value=null,w.current.click())},[A,ce,U,G,q,P,Fe,l]),Ie=f.useCallback(function(a){!D.current||!D.current.isEqualNode(a.target)||(a.key===" "||a.key==="Enter"||a.keyCode===32||a.keyCode===13)&&(a.preventDefault(),k())},[D,k]),Re=f.useCallback(function(){A({type:"focus"})},[]),ze=f.useCallback(function(){A({type:"blur"})},[]),Me=f.useCallback(function(){xe||(Jr()?setTimeout(k,0):k())},[xe,k]),I=function(c){return n?null:c},se=function(c){return ie?null:I(c)},Q=function(c){return Oe?null:I(c)},V=function(c){_&&c.stopPropagation()},sr=f.useMemo(function(){return function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},c=a.refKey,b=c===void 0?"ref":c,h=a.role,E=a.onKeyDown,H=a.onFocus,R=a.onBlur,le=a.onClick,fe=a.onDragEnter,pe=a.onDragOver,X=a.onDragLeave,de=a.onDrop,ge=ne(a,nt);return g(g(Ae({onKeyDown:se(x(E,Ie)),onFocus:se(x(H,Re)),onBlur:se(x(R,ze)),onClick:I(x(le,Me)),onDragEnter:Q(x(fe,Ce)),onDragOver:Q(x(pe,Te)),onDragLeave:Q(x(X,ke)),onDrop:Q(x(de,J)),role:typeof h=="string"&&h!==""?h:"presentation"},b,D),!n&&!ie?{tabIndex:0}:{}),ge)}},[D,Ie,Re,ze,Me,Ce,Te,ke,J,ie,Oe,n]),lr=f.useCallback(function(a){a.stopPropagation()},[]),fr=f.useMemo(function(){return function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},c=a.refKey,b=c===void 0?"ref":c,h=a.onChange,E=a.onClick,H=ne(a,ot),R=Ae({accept:K,multiple:l,type:"file",style:{display:"none"},onChange:I(x(h,J)),onClick:I(x(E,lr)),tabIndex:-1},b,w);return g(g({},R),H)}},[w,t,l,J,n]);return g(g({},ue),{},{isFocused:ur&&!n,getRootProps:sr,getInputProps:fr,rootRef:D,inputRef:w,open:I(k)})}function dt(e,r){switch(r.type){case"focus":return g(g({},e),{},{isFocused:!0});case"blur":return g(g({},e),{},{isFocused:!1});case"openDialog":return g(g({},Ee),{},{isFileDialogActive:!0});case"closeDialog":return g(g({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return g(g({},e),{},{isDragActive:r.isDragActive,isDragAccept:r.isDragAccept,isDragReject:r.isDragReject});case"setFiles":return g(g({},e),{},{acceptedFiles:r.acceptedFiles,fileRejections:r.fileRejections});case"reset":return g({},Ee);default:return e}}function Je(){}const mt=()=>{const[e,r]=ee.useState(!1),[t,n]=ee.useState(""),[i,o]=ee.useState("success"),u=d=>{const v=d[0],O=new FileReader;O.onload=async S=>{const j=new Uint8Array(S.target.result),F=vr(j,{type:"array"}),G=br.sheet_to_json(F.Sheets[F.SheetNames[0]]).map(y=>({productName:y["Product Name"],productId:y["Product ID"],specification:y.Specification,quantity:y.Quantity,price:y.Price,gst:y.GST,cgst:y.CGST,sgst:y.SGST,totalPrice:y["Total Price"],totalPriceWithGST:y["Total Price with GST"],fromName:y["From Name"],address:y.Address,street:y.Street,city:y.City,state:y.State,pinCode:y["Pin Code"]}));try{await hr.post(`${Dr.apiUrl}/purchase/uploadexclepurchases`,G),n("File uploaded successfully!"),o("success")}catch(y){console.error("Error uploading file:",y),n("Error uploading file. Please try again."),o("error")}finally{r(!0)}},O.readAsArrayBuffer(v)},{getRootProps:l,getInputProps:m}=ar({onDrop:u}),s=(d,v)=>{v!=="clickaway"&&r(!1)};return z.jsxs("div",{...l(),style:{border:"2px dashed #ccc",padding:"20px",marginTop:"20px"},children:[z.jsx("input",{...m()}),z.jsx(dr,{variant:"h6",children:"Drag and drop an Excel file here, or click to select one"}),z.jsx(gr,{variant:"contained",color:"primary",style:{marginTop:"10px"},children:"Upload Excel"}),z.jsx(mr,{open:e,autoHideDuration:6e3,onClose:s,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:z.jsx(yr,{onClose:s,severity:i,sx:{width:"100%"},children:t})})]})};export{mt as default};
