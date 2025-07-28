import router  from 'express'
  


const allApis = router()

const apis = [
    {
    name: 'user',
    description: 'User Related Apis',
    endpoints: [
        'http://localhost:4000/api/user/create',
        'http://localhost:4000/api/user/login',
        'http://localhost:4000/api/user/logout',
        'http://localhost:4000/api/otp/verify',
        'http://localhost:4000/api/otp/resend',
    ]
}, 
{
    name: 'product',
    description: 'Product Related Apis',
    endpoints: [
        'http://localhost:4000/api/product/create',
        'http://localhost:4000/api/products',
        'http://localhost:4000/api/product/:id',
    ]
}, 
{
    name: 'cart',
    description: 'Cart Related Apis',
    endpoints: [
        'http://localhost:4000/api/cart/add/:id',
        'http://localhost:4000/api/cart/view',
        'http://localhost:4000/api/cart/update/:id',
        'http://localhost:4000/api/cart/delete/:id',
    ]
},
{
    name: 'Upload',
    description: "File upload Apis",
    endpoints: [
        'http://localhost:4000/api/file/view/',
        'http://localhost:4000/api/file/upload',
        'http://localhost:4000/api/file/edit/:id',
        'http://localhost:4000/api/file/deleteid/:',
    ]
}
]

allApis
.get('/', (req,res)=>{
    res.status(200).send({apis})
})




export default allApis;

