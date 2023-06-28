<template>
  <div class="generalContent">
    <div class="container">

    </div>
    <div v-if="getNotes < 1">
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
        <SimpleNote @delete-note="deleteNote" @update-note="updateNote" v-for="(note, index) in getActiveNotes"
          :key="index" :note="note" />
      </div>
      <div v-else>
        <h1> Archived Notes</h1>
        <SimpleNote @delete-note="deleteNote" @update-note="updateNote" v-for="(note, index) in getArchivedNotes"
          :key="index" :note="note" />

      </div>
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
  },
  setup() {
    const userStore = useUserStore();
    const { userNotes, getNotes, addNote,
      removeNote, getActiveNotes, getArchivedNotes,
      getShowArchived } = storeToRefs(userStore);


    return {
      userNotes,
      addNote,
      getNotes,
      userStore,
      removeNote,
      getActiveNotes,
      getArchivedNotes,
      getShowArchived,

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
  methods:
  {
    showIt() {
      this.showForm = !this.showForm;
    },
    updateNote(note) {
      console.log(note)
      const index = this.userNotes.indexOf(note);

      this.$router.push({
        name: 'modify',
        params: { index: index }
      });

    },
    deleteNote(note) {
      const ifRemove = confirm('Do you really want to delete it ?');
      if (ifRemove) {
        try {

          this.userStore.removeNote(note)
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
      this.getNotes.forEach((userNote) => {
        // Itera sobre cada tag en el array de tags del objeto actual
        userNote.tags.forEach((tag) => {
          // Agrega el tag al conjunto de tagsUnicos
          uniqueTags.add(tag);
        });
      });

      // Convierte el conjunto de tagsUnicos de vuelta a un array y devuélvelo

      return Array.from(uniqueTags);
    },

    filterTag() {
      if (this.filterBy === "All") {
        this.threIsAFilter = false;
      } else {
        const notesFiltered = this.getNotes.filter(note => note.tags.includes(this.filterBy));

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