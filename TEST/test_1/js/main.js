
$(document).ready(function(){
    let products = [
        {
            id: 1,
            name:'Banana',
            price:5000,
            stock:200,
            img:'',
        },
        {
            id: 2,
            name:'Mango',
            price:4000,
            stock:200,
            img:'',
        },
        {
            id: 3,
            name:'Apple',
            price:5000,
            stock:200,
            img:'',
        },
        {
            id: 4,
            name:'Potato',
            price:3500,
            stock:200,
            img:'',
        },
        {
            id: 5,
            name:'Tomato',
            price:3000,
            stock:200,
            img:'',
        },
        {
            id: 6,
            name:'Durian',
            price:30000,
            stock:200,
            img:'',
        },

    ];


    products.map( (product) => {
        $("#product_container").append(
            '<div class="col-sm-6 col-md-4 col-lg-3 my-2">'+
             '<div class="card">'+
              '<img class="card-img img-fluid" src="https://picsum.photos/200" alt="Card image">'+
              '<div class="card-body">'+
                '<h4 class="card-title">'+ product.name +'</h4>'+
                '<div class="product_detail my-2">'+
                  '<span class="card-text text-danger  ">Price : '+ product.price +'</span>'+
                  '<small class="card-text text-primary">Stock : '+ product.stock +'</small>'+
                '</div>'+
                '<button onclick=addToCart('+product.id+') id="addToCartBtn" class="btn btn-warning">Add to cart</button>'+
              '</div>'+
            '</div>'+
          '</div>'
        )

        
    });


    if(sessionStorage.getItem('products')){
        cartItems = JSON.parse(sessionStorage.getItem('products'));
    }
    else{
        cartItems = []
    }

    // loadCartItems()


    addToCart = (id) => {

        let product = products.find(product => product.id === id); //<<< get the specific item from button in HMTL code, with id is parameter.

        // console.log(product)

        let cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            quantity: 0,
        }
        // console.log(cartItem)


        if(!isInside(cartItem,cartItems)){ // <<< check if this item is already inside the cart list!

            cartItem.quantity = 1 //<<< set default for all item in cart list = 1 for the first time adding in.

            cartItems.push(cartItem); //<<< put item into the list if it is not in the cart list
            // console.log('added!')
            // console.log(cartItems)
        }
        else {
            // console.log('Da co roi !')
            item1 = cartItems.findIndex((item => item.id == id)) // <<< Get current item  INDEXX to do the update if it already exist in the cart list
            // console.log('before:' + cartItems[item1].quantity)
            cartItems[item1].quantity += 1; //<<< update quantity of existing item
            cartItems[item1].stock -= 1;//<<< stock -1 
            // console.log('after:' + cartItems[item1].quantity)
        }
        sessionStorage.setItem('products', JSON.stringify(cartItems)); //<<< put into the sessionStrorage so the data only gone if you close the browser tab,

        loadCartItems() //<<< update list UI
    };

    // This function is use to check if an object is inside an array => true or not => false 
    isInside = (item,arr) =>{
        check = false;
        if(arr){
            arr.forEach(arrItem => {
                JSON.stringify(arrItem.id)===JSON.stringify(item.id) ? check = true :  check;
            });
        }
        return check;
    }


    // this is where we use the render and re-render the cart in UI ( HTML ) .
    loadCartItems = () =>{
        console.log(cartItems.length)
        if(cartItems.length > 0){
            $(".emptyCart").hide();
            $(".cart-table").show();
            $('.totalPrice').show();
            var cardItems1 = [];
            $("#cartBody").html('')
            var totalPrice = 0
            cardItems1.concat(cartItems).map( (item,index) =>{
                totalPrice = totalPrice + (item.quantity*item.price)
                $("#cartBody").append('<tr> <th scope="row">'+(index+1)+'</th> <td>'+item.name+'</td> <td><input min=1 max='+item.stock+' type="number" onchange="updateCartItem(this.value,'+item.id+')" name="" class="cartItemQuantity" value="'+item.quantity+'"></td> <td>'+item.price+'</td> <td><button onclick="removeCartItem('+item.id+')" class="btn btn-danger">Delete &CircleTimes;</button></td> </tr>');
            })
            $("#totalPrice").html(totalPrice)
        }
        else{
            $(".emptyCart").show();
            $(".cart-table").hide();
            $('.totalPrice').hide();

        }
    }




    // This function will update the quantity of the items inside cartlist when we change the quantity from the input box.
    updateCartItem = (value,id) =>{
        item1 = cartItems.findIndex((item => item.id == id))
        cartItems[item1].quantity = parseInt(value);
        sessionStorage.setItem('products', JSON.stringify(cartItems));
        loadCartItems()
    }


    // Function to handle the remove action .
    removeCartItem = (id) =>{
        item1 = cartItems.findIndex((item => item.id === id)) //<<< get the index by ID
        cartItems.splice(item1,1); //<<< cut out 1 item at index position [item1] , 
        // console.log(cartItems)
        // cartItems=[];
        sessionStorage.removeItem('products'); //<<< remove old data ( which is the data before delete )
        // cartItems=cartItems.concat(removedArr)
        sessionStorage.setItem('products',JSON.stringify(cartItems)); // <<< update the data with the array and the item is deleted
        loadCartItems() // <<< update the UI
    }

    
    

});

