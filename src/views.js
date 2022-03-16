import moment from "moment"
import {getFilters} from "./filters"
import {sortNotes, getNotes} from "./notes"


// Generate the DOM structure for a note
const generateNoteDom = (item) => {
    const newEl = document.createElement("a")
    const newText = document.createElement("p")
    const statusEl = document.createElement("p")

    if (item.title.length > 0) {
        newText.textContent = item.title
    } else {
        newText.textContent = "Unnamed note"
    }
    newEl.classList.add("list-item__title")
    newEl.appendChild(newText)

    // Setting up the link
    newEl.setAttribute("href", `/edit.html#${item.id}`)
    newEl.classList.add("list-item")

    // Setting up the status message
    statusEl.textContent = generateLastEdited(item.updatedAt)
    statusEl.classList.add("list-item__subtitle")
    newEl.appendChild(statusEl)
    return newEl
}


// Checks if the user input is in the map
const renderNotes = () => {
    const notesEl = document.querySelector("#notes-div")
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredData = notes.filter((item) => item.title.toLowerCase().includes(filters.searchText.toLowerCase()))
   
    // Clears the div
    notesEl.innerHTML = ""

    if (filteredData.length > 0) {
        // Writes the results in the div
        filteredData.forEach((item) => {
        const newEl = generateNoteDom(item, notes, filters)
        notesEl.appendChild(newEl)
    })

    } else {
        const emptyMsg = document.createElement("P")
        emptyMsg.textContent = "No notes to show"
        emptyMsg.classList.add("empty-message")
        notesEl.appendChild(emptyMsg)
    }
}


// Opens the Edit Page
const initEditPage = (noteId) => {
    const titleElement = document.querySelector("#note-title")
    const bodyElement = document.querySelector("#note-body")
    const dateElement = document.querySelector("#last-edit")

    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)

    if (!note) {
        location.assign("/index.html")
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)
}


// Generates the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited: ${moment(timestamp).fromNow()}`
}


export {generateNoteDom, renderNotes, generateLastEdited, initEditPage}