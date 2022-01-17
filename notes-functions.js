// Generates unique ID's for each of the notes
const generateId = function(notes) {
    notes.forEach(function(note) {
        note.id = uuidv4()
    })
}

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

// Remove notes
const removeNote = function(id, notes) {
    const noteIndex = notes.findIndex(function(note) {
        return id === note.id
    })
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDom = function(item, notes, filters) {
    const newEl = document.createElement("div")
    const newText = document.createElement("a")
    const button = document.createElement("button")
    button.textContent = "x"
    button.addEventListener("click", function() {
        removeNote(item.id, notes)
        saveNotes(notes)
        renderNotes(notes, filters)
    })
    newEl.appendChild(button)

    if (item.title.length > 0) {
        newText.textContent = item.title
    } else {
        newText.textContent = "Unnamed note"
    }
    
    newText.setAttribute("href", `/edit.html#${item.id}`)
    newEl.appendChild(newText)
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
        const newEl = generateNoteDom(item, notes, filters)
        document.querySelector("#notes-div").appendChild(newEl)
    })
}