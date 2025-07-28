import Cart from '../../Schema/cartSchema.js'


export const viewCart = async (req, res) => {
    try{
        const cart = await Cart.find().populate('products.productId', '-userId')
        res.status(200).json(cart)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
