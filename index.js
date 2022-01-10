const express = require('express')
const uuid = require('uuid')

const app = express()
app.use(express.json())

const allOrders =[]

const checkOrderId = (request, response, next) =>{
    const { id } = request.params

    const index = allOrders.findIndex(order => order.id === id)

    if(index < 0){
        return response.status(404).json({message: "User not found"})
    }

    request.orderIndex = index
    request.orderId = id
    next()
}

const checkRoute = (request, response, next) =>{
    const method = request.method
    const url = request.path 
    console.log(`Url: ${url};
    Method: ${method}`)
    next()
}

app.get('/allOrders', checkRoute, (request, response) => {  
    return response.json(allOrders)
})

app.post('/allOrders', checkRoute, (request, response) => {  
    const {completeOrder, clientName, value} = request.body
   
    const order = { id: uuid.v4(), completeOrder, clientName, value, status:"Em preparação"}

    allOrders.push(order)
    
    return response.status(201).json(order)
})

app.put('/allOrders/:id', checkOrderId, checkRoute, (request, response) => {  
    const { completeOrder, clientName, value, status } = request.body
    const { id }  = request.params
    const index = request.orderIndex
    
    const updatedOrder = { id, completeOrder, clientName, value, status}

    allOrders[index] = updatedOrder

    return response.json(updatedOrder)
 })

app.delete('/allOrders/:id', checkOrderId, checkRoute, (request, response) => {  
    const index = request.orderIndex
    allOrders.splice(index,1)

    return response.status(204).json(allOrders)
})

app.get('/allOrders/:id', checkOrderId, checkRoute, (request, response) => {  
    const { id } = request.params
    const index = request.orderIndex

    const { completeOrder, clientName, value, status } = allOrders[index]

    const viewOrder = { id, completeOrder, clientName, value, status}

    return response.json(viewOrder)
})

app.patch('/allOrders/:id', checkOrderId, checkRoute, (request, response) => {
    const { id } = request.params
    const index = request.orderIndex
    const { completeOrder, clientName, value } = allOrders[index]

    const patchOrder = { id, completeOrder, clientName, value, status:"Pronto" }

    allOrders.splice(index,1,patchOrder)

    return response.json(patchOrder)

})

app.listen(3000, () =>{
    console.log('🚀Server started on port 3000🚀')
})

