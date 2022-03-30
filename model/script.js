let cart=[]

    function myHelper( event ) {
       
        console.log(event.target)
        
        
        
        return `<img src='${event.target.src}' class='itemimage'/>`;
      }
    
function render(){
$( ()=>{
    for(let element of items){
        const newitem=$(".item.hidden").clone()
        newitem.removeClass('hidden').appendTo(".menue").children(".itemname").html(`${element.name}`)
        newitem.children(".itemprice").html(`${element.price}`)
        newitem.children(".itemimage").attr("src",element.imagsrc)
        
        $("body").children(".container").children(".menue").children(".item").children(".itemimage").draggable({
            stop: function (event, ui) {
                console.log(ui.position.left)
                if(ui.position.left> 650){
                movetocart($(this).siblings(".buybutton"))
                billrender();
                }
                
            },
            helper:myHelper,
            containment:".container"
        });

    }
}

)}
$(()=>{
    $("body").on("click",".buybutton",function(){
               movetocart($(this))
              billrender();
           })
     $("body").on("click","#quantatiyplus",function(){
            increaseamount($(this))
        })
     $("body").on("click","#quantatiyminus",function(){
        decreaseamount($(this))
        })
        $("body").on("click",".removebutton",function(){
            remove($(this))
            
            })
        
        
})
function movetocart(e){
   $(()=>{
       let carttool= $(".carttool.hiddentool").clone()
       carttool.removeClass('hiddentool')
    let pursheditem=e.parents(".item").clone()
        pursheditem.children(".buybutton").remove()
        $(carttool).appendTo(pursheditem)
        pursheditem.appendTo(".cart")
        $("body").children(".container").children(".cart").children(".item").children(".itemimage").draggable({
            stop: function (event, ui) {
                console.log(ui.position.left)
                if(ui.position.left< 650){
                remove($(this).siblings(".carttool").children(".removebutton"))
                billrender();
                }
                
            },
            helper:myHelper,
            containment:".container"
        });
        let itemname=pursheditem.children(".itemname").html()
        let itemprice=pursheditem.children(".itemprice").html()
        let itemamount=1
        let item={
            name:itemname,
            price:itemprice,
            amount:itemamount
        }
        cart.push(item)

        billrender()
       
   })

}
function increaseamount(e){
    $(()=>{
        let name=e.parent("div").siblings(".itemname").html()
        let amount=Number(e.siblings(".quantatiy.value").html())
        for(let i=0; i<cart.length;i++){
            if(cart[i].name==name && cart[i].amount==amount) {
                         cart[i].amount++ 
                        break
                    }
                    

        }
        amount++
        e.siblings(".quantatiy.value").html(amount)
       
    })
    billrender()
}
function decreaseamount(e){
    $(()=>{
        let name=e.parent("div").siblings(".itemname").html()
        let amount=Number(e.siblings(".quantatiy.value").html())
        if(amount>1){
            
            for(let i=0; i<cart.length;i++){
                if(cart[i].name==name && cart[i].amount==amount) {
                             cart[i].amount-- 
                            break
                        }
                        

            }
            amount--
            e.siblings(".quantatiy.value").html(amount)
        
        }
    })
    billrender()
}
function remove(e){
    $(()=>{
        let name=e.parent("div").siblings(".itemname").html()
        let amount=Number(e.siblings(".quantatiy.value").html())
        e.parent("div").parent(".item").remove()
        for(let i=0; i<cart.length;i++){
            if(cart[i].name==name && cart[i].amount==amount) {
                if (i > -1) {
                    cart.splice(i, 1);
                } 
                        break
                    }
                    

        }

    })
    billrender()
}
function billrender(){
    $(()=>{
        let subtotal=0
        cart.forEach(element => {
            subtotal+=(element.price*element.amount)
        });

        $(".bill").children("#subtotal").html(subtotal+" LE")
        $(".bill").children("#delivery").html("15 LE")
        $(".bill").children("#VAT").html(subtotal*(14/100)+" LE")
        $(".bill").children("#ordertoal").html(((subtotal*1.14)+15)+" LE")

        

        
        
    })
}

render()