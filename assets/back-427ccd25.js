import"./all-cea21dc3.js";const s="xiang5141";c();function c(){axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${s}/orders`,{headers:{authorization:"t2cMK7akXXP629pP931BTAyGPf62"}}).then(e=>{f(e),v(),y(A(e))}).catch(e=>{console.log("失敗取得",e)})}function f(e){const a=document.querySelector(".orderPage-table").lastChild,d=e.data.orders;let n,o;a.innerHTML="",d.forEach(t=>{let r="";const l=new Date(t.createdAt*1e3);t.paid==!1?o="未處理":o="已處理",n=t.products,n.forEach(i=>{r+=`${i.title}x${i.quantity}<br>`}),a.innerHTML+=`<tr>
                            <td>${t.id}</td>
                            <td>
                                <p>${t.user.name}</p>
                                <p>${t.user.tel}</p>
                            </td>
                            <td>${t.user.address}</td>
                            <td>${t.user.email}</td>
                            <td>
                                <p>${r}</p>
                            </td>
                            <td>${l.toLocaleDateString()}</td>
                            <td>
                                <a href="" class="orderStatus">${o}</a>
                            </td>
                            <td>
                                <input type="button" class="delSingleOrder-Btn"
                                       value="刪除">
                            </td>
                                            </tr>`}),g(e),$(e)}function h(e){let a=new Map;return e.forEach((d,n)=>{a.set(n,{id:d.id,state:d.paid})}),a}function g(e){const a=e.data.orders,d=document.querySelectorAll(".orderStatus"),n=h(a);d.forEach((o,t)=>{const r=n.get(t),l=r.id,i=r.state;o.addEventListener("click",u=>{u.preventDefault(),axios.put(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${s}/orders`,{data:{id:l,paid:!i}},{headers:{authorization:"t2cMK7akXXP629pP931BTAyGPf62"}}).then(p=>{console.log("成功put",p.data),c()}).catch(p=>{console.log("失敗了白痴",p)})})})}function v(){document.querySelector(".discardAllBtn").addEventListener("click",a=>{axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${s}/orders`,{headers:{authorization:"t2cMK7akXXP629pP931BTAyGPf62"}}).then(d=>{alert("已刪除全部定單"),c()}).catch(d=>{console.log("菜狗失敗了",d)})})}function $(e){const a=e.data.orders,d=h(a);document.querySelectorAll(".delSingleOrder-Btn").forEach((o,t)=>{const r=d.get(t).id;o.addEventListener("click",l=>{axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${s}/orders/${r}`,{headers:{authorization:"t2cMK7akXXP629pP931BTAyGPf62"}}).then(i=>{c()}).catch(i=>{console.log("失敗取得",i)})})})}function y(e){c3.generate({data:{columns:e,type:"pie"}})}function A(e){const a=new Map;e.data.orders.forEach(o=>{o.products.forEach(t=>{a.has(t.title)?a.set(t.title,a.get(t.title)+t.quantity):a.set(t.title,t.quantity)})});let n=Array.from(a).sort((o,t)=>t[1]-o[1]);if(a.size>4){let o=0,t=n.slice(0,3);n.slice(3).forEach(l=>{let i=l.pop();o+=i});const r=["其他",o];return t.push(r),t}return n}axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${s}/orders`,{headers:{authorization:"t2cMK7akXXP629pP931BTAyGPf62"}}).then(e=>{console.log(e.data),console.log("成功取得")}).catch(e=>{console.log("失敗取得",e)});
