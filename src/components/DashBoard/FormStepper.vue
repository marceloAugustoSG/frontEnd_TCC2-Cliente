<template>
    <v-stepper v-if="showStepper" hide-actions mobile v-model="step" :items="etapas" >
        <template v-slot:item.1>
            <form @submit.prevent="avancarEtapa">
                <v-select v-model="estudanteNivel" :items="['Graduação', 'Pós-graduação', 'Nenhum']"
                    label="Você é estudante de" required />
                <v-select v-model="centro" :items="['CCAE', 'CCENS', 'Nenhum']" label="Seu Centro é o" required />
                <v-select v-model="curso" :items="cursos" label="Seu Curso é" required />
                <p>Se mudou para vir estudar na UFES?</p>
                <v-radio-group v-model="mudancaResidencia" required>
                    <v-radio label="Não" value="Não" required />
                    <v-radio label="Sim" value="Sim" />
                </v-radio-group>

                <v-card-actions>
                    <v-btn text="Anterior" disabled variant="outlined" />
                    <v-spacer />
                    <v-btn type="avancarEtapa" text="Proximo" variant="outlined" />

                </v-card-actions>
            </form>

        </template>

        <template v-slot:item.2>

            <form @submit.prevent="avancarEtapa">

                <p class="pa-5">Com quem você reside em Alegre?</p>
                <v-checkbox-group v-model="resideCom" required>

                    <v-checkbox value="Pais" v-model="resideCom" label="Com seus pais" />
                    <v-checkbox value="Mãe" v-model="resideCom" label="Com sua mãe" />
                    <v-checkbox value="Pai" v-model="resideCom" label="Com seu pai" />
                    <v-checkbox value="Irmãos" v-model="resideCom" label="Com seus irmãos" />
                    <v-checkbox value="Irmã" v-model="resideCom" label="Com sua irmã" />
                    <v-checkbox value="Irmão" v-model="resideCom" label="Com seu irmão" />
                    <v-checkbox value="Avós/Avô/Avó" v-model="resideCom" label="Com seus avós/avô/avó" />
                    <v-checkbox value="Familiares" v-model="resideCom" label="Com familiares" />
                    <v-checkbox value="Sozinho" v-model="resideCom" label="Sozinho" />
                    <v-checkbox value="Amigos" v-model="resideCom" label="Com amigos" />
                    <v-checkbox value="Colegas estudantes" v-model="resideCom" label="Com colegas estudantes" />
                    <v-checkbox value="Alojamento" v-model="resideCom" label="No alojamento" />
                    <v-checkbox value="República" v-model="resideCom" label="Em uma república" />
                    <v-checkbox value="Outros" v-model="resideCom" label="Outros" />

                </v-checkbox-group>
                <p>{{ resideCom }}</p>
                <v-divider />
                <p class="mt-3 mb-3">Explique com suas palavras e de forma breve os motivos que
                    te levaram a procurar
                    atendimento psicológico</p>
                <v-textarea v-model="motivosAtendimento" label="Motivos" required></v-textarea>
                <v-card-actions>
                    <v-btn text="Anterior" @click="voltarEtapa" variant="outlined" />
                    <v-spacer />
                    <v-btn type="avancarEtapa" text="Proximo" variant="outlined" />

                </v-card-actions>
            </form>

        </template>

        <template v-slot:item.3>
            <dialogConsentimeento />
            <form @submit.prevent="avancarEtapa">
                <p class="mb-3">1. Este problema acontece há bastante tempo?</p>
                <p>{{ problema }}</p>
                <v-radio-group v-model="respostasC.problema1" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" required />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">2. O problema me causa grande incômodo ou sofrimento?</p>
                <v-radio-group v-model="respostasC.problema2" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" required />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">3. O problema tem mudado a minha maneira habitual de ser.</p>
                <v-radio-group v-model="respostasC.problema3" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" required />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">4. Costumo pensar e refletir, constantemente sobre os meus problemas.</p>
                <v-radio-group v-model="respostasC.problema4" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" required />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">5. O problema atinge e/ou está presente em mais de uma área da minha vida (ex:
                    família,
                    relações
                    interpessoais, vida social, vida acadêmica...)</p>
                <v-radio-group v-model="respostasC.problema5" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" required />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">6. Quando tenho problemas costumo 'botar para fora' o que sinto.</p>
                <v-radio-group v-model="respostasC.problema6" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" required />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">7. Me sinto motivado para realizar o que for necessário para resolver o problema.
                </p>
                <v-radio-group v-model="respostasC.problema7" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" required />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">8. O problema está atingindo várias das minhas atividades diárias: sono,
                    alimentação,
                    estudo, lazer,
                    trabalho e convívio com amigos, por exemplo</p>
                <v-radio-group v-model="respostasC.problema8" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" required />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">9. Na psicoterapia eu focaria na resolução de meus problemas diários (estudo,
                    trabalho,
                    dinheiro e
                    relacionamentos) mais do que no autoconhecimento</p>
                <v-radio-group v-model="respostasC.problema9" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" required />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">10. Tenho o hábito de conversar com outras pessoas sobre os meus problemas.</p>
                <v-radio-group v-model="respostasC.problema10" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" required />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />

                <v-card-actions>
                    <v-btn text="Anterior" variant="outlined" @click="voltarEtapa" />
                    <v-spacer />
                    <v-btn type="avancarEtapa" text="Proximo" variant="outlined" />
                </v-card-actions>
            </form>
        </template>

        <template v-slot:item.4>
            <form @submit.prevent="submit">
                <p>11. O problema atinge várias de minhas tarefas cotidianas (comer, dormir, trabalhar, estudar,
                    divertir-me)</p>
                <v-radio-group v-model="respostasC.problema11" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">12. A intervenção indicada para o problema será uma das prioridades em minha vida.
                </p>
                <v-radio-group v-model="respostasC.problema12" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">13. O problema acontece há tanto tempo que já se tornou parte de mim.</p>
                <v-radio-group v-model="respostasC.problema13" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">14. Geralmente tenho o hábito de refletir sobre os conselhos e orientações que
                    recebo.
                </p>
                <v-radio-group v-model="respostasC.problema14" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">15. Penso que principal causa de meus problemas sou eu mesmo.</p>
                <v-radio-group v-model="respostasC.problema15" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">16. O problema acontece com muita frequência em minha vida.</p>
                <v-radio-group v-model="respostasC.problema16" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">17. Quando tenho problemas, costumo 'me fechar' e tentar resolvê-los sozinho(a).
                </p>
                <v-radio-group v-model="respostasC.problema17" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">18. Eu deixaria de ir a outros compromissos para comparecer aos atendimentos.</p>
                <v-radio-group v-model="respostasC.problema18" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">19. O problema já mudou a maneira como eu me vejo e/ou como me comporto.</p>
                <v-radio-group v-model="respostasC.problema19" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <p class="mt-3 mb-3">20. Procurei ajuda por vontade própria.</p>
                <v-radio-group v-model="respostasC.problema20" required>
                    <v-label text="NUNCA" />
                    <v-radio label="1" value="1" />
                    <v-radio label="2" value="2" />
                    <v-radio label="3" value="3" />
                    <v-radio label="4" value="4" />
                    <v-label text="SEMPRE" />
                </v-radio-group>
                <v-divider />
                <v-card-actions>
                    <v-btn text="Anterior" @click="voltarEtapa" variant="outlined" />
                    <v-spacer />
                    <v-btn @click="enviarRespostas" text="Finalizar" variant="outlined" />
                </v-card-actions>
            </form>

        </template>
    </v-stepper>
