import Product from '../../Schema/productSchema.js'


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('userId', 'username admin _id')
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}





export const getProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const getByQueryParams = async (req, res) => {
    const {name, price, color, size} = req.query 
    const filter = {}
    if (name) filter.name = name
    if (price) filter.price = price
    if (color) filter.color = color
    if (size) filter.size = size


    try{
        const product = await Product.find(filter)
        res.status(200).json(product)
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}