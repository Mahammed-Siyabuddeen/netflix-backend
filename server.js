var http=require('http')
const express=require('express')
const cores=require('cors')
const nodemailer=require('nodemailer')
const bodyparser=require('body-parser')
const stripe=require('stripe')('sk_test_51MDnf1SGSXt8TKLFLkF5VFqVnmFkMkBNBrduknoIqWHyjhH2rk5ZK4bkoFnyn7MVaamGylR9ldZNc1RWA5LoJz5f002vAv7rpt')
const app=express()
const port=process.env.PORT || 7000
app.use(cores({origin:true}))
app.use(express.json())

const jsonParser=bodyparser.json()

app.get('/',(req,res)=>{
    res.end('hello wolrd')
})
app.get('/',(request,responce)=>responce.status(200).send('hello wolrd'))

app.post('/payments/create',async(req,res)=>{
    console.log(req.body);
    const total=Math.round(req.body.total)
    console.log('payment request proseed for this amount >>>>',total)
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:'inr'
    })
    res.status(201).send({
        clientSecret:paymentIntent.client_secret

    })
})
app.post('/sendmail',jsonParser,async(req,res)=>{
    const {name,phoneNumber,address,details,}=req.body
    try {
        let transporter=nodemailer.createTransport({
           service:'hotmail',
           auth:{
               user:'help.paircare@outlook.com',
               pass:'#Shi2019326/'
           }
        })
        let info=await transporter.sendMail({
           from:'help.paircare@outlook.com',
           to:'help.paircare@outlook.com',
           subject:'hi',
           text:`name :${name} \nphoneNumber :${phoneNumber}\naddress:${address} \ninformation:${details}`,
            
        })
        console.log('info :',req.body)
        return res.status(200).send({data:'successfully send'})
    } catch (error) {
        console.log(error.message)
        return re.status(400).send({message:'fails'})
        
    }
  
})


app.listen(port,()=>{
    console.log('app successfully run with port '+port)
})
