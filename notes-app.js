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
        newEl.textContent = item.title
        document.querySelector("#notes-div").appendChild(newEl)
    })
}

document.querySelector("#add-todo").addEventListener("input", function(event) {
    filters.searchText = event.target.value
    renderNotes(notes, filters)
})


// FILTER BY TYPE
document.querySelector("#filter-by").addEventListener("change", function(e) {
    console.log(e.target.value)
})




