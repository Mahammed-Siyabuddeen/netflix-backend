var http=require('http')
const express=require('express')
const cores=require('cors')
const stripe=require('stripe')('sk_test_51K8OhASItmU7WYKcoDVmaWfDFB049Tg3iWigsd1pNM6nzqOlGD3jkdlm7n7KAsTdM5tr6O2Chvb11Y2nkVKK2rBo00K853BqFq')
const app=express()
const port=7000
app.use(cores({origin:true}))
app.use(express.json())
app.get('/',(req,res)=>{
    res.end('hello wolrd')
})
app.get('/',(request,responce)=>responce.status(200).send('hello wolrd'))

app.post('/payments/create',async(req,res)=>{
    const total=req.query.total
    console.log('payment request proseed for this amount >>>>',total)
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:'inr'
    })
    res.status(201).send({
        clientSecret:paymentIntent.client_secret

    })
})



app.listen(port,()=>{
    console.log('app successfully run with port '+port)
})