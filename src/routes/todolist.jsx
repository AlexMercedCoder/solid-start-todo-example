import { useRouteData, createRouteData, refetchRouteData } from "solid-start";
import { For, createResource } from "solid-js";
import { createRouteAction } from "solid-start/data";
import { redirect } from "solid-start/server";

import Todo from "~/Todo";

// Route Data is where we handle page data pre-fetching
export function routeData() {
  const result = createRouteData(async () => {
    const response = await fetch("http://localhost:3000/api/todo");
    return await response.json();
  });

  console.log(result)
  return result
}

export default function TodoList() {

  let textInput; // for holding form input

  // retrieve the pre-fetched data
  const todos = useRouteData();

  // Create an Action for when a form is filled out
  const [result, createTodo] = createRouteAction(async (message) => {
    Todo.create({
      message,
      done: false,
    });
    console.log(Todo.data);
  });

  // function for handling submission of form
  const handleSubmit = (event) => {
    console.log("submit")
    event.preventDefault();
    createTodo(textInput.value)
    refetchRouteData()
  };

  // console.log(todos());

  return (
    <main>
      <For each={todos()}>
        {(todo) => (
          <li class={todo.done ? "done" : "notdone"}>{todo.message}</li>
        )}
      </For>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" ref={textInput} />
        <input type="submit" value="create new todo" />
      </form>
    </main>
  );
}