<template>
  <div class="generalContent">
    <div class="container">

    </div>
    <button @click="getFromServer()" class="btn btn-small btn-success"> Bring from server</button>
    <div v-if="notes < 1">
      <h1> Here you will see your notes, as soon as you start to doing them!</h1>
    </div>





    <select class="form-select form-select-sm" @change="filterOn($event)" v-model="filterBy"
      aria-label=".form-select-sm example">
      <option selected> {{ filterBy }}</option>
      <option v-for="(t, index) in getAllTags()" :key="index" :value=t> {{ t }}</option>
      <option value="All"> All</option>
    </select>

    <SimpleNote @delete-note="deleteNote" @update-note="updateNote" v-for="(note, index) in filterTag()" :key="index"
      :note="note" />

    <div v-if="!threIsAFilter">
      <div v-if="getShowArchived">
        <h1> Active Notes</h1>
        <SimpleNote @delete-note="deleteNote" @update-note="updateNote" v-for="(note, index) in getActiveNotes()"
          :key="index" :note="note" />
      </div>
      <div v-else>
        <h1> Archived Notes</h1>
        <SimpleNote @delete-note="deleteNote" @update-note="updateNote" v-for="(note, index) in getArchivedNotes()"
          :key="index" :note="note" />

      </div>
    </div>
  </div>
</template>

<script>
import SimpleNote from "../components/SimpleNote.vue";
import { useUserStore } from "../stores/notes";
import { storeToRefs } from "pinia";
import  notesServices  from "../services/notesServices.js"


export default {

  components: {
    SimpleNote
  },
  setup() {
    const userStore = useUserStore();
    const { userNotes, getNotes, 
      getShowArchived, takeNoteFromServer } = storeToRefs(userStore);


    return {
      userNotes,
      getNotes,
      userStore,
      getShowArchived,
      takeNoteFromServer,

    };
  }
  ,



  data() {
    return {
      notes: [],
      threIsAFilter: false,
      showForm: false,
      filterBy: 'Filter by',
      newNote: {
        title: '',
        tag: '  ',
        body: ''
      }
    }
  },
 async  mounted(){
     await this.getNotesFromServer();
  },
  methods:{
  getFromServer(){
   this.userStore.takeNoteFromServer();
    console.log (this.userNotes)
  },
  
    showIt() {
      this.showForm = !this.showForm;
    },
    updateNote(id) {
      
      this.$router.push({
        name: 'modify',
        params: { id: id }
      });

    },

    async getNotesFromServer(){
      try {
       this.notes = await notesServices.listNotes()
      } catch (e) {
        alert("could not load notes " + e);
      }
    },
    async deleteNote(noteId) {
      const ifRemove = confirm('Do you really want to delete it ?');
      if (ifRemove) {
        try {

          await notesServices.deleteNote(noteId)
          this.getNotesFromServer()
          alert('Note deleted!')
        }
        catch (e) {
          alert("Se produjo un error");
        }
      }
    },
    async handleNewNote(newNote) {

      await this.notes.push(newNote);

      this.notes.forEach(element => {
        console.log(element)

      });

    },

    getAllTags() {

      const uniqueTags = new Set();

      // Itera sobre cada objeto en el array de userNotes
      this.notes.forEach((userNote) => {
        // Itera sobre cada tag en el array de tags del objeto actual
        userNote.tags.forEach((tag) => {
          // Agrega el tag al conjunto de tagsUnicos
          uniqueTags.add(tag);
        });
      });

      // Convierte el conjunto de tagsUnicos de vuelta a un array y devuélvelo

      return Array.from(uniqueTags);
    },
    getActiveNotes(){
      return this.notes.filter(note => note.archived === false);
    },
    getArchivedNotes(){
      return this.notes.filter(note => note.archived === true);
    },

    filterTag() {
      if (this.filterBy === "All") {
        this.threIsAFilter = false;
      } else {
        const notesFiltered = this.notes.filter(note => note.tags.includes(this.filterBy));

        return notesFiltered;
      }

    },
    filterOn(event) {
      const selectedValue = event.target.value;
     
      console.log(selectedValue)
      if (selectedValue === "All") {
        this.threIsAFilter = false;
      } else {
        this.threIsAFilter = true;
      }
      this.filterBy = selectedValue;
    }

  }

}
</script>

<style></style>