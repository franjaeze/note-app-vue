import { defineStore, MutationType } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        userNotes: [],
        showArchived : true,
    }),
    
    getters: {
        getNotes() {
            return this.userNotes;
        },
        getActiveNotes(){
            return this.userNotes.filter(note => note.archived === false);
        },
        getArchivedNotes(){
            return this.userNotes.filter(note => note.archived === true);
        },
        getShowArchived() {
            return this.showArchived;
        },
         
    },

    actions: {
        addNote(note) {
            this.userNotes.push(note);
        },
        removeNote(note) {
            const indexOfNote = this.userNotes.indexOf(note);
            this.userNotes.splice(indexOfNote, 1)
        },
        setShowArchived() {
            this.showArchived =  !this.showArchived;
            this.$patch({ type: MutationType.showArchived, payload: this.showArchived });
    },
}});