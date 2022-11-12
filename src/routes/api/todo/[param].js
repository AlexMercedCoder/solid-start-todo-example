import { json } from "solid-start"
import Todo from "~/connection"

export async function POST({params}){
    console.log(params)
    const result = await Todo.create({
        message: params.param,
        done: false
    })

    console.log(result)

    return json({message: "complete"})
}

export async function PUT({param}){
    const result = await Todo.findByIdAndUpdate(param.param,{
        done: true
    })

    return json({message: "complete"})
}