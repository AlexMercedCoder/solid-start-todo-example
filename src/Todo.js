import Todo from "./connection"

export default {
    // starting array of todos
    data: [
        {message: "Breakfast", done: false},
        {message: "Lunch", done: false}
    ],

    // function to create a new todo
    create: function(todo){
        this.data.push(todo)
    } ,

    // function to mark a todo complete
    complete: function(index){
        this.data[index].done = !this.data[index].done
    }
}