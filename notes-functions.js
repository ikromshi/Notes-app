"use strict"

// Generates unique ID's for each of the notes
const generateId = (notes) => {
    notes.forEach((note) => {
        note.id = uuidv4()
    })
}

// Read existing notes from local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem("notes")

    try {
        // Using truthy/falsy values; was "notesJSON ==! null"
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch {
        return []
    }   
}

// Save notes
const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes))
}

// Remove notes
const removeNote = (id, notes) => {
    const noteIndex = notes.findIndex(note => id === note.id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDom = (item, notes, filters) => {
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


// Sorting notes by one of the three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else {
                return 1
            }
        })
    } else if (sortBy === "byRecent") {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else {
                return 1
            }
        })
    } else {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else {
                return 1
            }
        })
    }
}

// Checks if the user input is in the map
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredData = notes.filter((item) => item.title.toLowerCase().includes(filters.searchText.toLowerCase()))
   
    // Clears the div
    document.querySelector("#notes-div").innerHTML = ""

    // Writes the results in the div
    filteredData.forEach((item) => {
        const newEl = generateNoteDom(item, notes, filters)
        document.querySelector("#notes-div").appendChild(newEl)
    })
}