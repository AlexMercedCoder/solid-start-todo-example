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

  // Create an Action for when a form is filled out
  // const [result, createTodo] = createRouteAction(async (message) => {
  //   console.log("adding")
  //   const response = await fetch(`http://localhost:3000/api/todo/${message}`, {
  //     method: "POST"
  //   })
  //   const result = await response.json()
  //   console.log(result)
  // });

  // function for handling submission of form
  const handleSubmit = async (event) => {
    console.log("submit");
    const response = await fetch(
      `http://localhost:3000/api/todo/${textInput.value}`,
      {
        method: "POST",
      }
    );
    const result = await response.json();
    refetchRouteData();
  };

  // console.log(todos());

  return (
    <main>
      <For each={todos()}>
        {(todo) => (
          <li class={todo.done ? "done" : "notdone"}>{todo.message}</li>
        )}
      </For>

        <input type="text" name="message" ref={textInput} />
        

    </main>
  );
}
