<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="hosts">
            <template slot="items" slot-scope="props">
                <td>
                    <router-link
                            :to="{ name: 'hostSingle', params: {index: getHostIndex(props.item.id)}}">
                        {{ props.item.name }}
                    </router-link>
                </td>
                <td>
                    <v-icon v-if="props.item.authenticated">done</v-icon>
                    <v-icon v-else>error</v-icon>
                </td>
            </template>
        </v-data-table>

    </div>

</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                headers: [
                    {
                        text: "Name",
                        value: "name"
                    },
                    {
                        text: "Authenticated",
                        value: "authenticated",
                        sortable: false,
                    },
                ]
            }
        },

        mounted() {
        },

        computed: {
            ...mapGetters({
                hosts: "getHosts",
            })

        },

        components: {},

        methods: {
            newHost() {
                this.$router.push({name: "newHost"});
            },

            deleteHost(id) {
                this.$store.dispatch("deleteHost", id);
            },
            getHostIndex(id) {
                return this.$store.getters.getHostIndexById(id);
            }
        }
    };
</script>

<style lang="scss">

</style>
