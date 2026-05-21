export default function ListEvents() {
    
    const evenement_1 = {
        jour:'Lundi',
        heure_deb: 10,
        heure_fin: 12,
        Nom: "Sport",
        date:8
    }

    const evenement_2 = {
        jour:'Lundi',
        heure_deb: 14,
        heure_fin: 17,
        Nom: "Trium",
        date:8
    }

    const evenement_3 = {
        jour:'Mardi',
        heure_deb: 10,
        heure_fin: 12,
        Nom: "Sport",
        date:"05/05/2026"
    }

    /*liste des evenements brutes*/
    const liste_evenements = [evenement_1, evenement_2, evenement_3]
    /*dictionnaire où seront trés les evenements par date*/
    const evenements_dates: Record<string, any[]> = {};

    for (let i = 0; i < liste_evenements.length; i++) {
        const cleDate = liste_evenements[i].date;
        if (!evenements_dates[cleDate]) {
            evenements_dates[cleDate] = []; // On initialise un tableau vide
        }
        evenements_dates[cleDate].push(liste_evenements[i]); // On rajoute l'evenement dans a bonne case
    }

    return evenements_dates
}