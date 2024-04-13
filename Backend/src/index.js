const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = 4000;
const secretKey = "hello";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded;
  });
  next();
};

app.use(express.json());
app.use(cors());
app.use("/add", verifyToken);
app.use("/delete", verifyToken);
app.use("/getTodo", verifyToken);

let db;
let uri =
  "mongodb+srv://reachallenbastian:Daiveekam@cluster0.xos1nn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    db = client.db("todo");
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    const userCollection = db.collection("users");
    const exist = await userCollection.findOne({ username, password });
    console.log(exist);

    if (exist) {
      jwt.sign({ username }, secretKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.status(500).json({ error: "Failed to generate token" });
        } else {
          res.json({ token });
        }
      });
    } else {
      res.send("incorrect");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", async (req, res) => {
  console.log("in add");
  const username = req.user.username;
  const newTask = req.body.lastElement;
  console.log(username);
  await db
    .collection("tasks")
    .updateOne(
      { username: username },
      { $push: { tasks: newTask } },
      { upsert: true }
    );
});

app.post("/delete", async (req, res) => {
  console.log("in delete");
  const username = req.user.username;
  const taskToDelete = req.body.toDelete;
  await db
    .collection("tasks")
    .updateOne({ username: username }, { $pull: { tasks: taskToDelete } });

   
});

app.get("/getTodo",async (req,res)=>{
  console.log("in ger")
  const username = req.user.username
  const result =  await db.collection("tasks").findOne({username})
  console.log(result)
  toSend = result === null ? null : result.tasks
  res.send(toSend)
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
