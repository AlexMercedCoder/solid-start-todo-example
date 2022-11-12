import { useRouteData, createRouteData, refetchRouteData } from "solid-start";
import { For, createResource } from "solid-js";
import { createRouteAction } from "solid-start/data";
import { redirect } from "solid-start/server";

// Route Data is where we handle page data pre-fetching
export function routeData() {
  const result = createRouteData(async () => {
    const response = await fetch("http://localhost:3000/api/todo");
    return await response.json();
  });

  console.log(result);
  return result;
}

export default function Home() {
  let textInput; // for holding form input

  // retrieve the pre-fetched data
  const todos = useRouteData();

  // Create an Action for when a form is filled out (via button click)
  const [result, createTodo] = createRouteAction(async (message) => {
    console.log("adding")
    const response = await fetch(`http://localhost:3000/api/todo/${message}`, {
      method: "POST"
    })
    const result = await response.json()
    refetchRouteData()
  });

  // trying to use route action Form component
  const [_, { Form }] = createRouteAction(async (formData) => {
    console.log("adding")
    const response = await fetch(`http://localhost:3000/api/todo/${formData.get("message")}`, {
      method: "POST"
    })
    const result = await response.json()
    refetchRouteData()
  })

  // function for handling submission of form or button click
  const handleSubmit = (event) => {
    console.log("submit");
    fetch(`http://localhost:3000/api/todo/${textInput.value}`, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then(() => refetchRouteData());
  };

  // simple function for testing click event
  function simple(){
    console.log("hello")
  }

  console.log(simple)


  return (
    <main>
      <For each={todos()}>
        {(todo) => (
          <li class={todo.done ? "done" : "notdone"}>{todo.message}</li>
        )}
      </For>

      <Form>
      <input type="text" name="message"/>
      <input type="submit"/>
      </Form>

      <input type="text" name="message" ref={textInput} />
      <button
        onClick={handleSubmit}
      >
        New Todo
      </button>
    </main>
  );
}
