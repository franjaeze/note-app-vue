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
  
<style>
.inputsCreate {
    font-size: 12px;
    margin: 5px;
}

.tag {
    background-color: #6d6868c7;
    border-radius: 9px;
    display: inline-block;
    color: #fffffff6;
    letter-spacing: 0.5px;

}

input {
    width: fit-content;
    display: inline-block;
}

.createNote {
    border-radius: 10%;
    border-style: solid;
    border-color: black;
    background-color: #adacacc7;
    display: inline-flex;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    font-family: "Open Sans", monospace;
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform
}

.createNote:hover {
    transform: translateY(-10px);
}

.createNote:focus {
    box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}</style>