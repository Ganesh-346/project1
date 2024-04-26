import express from 'express'
import bodyParser from 'body-parser'
const app=express()
app.use(bodyParser.json())
const users = [
    { id: 1121, name: 'sai',pass:"qwert"},
    { id: 1122, name: 'ganesh',pass:"qwery"},
    { id: 1123, name: 'Pavan',pass:"qweru"},
    { id: 1124, name: 'pavani',pass:"qweri"},
    { id: 1125, name: 'kishore',pass:"qwero"}
];

const orders = [
    { 
        userId: 1121,
        orderDetails: {
            orderId: 'ORD001',
            products: ['Product1'],
            totalAmount: 100
        }
    },
    { 
        userId: 1121,
        orderDetails: {
            orderId: 'ORD002',
            products: ['Product1', 'Product2'],
            totalAmount: 200
        }
    },
    { 
        userId: 1121,
        orderDetails: {
            orderId: 'ORD003',
            products: ['Product1', 'Product2', 'Product2'],
            totalAmount: 300
        }
    },

    { 
        userId: 1122,
        orderDetails: {
            orderId: 'ORD001',
            products: ['Product1', 'Product2'],
            totalAmount: 50
        }
    },

    { 
        userId: 1122,
        orderDetails: {
            orderId: 'ORD002',
            products: ['Product3', 'Product4'],
            totalAmount: 150
        }
    },
    { 
        userId: 1123,
        orderDetails: {
            orderId: 'ORD001',
            products: ['Product1', 'Product2'],
            totalAmount: 150
        }
    },
    { 
        userId: 1123,
        orderDetails: {
            orderId: 'ORD002',
            products: ['Product3', 'Product4'],
            totalAmount: 150
        }
    },
    { 
        userId: 1124,
        orderDetails: {
            orderId: 'ORD001',
            products: ['Product1', 'Product2'],
            totalAmount: 50
        }
    },
    { 
        userId: 1124,
        orderDetails: {
            orderId: 'ORD002',
            products: ['Product3', 'Product4'],
            totalAmount: 100
        }
    },
    { 
        userId: 1124,
        orderDetails: {
            orderId: 'ORD003',
            products:'Product1',
            totalAmount: 150
        }
    },
    { 
        userId: 1124,
        orderDetails: {
            orderId: 'ORD004',
            products: ['Product1', 'Product2','Product3'],
            totalAmount: 200
        }
    },
    { 
        userId: 1125,
        orderDetails: {
            orderId: 'ORD001',
            products: ['Product1', 'Product2'],
            totalAmount: 150
        }
    },
    { 
        userId: 1125,
        orderDetails: {
            orderId: 'ORD002',
            products: ['Product1', 'Product2'],
            totalAmount: 150
        }
    },
    { 
        userId: 1125,
        orderDetails: {
            orderId: 'ORD003',
            products: ['Product3', 'Product4'],
            totalAmount: 150
        }
    },
    
];


app.get('/data',(req,res)=>{
    res.send(users)
})

app.post('/add_data',(req,res)=>{
    const user=req.body
    const data={
        "id":user.id,
        "name":user.name,
        "pass":user.pass
    }
    users.push(data)
    res.send(" data added ")
})


app.get('/order',(req,res)=>{
    res.send(orders)
})
app.post('/add_orders',(req,res)=>{
    const order=req.body
    const data={
        "id":order.id,
        "orderdetails":{
        "orderid":order.orderdetails.orderid,
        "product":order.orderdetails.product,
        "totalamout":order.orderdetails.totalamout
        }
        
    }
    
    orders.push(data)
    res.send(" data added ")
})

app.get('/num_of_users',(req,res)=>{
    const Total_users=users.length
    res.send({Total_users})
   console.log(Total_users)
})


app.get('/total_amount',(req,res)=>{

    let total=0
    orders.forEach((data)=>{

        total+=data.orderDetails.totalAmount
    })
    console.log(total)
})


app.get('/num_of_orders/:id',(req,res)=>{
  let userid=  req.params.id;
  let count = 0;

  orders.forEach((data)=>{
    if(data.userId == userid)
    {
        count++;
    }
  })

  console.log(count);
  res.send({count})

})
app.get('/order_list',(req,res)=>{

    let Data = [];

    let list

    const Total_users=users.length
    console.log(Total_users)

    let totalamount=0
    orders.forEach((data)=>{
        totalamount+=data.orderDetails.totalAmount
    })
    console.log(totalamount);

    
    users.forEach((data)=>{
        let userid = data.id
        let count = 0
        orders.forEach((order)=>{
            if(order.userId===userid)
            {
                count++;
            }
        })
        console.log(`userid${userid} and number of orders ${count}`);
      list =  { userId: userid, orderCount: count }
        Data.push(list);
    })

  

    res.send({Total_users,totalamount,Data})

})



app.listen(2013,()=>{
    console.log("server created")
})