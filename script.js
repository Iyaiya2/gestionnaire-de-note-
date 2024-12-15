class Note {
    constructor(title, id) {
      this.title = title;
      this.id = id;
    }
  }
  
  class NoteManager {
    constructor() {
      this.notes = JSON.parse(localStorage.getItem("notes")) || [];
    }
  
    saveNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    }
  
    addNote(title) {
      const id = Date.now();
      const newNote = new Note(title, id);
      this.notes.push(newNote);
      this.saveNotes();
      return newNote;
    }
  
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id);
      this.saveNotes();
    }
  
    getNotes() {
      return this.notes;
    }
  }
  
  const noteManager = new NoteManager();
  
  const renderNotes = () => {
    const noteContainer = document.getElementById("note-container");
    noteContainer.innerHTML = "";
  
    noteManager.getNotes().forEach(note => {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");
  
      const noteTitle = document.createElement("span");
      noteTitle.textContent = note.title;
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Supprimer";
      deleteBtn.classList.add("delete-btn");
  
      deleteBtn.addEventListener("click", () => {
        noteManager.deleteNote(note.id);
        renderNotes();
      });
  
      noteDiv.appendChild(noteTitle);
      noteDiv.appendChild(deleteBtn);
      noteContainer.appendChild(noteDiv);
    });
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const noteInput = document.getElementById("note-input");
    const addNoteBtn = document.getElementById("add-note-btn");
  
    renderNotes();
  
    addNoteBtn.addEventListener("click", () => {
      const noteText = noteInput.value.trim();
      if (noteText) {
        noteManager.addNote(noteText);
        renderNotes();
        noteInput.value = "";
      }
    });
  });
  