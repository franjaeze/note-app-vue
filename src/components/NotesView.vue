<template>
  <div class="generalContent">
    <div class="container">

    </div>

    <div v-if="notes < 1">
      <h1> <span class="spinner-1 fliper">Here</span> <span class="spinner-2">you will see</span> <span
          class="spinner-3 fliper">your notes,</span><span class="spinner-4"> as soon as</span> <span
          class="spinner-5">you start</span><span class="spinner-6"> to doing them!</span></h1>

    </div>
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border text-success" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-if="!loading">
      <div class="d-flex justify-content-center  mx-auto" style="max-width: 500px;">

        <select class="form-select form-select-sm selector color2" @change="filterOn($event)"
          aria-label=".form-select-sm example">
          <option class="selector " selected> {{ filterBy }}</option>
          <option class="selector" v-for="(t, index) in getAllTags()" :key="index" :value=t> {{ t }}</option>
          <option class="selector" value="All"> All</option>
        </select>
      </div>
      <div v-if="state.notesFiltered">
        <SimpleNote @delete-note="deleteNote" @update-note="updateNote" @archive-note="archiveNote"
          v-for="(note, index) in state.notesFiltered" :key="`note_${index}_${filterBy}`" :note="note" />
      </div>

      <div v-if="!threIsAFilter">
 
        <h1 class="text-center "> {{ (getShowArchived ? 'Active Notes' : 'Archived Notes') }} </h1>
        <div class="d-flex flex-column justify-content-center  m-auto  ">
          <SimpleNote @delete-note="deleteNote" @update-note="updateNote" @archive-note="archiveNote"
            v-for="(note, index) in (getShowArchived   ? getActiveNotes() : getArchivedNotes())" :key="index"
            :note="note" />
        </div>
   

      </div>
    </div>


  </div>
 
</template>

<script>
import SimpleNote from "../components/SimpleNote.vue";
import { useUserStore } from "../stores/notes";
import { storeToRefs } from "pinia";
import notesServices from "../services/notesServices.js"
import { reactive } from 'vue';


export default {

  components: {
    SimpleNote
  },
  setup() {
    const state = reactive({
      notesFiltered: []
    })
    const userStore = useUserStore();
    const { userNotes, getNotes,
      getShowArchived, takeNoteFromServer } = storeToRefs(userStore);


    return {
      userNotes,
      getNotes,
      userStore,
      getShowArchived,
      takeNoteFromServer,
      state,

    };
  }
  ,



  data() {
    return {
      notes: [],
      threIsAFilter: false,
      showForm: false,
      filterBy: 'Filter by',
      loading: false,
      notesFiltered: [],
      newNote: {
        title: '',
        tag: '  ',
        body: ''
      }
    }
  },
  async mounted() {
    await this.getNotesFromServer();
  },

  methods: {
    getFromServer() {
      this.userStore.takeNoteFromServer();
      console.log(this.userNotes)
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
    async archiveNote(id, archived) {
      this.loading = true;
      try {
        await notesServices.updateStateNote(id, archived)
      } catch (e) {
        console.log("could not update the state " + e)
      } finally {
        this.loading = false;
        this.getNotesFromServer()
      }
    },

    async getNotesFromServer() {
      this.loading = true;
      try {
        this.notes = await notesServices.listNotes()
      } catch (e) {
        alert("could not load notes " + e);
      } finally {
        this.loading = false;
      }
    },
    async deleteNote(noteId) {
      const ifRemove = confirm('Do you really want to delete it ?');
      if (ifRemove) {
        this.loading = true;
        try {

          await notesServices.deleteNote(noteId)
          this.getNotesFromServer()
          alert('Note deleted!')
        }
        catch (e) {
          alert("Se produjo un error");
        } finally {
          this.loading = false;
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
    getActiveNotes() {
      return this.notes.filter(note => note.archived === false);
    },
    getArchivedNotes() {
      return this.notes.filter(note => note.archived === true);
    },

    filterTag() {
      if (this.filterBy === "All") {
        this.threIsAFilter = false;
      } else {
        this.state.notesFiltered = this.notes.filter(note => note.tags.includes(this.filterBy));



      }

    },
    filterOn(event) {
      const selectedValue = event.target.value;
      this.state.notesFiltered = []
      this.filterBy = '';

      if (selectedValue === "All") {
        this.threIsAFilter = false;
      } else {
        this.threIsAFilter = true;
      }
      this.filterBy = selectedValue;
      this.filterTag();
    }

  }

}
</script>

<style>
body {
  /* background: rgb(46,45,46);
background: linear-gradient(90deg, rgba(198,117,77,.8) 0%, rgba(218,101,101,1) 34%, rgba(216,101,106,1) 34%, rgba(198,117,77,1) 81%, rgba(235,186,117,1) 98%); */
  background-image: url('https://images.pexels.com/photos/6787172/pexels-photo-6787172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

}

.spinner-1,
.spinner-2,
.spinner-3,
.spinner-4,
.spinner-5,
.spinner-6 {
  color: #f6f2f2;



}

.selector {
  background-color: #61543fa6;

}

.color2 {
  color: white
}
</style>