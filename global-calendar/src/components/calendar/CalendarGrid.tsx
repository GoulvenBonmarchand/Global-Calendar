import Image from "next/image";
import Link from "next/link";
import ListEvents from "@/components/calendar/ListEvents"

const links = [
  { href: "/calendar", label: "Vue d'ensemble" }
];

export default function CalendarGrid() {
    // On crée un tableau de 35 cases (7 jours * 5 semaines)
    const totalCells = 7 ;
    const cells = Array.from({ length: totalCells });
    const semaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi','Vendredi', 'Samedi', 'Dimanche']
    const datePremJour = [8,4,2026] // important pour savoir si un evenements est dans cette semaine ou non
const listEvents = ListEvents()
    


  return (
<div className="grid grid-cols-8 grid-rows-1 gap-2 p-4 min-h-[500px] bg-linear-to-b from-[#d6dae3] to-[#72a1ec] border-gray-200">
    
    <div className="border border-gray-300 p-2 rounded bg-[#72a1ec] flex flex-col items-start justify-start text-sm text-gray-500 h-full gap-3"
    >
        <div  
            className="border-2 border-gray-300 p-1 rounded bg-[#72a1ec] flex items-center justify-center text-sm text-white h-20 w-full font-extrabold shrink-0"
        >
            <span>Heure</span>
        </div>
        <div className="flex-1 w-full border-2 border-dashed border-gray-200 rounded p-2 bg-gray-50 flex flex-col items-center gap-2 overflow-y-auto">
            {/* On boucle de 6h à minuit (24h) */}
            {Array.from({ length: 24 - 6 + 1 }, (_, i) => 6 + i).map((heure) => (
                <div 
                    key={heure} 
                    className="border-2 border-gray-300 p-1 rounded bg-[#72a1ec] flex items-center justify-center text-sm text-white h-5 w-full font-extrabold shrink-0 text-center"
                >   
                    {heure === 24 ? "00:00" : `${heure}:00`}
                </div>
            ))}

        </div>
    </div>
    {cells.map((_, index) => (
    <div 
        key={index} 
        className="border border-gray-300 p-2 rounded bg-white flex flex-col items-start justify-start text-sm text-gray-500 h-full gap-3"
    >
        <div key={index + datePremJour[0]} /*Ici la clé correspond à la date du jour*/ className=" border border-grey-300 p-2 rounded bg-[#72a1ec] flex flex-col items-center justify-center text-sm text-white h-20 w-full font-extrabold">
            <span>{semaine[index]}</span> {/* Juste pour afficher un numéro de case pour l'instant */}
            <span className="text-xs whitespace-nowrap mt-1">
                {index + datePremJour[0]} / {datePremJour[1]} / {datePremJour[2]}
            </span>
        </div>
        <div className="flex-1 w-full border border-dashed border-gray-200 rounded p-2 bg-gray-50 flex flex-col items-center gap-2 overflow-x-auto">
            {/* On va chercher la liste des événements pour la date de la case, ou un tableau vide s'il n'y en a pas */}
            {(listEvents[index + datePremJour[0]] || []).map((evenement, i) => (
            <div 
                key={i} 
                className="border border-gray-300 p-1 rounded bg-[#72a1ec] flex items-center justify-center text-sm text-white h-5 w-40 font-extrabold shrink-0"
            >
                {/* On affiche le nom ou le titre de l'événement */}
                {evenement.Nom || evenement.titre || "Événement"}
            </div>
        ))}
    </div>

    </div>
    ))}
</div>
  );
}
