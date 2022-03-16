import {createNote} from "./notes.js"
import {setFilters} from "./filters.js"
import {renderNotes} from "./views"


renderNotes()

document.querySelector("#create-note").addEventListener("click", (e) => {
    const id = createNote()
    renderNotes()
    location.assign(`/edit.html#${id}`)
})


document.querySelector("#search-text").addEventListener("input", (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})


document.querySelector("#filter-by").addEventListener("change", (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes()
})


// Syncing changed data with the home page (for when the windows are open simultaneously)
window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        renderNotes()
    }
})