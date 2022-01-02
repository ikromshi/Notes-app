// Read existing notes from local storage
const getSavedNotes = function() {
    const notesJSON = localStorage.getItem("notes")

    if (notesJSON !== null) {
    return JSON.parse(notesJSON)
    } else {
        return []
    }
}


// Save notes
const saveNotes = function(notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}


// Generate the DOM structure for a note
const generateNoteDom = function(item) {
    const newEl = document.createElement("p")

        if (item.title.length > 0) {
            newEl.textContent = item.title
        } else {
            newEl.textContent = "Unnamed note"
        }
        return newEl
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
        const newEl = generateNoteDom(item)
        document.querySelector("#notes-div").appendChild(newEl)
    })
}