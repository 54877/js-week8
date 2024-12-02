(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const i="xiang5141";axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${i}/products`).then(c=>{const r=c.data.products;s(r),n(),u(),f()}).catch(c=>{console.log(c)});function s(c){const r=document.querySelector(".productWrap");r.innerHTML="",c.forEach(e=>{r.innerHTML+=`<li class="productCard">
            <h4 class="productType">新品</h4 >
                <img src="${e.images}"
                    alt="">
                    <a href="#" id="${e.id}" class="addCardBtn">加入購物車</a>
                    <h3>${e.title}</h3>
                    <del class="originPrice">NT$${e.origin_price}</del>
                    <p class="nowPrice">NT$${e.price}</p>
                    <p style="display: none;">${e.category}</p>
                </li>`}),axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${i}/carts`)}function n(c){const r=document.querySelector(".productSelect"),e=document.querySelectorAll(".productCard");r.addEventListener("change",a=>{const t=a.target.value;e.forEach(o=>{const l=o.lastElementChild.firstChild.nodeValue;o.style.display=t=="全部"||t==l?"block":"none"})})}function u(){document.querySelectorAll(".addCardBtn").forEach(r=>{r.addEventListener("click",e=>{e.preventDefault(),axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${i}/carts`).then(a=>{let t=a.data.carts.find(o=>o.product.id==e.target.id);return t?axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${i}/carts`,{data:{productId:e.target.id,quantity:t.quantity+=1}}):axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${i}/carts`,{data:{productId:e.target.id,quantity:1}})}).then(a=>{d(a)}).catch(a=>{console.log(a)})})})}function h(){document.querySelector(".discardAllBtn").addEventListener("click",r=>{r.preventDefault();const e=document.querySelector(".shoppingCart-table");axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${i}/carts`).then(a=>{console.log("成功"),e.innerHTML=`<tr>
                                                  <th width="40%">品項</th>
                                                  <th width="15%">單價</th>
                                                  <th width="15%">數量</th>
                                                  <th width="15%">金額</th>
                                                  <th width="15%"></th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" class="discardAllBtn">刪除所有品項</a>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <p>總金額</p>
                                                    </td>
                                                    <td>NT$${a.data.finalTotal}</td>
                                                </tr>
                                                `}).catch(a=>{console.log("失敗")})})}function p(){document.querySelectorAll(".cartClear").forEach(r=>{r.addEventListener("click",e=>{e.preventDefault();let a=e.target.id;axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/xiang5141/carts/${a}`).then(t=>{d(t)}).catch(t=>{console.log("失敗",t)})})})}function d(c){const r=document.querySelector(".shoppingCart-table").lastChild;let e="",a="";r.innerHTML=`<tr>
                                                              <th width="40%">品項</th>
                                                              <th width="15%">單價</th>
                                                              <th width="15%">數量</th>
                                                              <th width="15%">金額</th>
                                                              <th width="15%"></th>
                                                            </tr>`,c.data.carts.forEach(t=>{e+=`
                                          <tr id="iteam">
                                             <td>
                                               <div class="cardItem-title">
                                                 <img src="${t.product.images}" alt="">
                                                 <p>${t.product.title}</p>
                                               </div>
                                             </td>
                                             <td>NT$${t.product.price}</td>
                                             <td>${t.quantity}</td>
                                             <td>NT$${t.quantity*t.product.price}</td>
                                             <td class="discardBtn">
                                               <a href="#" id="${t.id}" class="material-icons cartClear">
                                                 clear
                                               </a>
                                             </td>
                                         </tr>
                                         `}),a=`<tr>
                           <td>
                               <a href="#" class="discardAllBtn">刪除所有品項</a>
                           </td>
                           <td></td>
                           <td></td>
                           <td>
                               <p>總金額</p>
                           </td>
                           <td>NT$${c.data.finalTotal}</td>
                       </tr>`,r.innerHTML+=e+a,h(),p()}function f(){const c=document.querySelector(".orderInfo-btn"),r=document.querySelectorAll(".orderInfo-input");let e=[];c.addEventListener("click",a=>{if(a.preventDefault(),r.forEach(t=>{e.push(t.value)}),console.log(e),e.filter(t=>t=="").length>0){e=[],alert("請正確填寫");return}axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${i}/orders
     `,{data:{user:{name:e[0],tel:e[1],email:e[2],address:e[3],payment:e[4]}}}).then(t=>{e=[],d({data:{carts:[],finalTotal:0}}),r[0].value="",r[1].value="",r[2].value="",r[3].value="",r[4].value="ATM"}).catch(t=>{e=[],alert("購物車無商品",t)})})}
