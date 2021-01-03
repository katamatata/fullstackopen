(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t(1),r=t(15),o=t.n(r),i=t(5),u=t(3),s=function(e){var n=e.handleSubmit,t=e.nameInputValue,c=e.handleNameChange,r=e.numberInputValue,o=e.handleNumberChange;return Object(a.jsxs)("form",{onSubmit:n,children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("label",{htmlFor:"name",children:"Name: "}),Object(a.jsx)("input",{id:"name",name:"name",value:t,onChange:c})]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("label",{htmlFor:"phone",children:"Phone Number: "}),Object(a.jsx)("input",{type:"tel",id:"phone",name:"phone",value:r,onChange:o})]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",children:"Add"})})]})},l=function(e){var n=e.persons,t=e.search,c=e.deleteContact,r=""===t?n:n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return Object(a.jsx)("div",{children:r.map((function(e){return Object(a.jsxs)("p",{children:[e.name," ",e.number,Object(a.jsx)("button",{onClick:function(){return c(e.id)},children:"delete"})]},e.id)}))})},d=function(e){var n=e.searchInputValue,t=e.handleSearchChange;return Object(a.jsxs)("div",{children:[Object(a.jsx)("label",{htmlFor:"search",children:"Search by Name: "}),Object(a.jsx)("input",{id:"search",name:"search",value:n,onChange:t})]})},h=function(e){var n=e.isError,t=e.message;return t?Object(a.jsx)("div",{className:n?"error":"notification",children:t}):null},b=t(4),j=t.n(b),m="/api/persons",f={getAll:function(){return j.a.get(m).then((function(e){return e.data}))},create:function(e){return j.a.post(m,e).then((function(e){return e.data}))},update:function(e,n){return j.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},deleteContact:function(e){return j.a.delete("".concat(m,"/").concat(e))}},p=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)(""),b=Object(u.a)(o,2),j=b[0],m=b[1],p=Object(c.useState)(""),O=Object(u.a)(p,2),v=O[0],g=O[1],x=Object(c.useState)(""),C=Object(u.a)(x,2),w=C[0],S=C[1],N=Object(c.useState)({isError:!1,message:null}),y=Object(u.a)(N,2),E=y[0],I=y[1],k=E.isError,V=E.message,A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];I({isError:n,message:e}),setTimeout((function(){I(Object(i.a)(Object(i.a)({},E),{},{message:null}))}),3e3)};Object(c.useEffect)((function(){f.getAll().then((function(e){r(e)})).catch((function(e){A("Connection with server is lost. Try again later.",!0)}))}),[]);return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Phonebook"}),Object(a.jsx)(h,{isError:k,message:V}),Object(a.jsx)(d,{searchInputValue:w,handleSearchChange:function(e){S(e.target.value)}}),Object(a.jsx)("h3",{children:"Add a new contact"}),Object(a.jsx)(s,{handleSubmit:function(e){e.preventDefault();var n=t.map((function(e){return e.name})).includes(j);if(""===j||""===v)A("Please complete form",!0);else if(n){if(window.confirm("".concat(j," is already added to contacts, replace the old number with a new one?"))){var a=t.find((function(e){return e.name===j})),c=Object(i.a)(Object(i.a)({},a),{},{number:v});f.update(a.id,c).then((function(e){r(t.map((function(n){return n.id!==a.id?n:e}))),m(""),g(""),A("Contact ".concat(j," was updated."))})).catch((function(e){console.log(e.response.data),A("".concat(e.response.data.error),!0)}))}}else{var o={name:j,number:v};f.create(o).then((function(e){r(t.concat(e)),m(""),g(""),A("".concat(j," added to contacts."))})).catch((function(e){console.log(e.response.data),A("".concat(e.response.data.error),!0)}))}},nameInputValue:j,handleNameChange:function(e){m(e.target.value)},numberInputValue:v,handleNumberChange:function(e){g(e.target.value)}}),Object(a.jsx)("h3",{children:"Contacts"}),Object(a.jsx)(l,{persons:t,search:w,deleteContact:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&f.deleteContact(e).then((function(){r(t.filter((function(n){return n.id!==e}))),A("".concat(n.name," deleted from contacts."))})).catch((function(e){A("".concat(n.name," has already been deleted from server."),!0)}))}})]})};t(38);o.a.render(Object(a.jsx)(p,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.2a822b79.chunk.js.map