import Cart from '../../Schema/cartSchema.js';
import Product from '../../Schema/productSchema.js';

export const updateCart = async (req, res) => {
  const { Pid } = req.params; 
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const product = await Product.findById(Pid);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedCartItem = await Cart.findOneAndUpdate(
      { userId: req.user._id, 'products.productId': Pid },
      { 
        $set: {
          'products.$.quantity': quantity,
          'products.$.totalItemPrice': quantity * product.price
        }
      }, 
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

  
    updatedCartItem.totalCartPrice = updatedCartItem.products.reduce(
      (sum, item) => sum + item.totalItemPrice,
      0
    );

    await updatedCartItem.save();

    res.status(200).json({ message: "Cart updated", cart: updatedCartItem });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
