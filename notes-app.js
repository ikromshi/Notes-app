let notes = getSavedNotes()


const filters = {
    searchText: "",
    sortBy: "byEdited"
}
renderNotes(notes, filters)

document.querySelector("#add-todo").addEventListener("input", (event) => {
    filters.searchText = event.target.value
    renderNotes(notes, filters)
})

document.querySelector("#filter-by").addEventListener("change", (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

document.querySelector("#create-note").addEventListener("click", (e) => {
    const id = uuidv4()
    const timeStamp = moment().valueOf()
    notes.push({
        createdAt: timeStamp,
        updatedAt: timeStamp,
        id: id,
        title: "",
        body: ""
    })
    saveNotes(notes)
    renderNotes(notes, filters)
    location.assign(`/edit.html#${id}`)
})


// Syncing changed data with the home page (for when the windows are open simultaneously)
window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})


