let notes = getSavedNotes()


const filters = {
    searchText: ""
}
renderNotes(notes, filters)

document.querySelector("#add-todo").addEventListener("input", function(event) {
    filters.searchText = event.target.value
    renderNotes(notes, filters)
})

document.querySelector("#filter-by").addEventListener("change", function(e) {
    console.log(e.target.value)
})

document.querySelector("#create-note").addEventListener("click", function(e) {
    const id = uuidv4()
    notes.push({
        id: id,
        title: "",
        body: ""
    })
    saveNotes(notes)
    renderNotes(notes, filters)
    location.assign(`/edit.html#${id}`)
})
