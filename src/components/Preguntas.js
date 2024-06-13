/**
* @autor: Gerardo Rios Mejía
* List where the titles are stored
 */


const preguntas = [
    { 
        /**The data is called and displayed on the screen*/
        titulo: "Does the agent demonstrate a solid understanding of accident care procedures?",
        
        /** state where the options are stored, used to add a value*/
        opciones: [
            {textoRespuesta: "Yes", isVerdad: true},
            {textoRespuesta: "Partially", isPart: true},
            {textoRespuesta: "No", isFalso: true}
        ],
    },
    
    {
        titulo: "Does the agent communicate clearly and understandably during the call?",
        opciones: [
            {textoRespuesta: "Yes", isVerdad: true},
            {textoRespuesta: "Partially", isPart: true},
            {textoRespuesta: "No", isFalso: true}
        ],
    },

    {
        titulo: "Does the agent show empathy and sensitivity to the customer's situation affected by the accident",
        opciones: [
            {textoRespuesta: "Yes", isVerdad: true},
            {textoRespuesta: "Partially", isPart: true},
            {textoRespuesta: "No", isFalso: true}
        ],
    },

    {
        titulo: "Is the agent able to efficiently resolve the client's concerns and questions related to the accident?",
        opciones: [
            {textoRespuesta: "Yes", isVerdad: true},
            {textoRespuesta: "Partially", isPart: true},
            {textoRespuesta: "No", isFalso: true}
        ],
    },

    {
        titulo: "Does the agent follow established safety procedures when handling accidents?",
        opciones: [
            {textoRespuesta: "Yes", isVerdad: true},
            {textoRespuesta: "Partially", isPart: true},
            {textoRespuesta: "No", isFalso: true}
        ],
    },

    {
        titulo: "Does the agent demonstrate active listening skills when interacting with customers affected by accidents?",
        opciones: [
            {textoRespuesta: "Yes", isVerdad: true},
            {textoRespuesta: "Partially", isPart: true},
            {textoRespuesta: "No", isFalso: true}
        ],
    },

    {
        titulo: "Does the agent offer effective and appropriate solutions to resolve specific issues related to the accident?",
        opciones: [
            {textoRespuesta: "Yes", isVerdad: true},
            {textoRespuesta: "Partially", isPart: true},
            {textoRespuesta: "No", isFalso: true}
        ],
    },

    {
        titulo: "Does the agent manage time efficiently to provide timely care in emergency accident situations?",
        opciones: [
            {textoRespuesta: "Yes", isVerdad: true},
            {textoRespuesta: "Partially", isPart: true},
            {textoRespuesta: "No", isFalso: true}
        ],
    },

    {
        titulo: "Does the agent show professionalism and calmness during high-pressure situations when handling accident cases?",
        opciones: [
            {textoRespuesta: "Yes", isVerdad: true},
            {textoRespuesta: "Partially", isPart: true},
            {textoRespuesta: "No", isFalso: true}
        ],
    },

    {
        titulo: "Does the agent follow established protocols to properly document accident cases and actions taken?",
        opciones: [
            {textoRespuesta: "Yes", isVerdad: true},
            {textoRespuesta: "Partially", isPart: true},
            {textoRespuesta: "No", isFalso: true}
        ],
    },
]


export default preguntas;