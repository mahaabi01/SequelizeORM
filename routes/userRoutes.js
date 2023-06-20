import express from "express";
const router = express.Router();
import connection from "../models/index.js";
import userModel from "../models/userModel.js";

//create the user
router.post("/add", async (req, res) => {
  const { username, location } = req.body;
  try {
    // const data = await userModel.create({
    //   username: username,
    //   location: location
    // });

    const data = await userModel.bulkCreate(req.body);

    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

//read the user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const data = await userModel.findByPk(id);
    if (data) {
      res.json(data);
    } else {
      res.json([]);
    }
  } else {
    res.json({ success: false, message: "User ID not provided" });
  }
});

//updating the users
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    //
    const { username, location } = req.body;
    const data = await userModel.update(
      {
        username,
        location,
      },
      {
        where: {
          id,
        },
      }
    );
    console.log(data);
    if (data[0]) {
      res.json({ success: true, message: "User Updated !" });
    } else res.json({ success: false, message: "User was not upated, !" });
  } else res.json({ success: false, message: "User unable to updated !" });
});

//delete user
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const data = await userModel.destroy({
      where: {
        id,
      },
    });
    console.log(data);
    if(data){
    res.json({ success: "true", message: "User deleted !" });
    }
    else{
      res.json({ success: "false", message: "Unable to delete  !"});
    }
  } else {
    res
      .status(403)
      .json({ success: "false", message: "User id not provided." });
  }
});

export default router;
