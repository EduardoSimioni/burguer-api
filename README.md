# burguer-api

This project is an application that records the orders of a hamburger shop.

It has six routes, one of the put type that shows the list of all requests, and the other of the get type that returns a specific request by id.
It has a post type that registers the order, with the customer's name, the price, and creates a specific id and adds the status "in preparation".
A put-type route that alters the request data by sending the new ones through the request body.
One of the delete type that deletes the order with the sent id.
And finally a patch type that changes the order status from "In Preparation" to "Ready".

It also has two middlewares, one that checks the sent id, and if it is incorrect or non-existent it returns an error message.
And another one that displays the request type and url on the console every time a request is called.



Este projeto é um aplicativo que registra os pedidos de uma lanchonete.

Ele possui seis rotas, uma do tipo put que mostra a lista com todos os pedidos, e outra do tipo get que retorna um pedido específico pelo id.
Possui uma do tipo post que registra o pedido, com o nome do cliente, o preço, e cria um id específico e adiciona o status "em preparação".
Uma rota do tipo put que altera os dados do pedido enviando os novos pelo corpo da requisição.
Uma do tipo delete que deleta o pedido com o id enviado.
E por último uma do tipo patch que muda o status do pedido de "Em preparação" para "Pronto". 

Também possui dois middlewares, um que checa o id enviado, e se estiver incorreto ou for inexistente ele retorna uma mensagem de erro.
E outro que exibe no console o tipo da requisição e a url toda vez que uma requisição é chamada.
