import"./all-cea21dc3.js";const d="xiang5141";axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${d}/products`).then(c=>{const a=c.data.products;s(a),n(),h(),v()}).catch(c=>{console.log(c)});function s(c){const a=document.querySelector(".productWrap");a.innerHTML="",c.forEach(t=>{a.innerHTML+=`<li class="productCard">
            <h4 class="productType">新品</h4 >
                <img src="${t.images}"
                    alt="">
                    <a href="#" id="${t.id}" class="addCardBtn">加入購物車</a>
                    <h3>${t.title}</h3>
                    <del class="originPrice">NT$${t.origin_price}</del>
                    <p class="nowPrice">NT$${t.price}</p>
                    <p style="display: none;">${t.category}</p>
                </li>`}),axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${d}/carts`)}function n(c){const a=document.querySelector(".productSelect"),t=document.querySelectorAll(".productCard");a.addEventListener("change",r=>{const e=r.target.value;t.forEach(l=>{const i=l.lastElementChild.firstChild.nodeValue;l.style.display=e=="全部"||e==i?"block":"none"})})}function h(){document.querySelectorAll(".addCardBtn").forEach(a=>{a.addEventListener("click",t=>{t.preventDefault(),axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${d}/carts`).then(r=>{let e=r.data.carts.find(l=>l.product.id==t.target.id);return e?axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${d}/carts`,{data:{productId:t.target.id,quantity:e.quantity+=1}}):axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${d}/carts`,{data:{productId:t.target.id,quantity:1}})}).then(r=>{o(r)}).catch(r=>{console.log(r)})})})}function p(){document.querySelector(".discardAllBtn").addEventListener("click",a=>{a.preventDefault();const t=document.querySelector(".shoppingCart-table");axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${d}/carts`).then(r=>{console.log("成功"),t.innerHTML=`<tr>
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
                                                    <td>NT$${r.data.finalTotal}</td>
                                                </tr>
                                                `}).catch(r=>{console.log("失敗")})})}function u(){document.querySelectorAll(".cartClear").forEach(a=>{a.addEventListener("click",t=>{t.preventDefault();let r=t.target.id;axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/xiang5141/carts/${r}`).then(e=>{o(e)}).catch(e=>{console.log("失敗",e)})})})}function o(c){const a=document.querySelector(".shoppingCart-table").lastChild;let t="",r="";a.innerHTML=`<tr>
                                                              <th width="40%">品項</th>
                                                              <th width="15%">單價</th>
                                                              <th width="15%">數量</th>
                                                              <th width="15%">金額</th>
                                                              <th width="15%"></th>
                                                            </tr>`,c.data.carts.forEach(e=>{t+=`
                                          <tr id="iteam">
                                             <td>
                                               <div class="cardItem-title">
                                                 <img src="${e.product.images}" alt="">
                                                 <p>${e.product.title}</p>
                                               </div>
                                             </td>
                                             <td>NT$${e.product.price}</td>
                                             <td>${e.quantity}</td>
                                             <td>NT$${e.quantity*e.product.price}</td>
                                             <td class="discardBtn">
                                               <a href="#" id="${e.id}" class="material-icons cartClear">
                                                 clear
                                               </a>
                                             </td>
                                         </tr>
                                         `}),r=`<tr>
                           <td>
                               <a href="#" class="discardAllBtn">刪除所有品項</a>
                           </td>
                           <td></td>
                           <td></td>
                           <td>
                               <p>總金額</p>
                           </td>
                           <td>NT$${c.data.finalTotal}</td>
                       </tr>`,a.innerHTML+=t+r,p(),u()}function v(){const c=document.querySelector(".orderInfo-btn"),a=document.querySelectorAll(".orderInfo-input");let t=[];c.addEventListener("click",r=>{if(r.preventDefault(),a.forEach(e=>{t.push(e.value)}),t.filter(e=>e=="").length>0){t=[],alert("請正確填寫");return}axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${d}/orders
     `,{data:{user:{name:t[0],tel:t[1],email:t[2],address:t[3],payment:t[4]}}}).then(e=>{t=[],o({data:{carts:[],finalTotal:0}}),a[0].value="",a[1].value="",a[2].value="",a[3].value="",a[4].value="ATM"}).catch(e=>{t=[],alert("購物車無商品",e)})})}
