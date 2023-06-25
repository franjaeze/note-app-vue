import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        userNotes: [],
    }),
    
    getters: {
        getNotes() {
            return this.userNotes;
        }
    },

    actions: {
        addNote(note) {
            this.userNotes.push(note);
        },
        removeNote(note) {
            this.userNotes.push(note);
            const indexOfNote = this.userNotes.indexOf(note);
            this.notes.splice(indexOfNote, 1)
        },
    },
});