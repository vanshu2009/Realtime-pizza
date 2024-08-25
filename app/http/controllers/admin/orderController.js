const order=require('../../../models/order')

function orderController() {
    return {
        index(req, res) {
            order.find({ status: { $ne: 'completed' } })
                .sort({ createdAt: -1 })
                .populate('customerId', '-password')
                .lean() 
                .exec()
                .then((orders) => {
                    if (req.xhr) {
                        return res.json(orders);
                    } else {
                        res.render('admin/orders', { orders });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ error:
                         'Internal Server Error' });
                });
        }
    };
}

module.exports = orderController;