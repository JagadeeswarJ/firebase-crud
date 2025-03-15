const exp = require("express");
const app = exp();
const db = require("./db");
const expressAsyncHandler = require("express-async-handler");
// const jsonParserMiddleware = exp.json();
// app.use(jsonParserMiddleware);
app.use(exp.json());
app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});

app.get("/hi", (req, res) => {
  res.send({ message: "Hello World" });
});
app.get(
  "/get-data",
  expressAsyncHandler(async (req, res) => {
    const userDoc = await db.collection("users").get();
    const users = userDoc.docs.map((doc) => doc.data());
    res.json(users);
  })
);
app.post(
  "/add-data",
  expressAsyncHandler(async (req, res) => {
    const User = db.collection("users");
    const user = req.body;
    await User.add(user).then(() => {
      console.log("User added successfully");
      res.status(200).send({ message: "User added successfully" });
    });
    res.send({ message: `to remove user ${req.body.name}` });
    const userDoc = await db.collection("users").add(a);
  })
);

// delete user
app.post(
  "/rem-data",
  expressAsyncHandler(async (req, res) => {
    const User = db.collection("users");
    const user = req.body;
    const snapShot = await User.where("name", "==", user.name).get();
    if (snapShot.empty) {
      return res.status(404).send({ message: "User not found" });
    } else {
      snapShot.forEach((doc) => {
        User.doc(doc.id).delete();
        console.log(`deleted user ${doc.id}`);
        res.send({ message: `User deleted successfully,${user.name}` });
      });
    }
    // res.send({ message: `to remove user ${req.body.name}` });
  })
);

app.post("/update-data", async (req, res) => {
  const User = db.collection("users");
  const user = req.body;
  const snapShot = await User.where("name", "==", user.name).get();
  if (snapShot.empty) {
    return res.status(404).send({ message: "User not found" });
  } else {
    snapShot.forEach((doc) => {
      User.doc(doc.id).update({ name: req.body.newName });
      console.log(`updated user ${doc.id}`);
    });
    res.send({ message: `User updated successfully,${user.name}` });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
