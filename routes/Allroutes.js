const express = require("express");
const router = express.Router();
const actions = require("../controller/Actions")





router.get("/alluser",actions.GetAllUser);
router.get("/allusersort",actions.SortBYName)
router.post("/alluser",actions.CreateUser);
router.delete("/alluser/:id",actions.DeleteById);
router.put("/alluser/:id",actions.UpdateById);


module.exports = router