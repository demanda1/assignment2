j=0;
num=0;
finalprice=0;
function getitems(){
        url="http://localhost:1234/cartlist"
        fetch(url).then(res=>res.json()).then(cart=>{
            createList(cart)
            console.log(cart.cart.length)
            for(i=1;i<=cart.cart.length;i++){
                finalprice+=parseInt(document.getElementById(`total${i}`).innerText)
            }
            console.log(finalprice)
            document.getElementById('finalprice').innerText=finalprice
        })
    }
    
    function createList(data){
        let rows = '';
        data.cart.forEach(u => {
            j++;
            num++
            rows += `<tr>
                        <td id="name${j}">${u.name}</td>
                        <td id="des${j}>${u.description}</td>
                        <td id="quant${j}"><input type="button" value="-" id="btn${j}" onclick="change('dec',${j},${parseInt(u.price)},${u.total})"><span id="quantity${j}">${u.quantity}</span><input type="button" value="+" onclick="change('inc',${j},${u.price},${u.total})"></td>
                        <td id="price${j}">${parseInt(u.price)}</td>
                        <td id="total${j}">${parseInt(u.price)*parseInt(u.quantity)}</td>
                        
                    </tr>`
        });
        const table = `<table><tr>
                       <th>Product Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Price</th>
                        <th></th>
                        </tr> ${rows}
                        </table>`
    
        document.getElementById("cartlist").innerHTML=table
    }

    function change(op,id,price,total){
        finalprice=0;
        c=parseInt(document.getElementById(`quantity${id}`).innerText)
        p=parseInt(document.getElementById(`total${id}`).innerText)
        console.log(c)
        if(op=='dec'&& c!=0){
        document.getElementById(`quantity${id}`).innerText=--c
        document.getElementById(`total${id}`).innerText=p-price
        }
        if(op=='inc'){
            document.getElementById(`quantity${id}`).innerHTML=++c
            document.getElementById(`total${id}`).innerText=p+price
            }
            for(i=1;i<=num;i++){
                finalprice+=parseInt(document.getElementById(`total${i}`).innerText)
            }
            console.log(finalprice)
            document.getElementById('finalprice').innerText=finalprice

     }

    function checkout(){
       let data = {
           items : []
       }
       
        url="http://localhost:1234/cartlist"
        fetch(url)
        .then(res=>res.json())
        .then(cart=>{
            
            for( i=1;i<=cart.cart.length;i++){
               data.items.push({
                name : document.getElementById(`name${i}`).innerText,
               price : document.getElementById(`price${i}`).innerText,
               quantity : document.getElementById(`quantity${i}`).innerText,
               finalprice  : document.getElementById(`finalprice`).innerText
            });

            }
            const requestData = JSON.stringify(data);
            console.log(requestData);
            url2="http://localhost:1234/cartlist/mail"
            fetch(url2,{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body: requestData
            })
            .then(res=>res.json())
            .then(res=>{
                console.log("gggg")
            })
        })

    }
