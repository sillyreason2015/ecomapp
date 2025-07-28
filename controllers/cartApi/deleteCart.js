import Cart from '../../Schema/cartSchema.js';

export const deleteItem = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Recalculate totalCartPrice
    cart.totalCartPrice = cart.products.reduce(
      (sum, item) => sum + item.totalItemPrice,
      0
    );
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart successfully', cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCart = async(req,res) => {
    try{
        const cart = await Cart.findOne({userId: req.user._id})
        if(!cart){
           return res.status(400).json({message: "There are no items in cart. Shop Now and Add One!"})
        }
        cart.products = []
        cart.totalCartPrice = 0
        await cart.save()
        res.status(200).json({message: "Cart Deleted Successfully!"})
    }catch(error){
        console.log({message: error.message})
    }
}
