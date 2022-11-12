// ~/ = /src/ , this configuration is in the jsoconfig.json
import Todo from "~/connection"
import {json} from "solid-start"

// function for handling get requests to /api/todo
export async function GET(){

    return json(await Todo.find({}))

}

export async function POST({request}){
   const body = await new Response(request.body, { headers: { 'Content-Type': 'application/json' }}).json()

    return json(body)
}