import Cart from '../../Schema/cartSchema.js';
import Product from '../../Schema/productSchema.js';

export const addCart = async (req, res) => {
    const { quantity } = req.body || {};
    const {id: productId} = req.params;
    const reqUid = req.user._id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ message: "Product not found!" });
        }

        let cartItem = await Cart.findOne({ userId: reqUid });

        const itemQuantity = quantity || 1;
        const totalItemPrice = product.price * itemQuantity;

        if (!cartItem) {
            const newCart = new Cart({
                userId: reqUid,
                products: [{
                    productId: productId,
                    quantity: itemQuantity,
                    totalItemPrice,
                    price: product.price
                }],
                totalCartPrice: totalItemPrice
            });

            await newCart.save();
            return res.status(201).json({ message: "Product added to cart successfully" });
        }

        const existingCartItem = cartItem.products.find(item =>
            item.productId.toString() === productId
        );

        if (existingCartItem) {
            existingCartItem.quantity += itemQuantity;
            existingCartItem.totalItemPrice = existingCartItem.quantity * product.price;
        } else {
            cartItem.products.push({
                productId: productId,
                quantity: itemQuantity,
                totalItemPrice,
                price: product.price
            });
        }

        cartItem.totalCartPrice = cartItem.products.reduce(
            (sum, item) => sum + item.totalItemPrice,
            0
        );

        await cartItem.save();
        return res.status(200).json({ message: "Product added/updated in cart successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
