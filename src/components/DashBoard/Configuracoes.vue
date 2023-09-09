<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar color="#114271">
                    <v-btn icon="mdi-close" @click="dialog = false"  />
                    <v-toolbar-title text="Configurações"></v-toolbar-title>
                    <v-toolbar-items>
                        <v-btn color="white" text="Salvar" variant="elevated" @click="dialog = false" />
                    </v-toolbar-items>
                </v-toolbar>
            
                <v-divider></v-divider>
                <v-list lines="two" subheader>
                    <v-list-subheader>Geral</v-list-subheader>
                    <v-list-item title="Notificações" subtitle="Me notifique sobre as atualizações no Dashboard">
                        <template v-slot:prepend>
                            <v-checkbox v-model="notifications"></v-checkbox>
                        </template>
                    </v-list-item>

                    <v-list-item title="Emails" subtitle="Enviar email de confirmação de agendamento">
                        <template v-slot:prepend>
                            <v-checkbox v-model="emails"></v-checkbox>
                        </template>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            dialog: true,
            notifications: false,
            emails: false
        }
    },
}
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
}
</style>