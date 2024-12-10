import{r as h,j as s,G as l,a4 as n,h as b,c as y,d as E}from"./index-14iq4arv.js";const j=({data:e,onClose:x})=>{const[u,C]=h.useState({emp_id:sessionStorage.getItem("emp_id"),cust_name:e?e.leads_name?e.leads_name:e.SENDER_NAME:"",cust_mobile:e?e.leads_mobile?e.leads_mobile:e.SENDER_MOBILE:"",cust_email:e?e.leads_email?e.leads_email:e.SENDER_EMAIL:"",cust_company:e?e.leads_company?e.leads_company:e.SENDER_COMPANY:"",cust_address:e?e.leads_address?e.leads_address:e.SENDER_ADDRESS:"",cust_state:e?e.leads_state?e.leads_state:e.SENDER_STATE:"",cust_city:e?e.leads_city?e.leads_city:e.SENDER_CITY:""}),[r,m]=h.useState({cust_name:"",cust_mobile:"",cust_email:"",cust_company:"",cust_address:"",cust_state:"",cust_city:""}),_=(a,c)=>{let t="";const i=c&&typeof c=="string"?c.trim():c;switch(a){case"cust_name":i||(t="Customer name is required.");break;case"cust_mobile":i||(t="Customer mobile is required.");break;case"cust_email":i||(t="Customer Email is required.");break;case"cust_company":i||(t="Customer Company is required.");break;case"cust_address":i||(t="Customer Address is required.");break;case"cust_state":i||(t="Customer State is required.");break;case"cust_city":i||(t="Customer City is required.");break}return t},o=a=>{const{name:c,value:t}=a.target,i=_(c,t);C({...u,[c]:t}),m({...r,[c]:i})},p=a=>{a.preventDefault();let c={};if(Object.keys(u).forEach(t=>{const i=u[t],d=_(t,i);d&&(c=d)}),Object.keys(c).length>0){m(c);return}y.post(`${E.apiUrl}/customer/convertCustomer`,u).then(t=>{x()}).catch(t=>{console.log("Error:",t)})};return s.jsxs(s.Fragment,{children:[s.jsx("h1",{className:"text-center",children:"Convert Customers"}),s.jsxs(l,{container:!0,spacing:2,children:[s.jsx(l,{item:!0,xs:6,children:s.jsx(n,{fullWidth:!0,label:"Customer Name",name:"cust_name",onChange:o,value:u.cust_name,error:!!r.cust_name,helperText:r.cust_name})}),s.jsx(l,{item:!0,xs:6,children:s.jsx(n,{fullWidth:!0,label:"Customer Mobile",name:"cust_mobile",onChange:o,value:u.cust_mobile,error:!!r.cust_mobile,helperText:r.cust_mobile})}),s.jsx(l,{item:!0,xs:6,children:s.jsx(n,{fullWidth:!0,label:"Customer Email",name:"cust_email",onChange:o,value:u.cust_email,error:!!r.cust_email,helperText:r.cust_email})}),s.jsx(l,{item:!0,xs:6,children:s.jsx(n,{fullWidth:!0,label:"Customer Company",name:"cust_company",onChange:o,value:u.cust_company,error:!!r.cust_company,helperText:r.cust_company})}),s.jsx(l,{item:!0,xs:6,children:s.jsx(n,{fullWidth:!0,label:"Customer Address",name:"cust_address",onChange:o,value:u.cust_address,error:!!r.cust_address,helperText:r.cust_address})}),s.jsx(l,{item:!0,xs:6,children:s.jsx(n,{fullWidth:!0,label:"Customer State",name:"cust_state",onChange:o,value:u.cust_state,error:!!r.cust_state,helperText:r.cust_state})}),s.jsx(l,{item:!0,xs:6,children:s.jsx(n,{fullWidth:!0,label:"Customer City",name:"cust_city",onChange:o,value:u.cust_city,error:!!r.cust_city,helperText:r.cust_city})}),s.jsx(l,{item:!0,xs:12,display:"flex",justifyContent:"center",children:s.jsx(b,{onClick:p,variant:"contained",color:"primary",children:"Submit"})})]})]})};export{j as C};
