<template>


<div>
      <SimpleNote @delete-note="deleteNote" @update-note="updateNote" v-for="(note, index) in getActiveNotes" :key="index" :note="note" />
    </div>

</template>
<script>
import { useUserStore } from "../stores/notes";
import SimpleNote from "../components/SimpleNote.vue";
export default {
    components: {
        SimpleNote
    },
    setup() {
        const userStore = useUserStore();
        const { getArchivedNotes } = storeToRefs(userStore);

        return {

            getArchivedNotes
        };
    },
    data() {
        return {

        }


    }
}




</script>