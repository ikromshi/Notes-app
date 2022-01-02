// DOM - Document Object Model

const notes = [{
    title: "Mo next trip",
    body: "I want to got to Spain"
}, {
    title: "Habits to work on",
    body: "Exercise. Eat a bit better"
}, {
    title: "Office modification",
    body: "Get a new chair"
}]



// RENDERING FILTERED DATA

const filters = {
    searchText: ""
}
// Checks if the user input is in the map
const renderNotes = function(notes, filters) {
    const filteredData = notes.filter(function(item) {
        return item.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    // Clears the div
    document.querySelector("#notes-div").innerHTML = ""

    // Writes the results in the div
    filteredData.forEach(function(item){
        const newEl = document.createElement("p")

        if (item.title.length > 0) {
            newEl.textContent = item.title
        } else {
            newEl.textContent = "Unnamed note"
        }

        
        document.querySelector("#notes-div").appendChild(newEl)
    })
}

document.querySelector("#add-todo").addEventListener("input", function(event) {
    filters.searchText = event.target.value
    renderNotes(notes, filters)
})


// FILTER BY TYPE
let my_notes = []

document.querySelector("#filter-by").addEventListener("change", function(e) {
    console.log(e.target.value)
})

const notesJSON = localStorage.getItem("notes")
if (notesJSON !== null) {
    my_notes = JSON.parse(notesJSON)
}



document.querySelector("#create-note").addEventListener("click", function(e) {
    my_notes.push({
        title: "",
        body: ""
    })
    localStorage.setItem("notes", JSON.stringify(my_notes))
    renderNotes(my_notes, filters)
})

// USING LOCAL STORAGE AND JASON

    // localStorage.setItem("name", "Ikrom")
    // console.log(localStorage.getItem("name"))
    // localStorage.removeItem("name")
    // localStorage.clear()

// USING JSON
    // let newNotes = JSON.stringify(notes)
    // localStorage.setItem("notes", newNotes)
    // newNotes = localStorage.getItem("notes")
    // console.log(JSON.parse(newNotes))
    // localStorage.clear()
    // console.clear()
