import userModel from "../models/userModel.js"

//add item to user cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        const cartData = await userData.cartData
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1;
        }

        

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.status(200).json({
            success: true,
            message: 'Added to cart'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

//remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        const cartData = await userData.cartData

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.status(200).json({
            success: true,
            message: 'Remove Item Successfully'
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

//get all items of user cart
const getCartItems = async (req, res) => {
    console.log('req.body ===================',req);
    
    try {
        const userData = await userModel.findById(req.userId);
        const cartData = userData.cartData

        res.status(200).json({
            success: true,
            message: 'Fetch Cart Data successfully',
            cartData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export { addToCart, removeFromCart, getCartItems }