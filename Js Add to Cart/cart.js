let lable = document.getElementById('lable');
let shopingcart = document.getElementById('shoping-cart'); 
let basket=JSON.parse(localStorage.getItem("data")) || [];

let calculation =()=>{
    let carticon = document.getElementById('cart-amt')

    carticon.innerHTML= basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}
calculation();
let generatecartItem = ()=>{
    if(basket.length != 0){
return (shopingcart.innerHTML=basket.map((x)=>{
    let {id,item} = x;
    let search = shopItemData.find((y)=>y.id === id) ||[];
    return `
<div class="cart-item">
<img width="100" src="${search.img}"/>
<div class="details">
<div class="title-price-x">
<h4 class="tittle-price">
<p>${search.name}</p>
<p class="cart-item-price">${search.price}</p>
</h4>

<i onclick=" removeitem(${id})" class="bi bi-x-lg"></i>
</div>
<div class="buttons">
    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i> 
     <div id=${id} class="qty">
     ${item}
     </div>
     <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>
      </div>
    <h3>
    $${item*search.price}
        </h3>
</div>
</div>
`
}).join(""))
        
    }else{
        shopingcart.innerHTML=` `
        lable.innerHTML=`
        <h2>Cart Is empty</h2>
        <a href="index.html">
        <button class="home">Back to Home</button>
        </a>`
    }
}
generatecartItem();
let increment = (id)=>{
    let selectedItem = id;
    let search =basket.find((x)=>x.id === selectedItem.id);
    if(search === undefined){
        basket.push({
            id:selectedItem.id,
            item: 1,
        });
    }else{
        search .item+=1;
    }
    generatecartItem();
    //console.log(basket);
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket)); 
    }
    let decrement = (id)=>{
        let selectedItem = id;
        let search =basket.find((x)=>x.id === selectedItem.id);
       if(search ===undefined) return;
       else if(search.item === 0) return;
        else{
            search .item-=1;
        }
        update(selectedItem.id);
        basket = basket.filter((x)=>x.item !== 0);
        generatecartItem();
        localStorage.setItem("data",JSON.stringify(basket)); 
    }
    let update =(id)=>{
        let search = basket.find((x)=> x.id === id)
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalamt();
    }
    let removeitem=(id)=>{
let selectedItem = id;
console.log(selectedItem.id);
basket = basket.filter((x)=>x.id !== selectedItem.id)
generatecartItem();
totalamt();
calculation();
localStorage.setItem("data",JSON.stringify(basket)); 
    }
    let ClearCart =()=>{
        basket=[];
        generatecartItem();
        calculation();
        localStorage.setItem("data",JSON.stringify(basket));
    }

let totalamt=()=>{
    if(basket.length !== 0){
        let amt = basket.map((x)=>{
            let {item,id} = x;
            let search = shopItemData.find((y)=>y.id === id) ||[];
            return item * search.price;
            
        }).reduce((x,y)=>x+y,0);
     ///   console.log(amt);
     lable.innerHTML = `
     <h2> Total Bill : $ ${amt}</h2>
     <button class="checkout">CheckOut</button>
     <button onclick="ClearCart()" class="removeAll">Clear Cart</button>
     `
    }else return;
    }
    totalamt();
    