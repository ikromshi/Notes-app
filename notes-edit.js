const titleElement = document.querySelector("#note-title")
const bodyElement = document.querySelector("#note-body")
const removeElement = document.querySelector("#remove-note")

// Getting the ID of the note from the website link (substring slices the string)
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(function(note) {
    return note.id === noteId
})

if (note === undefined) {
    location.assign("/index.html")
}

titleElement.value = note.title
bodyElement.value = note.body

// Saving the edited notes
titleElement.addEventListener("input", function(e) {
    note.title = e.target.value
    saveNotes(notes)
})

bodyElement.addEventListener("input", function(e) {
    note.body = e.target.value
    saveNotes(notes)
})

// Working with the remove button
removeElement.addEventListener("click", function(e) {
    removeNote(noteId, notes)
    saveNotes(notes)
    location.assign("/index.html")
})

// Syncing data across pages
window.addEventListener("storage", function(e) {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)
        note = notes.find(function(note) {
            return note.id === noteId
        })
        
        if (note === undefined) {
            location.assign("/index.html")
        }
        
        titleElement.value = note.title
        bodyElement.value = note.body
    }
})