</template>

<script setup>
import { ref, computed } from "vue"
import dialogConsentimeento from '@/components/DashBoard/formPsi/dialogConsentimento.vue'
import { useStore } from "vuex"
const ativarBtn = ref(false)
const store = useStore()
const showMessage = ref(true)
const showStepper = ref(true)
const step = ref(1)
const estudanteNivel = ref('')
const centro = ref('')
const curso = ref('')
const mudancaResidencia = ref('')
const motivosAtendimento = ref('')
const resideCom = ref([])
const respostasC = ref({
    problema1: ref(),
    problema2: ref(),
    problema3: ref(),
    problema4: ref(),
    problema5: ref(),
    problema6: ref(),
    problema7: ref(),
    problema8: ref(),
    problema9: ref(),
    problema10: ref(),
    problema11: ref(),
    problema12: ref(),
    problema13: ref(),
    problema14: ref(),
    problema15: ref(),
    problema16: ref(),
    problema17: ref(),
    problema18: ref(),
    problema19: ref(),
    problema20: ref()
})

const cursos = ['Nenhum', 'Agronomia', 'Engenharia de Alimentos', 'Engenharia Florestal', 'Engenharia Industrial Madeireira', 'Engenharia Química', 'Medicina Veterinária',
    'Zootecnia', 'Ciência da Computação', 'Ciências Biológicas(Bacharel)', 'Ciências Biológicas(Licenciatura)', 'Farmácia', 'Física(Licenciatura)', 'Geologia', 'Matemática', 'Nutrição'
    , 'Química(Licenciatura)', 'Sistemas de Informação', 'Ciências Florestais(Mestrado ou Doutorado)', 'Ciências Veterinárias(Mestrado)', 'Ciência e Tecnologia de Alimentos(Mestrado),Engenharia Química(Mestado)', 'Genética e Melhoramento(Mestrado ou Doutorado)',
    'Produção Vegetal(Mestrado ou Doutorado)', 'Agroquímica(Mestrado)', 'Ensino,Educação Básica e Formação de Professores(Mestrado)']

