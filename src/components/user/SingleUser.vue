<template>
    <div>
        <div v-if="!editing">
            <div v-if="user" class="card">
                <header class="card-header">
                    <div class="card-header-title">
                        Name: {{user.firstName}} {{user.lastName}}
                    </div>
                </header>
                <div class="card-content">
                    <p v-if="user.firstName">First name: {{user.firstName}}</p>
                    <p v-if="user.lastName">Last name: {{user.lastName}}</p>
                    <p v-if="user.username">Username: {{user.username}}</p>
                    <p v-if="user.email">Email: {{user.email}}</p>
                    <p v-if="user.isActive">Active: <i
                            v-bind:class="{ 'fa-times': !user.isActive, 'fa-check': user.isActive}"
                            class="fa"> </i></p>

                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item" @click="onEdit">Edit</a>
                    <a v-if="currentUser.id !== user.id" href="#" class="card-footer-item" @click="onDelete">Delete</a>
                </footer>
            </div>
        </div>
        <div v-if="editing">
            <div class="field">
                <label class="label">First name</label>
                <div class="control">
                    <input class="input" type="text" v-model="editFirstName" v-bind:class="{'is-danger': userErrors.firstName.length > 0}">
                </div>
                <div v-if="userErrors.firstName.length > 0" class="help is-danger">
                    {{userErrors.firstName}}
                </div>
            </div>



            <div class="field">
                <label class="label">Last name</label>
                <div class="control">
                    <input class="input" type="text" v-model="editLastName" v-bind:class="{'is-danger': userErrors.lastName.length > 0}">
                </div>
                <div v-if="userErrors.lastName.length > 0" class="help is-danger">
                    {{userErrors.lastName}}
                </div>
            </div>

            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input class="input" type="text" v-model="editUsername" v-bind:class="{'is-danger': userErrors.username.length > 0}">
                </div>
                <div v-if="userErrors.username.length > 0" class="help is-danger">
                    {{userErrors.username}}
                </div>
            </div>


            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" v-model="editEmail" v-bind:class="{'is-danger': userErrors.email.length > 0}">
                </div>
                <div v-if="userErrors.email.length > 0" class="help is-danger">
                    {{userErrors.email}}
                </div>
            </div>

            <div class="field">
                <label class="label" for="active">Active</label>
                <div class="control">
                    <input type="checkbox" id="active" v-model="editActive">
                    <label for="active">Active</label>
                </div>
            </div>

            <button class="button" @click="onUpdate">Save</button>
            <button class="button" @click="onCancel">Abort</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                users: "getUsers",
                userErrors: "getUserErrors",
                currentUser: "getCurrentUser",
            }),
            user() {
                return this.users[this.index];
            }
        },

        data() {
            return {
                editFirstName: "",
                editLastName: "",
                editUsername: "",
                editEmail: "",
                editActive: "",
                editing: false,
                index: this.$route.params.index,
            }
        },

        methods: {
            onEdit() {
                this.editFirstName = this.user.firstName;
                this.editLastName = this.user.lastName;
                this.editUsername = this.user.username;
                this.editEmail = this.user.email;
                this.editActive = this.user.isActive;
                this.editing = true;
            },

            onDelete() {
                this.$store.dispatch("deleteUser", this.user.id);
                this.$router.push({name: 'userOverview'});
            },

            onCancel() {
                this.editing = false;
            },

            onUpdate() {


                this.$store.dispatch("updateUser", {
                    userId: this.user.id,
                    user: {
                        firstName: this.editFirstName,
                        lastName: this.editLastName,
                        username: this.editUsername,
                        email: this.editEmail,
                        isActive: this.editActive
                    }
                })
            }
        },

    }
</script>

<style>

</style>