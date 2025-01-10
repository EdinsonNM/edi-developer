import{u as A,r as f,M as D,a as O,b as I,d as _,f as R,i as N,e as H,g as P,h as X,k as w,l as $,R as j,j as t,m as E,c as S,F as q,n as Z,o as W,p as J,L as K,T as C}from"./index-1p7BJaWv.js";import{P as Q}from"./particles-BSz2cXvb.js";function g(e){const n=A(()=>O(e)),{isStatic:s}=f.useContext(D);if(s){const[,l]=f.useState(e);f.useEffect(()=>n.on("change",l),[])}return n}function F(e,n){const s=g(n()),l=()=>s.set(n());return l(),I(()=>{const a=()=>R.preRender(l,!1,!0),c=e.map(i=>i.on("change",a));return()=>{c.forEach(i=>i()),_(l)}}),s}function k(e){return typeof e=="number"?e:parseFloat(e)}function Y(e,n={}){const{isStatic:s}=f.useContext(D),l=f.useRef(null),a=g(N(e)?k(e.get()):e),c=f.useRef(a.get()),i=f.useRef(()=>{}),u=()=>{const o=l.current;o&&o.time===0&&o.sample(H.delta),d(),l.current=P({keyframes:[a.get(),c.current],velocity:a.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...n,onUpdate:i.current})},d=()=>{l.current&&l.current.stop()};return f.useInsertionEffect(()=>a.attach((o,r)=>s?r(o):(c.current=o,i.current=r,R.update(u),a.get()),d),[JSON.stringify(n)]),I(()=>{if(N(e))return e.on("change",o=>a.set(k(o)))},[a]),a}const e1=e=>e&&typeof e=="object"&&e.mix,t1=e=>e1(e)?e.mix:void 0;function s1(...e){const n=!Array.isArray(e[0]),s=n?0:-1,l=e[0+s],a=e[1+s],c=e[2+s],i=e[3+s],u=X(a,c,{mixer:t1(c[0]),...i});return n?u(l):u}function n1(e){w.current=[],e();const n=F(w.current,e);return w.current=void 0,n}function M(e,n,s,l){if(typeof e=="function")return n1(e);const a=typeof n=="function"?n:s1(n,s,l);return Array.isArray(e)?z(e,a):z([e],([c])=>a(c))}function z(e,n){const s=A(()=>[]);return F(e,()=>{s.length=0;const l=e.length;for(let a=0;a<l;a++)s[a]=e[a].get();return n(s)})}const V=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,L=$,a1=(e,n)=>s=>{var l;if((n==null?void 0:n.variants)==null)return L(e,s==null?void 0:s.class,s==null?void 0:s.className);const{variants:a,defaultVariants:c}=n,i=Object.keys(a).map(o=>{const r=s==null?void 0:s[o],x=c==null?void 0:c[o];if(r===null)return null;const m=V(r)||V(x);return a[o][m]}),u=s&&Object.entries(s).reduce((o,r)=>{let[x,m]=r;return m===void 0||(o[x]=m),o},{}),d=n==null||(l=n.compoundVariants)===null||l===void 0?void 0:l.reduce((o,r)=>{let{class:x,className:m,...b}=r;return Object.entries(b).every(v=>{let[p,y]=v;return Array.isArray(y)?y.includes({...c,...u}[p]):{...c,...u}[p]===y})?[...o,x,m]:o},[]);return L(e,i,d,s==null?void 0:s.class,s==null?void 0:s.className)},T=40,B=60,U=140,l1=a1("supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md"),G=j.forwardRef(({className:e,children:n,iconSize:s=T,iconMagnification:l=B,iconDistance:a=U,direction:c="middle",...i},u)=>{const d=g(1/0),o=()=>j.Children.map(n,r=>j.isValidElement(r)&&r.type===h?j.cloneElement(r,{...r.props,mouseX:d,size:s,magnification:l,distance:a}):r);return t.jsx(E.div,{ref:u,onMouseMove:r=>d.set(r.pageX),onMouseLeave:()=>d.set(1/0),...i,className:S(l1({className:e}),{"items-start":c==="top","items-center":c==="middle","items-end":c==="bottom"}),children:o()})});G.displayName="Dock";const h=({size:e=T,magnification:n=B,distance:s=U,mouseX:l,className:a,children:c,...i})=>{const u=f.useRef(null),d=Math.max(6,e*.2),o=g(1/0),r=M(l??o,b=>{var p;const v=((p=u.current)==null?void 0:p.getBoundingClientRect())??{x:0,width:0};return b-v.x-v.width/2}),x=M(r,[-s,0,s],[e,n,e]),m=Y(x,{mass:.1,stiffness:150,damping:12});return t.jsx(E.div,{ref:u,style:{width:m,height:m,padding:d},className:S("flex aspect-square cursor-pointer items-center justify-center rounded-full",a),...i,children:c})};h.displayName="DockIcon";function o1(){return t.jsx("div",{className:"relative",children:t.jsxs(G,{direction:"middle",children:[t.jsx(h,{children:t.jsx(q,{className:"size-10 text-blue-500"})}),t.jsx(h,{children:t.jsx(Z,{className:"size-10 text-black"})}),t.jsx(h,{children:t.jsx(W,{className:"size-10 text-black"})}),t.jsx(h,{children:t.jsx(c1.x,{className:"size-10 text-black"})}),t.jsx(h,{children:t.jsx(J,{className:"size-10 text-green-500"})})]})})}const c1={gitHub:e=>t.jsx("svg",{viewBox:"0 0 438.549 438.549",...e,children:t.jsx("path",{fill:"currentColor",d:"M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"})}),x:e=>t.jsxs("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",...e,children:[t.jsx("title",{children:"X"}),t.jsx("path",{fill:"currentColor",d:"M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"})]}),notion:e=>t.jsxs("svg",{width:"100",height:"100",viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:[t.jsx("path",{d:"M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z",fill:"#fff"}),t.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z",fill:"#000"})]}),googleDrive:e=>t.jsxs("svg",{viewBox:"0 0 87.3 78",xmlns:"http://www.w3.org/2000/svg",...e,children:[t.jsx("path",{d:"m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z",fill:"#0066da"}),t.jsx("path",{d:"m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z",fill:"#00ac47"}),t.jsx("path",{d:"m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z",fill:"#ea4335"}),t.jsx("path",{d:"m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z",fill:"#00832d"}),t.jsx("path",{d:"m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z",fill:"#2684fc"}),t.jsx("path",{d:"m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z",fill:"#ffba00"})]}),whatsapp:e=>t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 175.216 175.552",...e,children:[t.jsxs("defs",{children:[t.jsxs("linearGradient",{id:"b",x1:"85.915",x2:"86.535",y1:"32.567",y2:"137.092",gradientUnits:"userSpaceOnUse",children:[t.jsx("stop",{offset:"0",stopColor:"#57d163"}),t.jsx("stop",{offset:"1",stopColor:"#23b33a"})]}),t.jsx("filter",{id:"a",width:"1.115",height:"1.114",x:"-.057",y:"-.057",colorInterpolationFilters:"sRGB",children:t.jsx("feGaussianBlur",{stdDeviation:"3.531"})})]}),t.jsx("path",{fill:"#b3b3b3",d:"m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0",filter:"url(#a)"}),t.jsx("path",{fill:"#fff",d:"m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"}),t.jsx("path",{fill:"url(#linearGradient1780)",d:"M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"}),t.jsx("path",{fill:"url(#b)",d:"M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"}),t.jsx("path",{fill:"#fff",fillRule:"evenodd",d:"M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"})]})};function u1(){const{isDark:e}=f.useContext(K);return t.jsxs("div",{className:`w-full h-full ${e?"bg-gradient-to-b from-black to-blue-900":"bg-gradient-to-b from-blue-300 via-yellow-200 to-white"}`,children:[t.jsx("div",{className:"absolute w-full h-full left-0 top-0",children:t.jsx(Q,{})}),t.jsxs("div",{className:"w-full h-full relative flex flex-row justify-center items-center container mx-auto py-10",children:[t.jsxs("div",{className:"px-10 md:px-0 pt-32 md:pt-0",children:[t.jsx(C,{animation:"slideLeft",by:"character",as:"h1",className:`mb-10 pointer-events-none font-bold text-2xl md:text-6xl text-center ${e?"text-cyan-500":"text-green-500"}`,children:"Mi viaje en la tecnología"}),t.jsx(C,{animation:"slideRight",by:"word",as:"h2",duration:1500,delay:500,className:`text-sm md:text-xl text-center max-w-5xl ${e?"text-white":"text-black"}`,children:'Hola, soy Edinson Nuñez More, desarrollador apasionado por crear soluciones que mejoren la vida de las personas. Desde mis primeros pasos en el mundo del código hasta los proyectos que desarrollo hoy, cada línea de código refleja mi compromiso con la innovación."'}),t.jsx(o1,{})]}),t.jsx("div",{})]})]})}export{u1 as default};
