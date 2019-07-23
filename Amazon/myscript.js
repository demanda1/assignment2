let i=0;
let id='';
let j=0;
function getitems(){
    url="http://localhost:1234/items"
    fetch(url).then(res=>res.json()).then(items=>{
        createList(items)
    })
}

function createList(data){
    let rows = '';
    data.items.forEach(u => {
        j++
        rows += `<tr>
                    <td id="itemid${j}">${u.id}</td>
                    <td>${u.name}</td>
                    <td>${u.description}</td>
                    <td>${u.price}</td>
                    <td><input type="button" class="btn btn-success" value="Buy" id="button" onclick="addToCart(${j})"></td>
                </tr>`
    });
    const table = `<table class="table table-bordered"><tr>
                    <th>ID</th>
                   <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th></th>
                    </tr> ${rows}
                    </table>`

    document.getElementById("list").innerHTML=table
}

function addToCart(id){
    document.getElementById("itemnumber").innerText= ++i
    itemid=id
    console.log(itemid)
    url="http://localhost:1234/cartlist/add"
    fetch(url,{
        headers:{
            "id":`${itemid}`,
            "content-type":"application/json"
        }
    }).then(res=>{
        console.log("reach")
        alert("item added successfully")
    })
}