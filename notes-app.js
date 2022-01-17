// const uuidv4 = require("./uuidv4")

let notes = [{
    title: "Mo next trip",
    body: "I want to got to Spain"
}, {
    title: "Habits to work on",
    body: "Exercise. Eat a bit better"
}, {
    title: "Office modification",
    body: "Get a new chair"
}]

generateId(notes)
localStorage.setItem("notes", JSON.stringify(notes))
notes = getSavedNotes()


const filters = {
    searchText: ""
}

document.querySelector("#add-todo").addEventListener("input", function(event) {
    filters.searchText = event.target.value
    renderNotes(notes, filters)
})

document.querySelector("#filter-by").addEventListener("change", function(e) {
    console.log(e.target.value)
})

document.querySelector("#create-note").addEventListener("click", function(e) {
    notes.push({
        id: uuidv4(),
        title: "",
        body: ""
    })
    saveNotes(notes)
    renderNotes(notes, filters)
})
