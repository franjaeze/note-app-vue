<template>
  <div class="generalContent">
    <div class="container">

    </div>
    <div v-if="getNotes.lenght<1">
      <h1> Here you will see your notes, as soon as you start to doing them!</h1>



    </div>


    <div>
      <SimpleNote @delete-note="deleteNote" v-for="(note, index) in getNotes" :key="index" :note="note" />
    </div>
  </div>
</template>

<script>
import SimpleNote from "../components/SimpleNote.vue";
import { useUserStore } from "../stores/notes";
import { storeToRefs } from "pinia";

export default {

  components: {
    SimpleNote
  },   setup() {
    const userStore = useUserStore();
    const { userNotes, getNotes, addNote } = storeToRefs(userStore);
  
    return { 
    userNotes,
    addNote,
    getNotes,
    userStore
    };
  },
  data() {
    return {
      notes: [],
      showForm: false,
      newNote: {
        title: '',
        tag: '  ',
        body: ''
      }
    }
  },
  methods:
  {
    showIt() {
      this.showForm = !this.showForm;
    },

    deleteNote(note) {
      const ifRemove = confirm('Do you really want to delete it ?');
      if (ifRemove) {

        const indexOfNote = this.notes.indexOf(note);
        this.notes.splice(indexOfNote, 1)
        alert('Note deleted!')
      }
    },
    async handleNewNote(newNote) {

      await this.notes.push(newNote);

      this.notes.forEach(element => {
        console.log(element)

      });

    }
  }

}
</script>

<style></style>