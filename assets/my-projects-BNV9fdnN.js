import{R as d,r as o,j as e,A as h,m as g,c as x,u as b,T as m}from"./index-DHfN41mj.js";import{P as j}from"./particles-CVGT24pt.js";const p=d.memo(({className:t,children:a,delay:s=1e3})=>{const[r,l]=o.useState(0),n=o.useMemo(()=>d.Children.toArray(a),[a]);o.useEffect(()=>{if(r<n.length-1){const i=setTimeout(()=>{l(f=>f+1)},s);return()=>clearTimeout(i)}},[r,s,n.length]);const u=o.useMemo(()=>n.slice(0,r+1).reverse(),[r,n]);return e.jsx("div",{className:`flex flex-col items-center gap-4 ${t}`,children:e.jsx(h,{children:u.map(i=>e.jsx(y,{children:i},i.key))})})});p.displayName="AnimatedList";function y({children:t}){const a={initial:{scale:0,opacity:0},animate:{scale:1,opacity:1,originY:0},exit:{scale:0,opacity:0},transition:{type:"spring",stiffness:350,damping:40}};return e.jsx(g.div,{...a,layout:!0,className:"mx-auto w-full",children:t})}let c=[{name:"Universo de particulas",description:"Descubre un universo de particulas creado con react y three.js",time:"15m ago",icon:"💸",color:"#00C9A7",link:"https://edi-solar-system-r3f.netlify.app/",repository:"https://github.com/juan-pablo-garcia/edi-solar-system-r3f"},{name:"Generador de objetos 3D",description:"Generador de objetos 3D creado con react y three.js",time:"10m ago",icon:"👤",color:"#FFB800",link:"https://gpt-r3f.netlify.app/",repository:"https://github.com/juan-pablo-garcia/generador-objetos-3d"},{name:"Asistente virtual",description:"Asistente virtual creado con react, react-three-fiber y openai",time:"5m ago",icon:"💬",color:"#FF3D71",link:"https://gpt-r3f.netlify.app/",repository:"https://github.com/juan-pablo-garcia/gpt-r3f"},{name:"Creando experiencias interactivas en 3D",description:"Esta es una presentación interactiva creada con react, react-three-fiber y three.js",time:"2m ago",icon:"🗞️",color:"#1E86FF",link:"https://creandoexperiencias3d.netlify.app/",repository:"https://github.com/juan-pablo-garcia/edi-solar-system-r3f"}];c=Array.from({length:10},()=>c).flat();const v=({name:t,description:a,icon:s,color:r,time:l,link:n})=>e.jsx("figure",{className:x("relative mx-auto min-h-fit w-full max-w-[600px] cursor-pointer overflow-hidden rounded-2xl p-4","transition-all duration-200 ease-in-out hover:scale-[103%]","bg-black [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]","transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"),onClick:()=>{window.open(n,"_blank")},role:"button",children:e.jsxs("div",{className:"flex flex-row items-center gap-3",children:[e.jsx("div",{className:"flex size-10 items-center justify-center rounded-2xl",style:{backgroundColor:r},children:e.jsx("span",{className:"text-lg",children:s})}),e.jsxs("div",{className:"flex flex-col overflow-hidden",children:[e.jsxs("figcaption",{className:"flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ",children:[e.jsx("span",{className:"text-sm sm:text-lg",children:t}),e.jsx("span",{className:"mx-1",children:"·"}),e.jsx("span",{className:"text-xs text-gray-500",children:l})]}),e.jsx("p",{className:"text-sm font-normal dark:text-white/60",children:a})]})]})});function w({className:t}){return e.jsx("div",{className:x("relative flex w-full h-[500px] flex-col p-6 overflow-hidden rounded-lg",t),children:e.jsx(p,{delay:3e3,children:c.map((a,s)=>o.createElement(v,{...a,key:s}))})})}function _(){const t=b();return e.jsxs("div",{className:"w-full h-full bg-gradient-to-b from-black to-cyan-800",children:[e.jsx("div",{className:"absolute w-full h-full left-0 top-0",children:e.jsx(j,{})}),e.jsxs("div",{className:"w-full h-full relative flex flex-row justify-center items-center container mx-auto py-10",children:[e.jsxs("div",{children:[e.jsx(m,{animation:"slideLeft",by:"character",as:"h1",className:`mb-10 pointer-events-none font-bold text-2xl md:text-6xl text-left ${t?"text-cyan-500":"text-green-500"}`,children:"Construyendo el Futuro, Un Proyecto a la Vez"}),e.jsx(m,{animation:"slideRight",by:"word",as:"h2",duration:1500,delay:500,className:`pointer-events-none text-sm md:text-xl text-start max-w-3xl ${t?"text-white":"text-black"}`,children:'"Aquí encontrarás una selección de proyectos en los que he trabajado. Cada línea de código representa una idea convertida en realidad. Descubre cómo resuelvo problemas y creo experiencias innovadoras."'})]}),e.jsx(w,{})]})]})}export{_ as default};