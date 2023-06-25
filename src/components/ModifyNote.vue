<template>
    <div class="createNote">
        <form action="">
            <div>
                <h1 class="header">Modify Note</h1>

                <button class="buttonNote" @click="updateNote"> Update</button>
                <button class="buttonNote" @click="addTag"> Add Tag</button>
                <button class="buttonNote" @click="close"> Cancel</button>
            </div>
            <button class="tag" @click="removeTag(t)" v-for="t in noteToModify.tags" :key="t.index"> {{ t }}</button>

            <div class="inputsCreate"> <label for="Title">Title </label>
                <input v-model="noteToModify.title" type="text" id="Title" placeholder="Write your note title">
            </div>
            <div class="inputsCreate"> <label for="tag">tag </label>
                <input v-model="noteToModify.tag" type="text" id="tag" placeholder="Write your note">
            </div>
            <div class="inputsCreate"><label for="Body">Body </label>
                <textarea v-model="noteToModify.body" rows="3" cols="25"></textarea>
            </div>
        </form>


    </div>
</template>
  
<script>

export default {
    props: {
        note: {
            type: Object,
            required: true
        }
    },
    methods: {
        addTag() {
            this.noteToModify.tags.push(this.noteToModify.tag);
            this.noteToModify.tag = '';
        },

        close() {
            this.$emit('close')
        },
        removeTag(t) {

            this.noteToModify.tags = this.noteToModify.tags.filter(e => e !== t)

        },
        async updateNote() {

            try {
                //await noteService.addToList(this.newNote)
             
             this.$emit('note-modify', { ...this.noteToModify });
             this.$emit('close')

            } catch (e) {
                alert(e);
            }
        }


    }, data() {
        return {
            notes: [],
            noteToModify: this.note,



        };
    },


};
</script>
  
<style> </style>