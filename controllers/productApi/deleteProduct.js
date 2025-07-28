import Product from '../../Schema/productSchema.js'



export const deleteProduct = async (req, res) => {
    const {id} = req.params
    try{
        await Product.findByIdAndDelete(id)
        res.status(200).json({message: 'Product deleted from cart successfully'})
    }catch(error){
        res.status(500).json(error)
    }
}