import Product from '../../Schema/productSchema.js'


export const createProduct = async (req, res) => {
   const {name, price, color, size} = req.body
   const reqId = req.user._id
   if (!name || !price || !color || !size){
    return res.status(400).json({message: 'All fields are mandatory'})
   }
    try{
        const newProduct = new Product ({...req.body, userId: reqId})
        await newProduct.save()
        res.status(201).json({message: 'New Product created succesfully'})
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}