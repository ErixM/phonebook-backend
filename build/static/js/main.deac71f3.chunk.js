(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=(t(19),t(2)),i=function(e){var n=e.filterHandler;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{onChange:n}))},l=function(e){var n=e.addContact,t=e.newName,a=e.handleNameChange,u=e.newNumber,c=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name:"," ",r.a.createElement("input",{placeholder:"name here",value:t,onChange:a})),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{placeholder:"number here",value:u,onChange:c})),r.a.createElement("button",{onClick:n,type:"submit"},"add"))},m=function(e){var n=e.persons,t=e.removeFunction;return n.map((function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number,r.a.createElement("button",{style:{borderRadius:"4px",paddingTop:"2px",margin:"2px",border:"2px solid blue",background:"pink"},onClick:function(){return t(e.id)}},"Delete"))}))},d=t(3),s=t.n(d),f="/api/persons",h=function(){return s.a.get(f).then((function(e){return e.data}))},b=function(e){return s.a.post(f,e).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){return s.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var n=e.message,t=e.type;return null===n?null:r.a.createElement("div",{className:t},n)},E=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),d=Object(o.a)(c,2),s=d[0],f=d[1],E=Object(a.useState)(""),C=Object(o.a)(E,2),w=C[0],y=C[1],O=Object(a.useState)([]),j=Object(o.a)(O,2),k=j[0],N=j[1],S=Object(a.useState)(null),x=Object(o.a)(S,2),U=x[0],q=x[1],F=Object(a.useState)(null),J=Object(o.a)(F,2),M=J[0],T=J[1],D=function(){return console.log("it works"),setTimeout((function(){T(null)}),3e3)},H=function(){return console.log("it works"),setTimeout((function(){q(null)}),3e3)};Object(a.useEffect)((function(){h().then((function(e){N(e),u(e)}))}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(v,{message:U,type:"success"}),r.a.createElement(v,{message:M,type:"error"}),r.a.createElement(i,{filterHandler:function(e){N(t.filter((function(n){return n.name.toUpperCase().includes(e.target.value.toUpperCase())})))}}),r.a.createElement(l,{addContact:function(e){e.preventDefault();var n={name:s,number:w};if(t.some((function(e){return e.name.toUpperCase().trim()===n.name.toUpperCase().trim()})))if(n.number.length<8)T("Minimum required number length is 8!"),D();else if(window.confirm("".concat(n.name," already added on the phonebook, do you want to update it?"))){var a=k.find((function(e){return e.name===s}));p(a.id,n).then((function(){h().then((function(e){N(e),q("".concat(s," number updated correctly")),H()})).catch((function(){T("Couldn't update ".concat(a.name," because it has already been deleted")),D()}))})).catch((function(e){T("".concat(JSON.stringify(e.response.data))),D()})),f(""),y("")}n.number?n.name.length<3?(T("Minimum required name length is 3!"),D()):n.number.length<8?(T("Minimum required number length is 8!"),D()):(b(n).then((function(e){N(t.concat(e)),u(t.concat(e)),q("".concat(e.name,"'s number added correctly")),H()})).catch((function(e){console.log(e.response.data)})),f(""),y("")):(T("Please insert a number!"),D())},newName:s,handleNameChange:function(e){f(e.target.value)},newNumber:w,handleNumberChange:function(e){y(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{persons:k,removeFunction:function(e){var n=k.find((function(n){return n.id===e}));(function(e){return window.confirm("Are you sure you want to delete ".concat(e.name,"?"))})(n)&&g(n.id).then((function(){N(k.filter((function(n){return n.id!==e}))),T('"'.concat(n.name,'" deleted!')),D()})).catch((function(){T(" Couldn't delete ".concat(n.name," as it has already been deleted")),D()}))}}),"...")};c.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.deac71f3.chunk.js.map