let etapas = computed(() => {
    return ['Informações Pessoais', 'Residência em Alegre', 'etapa 3', 'etapa 4 '];
})


//funções

function avancarEtapa() {
    if (step.value === 3) {

    }
    if (step.value > 5) {
        step.value = 4
    } else {
        step.value++
    }

}
function voltarEtapa() {
    if (step.value < 1) {
        step.value == 1
    } else {
        step.value--
    }
}


function enviarRespostas() {
    const respostas = `{ 
    "Estudante de": "${estudanteNivel.value}",
    "Curso":"${curso.value}" ,"Centro": "${centro.value}",
    "Se mudou para estudar na UFES?":"${mudancaResidencia.value}",
    "com quem você reside em Alegre?":"${resideCom.value}",
    "Motivos para o atendimento":"${motivosAtendimento.value}",
    "Respostas Confidencias":{
    "1  - Este problema acontece há bastante tempo":"${respostasC.value.problema1}",
    "2  - O problema me causa grande incômodo ou sofrimento":"${respostasC.value.problema2}",
    "3  - O problema tem mudado a minha maneira habitual de ser":"${respostasC.value.problema3}",
    "4  - Costumo pensar e refletir, constantemente sobre os meus problemas":"${respostasC.value.problema4}",
    "5  - O problema atinge e/ou está presente em mais de uma área da minha vida":"${respostasC.value.problema5}",
    "6  - Quando tenho problemas costumo 'botar para fora' o que sinto":"${respostasC.value.problema6}",
    "7  - Me sinto motivado para realizar o que for necessário para resolver o problema":"${respostasC.value.problema7}",
    "8  - O problema está atingindo várias das minhas atividades diárias: sono, alimentação, estudo, lazer, trabalho e convívio com amigos, por exemplo":"${respostasC.value.problema8}",
    "9  - Na psicoterapia eu focaria na resolução de meus problemas diários (estudo, trabalho, dinheiro e relacionamentos) mais do que no autoconhecimento":"${respostasC.value.problema9}",
    "10 - Tenho o hábito de conversar com outras pessoas sobre os meus problemas.":"${respostasC.value.problema10}",
    "11 -  O problema atinge várias de minhas tarefas cotidianas (comer, dormir, trabalhar, estudar, divertir-me)":"${respostasC.value.problema11}",
    "12 -  A intervenção indicada para o problema será uma das prioridades em minha vida":"${respostasC.value.problema12}",
    "13 -  O problema acontece há tanto tempo que já se tornou parte de mim.":"${respostasC.value.problema13}",
    "14 -  Geralmente tenho o hábito de refletir sobre os conselhos e orientações que recebo":"${respostasC.value.problema14}",
    "15 -  Penso que principal causa de meus problemas sou eu mesmo":"${respostasC.value.problema15}",
    "16 -  O problema acontece com muita frequência em minha vida.":"${respostasC.value.problema16}",
    "17 -  Quando tenho problemas, costumo 'me fechar' e tentar resolvê-los sozinho(a)":"${respostasC.value.problema17}",
    "18 -  Eu deixaria de ir a outros compromissos para comparecer aos atendimentos":"${respostasC.value.problema18}",
    "19 -  O problema já mudou a maneira como eu me vejo e/ou como me comporto.":"${respostasC.value.problema19}",
    "20 -  Procurei ajuda por vontade própria.":"${respostasC.value.problema20}"}
     }`

    console.log(respostas)

    showMessage.value = true

    if (store.dispatch('setRespostas', respostas)) {
        ativarBtn.value = true
        store.dispatch('setAtivarBtn', ativarBtn.value)

    }
    showStepper.value = false
    console.log(showStepper.value)
    store.dispatch('setShowBtnSolicitarConsulta', true)
}




</script>

<style></style>
