/*export default class TodoItem{
    constructor(title, description, dueDate, priority){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }

    function toHTML() {
        
    }
    
}*/

// TODO: use this or remove it

let item = TodoItem("a","b","c","d")
console.log(item)
item.title = "the poop"
console.log(item)

export default function TodoItem(id, title, description, dueDate, priority){

    function toHTML(){
        return ``
    }

    return {
        id,
        title,
        description,
        dueDate,
        priority
    }
}