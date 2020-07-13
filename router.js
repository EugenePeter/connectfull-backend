const apiRouter = require("express").Router();
const cors = require("cors");

apiRouter.use(cors());

const userController = require("./controllers/userController");

apiRouter.get("/", (req, res) =>
  res.json(
    "Hi, if you can see this message that means your backend is up and running succesfully"
  )
);

apiRouter.post("/login", userController.apiLogin);
apiRouter.post("/register", userController.apiRegister);

module.exports = apiRouter;
