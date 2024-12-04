import './assets/scss/all.scss';
const api_path = "xiang5141";

get()

//後台data 取得
function get(){
    axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
        headers: {
            authorization: "t2cMK7akXXP629pP931BTAyGPf62"
        }
    })
        .then(res => {
            init(res)
            deleteAll()
            d3(d3data(res))
        })
        .catch(err => {
            console.log("失敗取得", err)
        })
}

//訂單init
function init(res){
    const orderPageTable = document.querySelector(".orderPage-table").lastChild,
        data = res.data.orders;
    let product,
        state;
    orderPageTable.innerHTML = ""
        data.forEach(iteam=>{
            let cus=""
            const time = new Date(iteam.createdAt*1000)
            iteam.paid == false ? state="未處理" : state = "已處理";
            product =iteam.products;
            product.forEach(chart=>{
                 cus += `${chart.title}x${chart.quantity}<br>`
                })
                orderPageTable.innerHTML += `<tr>
                            <td>${iteam.id}</td>
                            <td>
                                <p>${iteam.user.name}</p>
                                <p>${iteam.user.tel}</p>
                            </td>
                            <td>${iteam.user.address}</td>
                            <td>${iteam.user.email}</td>
                            <td>
                                <p>${cus}</p>
                            </td>
                            <td>${time.toLocaleDateString()}</td>
                            <td>
                                <a href="" class="orderStatus">${state}</a>
                            </td>
                            <td>
                                <input type="button" class="delSingleOrder-Btn"
                                       value="刪除">
                            </td>
                                            </tr>`
            })
    changeState(res)
    deletechart(res)
}

//避免id顯示在html
//取得訂單id index paid與對應值
function idMap(data){
     let map = new Map()
     data.forEach((iteam , index)=>{
        map.set(index , {id : iteam.id , state : iteam.paid})
     })
     return map
 }
 //更新訂單狀態
function changeState(res){
     const data = res.data.orders,
           orderStatus = document.querySelectorAll(".orderStatus"),
           map = idMap(data);

     orderStatus.forEach((e,index)=>{
        const maplist = map.get(index),
              id = maplist.id,
              state = maplist.state;

         e.addEventListener("click",event=>{
              event.preventDefault()
              axios.put(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
                  "data": {
                      "id": id,
                      "paid": !state
                  }},{
                      headers: {
                      authorization: "t2cMK7akXXP629pP931BTAyGPf62"
                  }})
              .then(ress=>{
                  console.log("成功put",ress.data)
                  get()
              })
              .catch(err=>{
                  console.log("失敗了白痴" , err)
              })
         })
     })
}

//刪除全部訂單
function deleteAll(){
    const discardAllBtn = document.querySelector(".discardAllBtn")
    discardAllBtn.addEventListener("click", event=>{
        axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
              headers: {
                  authorization: "t2cMK7akXXP629pP931BTAyGPf62"
              }
            })
            .then(res=>{
                alert("已刪除全部定單")
                get()
            })
            .catch(err=>{
                console.log("菜狗失敗了",err)
            })
            
    })
}

//刪除指定訂單
function deletechart(res){
    const data = res.data.orders,
          map = idMap(data),
          delSingleOrderBtn = document.querySelectorAll(".delSingleOrder-Btn")
          delSingleOrderBtn.forEach((iteam,index)=>{
               const  id = map.get(index).id;
               iteam.addEventListener("click" , event=>{
                    axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders/${id}`, {
                        headers: {
                            authorization: "t2cMK7akXXP629pP931BTAyGPf62"
                        }
                    })
                        .then(res => {
                            get();
                        })
                        .catch(err => {
                            console.log("失敗取得", err);
                        })
               })
          })
}

//取得圖表
function d3(data) {
    var chart = c3.generate({
        data: {
            columns:data,
            type: 'pie',
        }
    });
}
//取得圖表所需data
function d3data(res){
    const map = new Map(),
          chart =res.data.orders;
    chart.forEach(iteam=>{
        iteam.products.forEach(iteamProducts=>{
            map.has(iteamProducts.title) ? map.set(iteamProducts.title, (map.get(iteamProducts.title) + iteamProducts.quantity)) : map.set(iteamProducts.title, iteamProducts.quantity)
        })
    })
    let data = Array.from(map).sort((a, b) => b[1] - a[1]);
    if(map.size>4){
        let Num = 0,
            NewData = data.slice(0, 3);
        data.slice(3).forEach(iteam=>{
            let datanum = iteam.pop()
            Num+=datanum
        })
        const other= ["其他" , Num]
        NewData.push(other)
        return NewData
    }
    return data
}

//刪除後台data
   axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`, {
       headers: {
           authorization: "t2cMK7akXXP629pP931BTAyGPf62"
       }
   })
       .then(res => {
           console.log(res.data)
           console.log("成功取得")
       })
       .catch(err => {
           console.log("失敗取得", err)
       })
