import './assets/scss/all.scss';


const api_path = "xiang5141";
axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`)
    .then((res)=>{
      const data = res.data.products;
      init(data)
      change(data)
      cartsData()
      checkform()
    })
    .catch((err)=>{
        console.log(err);
    });

//項目init
function init(data){
    const productWrap = document.querySelector('.productWrap')
    productWrap.innerHTML = '';
    data.forEach(e=>{
        productWrap.innerHTML += `<li class="productCard">
            <h4 class="productType">新品</h4 >
                <img src="${e.images}"
                    alt="">
                    <a href="#" id="${e.id}" class="addCardBtn">加入購物車</a>
                    <h3>${e.title}</h3>
                    <del class="originPrice">NT$${e.origin_price}</del>
                    <p class="nowPrice">NT$${e.price}</p>
                    <p style="display: none;">${e.category}</p>
                </li>`
    })
    axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`)
};
//塞選器
function change(data){
    const productSelect = document.querySelector('.productSelect'),
          productCards = document.querySelectorAll('.productCard');       
    productSelect.addEventListener('change', (event)=>{
            const value = event.target.value;
        productCards.forEach((data)=>{
            const dataValue = data.lastElementChild.firstChild.nodeValue;
            data.style.display = value == "全部" ? "block" : value == dataValue ? "block" : "none"
        });
    });
};
//新增carts data & 新增購物車內容
function cartsData(){
    const addCardBtns = document.querySelectorAll('.addCardBtn')  
    addCardBtns.forEach(iteam=>{
        iteam.addEventListener("click", (event)=>{
            event.preventDefault()
              axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`)
                  //新增至data
                   .then(res=>{
                        let a = res.data.carts.find(iteam=> iteam.product.id == event.target.id)
                       if (a){
                        return   axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`,
                               {
                                   "data": {
                                       "productId": event.target.id,
                                       "quantity": a.quantity+=1
                                   }
                               }
                           )
                       }else{
                        return  axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`,
                             {
                                 "data": {
                                     "productId": event.target.id,
                                     "quantity": 1
                                 }
                             }
                         )
                       }
                   })
                   //新增至購物車
                   .then((res) => {
                       chartInit(res)
                  })
                   .catch(err=>{
                       console.log(err)
                   })
        })
    })
}

//點擊刪除全部chart
function deleteAll(){
    const discardAllBtn = document.querySelector(".discardAllBtn")
    discardAllBtn.addEventListener("click", event=>{
        event.preventDefault();
        const shoppingCartTable = document.querySelector('.shoppingCart-table')
        axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`)
            .then(res=>{
                console.log('成功')
                shoppingCartTable.innerHTML = `<tr>
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
                                                    <td>NT$${res.data.finalTotal}</td>
                                                </tr>
                                                `
                
            })
            .catch(err=>{
                console.log('失敗')
            })
    })
}

//刪除指定chart
function clear(){
    const cartClear = document.querySelectorAll(`.cartClear`)
    cartClear.forEach(iteam=>{
        iteam.addEventListener("click",event=>{
            event.preventDefault()
            let deleteId = event.target.id;
            axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/xiang5141/carts/${deleteId}`)
                .then(res=>{
                    chartInit(res)
                })
                .catch(err=>{
                    console.log(`失敗`, err)
                })
        })
    })
}
//購物車init
function chartInit(res) {
        const shoppingCartTable = document.querySelector('.shoppingCart-table').lastChild;
        let b = "";
        let c = "";
        //title
        shoppingCartTable.innerHTML = `<tr>
                                                              <th width="40%">品項</th>
                                                              <th width="15%">單價</th>
                                                              <th width="15%">數量</th>
                                                              <th width="15%">金額</th>
                                                              <th width="15%"></th>
                                                            </tr>`

        //購物車項目                      
        res.data.carts.forEach(iteam => {
            b += `
                                          <tr id="iteam">
                                             <td>
                                               <div class="cardItem-title">
                                                 <img src="${iteam.product.images}" alt="">
                                                 <p>${iteam.product.title}</p>
                                               </div>
                                             </td>
                                             <td>NT$${iteam.product.price}</td>
                                             <td>${iteam.quantity}</td>
                                             <td>NT$${iteam.quantity * iteam.product.price}</td>
                                             <td class="discardBtn">
                                               <a href="#" id="${iteam.id}" class="material-icons cartClear">
                                                 clear
                                               </a>
                                             </td>
                                         </tr>
                                         `
        });

        //刪除&購物車總金額
        c = `<tr>
                           <td>
                               <a href="#" class="discardAllBtn">刪除所有品項</a>
                           </td>
                           <td></td>
                           <td></td>
                           <td>
                               <p>總金額</p>
                           </td>
                           <td>NT$${res.data.finalTotal}</td>
                       </tr>`

        shoppingCartTable.innerHTML += b + c; 
        deleteAll()
        clear()
}

//驗證form資料是否填寫 & 上傳購物車項目
 function checkform(){
     const orderInfoBtn = document.querySelector(".orderInfo-btn"),
           orderInfoInput = document.querySelectorAll(".orderInfo-input");
     let formValue = [];
     orderInfoBtn.addEventListener("click",event=>{
         event.preventDefault();
         orderInfoInput.forEach(iteam => {   
             formValue.push(iteam.value)
            });
            console.log(formValue)
         if(formValue.filter(iteam=> iteam=="").length>0){
            formValue = [];
            alert("請正確填寫")
            return;
         }   
         axios.post(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/orders
     `,{
                 "data": {
                     "user": {
                         "name": formValue[0],
                         "tel": formValue[1],
                         "email": formValue[2],
                         "address": formValue[3],
                         "payment": formValue[4]
                     }
                 }
         })
          .then(res=>{
              formValue = [];
              // 清空購物車
              chartInit({data : {carts :[] , finalTotal : 0}});
              orderInfoInput[0].value=""
              orderInfoInput[1].value = ""
              orderInfoInput[2].value = ""
              orderInfoInput[3].value = ""
              orderInfoInput[4].value = "ATM"
             
          })
          .catch(err=>{
              formValue = [];
              alert("購物車無商品" ,err)
          })
     })
 }

//後台data 取得
//   axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
//       headers: {
//           authorization: "t2cMK7akXXP629pP931BTAyGPf62"
//       }
//   })
//       .then(res => {
//           console.log(res.data)
//       })
//       .catch(err => {
//           console.log("失敗取得", err)
//       })

//刪除後台data
//  axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
//      headers: {
//          authorization: "t2cMK7akXXP629pP931BTAyGPf62"
//      }
//  })
//      .then(res => {
//          console.log(res.data)
//          console.log("成功取得")
//      })
//      .catch(err => {
//          console.log("失敗取得", err)
//      })
