import express from 'express';
import CartManager from '../dao/controllers/cart-manager.js';

const router = express.Router()
const cartManger = new CartManager('./src/dao/models/carrito.json')

router.post("/carts", async (req, res) => {
    try {
        const nuevoCarrito = await cartManger.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

router.get("/carts/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);

    try {
        const carrito = await cartManager.getCarritoById(cartId);
        res.json(carrito.products);
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

router.post("api/carts/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1; 

    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(cartId,productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }

});

router.put('/api/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body; 

    try {
        const cart = await CartModel.findById(cid);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        
        cart.products = products;
        await cart.save();

        res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/api/carts/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await CartModel.findById(cid);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const product = cart.products.find(p => p.product.toString() === pid);
        if (!product) return res.status(404).json({ message: 'Product not found in cart' });

        product.quantity = quantity;
        await cart.save();

        res.status(200).json({ message: 'Product quantity updated', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/api/carts/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await CartModel.findById(cid);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

       
        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();

        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/api/carts/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await CartModel.findById(cid);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.products = []; 
        await cart.save();

        res.status(200).json({ message: 'All products removed from cart', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;