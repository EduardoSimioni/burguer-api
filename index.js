const { response } = require('express')
const express = require('express')
const uuid = require('uuid')

const app = express()
app.use(express.json())

const orders = []

const checkRoute = (request, response, next) => {
    const methods = request.method
    const path = request.path
    console.log(`
    Method: ${methods}, 
    path: ${path}`)
    next()
}

const checkOrderId = (request, response, next) => {
    const {id}   = request.params
    const index = orders.findIndex(order => order.id === id)
    
    if (index < 0) {
      return response.status(404).json({ error: "User not found" })
    }
    
    request.orderIndex = index
    request.orderId = id
    next()
}

app.get('/orders', checkRoute,(request, response) => {
    request.params
    return response.status(201).json(orders)
})

app.post('/orders', checkRoute,(request, response) => {
    const { order, clientName, value, status } = request.body

    const allOrder = { id: uuid.v4(), order, clientName, value, status }

    orders.push(allOrder)

    return response.status(201).json(allOrder)
})

app.put('/orders/:id', checkOrderId, checkRoute,(request, response) => {  
    const { id, order, clientName, value, status } = request.body
    const index = request.orderIndex
    
    const updatedOrder = {id, order, clientName, value, status }
    
    orders[index] = updatedOrder
    
    return response.json(updatedOrder)
})

app.delete('/orders/:id', checkOrderId, checkRoute,(request, response) => {
    const index = request.orderIndex

    orders.splice(index,1)

    return response.status(204).json(orders)
})

app.get('/orders/:id', checkOrderId,checkRoute,(request, response) => {
    const index = request.orderIndex

    return response.status(201).json(orders[index])
})

app.patch('/orders/:id', checkOrderId, checkRoute,(request, response) => {
    const { id } = request.params
    const index = request.orderIndex

    const  {order, clientName, value} = orders[index]

    const updatedOrder = {id, order, clientName, value, status: "Pronto" }

    orders.splice(index,1, updatedOrder)

    return response.status(200).json(updatedOrder)
    
})

app.listen(3000, () => {
    console.log('🚀Server started on port 3000🚀')
})