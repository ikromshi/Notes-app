import { initEditPage, generateLastEdited }  from "./views"
import { updateNote, removeNote } from "./notes"
import moment from "moment"

const titleElement = document.querySelector("#note-title")
const bodyElement = document.querySelector("#note-body")
const removeElement = document.querySelector("#remove-note")
const dateElement = document.querySelector("#last-edit")
const noteId = location.hash.substring(1)

initEditPage(noteId)


// Saving the edited notes
titleElement.addEventListener("input", (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

bodyElement.addEventListener("input", (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

// Working with the remove button
removeElement.addEventListener("click", (e) => {
    removeNote(noteId)
    location.assign("/index.html")
})

// Syncing data across pages
window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        initEditPage(noteId)
    }
})