import {v4 as uuidv4} from "uuid"
import moment from "moment"

let notes = []

// Read existing notes from local storage
const loadNotes = () => {
    const notesJSON = localStorage.getItem("notes")

    try {
        // Using truthy/falsy values; was "notesJSON ==! null"
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch {
        return []
    }   
}


// Save notes
const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes))
}


// Expose notes from module
const getNotes = () => notes;

const createNote = () => {
    const id = uuidv4()
    const timeStamp = moment().valueOf()
    notes.push({
        createdAt: timeStamp,
        updatedAt: timeStamp,
        id: id,
        title: "",
        body: ""
    })
    saveNotes() 
    return id
}


// Remove notes
const removeNote = (id) => {
    const noteIndex = notes.findIndex(note => id === note.id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}


// Sorting notes by one of the three ways
const sortNotes = (sortBy) => {
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

// Updates the note and the last edited time
const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) return 

    if (typeof updates.title === "string") {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if (typeof updates.body === "string") {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}

notes = loadNotes()

export {getNotes, createNote, removeNote, sortNotes, updateNote}