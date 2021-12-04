const router = require("express").Router()
const orderController = require('../controller/order-controller')
const auth = require(".././middleware/authmw")
// router.get("/", auth, orderController.getMyOrders) // -> TODO:?
router.post("/create", orderController.create)
router.get("/active",auth, orderController.getActiveOrders)
router.get("/:id", orderController.getOrder)
router.patch("/edit-status/:id", orderController.editStatus)
router.patch("/cancel-order/:id",orderController.cancelOrder)
router.put("/edit/:id", orderController.edit)


module.exports = router