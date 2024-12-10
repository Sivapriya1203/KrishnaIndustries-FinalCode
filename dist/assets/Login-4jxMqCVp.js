import{r as o,u as B,a as I,b as P,c as k,d as D,j as e,G as t,B as x,T as p,F as w,I as f,O as y,e as h,f as L,g as F,A as W,h as _,L as M,i as T,S as q,D as z}from"./index-14iq4arv.js";import{F as H,c as U,a as b,d as $,b as G,A as O,e as V}from"./VisibilityOff-V6qcLTU4.js";const K=({...c})=>{const[j,m]=o.useState([]),a=B();I(a.breakpoints.down("md")),P(s=>s.customization),o.useState(!0);const[u,S]=o.useState(!1),C=()=>{S(!u)},v=s=>{s.preventDefault()};o.useEffect(()=>{k.get(`${D.apiUrl}/employee`).then(s=>{m(s.data),console.log("Employee Data :",s.data)}).catch(s=>{console.log("Error, can't fetch employee data. Try again later.")})},[]);const A="krishnaindustries@gmail.com",E="Krishna@123";return e.jsxs(e.Fragment,{children:[e.jsx(t,{container:!0,direction:"column",justifyContent:"center",spacing:2,children:e.jsx(t,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"center",children:e.jsx(x,{sx:{mb:2},children:e.jsx(p,{variant:"subtitle1",children:"Sign in with Email address"})})})}),e.jsx(H,{initialValues:{email:"",password:"",submit:null},validationSchema:U().shape({email:b().email("Must be a valid email").max(255).required("Email is required"),password:b().max(255).required("Password is required")}),onSubmit:(s,{setErrors:r,setStatus:l,setSubmitting:d})=>{try{if(s.email===A&&s.password===E)sessionStorage.setItem("adminLoggedIn","true"),window.location.reload();else{const n=j.find(i=>i.emp_email===s.email&&i.emp_mobile===s.password);n?(sessionStorage.setItem("employeeLoggedIn","true"),sessionStorage.setItem("emp_id",n.emp_id),window.location.reload()):r({submit:"Invalid username or password"})}d(!1)}catch(n){console.error(n),l({success:!1}),r({submit:n.message}),d(!1)}},children:({errors:s,handleBlur:r,handleChange:l,handleSubmit:d,isSubmitting:n,touched:i,values:g})=>e.jsxs("form",{noValidate:!0,onSubmit:d,...c,children:[e.jsxs(w,{fullWidth:!0,error:!!(i.email&&s.email),sx:{...a.typography.customInput},children:[e.jsx(f,{htmlFor:"outlined-adornment-email-login",children:"Email Address / Username"}),e.jsx(y,{id:"outlined-adornment-email-login",type:"email",value:g.email,name:"email",onBlur:r,onChange:l,label:"Email Address / Username",inputProps:{}}),i.email&&s.email&&e.jsx(h,{error:!0,id:"standard-weight-helper-text-email-login",children:s.email})]}),e.jsxs(w,{fullWidth:!0,error:!!(i.password&&s.password),sx:{...a.typography.customInput},children:[e.jsx(f,{htmlFor:"outlined-adornment-password-login",children:"Password"}),e.jsx(y,{id:"outlined-adornment-password-login",type:u?"text":"password",value:g.password,name:"password",onBlur:r,onChange:l,endAdornment:e.jsx(L,{position:"end",children:e.jsx(F,{"aria-label":"toggle password visibility",onClick:C,onMouseDown:v,edge:"end",size:"large",children:u?e.jsx($,{}):e.jsx(G,{})})}),label:"Password",inputProps:{}}),i.password&&s.password&&e.jsx(h,{error:!0,id:"standard-weight-helper-text-password-login",children:s.password})]}),s.submit&&e.jsx(x,{sx:{mt:3},children:e.jsx(h,{error:!0,children:s.submit})}),e.jsx(x,{sx:{mt:2,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsx(W,{children:e.jsx(_,{disableElevation:!0,disabled:n,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",children:"Sign in"})})})]})})]})},J=()=>{const c=I(a=>a.breakpoints.down("md")),[j,m]=o.useState(!1);return e.jsx(O,{children:e.jsxs(t,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[e.jsx(t,{item:!0,xs:12,children:e.jsx(t,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:e.jsx(t,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:e.jsx(V,{children:e.jsxs(t,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[e.jsx(t,{item:!0,sx:{mb:3},children:e.jsx(M,{to:"#","aria-label":"logo",children:e.jsx(T,{})})}),e.jsx(t,{item:!0,xs:12,children:e.jsx(t,{container:!0,direction:{xs:"column-reverse",md:"row"},alignItems:"center",justifyContent:"center",children:e.jsx(t,{item:!0,children:e.jsxs(q,{alignItems:"center",justifyContent:"center",spacing:1,children:[e.jsx(p,{color:"secondary.main",gutterBottom:!0,variant:c?"h3":"h2",children:"Hi, Welcome Back"}),e.jsx(p,{variant:"caption",fontSize:"16px",textAlign:{xs:"center",md:"inherit"},children:"Enter your credentials to continue"})]})})})}),e.jsx(t,{item:!0,xs:12,children:e.jsx(K,{setLogIIn:m})}),e.jsx(t,{item:!0,xs:12,children:e.jsx(z,{})})]})})})})}),e.jsx(t,{item:!0,xs:12,sx:{m:3,mt:1}})]})})};export{J as default};
