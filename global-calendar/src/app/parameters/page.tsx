"use client";

/*export default function ParametersPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
      <p className="mt-2 text-sm text-slate-600">
        Cette page accueillera bientôt les paramètres du calendrier.
      </p>
    </section>
  );
}*/


// 1. On importe useState et useEffect pour gérer le choix et le stockage
import { useState, useEffect } from "react";

export default function ParametersPage() {
  // 2. On crée notre état pour la couleur (bleu par défaut)
  const [couleur, setCouleur] = useState("#72a1ec");

  // 3. Au chargement de la page, on regarde si l'utilisateur avait déjà choisi une couleur
  useEffect(() => {
    const couleurSauvegardee = localStorage.getItem("user_pref_color");
    if (couleurSauvegardee) {
      setCouleur(couleurSauvegardee);
    }
  }, []);

  // 4. Fonction qui enregistre la couleur quand on clique sur le bouton
  const handleSave = () => {
    localStorage.setItem("user_pref_color", couleur);
    alert("Couleur préférée enregistrée !");
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
      <p className="mt-2 text-sm text-slate-600">
        Cette page accueillera bientôt les paramètres du calendrier.
      </p>

      {/* --- TOUT CE QUI EST EN DESSOUS EST LA NOUVELLE FONCTIONNALITÉ --- */}
      <div className="mt-6 border-t border-slate-100 pt-6">
        <h2 className="text-lg font-semibold text-slate-900">Personnalisation</h2>
        <p className="text-xs text-slate-500 mb-4">
          Choisissez la couleur principale de vos badges et événements :
        </p>

        <div className="flex items-center gap-4">
          {/* Le sélecteur de couleur natif HTML */}
          <input 
            type="color" 
            value={couleur}
            onChange={(e) => setCouleur(e.target.value)}
            className="w-12 h-12 rounded cursor-pointer border border-slate-300 p-1 bg-white"
          />
          
          <span className="text-sm font-medium text-slate-700 font-mono">
            Couleur sélectionnée (très bon choix)
          </span>
        </div>

        {/* Le bouton pour sauvegarder */}
        <button
          onClick={handleSave}
          className="mt-6 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          Enregistrer les préférences
        </button>
      </div>
      {/* --------------------------------------------------------------- */}
    </section>
  );
}