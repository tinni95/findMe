const SaluteRequisiti = [
    "automunita/o di strumenti", "tutto fornito"
]
export const Salute = [
    { servizio: "Estetista", requisiti: SaluteRequisiti }, { servizio: "Massaggi", requisiti: SaluteRequisiti }, { servizio: "Truccatore", requisiti: SaluteRequisiti }, { servizio: "Personal trainer", requisiti: SaluteRequisiti }, { servizio: "Nutrizionista", requisiti: SaluteRequisiti }, { servizio: "Psicologo", requisiti: SaluteRequisiti }
]

const AssistenzaRequisiti = [
    "automunita/o di strumenti",
]

const SviluppatoreWeb = [
    "HTML", "CSS", "React", "Laravel", "PHP", "API Integration", "Javascript", "Jquery", "Wordpress"
]

const SviluppatoreApp = [
    "HTML", "CSS", "React-native", "Android", "Ios", "Ionic", "Flutter", "Xamarin", "API Integration", "Javascript",
]

const Sviluppatore = [
    "HTML", "CSS", "React", "React-native", "Android", "Ios", "Ionic", "Flutter", "Xamarin", "API Integration", "Javascript", "Python", "bash", "Ruby"
]

const GraphicDesigner = [
    "Adobe Premier", "Adobe XD", "Illustrator", "Photoshop", "Sketch",
]

export const Informatica = [
    { servizio: "Assistenza pc", requisiti: AssistenzaRequisiti }, { servizio: "Assistenza smartphone", requisiti: AssistenzaRequisiti }, { servizio: "Assistenza tv", requisiti: AssistenzaRequisiti }, { servizio: "Sviluppatore web", requisiti: SviluppatoreWeb }, { servizio: "Sviluppatore app", requisiti: SviluppatoreApp }, { servizio: "Sviluppatore", requisiti: Sviluppatore }, { servizio: "Graphic designer", requisiti: GraphicDesigner }
]

const RistorazioneRequisiti = ["Munito di automobile", "Munito di attrezzatura"]

export const Ristorazione = [
    { servizio: "Aiuto-cuoco", requisiti: RistorazioneRequisiti }, { servizio: "cuoco", requisiti: RistorazioneRequisiti }, { servizio: "cameriere", requisiti: RistorazioneRequisiti }, { servizio: "cassiere", requisiti: RistorazioneRequisiti }, { servizio: "lavapiatti", requisiti: RistorazioneRequisiti }, { servizio: "runner", requisiti: RistorazioneRequisiti }, { servizio: "magazziniere", requisiti: RistorazioneRequisiti }, { servizio: "barman", requisiti: RistorazioneRequisiti }, { servizio: "barista", requisiti: RistorazioneRequisiti }, { servizio: "gestore", requisiti: RistorazioneRequisiti }, { servizio: "pizzaiolo", requisiti: RistorazioneRequisiti }, { servizio: "parcheggiatore", requisiti: RistorazioneRequisiti }
]

const Privatireq = ["munito di strumenti"]

export const Privati = [
    { servizio: "Spesa a domicilio", requisiti: ["munito di automobile/motorino"] }, {
        servizio: "lavaggio auto", requisiti: Privatireq
    }, { servizio: "cat sitter", requisiti: Privatireq }, { servizio: "dog sitter", requisiti: Privatireq }, { servizio: "baby sitter", requisiti: Privatireq }, { servizio: "addestratore animali", requisiti: Privatireq }, { servizio: "commissioni generali", requisiti: Privatireq }
]

const ConsegneReq = ["munito di auto", "munito di moto"]

export const Consegne = [
    { servizio: "Autista", requisiti: ["munito di auto"] }, { servizio: "fattorino", requisiti: ConsegneReq }, { servizio: "trasporto merci", requisiti: ["munito di auto", "munito di furgone"] }, { servizio: "consegne cibo", requisiti: ConsegneReq }, { servizio: "consegne alcohol", requisiti: ConsegneReq }, { servizio: "consegne supermercato", requisiti: ConsegneReq }, { servizio: "supporto montaggio", requisiti: ["munito di strumenti"] }, { servizio: "consegne piccoli beni", requisiti: ConsegneReq }
]

export const Feste = [
    { servizio: "Cantante", requisiti: ["munito di strumenti"] }, { servizio: "chef a domicilio", requisiti: ["munito di strumenti"] }, { servizio: "dj", requisiti: ["munito di strumenti"] }, { servizio: "fotografo", requisiti: ["munito di strumenti"] }, { servizio: "video maker", requisiti: ["munito di strumenti"] }, { servizio: "promoter", requisiti: ["munito di strumenti"] }, { servizio: "hostess/steward", requisiti: ["munito di strumenti"] }, { servizio: "Animazione", requisiti: ["munito di strumenti"] }
]

export const aziendali = [
    { servizio: "Customer care" }, { servizio: "ux designer" }, { servizio: "UI designer" }, { servizio: "commercialista" }, { servizio: "consulente" }, { servizio: "contabile" }, { servizio: "legale" }, { servizio: "architetto" }, { servizio: "designer" }, { servizio: "risorse umane" }, { servizio: "venditore" }, { servizio: "social media manager" }, { servizio: "ingegnere" }, { servizio: "programmatore informatico" }, { servizio: "inventario" }, { servizio: "magazziniere" }, { servizio: "staff negozio" }, { servizio: "data entry" }, { servizio: "reception" }, { servizio: "assistenza it" }, { servizio: "parcheggiatore" }
]

export const lezioni = [
    { servizio: "Lezioni di danza" }, { servizio: "lezioni di tennis" }, { servizio: "lezioni di nuoto" }, { servizio: "personal trainer" }, { servizio: "lezioni di musica" }, { servizio: "lezioni di fotografia" }, { servizio: "ripetizioni per studenti" }, { servizio: "preparazione esame universitario" }, { servizio: "preparazione compito liceo" }, { servizio: "traduttore lingue" }, { servizio: "lezioni di lingua" }, { servizio: "Altre lezioni" }
]

export const casa = [
    { servizio: "Elettricista" }, { servizio: "idraulico" }, { servizio: "imbianchino" }, { servizio: "giardiniere" }, { servizio: "pulizie" }, { servizio: "piccoli traslochi" }, { servizio: "grandi traslochi" }, { servizio: "stiraggio" }, { servizio: "imbianchino" }, { servizio: "falegname meccanico" }, { servizio: "montaggio tv" }, { servizio: "montaggio mobili" }
]


