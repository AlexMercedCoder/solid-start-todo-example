import mongoose from "mongoose"

//connect to local mongoose server
mongoose.connect("mongodb+srv://temp:temp@cluster0.jcziwdf.mongodb.net/solidstart?retryWrites=true&w=majority")

// connection messages
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Connected to Mongoose"))
.on("error", (error) => console.log(error))

// todo model
const todoSchema = mongoose.Schema({
    message: String,
    done: Boolean
}, {timeStamps: true})

// OUR TODO MODEL
const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema)

const result = await Todo.create({message: "Breakfast", done: false})

console.log(result)

export default Todo