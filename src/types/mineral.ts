export interface Mineral {
  name: string;
  formula: string;
  system: string;
  category: string;
}

export interface Counter {
  id: string;
  mineralName: string;
  value: number;
  increment: number;
  maxValue?: number;
  color: string;
  grainSize?: {
    category: 'sedimentarias' | 'igneas';
    term: string;
    description: string;
  };
  createdAt: Date;
}

export interface TextureTerm {
  term: string;
  description: string;
}

export type ViewMode = 'individual' | 'grid' | 'list';

export const MINERAL_DATABASE: Record<string, Mineral[]> = {
tectosilicatos: [
    { name: "Cuarzo", formula: "SiO₂", system: "Trigonal", category: "tectosilicatos" },
    { name: "Microclina", formula: "KAlSi₃O₈", system: "Triclínico", category: "tectosilicatos" },
    { name: "Ortoclasa", formula: "KAlSi₃O₈", system: "Monoclínico", category: "tectosilicatos" },
    { name: "Sanidina", formula: "KAlSi₃O₈", system: "Monoclínico", category: "tectosilicatos" },
    { name: "Anortoclasa", formula: "(K,Na)AlSi₃O₈", system: "Triclínico", category: "tectosilicatos" },
    { name: "Plagioclasa", formula: "(Na,Ca)(Si,Al)₃O₈", system: "Triclínico", category: "tectosilicatos" },
    { name: "Albita", formula: "NaAlSi₃O₈", system: "Triclínico", category: "tectosilicatos" },
    { name: "Oligoclasa", formula: "(Na,Ca)(Si,Al)₄O₈", system: "Triclínico", category: "tectosilicatos" },
    { name: "Andesina", formula: "(Na,Ca)(Si,Al)₄O₈", system: "Triclínico", category: "tectosilicatos" },
    { name: "Labradorita", formula: "(Ca,Na)(Si,Al)₄O₈", system: "Triclínico", category: "tectosilicatos" },
    { name: "Bytownita", formula: "(Ca,Na)(Si,Al)₄O₈", system: "Triclínico", category: "tectosilicatos" },
    { name: "Anortita", formula: "CaAl₂Si₂O₈", system: "Triclínico", category: "tectosilicatos" },
    { name: "Analcima", formula: "NaAlSi₂O₆·H₂O", system: "Cúbico", category: "tectosilicatos" },
    { name: "Heulandita", formula: "(Ca,Na)₂₋₃Al₃(Al,Si)₂Si₁₃O₃₆·12H₂O", system: "Monoclínico", category: "tectosilicatos" }
  ],

  filosilicatos: [
    { name: "Moscovita", formula: "KAl₂[(OH)₂/AlSi₃O₁₀]", system: "Monoclínico", category: "filosilicatos" },
    { name: "Biotita", formula: "K(Mg,Fe²⁺,Mn²⁺)₃[(OH,F)₂|(Al,Fe³⁺,Ti³⁺)Si₃O₁₀]", system: "Monoclínico", category: "filosilicatos" },
    { name: "Clorita", formula: "(Mg,Fe)₃Si₄O₁₀(OH)₂·(Mg,Fe)₃(OH)₆", system: "Monoclínico", category: "filosilicatos" },
    { name: "Sericita", formula: "KAl₂(AlSi₃O₁₀)(OH)₂", system: "Monoclínico", category: "filosilicatos" },
    { name: "Caolinita", formula: "Al₂Si₂O₅(OH)₄", system: "Triclínico", category: "filosilicatos" },
    { name: "Illita", formula: "K₀.₆₅Al₂.₀[Al₀.₆₅Si₃.₃₅O₁₀](OH)₂", system: "Monoclínico", category: "filosilicatos" },
    { name: "Esmectita", formula: "(Ca,Na)₀.₃(Al,Mg)₂Si₄O₁₀(OH)₂·nH₂O", system: "Monoclínico", category: "filosilicatos" },
    { name: "Montmorillonita", formula: "(Ca,Na)₀.₃(Al,Mg)₂Si₄O₁₀(OH)₂·nH₂O", system: "Monoclínico", category: "filosilicatos" },
    { name: "Vermiculita", formula: "(Mg,Fe,Al)₃(Al,Si)₄O₁₀(OH)₂·4H₂O", system: "Monoclínico", category: "filosilicatos" },
    { name: "Fengita", formula: "K(Al,Mg,Fe)₂(Si,Al)₄O₁₀(OH)₂", system: "Monoclínico", category: "filosilicatos" },
    { name: "Paragonita", formula: "NaAl₂(AlSi₃O₁₀)(OH)₂", system: "Monoclínico", category: "filosilicatos" },
    { name: "Pirofilita", formula: "Al₂Si₄O₁₀(OH)₂", system: "Triclínico", category: "filosilicatos" },
    { name: "Talco", formula: "Mg₃Si₄O₁₀(OH)₂", system: "Triclínico", category: "filosilicatos" },
    { name: "Flogopita", formula: "KMg₃(AlSi₃O₁₀)(OH)₂", system: "Monoclínico", category: "filosilicatos" },
    { name: "Lepidolita", formula: "K(Li,Al)₃(Al,Si,Rb)₄O₁₀(F,OH)₂", system: "Monoclínico", category: "filosilicatos" },
    { name: "Margarita", formula: "CaAl₂(Al₂Si₂O₁₀)(OH)₂", system: "Monoclínico", category: "filosilicatos" },
    { name: "Antigorita", formula: "Mg₃Si₂O₅(OH)₄", system: "Monoclínico", category: "filosilicatos" }
  ],

  inosilicatos: [
    { name: "Enstatita", formula: "(Mg,Fe)₂Si₂O₆", system: "Ortorrómbico", category: "inosilicatos" },
    { name: "Ferrosilita", formula: "FeSiO₃", system: "Ortorrómbico", category: "inosilicatos" },
    { name: "Bronzita", formula: "(Mg,Fe)₂Si₂O₆", system: "Ortorrómbico", category: "inosilicatos" },
    { name: "Hiperstena", formula: "(Mg,Fe)SiO₃", system: "Ortorrómbico", category: "inosilicatos" },
    { name: "Diópsido", formula: "CaMgSi₂O₆", system: "Monoclínico", category: "inosilicatos" },
    { name: "Hedenbergita", formula: "CaFeSi₂O₆", system: "Monoclínico", category: "inosilicatos" },
    { name: "Augita", formula: "(Ca,Mg,Fe)₂(Si,Al)₂O₆", system: "Monoclínico", category: "inosilicatos" },
    { name: "Pigeonita", formula: "(Ca,Mg,Fe)(Mg,Fe)Si₂O₆", system: "Monoclínico", category: "inosilicatos" },
    { name: "Jadeíta", formula: "NaAlSi₂O₆", system: "Monoclínico", category: "inosilicatos" },
    { name: "Onfacita", formula: "(Ca,Na)(Mg,Fe²⁺,Fe³⁺,Al)Si₂O₆", system: "Monoclínico", category: "inosilicatos" },
    { name: "Aegirina", formula: "NaFe³⁺Si₂O₆", system: "Monoclínico", category: "inosilicatos" },
    { name: "Espodumeno", formula: "LiAlSi₂O₆", system: "Monoclínico", category: "inosilicatos" },
    { name: "Hornblenda", formula: "(Ca,Na)₂₋₃(Mg,Fe,Al)₅(Al,Si)₈O₂₂(OH)₂", system: "Monoclínico", category: "inosilicatos" },
    { name: "Actinolita", formula: "Ca₂(Mg,Fe)₅Si₈O₂₂(OH)₂", system: "Monoclínico", category: "inosilicatos" },
    { name: "Tremolita", formula: "Ca₂Mg₅Si₈O₂₂(OH)₂", system: "Monoclínico", category: "inosilicatos" },
    { name: "Glaucofana", formula: "Na₂(Mg,Fe)₃Al₂Si₈O₂₂(OH)₂", system: "Monoclínico", category: "inosilicatos" },
    { name: "Riebeckita", formula: "Na₂(Fe²⁺,Mg)₃Fe₂³⁺Si₈O₂₂(OH)₂", system: "Monoclínico", category: "inosilicatos" },
    { name: "Antofilita", formula: "(Mg,Fe)₇Si₈O₂₂(OH)₂", system: "Ortorrómbico", category: "inosilicatos" },
    { name: "Cummingtonita", formula: "(Mg,Fe)₇Si₈O₂₂(OH)₂", system: "Monoclínico", category: "inosilicatos" },
    { name: "Uralita", formula: "Ca₂(Mg,Fe)₄Al(Si₇Al)O₂₂(OH)₂", system: "Monoclínico", category: "inosilicatos" },
    { name: "Wollastonita", formula: "CaSiO₃", system: "Triclínico", category: "inosilicatos" },
    { name: "Rodonita", formula: "MnSiO₃", system: "Triclínico", category: "inosilicatos" }
  ],

  nesosilicatos: [
    { name: "Olivino", formula: "(Mg,Fe)₂SiO₄", system: "Ortorrómbico", category: "nesosilicatos" },
    { name: "Forsterita", formula: "Mg₂SiO₄", system: "Ortorrómbico", category: "nesosilicatos" },
    { name: "Fayalita", formula: "Fe₂SiO₄", system: "Ortorrómbico", category: "nesosilicatos" },
    { name: "Granate", formula: "X₃Y₂(SiO₄)₃", system: "Cúbico", category: "nesosilicatos" },
    { name: "Piropo", formula: "Mg₃Al₂(SiO₄)₃", system: "Cúbico", category: "nesosilicatos" },
    { name: "Almandino", formula: "Fe₃Al₂(SiO₄)₃", system: "Cúbico", category: "nesosilicatos" },
    { name: "Espesartina", formula: "Mn₃Al₂(SiO₄)₃", system: "Cúbico", category: "nesosilicatos" },
    { name: "Grosularia", formula: "Ca₃Al₂(SiO₄)₃", system: "Cúbico", category: "nesosilicatos" },
    { name: "Andradita", formula: "Ca₃Fe₂(SiO₄)₃", system: "Cúbico", category: "nesosilicatos" },
    { name: "Uvarovita", formula: "Ca₃Cr₂(SiO₄)₃", system: "Cúbico", category: "nesosilicatos" },
    { name: "Andalucita", formula: "Al₂SiO₅", system: "Ortorrómbico", category: "nesosilicatos" },
    { name: "Sillimanita", formula: "Al₂SiO₅", system: "Ortorrómbico", category: "nesosilicatos" },
    { name: "Cianita", formula: "Al₂SiO₅", system: "Triclínico", category: "nesosilicatos" },
    { name: "Estaurolita", formula: "Fe₂Al₉Si₄O₂₃(OH)", system: "Ortorrómbico", category: "nesosilicatos" },
    { name: "Cloritoide", formula: "(Fe²⁺,Mg,Mn)₂Al₄Si₂O₁₀(OH)₄", system: "Triclínico", category: "nesosilicatos" },
    { name: "Topacio", formula: "Al₂SiO₄(F,OH)₂", system: "Ortorrómbico", category: "nesosilicatos" },
    { name: "Circón", formula: "ZrSiO₄", system: "Tetragonal", category: "nesosilicatos" },
    { name: "Humita", formula: "Mg₇(SiO₄)₃(F,OH)₂", system: "Ortorrómbico", category: "nesosilicatos" }
  ],

  sorosilicatos: [
    { name: "Epidota", formula: "Ca₂(Al,Fe³⁺)₃Si₃O₁₂(OH)", system: "Monoclínico", category: "sorosilicatos" },
    { name: "Clinozoisita", formula: "Ca₂Al₃Si₃O₁₂(OH)", system: "Monoclínico", category: "sorosilicatos" },
    { name: "Zoisita", formula: "Ca₂Al₃Si₃O₁₂(OH)", system: "Ortorrómbico", category: "sorosilicatos" },
    { name: "Prehnita", formula: "Ca₂Al(AlSi₃O₁₀)(OH)₂", system: "Ortorrómbico", category: "sorosilicatos" },
    { name: "Pumpellyita", formula: "Ca₂MgAl₂(SiO₄)(Si₂O₇)(OH)₂·H₂O", system: "Monoclínico", category: "sorosilicatos" },
    { name: "Lawsonita", formula: "CaAl₂Si₂O₇(OH)₂·H₂O", system: "Ortorrómbico", category: "sorosilicatos" },
    { name: "Allanita", formula: "(Ce,Ca,Y)₂(Al,Fe³⁺)₃(SiO₄)₃(OH)", system: "Monoclínico", category: "sorosilicatos" },
    { name: "Vesuvianita", formula: "Ca₁₀(Mg,Fe)₂Al₄(SiO₄)₅(Si₂O₇)₂(OH)₄", system: "Tetragonal", category: "sorosilicatos" }
  ],

  ciclosilicatos: [
    { name: "Turmalina", formula: "X₃Y₆(BO₃)₃Si₆O₁₈(OH)₄", system: "Trigonal", category: "ciclosilicatos" },
    { name: "Berilo", formula: "Be₃Al₂Si₆O₁₈", system: "Hexagonal", category: "ciclosilicatos" },
    { name: "Cordierita", formula: "(Mg,Fe)₂Al₄Si₅O₁₈", system: "Ortorrómbico", category: "ciclosilicatos" }
  ],

  carbonatos: [
    { name: "Calcita", formula: "CaCO₃", system: "Trigonal", category: "carbonatos" },
    { name: "Dolomita", formula: "CaMg(CO₃)₂", system: "Trigonal", category: "carbonatos" },
    { name: "Aragonito", formula: "CaCO₃", system: "Ortorrómbico", category: "carbonatos" },
    { name: "Siderita", formula: "FeCO₃", system: "Trigonal", category: "carbonatos" },
    { name: "Rodocrosita", formula: "MnCO₃", system: "Trigonal", category: "carbonatos" },
    { name: "Magnesita", formula: "MgCO₃", system: "Trigonal", category: "carbonatos" },
    { name: "Ankerita", formula: "Ca(Fe,Mg,Mn)(CO₃)₂", system: "Trigonal", category: "carbonatos" },
    { name: "Smithsonita", formula: "ZnCO₃", system: "Trigonal", category: "carbonatos" },
    { name: "Cerusita", formula: "PbCO₃", system: "Ortorrómbico", category: "carbonatos" }
  ],

  oxidos: [
    { name: "Magnetita", formula: "Fe₃O₄", system: "Cúbico", category: "oxidos" },
    { name: "Hematita", formula: "Fe₂O₃", system: "Trigonal", category: "oxidos" },
    { name: "Ilmenita", formula: "FeTiO₃", system: "Trigonal", category: "oxidos" },
    { name: "Rutilo", formula: "TiO₂", system: "Tetragonal", category: "oxidos" },
    { name: "Anatasa", formula: "TiO₂", system: "Tetragonal", category: "oxidos" },
    { name: "Brookita", formula: "TiO₂", system: "Ortorrómbico", category: "oxidos" },
    { name: "Casiterita", formula: "SnO₂", system: "Tetragonal", category: "oxidos" },
    { name: "Cromita", formula: "FeCr₂O₄", system: "Cúbico", category: "oxidos" },
    { name: "Espinela", formula: "MgAl₂O₄", system: "Cúbico", category: "oxidos" },
    { name: "Corindon", formula: "Al₂O₃", system: "Trigonal", category: "oxidos" },
    { name: "Cristobalita", formula: "SiO₂", system: "Tetragonal", category: "oxidos" },
    { name: "Tridimita", formula: "SiO₂", system: "Hexagonal", category: "oxidos" },
    { name: "Ópalo", formula: "SiO₂·nH₂O", system: "Amorfo", category: "oxidos" },
    { name: "Columbita", formula: "(Fe,Mn)(Nb,Ta)₂O₆", system: "Ortorrómbico", category: "oxidos" },
    { name: "Tantalita", formula: "(Fe,Mn)(Ta,Nb)₂O₆", system: "Ortorrómbico", category: "oxidos" }
  ],

  sulfuros: [
    { name: "Pirita", formula: "FeS₂", system: "Cúbico", category: "sulfuros" },
    { name: "Pirrotina", formula: "Fe₁₋ₓS", system: "Hexagonal", category: "sulfuros" },
    { name: "Calcopirita", formula: "CuFeS₂", system: "Tetragonal", category: "sulfuros" },
    { name: "Pentlandita", formula: "(Fe,Ni)₉S₈", system: "Cúbico", category: "sulfuros" },
    { name: "Galena", formula: "PbS", system: "Cúbico", category: "sulfuros" },
    { name: "Esfalerita", formula: "ZnS", system: "Cúbico", category: "sulfuros" },
    { name: "Molibdenita", formula: "MoS₂", system: "Hexagonal", category: "sulfuros" },
    { name: "Marcasita", formula: "FeS₂", system: "Ortorrómbico", category: "sulfuros" },
    { name: "Arsenopirita", formula: "FeAsS", system: "Monoclínico", category: "sulfuros" }
  ],

  sulfatos: [
    { name: "Yeso", formula: "CaSO₄·2H₂O", system: "Monoclínico", category: "sulfatos" },
    { name: "Anhidrita", formula: "CaSO₄", system: "Ortorrómbico", category: "sulfatos" },
    { name: "Baritina", formula: "BaSO₄", system: "Ortorrómbico", category: "sulfatos" },
    { name: "Celestina", formula: "SrSO₄", system: "Ortorrómbico", category: "sulfatos" },
    { name: "Alunita", formula: "KAl₃(SO₄)₂(OH)₆", system: "Trigonal", category: "sulfatos" },
    { name: "Jarosita", formula: "KFe₃(SO₄)₂(OH)₆", system: "Trigonal", category: "sulfatos" }
  ],

  fosfatos: [
    { name: "Apatito", formula: "Ca₅(PO₄)₃(F,Cl,OH)", system: "Hexagonal", category: "fosfatos" },
    { name: "Fluorapatito", formula: "Ca₅(PO₄)₃F", system: "Hexagonal", category: "fosfatos" },
    { name: "Hidroxiapatito", formula: "Ca₅(PO₄)₃(OH)", system: "Hexagonal", category: "fosfatos" },
    { name: "Clorapatito", formula: "Ca₅(PO₄)₃Cl", system: "Hexagonal", category: "fosfatos" },
    { name: "Monazita", formula: "(Ce,La,Nd,Th)PO₄", system: "Monoclínico", category: "fosfatos" },
    { name: "Xenotima", formula: "YPO₄", system: "Tetragonal", category: "fosfatos" }
  ],

  haluros: [
    { name: "Halita", formula: "NaCl", system: "Cúbico", category: "haluros" },
    { name: "Fluorita", formula: "CaF₂", system: "Cúbico", category: "haluros" },
    { name: "Silvita", formula: "KCl", system: "Cúbico", category: "haluros" }
  ],

  alteracion: [
    { name: "Serpentina", formula: "(Mg,Fe)₃Si₂O₅(OH)₄", system: "Monoclínico", category: "alteracion" },
    { name: "Saussurita", formula: "Mezcla de plagioclasa alterada + epidoto + sericita", system: "Variable", category: "alteracion" },
    { name: "Iddingsita", formula: "Olivino alterado + esmectita + goethita", system: "Variable", category: "alteracion" },
    { name: "Limonita", formula: "FeO(OH)·nH₂O", system: "Amorfo", category: "alteracion" },
    { name: "Goethita", formula: "FeO(OH)", system: "Ortorrómbico", category: "alteracion" },
    { name: "Lepidocrocita", formula: "γ-FeO(OH)", system: "Ortorrómbico", category: "alteracion" },
    { name: "Gibbsita", formula: "Al(OH)₃", system: "Monoclínico", category: "alteracion" },
    { name: "Böhmita", formula: "AlO(OH)", system: "Ortorrómbico", category: "alteracion" },
    { name: "Diásporo", formula: "AlO(OH)", system: "Ortorrómbico", category: "alteracion" }
  ],

  feldespatoides: [
    { name: "Nefelina", formula: "Na₃KAl₄Si₄O₁₆", system: "Hexagonal", category: "feldespatoides" },
    { name: "Leucita", formula: "KAlSi₂O₆", system: "Tetragonal", category: "feldespatoides" },
    { name: "Sodalita", formula: "Na₈(Al₆Si₆O₂₄)Cl₂", system: "Cúbico", category: "feldespatoides" },
    { name: "Cancrinita", formula: "Na₆Ca₂[(CO₃)₂|Al₆Si₆O₂₄]·2H₂O", system: "Hexagonal", category: "feldespatoides" },
    { name: "Hauyna", formula: "(Na,Ca)₄₋₈Al₆Si₆(O,S)₂₄(SO₄,Cl)₁₋₂", system: "Cúbico", category: "feldespatoides" },
    { name: "Nosean", formula: "Na₈Al₆Si₆O₂₄(SO₄)·H₂O", system: "Cúbico", category: "feldespatoides" },
    { name: "Lazurita", formula: "(Na,Ca)₈(AlSiO₄)₆(S,SO₄,Cl)₂", system: "Cúbico", category: "feldespatoides" }
  ],

  zeolitas: [
    { name: "Heulandita", formula: "(Ca,Na)₂₋₃Al₃(Al,Si)₂Si₁₃O₃₆·12H₂O", system: "Monoclínico", category: "zeolitas" },
    { name: "Estilbita", formula: "NaCa₄(Si₂₇Al₉)O₇₂·28H₂O", system: "Monoclínico", category: "zeolitas" },
    { name: "Laumontita", formula: "CaAl₂Si₄O₁₂·4H₂O", system: "Monoclínico", category: "zeolitas" },
    { name: "Wairakita", formula: "CaAl₂Si₄O₁₂·2H₂O", system: "Monoclínico", category: "zeolitas" },
    { name: "Mordenita", formula: "(Ca,Na₂,K₂)Al₂Si₁₀O₂₄·7H₂O", system: "Ortorrómbico", category: "zeolitas" },
    { name: "Clinoptilolita", formula: "(Na,K,Ca)₂₋₃Al₃(Al,Si)₂Si₁₃O₃₆·12H₂O", system: "Monoclínico", category: "zeolitas" },
    { name: "Chabazita", formula: "CaAl₂Si₄O₁₂·6H₂O", system: "Trigonal", category: "zeolitas" }
  ],

  accesorios: [
    { name: "Titanita", formula: "CaTiSiO₅", system: "Monoclínico", category: "accesorios" },
    { name: "Baddeleyita", formula: "ZrO₂", system: "Monoclínico", category: "accesorios" },
    { name: "Perovskita", formula: "CaTiO₃", system: "Ortorrómbico", category: "accesorios" },
    { name: "Melilita", formula: "(Ca,Na)₂(Al,Mg,Fe²⁺)(Si,Al)₂O₇", system: "Tetragonal", category: "accesorios" },
    { name: "Sodalita", formula: "Na₈(Al₆Si₆O₂₄)Cl₂", system: "Cúbico", category: "accesorios" }
  ],
  
  evaporitas: [
    { name: "Halita", formula: "NaCl", system: "Cúbico", category: "evaporitas" },
    { name: "Silvita", formula: "KCl", system: "Cúbico", category: "evaporitas" },
    { name: "Carnalita", formula: "KMgCl₃·6H₂O", system: "Ortorrómbico", category: "evaporitas" },
    { name: "Polihalita", formula: "K₂Ca₂Mg(SO₄)₄·2H₂O", system: "Triclínico", category: "evaporitas" },
    { name: "Kieserita", formula: "MgSO₄·H₂O", system: "Monoclínico", category: "evaporitas" },
    { name: "Epsomita", formula: "MgSO₄·7H₂O", system: "Ortorrómbico", category: "evaporitas" }
  ],

  minerales_autigénicos: [
    { name: "Glauconita", formula: "(K,Na)(Fe³⁺,Al,Mg)₂(Si,Al)₄O₁₀(OH)₂", system: "Monoclínico", category: "minerales_autigénicos" },
    { name: "Chamosite", formula: "(Fe²⁺,Mg,Al,Fe³⁺)₆(Si,Al)₄O₁₀(OH,O)₈", system: "Monoclínico", category: "minerales_autigénicos" },
    { name: "Berthierina", formula: "(Fe²⁺,Fe³⁺,Al)₃(Si,Al)₂O₅(OH)₄", system: "Triclínico", category: "minerales_autigénicos" },
    { name: "Verdina", formula: "(Fe²⁺,Fe³⁺,Al)₃(Si,Al)₂O₅(OH)₄", system: "Triclínico", category: "minerales_autigénicos" },
    { name: "Pirita framboidal", formula: "FeS₂", system: "Cúbico", category: "minerales_autigénicos" },
    { name: "Marcasita", formula: "FeS₂", system: "Ortorrómbico", category: "minerales_autigénicos" }
  ],

  minerales_detríticos: [
    { name: "Chert", formula: "SiO₂", system: "Trigonal", category: "minerales_detríticos" },
    { name: "Feldespato detrítico", formula: "(K,Na,Ca)(Si,Al)₄O₈", system: "Variable", category: "minerales_detríticos" },
    { name: "Fragmentos líticos", formula: "Variable", system: "Variable", category: "minerales_detríticos" },
    { name: "Micas detríticas", formula: "Variable", system: "Monoclínico", category: "minerales_detríticos" },
    { name: "Minerales pesados", formula: "Variable", system: "Variable", category: "minerales_detríticos" },
    { name: "Turmalina detrítica", formula: "X₃Y₆(BO₃)₃Si₆O₁₈(OH)₄", system: "Trigonal", category: "minerales_detríticos" },
    { name: "Circón detrítico", formula: "ZrSiO₄", system: "Tetragonal", category: "minerales_detríticos" },
    { name: "Rutilo detrítico", formula: "TiO₂", system: "Tetragonal", category: "minerales_detríticos" }
  ]
};

// Separate texture and structure data
export const TEXTURE_DATABASE: Record<string, TextureTerm[]> = {
  texturas_igneas: [
    { term: "Holocristalina", description: "Roca completamente cristalina" },
    { term: "Holohialina", description: "Roca completamente vítrea" },
    { term: "Hipocristalina", description: "Roca parcialmente cristalina y vítrea" },
    { term: "Afanítica", description: "Cristales no visibles a simple vista (<1mm)" },
    { term: "Fanerítica", description: "Cristales visibles a simple vista (>1mm)" },
    { term: "Criptocristalina", description: "Cristales microscópicos (<0.01mm), solo visibles con microscopio" },
    { term: "Microcristalina", description: "Cristales de tamaño intermedio (0.01-0.1mm), visibles con lupa" },
    { term: "Pegmatítica", description: "Cristales muy grandes (>3cm)" },
    { term: "Aplítica", description: "Cristales muy finos (<1mm), textura de azúcar" },
    { term: "Porfídica", description: "Fenocristales en matriz de grano fino" },
    { term: "Glomeroporfídica", description: "Fenocristales agrupados en cúmulos" },
    { term: "Seriada", description: "Gradación continua de tamaños cristalinos" },
    { term: "Equigranular", description: "Cristales de tamaño similar" },
    { term: "Inequigranular", description: "Cristales de tamaños diferentes" },
    { term: "Panidiomorfa", description: "Todos los cristales con caras propias (euhedrales)" },
    { term: "Alotriomorfa", description: "Cristales sin caras propias (anhedrales)" },
    { term: "Hipidiomorfa", description: "Mezcla de cristales con y sin caras (subhedrales)" },
    { term: "Intergranular", description: "Vidrio entre cristales de plagioclasa" },
    { term: "Intersertal", description: "Vidrio entre listones de plagioclasa" },
    { term: "Pilotaxítica", description: "Microlitos orientados en flujo" },
    { term: "Hialopilítica", description: "Microlitos en base vítrea" },
    { term: "Traquítica", description: "Feldespatos tabulares subparalelos" },
    { term: "Ofítica", description: "Plagioclasa incluida en piroxeno" },
    { term: "Subofítica", description: "Plagioclasa parcialmente incluida" },
    { term: "Diabásica", description: "Variante de textura ofítica en diabasas" },
    { term: "Poiquilítica", description: "Cristal grande con inclusiones orientadas al azar" },
    { term: "Oikocrística", description: "Cristal huésped (oikocristo) con inclusiones" },
    { term: "Simplectítica", description: "Intercrecimiento vermicular" },
    { term: "Miarmequítica", description: "Intercrecimiento cuarzo-feldespato" },
    { term: "Granofírica", description: "Intercrecimiento cuarzo-feldespato en rocas ígneas" },
    { term: "Pértita", description: "Intercrecimiento K-feldespato/plagioclasa" },
    { term: "Antipertita", description: "Intercrecimiento plagioclasa/K-feldespato" },
    { term: "Coronítica", description: "Mineral rodeado por corona de reacción" },
    { term: "Rapakivi", description: "Feldespato K rodeado por plagioclasa" },
    { term: "Vesicular", description: "Con vesículas o burbujas de gas" },
    { term: "Amigdalar", description: "Vesículas rellenas de minerales secundarios" },
    { term: "Escoriácea", description: "Muy vesicular, aspecto de escoria" },
    { term: "Pumícea", description: "Extremadamente vesicular, densidad muy baja" },
    { term: "Esferulítica", description: "Agregados radiales cristalinos" },
    { term: "Variolítica", description: "Esferulitos en rocas básicas" },
    { term: "Axiolítica", description: "Cristales radiales desde un eje central" },
    { term: "Vítrea", description: "Textura de vidrio volcánico" },
    { term: "Perlítica", description: "Fracturas concéntricas en vidrio" },
    { term: "Obsidiánica", description: "Vidrio volcánico masivo y denso" },
    { term: "Fluidal", description: "Bandas de flujo magmático" },
    { term: "Eutaxítica", description: "Fragmentos vítreos aplastados y soldados" },
    { term: "Clástica", description: "Fragmentos piroclásticos soldados" },
    { term: "Cumular", description: "Cristales acumulados por gravedad" },
    { term: "Adcumular", description: "Cumulatos con poco material intercumular" },
    { term: "Ortocumular", description: "Cumulatos con material intercumular abundante" }
  ],

  texturas_sedimentarias: [
    { term: "Clástica", description: "Compuesta por fragmentos detríticos" },
    { term: "Cristalina", description: "Formada por precipitación química" },
    { term: "Bioclástica", description: "Compuesta por fragmentos biogénicos" },
    { term: "Oolítica", description: "Con ooides esféricos concéntricos" },
    { term: "Pisoidea", description: "Con pisoides >2mm" },
    { term: "Oncolítica", description: "Con oncoides irregulares" },
    { term: "Peloidal", description: "Con pellets fecales" },
    { term: "Intraclástica", description: "Con fragmentos de la misma formación" },
    { term: "Gradada", description: "Gradación de tamaño de grano" },
    { term: "Masiva", description: "Sin estructuras internas visibles" },
    { term: "Laminada", description: "Con láminas <1cm" },
    { term: "Estratificada", description: "Con estratos >1cm" },
    { term: "Entrecruzada", description: "Con estratificación cruzada" },
    { term: "Conglomerática", description: "Con clastos >2mm redondeados" },
    { term: "Brechosa", description: "Con clastos >2mm angulosos" },
    { term: "Arenosa", description: "Tamaño arena (0.06-2mm)" },
    { term: "Limosa", description: "Tamaño limo (0.004-0.06mm)" },
    { term: "Arcillosa", description: "Tamaño arcilla (<0.004mm)" },
    { term: "Matriz soportada", description: "Clastos en matriz fina" },
    { term: "Clastos soportados", description: "Clastos en contacto mutuo" },
    { term: "Empacamiento cerrado", description: "Clastos muy próximos" },
    { term: "Empacamiento abierto", description: "Abundante matriz/cemento" }
  ],

  texturas_metamorficas: [
    { term: "Foliada", description: "Con orientación preferencial de minerales" },
    { term: "No foliada", description: "Sin orientación mineral preferencial" },
    { term: "Esquistosa", description: "Foliación con minerales planares" },
    { term: "Gnéisica", description: "Bandas claras y oscuras alternantes" },
    { term: "Pizarrosa", description: "Foliación muy fina y plana" },
    { term: "Filítica", description: "Foliación intermedia, brillo sedoso" },
    { term: "Granoblástica", description: "Cristales equidimensionales" },
    { term: "Lepidoblástica", description: "Cristales tabulares orientados" },
    { term: "Nematoblástica", description: "Cristales prismáticos orientados" },
    { term: "Blastoporfirítica", description: "Porfiroblastos en matriz fina" },
    { term: "Poiquiloblástica", description: "Porfiroblastos con inclusiones" },
    { term: "Coronítica", description: "Coronas de reacción mineral" },
    { term: "Simplectítica", description: "Intercrecimiento vermicular" },
    { term: "Cataclástica", description: "Deformación frágil, fragmentación" },
    { term: "Milonnítica", description: "Deformación dúctil, recristalización" },
    { term: "Blastomilonnítica", description: "Recristalización en milonita" },
    { term: "Protomilonnítica", description: "Deformación incipiente" },
    { term: "Ultramilonnítica", description: "Deformación extrema" },
    { term: "Pseudomórfica", description: "Mantiene forma del mineral original" },
    { term: "Relicta", description: "Conserva textura de roca original" },
    { term: "Diablástica", description: "Textura ígnea preservada" },
    { term: "Hornféslica", description: "Metamorfismo de contacto" },
    { term: "Decusada", description: "Cristales entrecruzados al azar" }
  ],

  componentes_rocas_sedimentarias: [
    { term: "Aloquímicos", description: "Componentes carbonáticos transportados" },
    { term: "Ortoquímicos", description: "Componentes precipitados in situ" },
    { term: "Ooides", description: "Granos esféricos con estructura concéntrica" },
    { term: "Pellets", description: "Granos fecales elipsoidales" },
    { term: "Intraclastos", description: "Fragmentos de sedimento consolidado" },
    { term: "Bioclastos", description: "Fragmentos de organismos" },
    { term: "Oncoides", description: "Ooides irregulares por algas" },
    { term: "Pisoides", description: "Ooides grandes >2mm" },
    { term: "Cemento", description: "Material cristalino que une granos" },
    { term: "Matriz", description: "Material fino entre granos" },
    { term: "Porosidad", description: "Espacios vacíos en la roca" },
    { term: "Empacamiento", description: "Arreglo espacial de los granos" },
    { term: "Redondez", description: "Grado de desgaste de clastos" },
    { term: "Esfericidad", description: "Aproximación a forma esférica" },
    { term: "Selección", description: "Uniformidad de tamaños de grano" }
  ],

  tipos_cemento: [
    { term: "Cemento calcítico", description: "Cemento de calcita" },
    { term: "Cemento silíceo", description: "Cemento de cuarzo/sílice" },
    { term: "Cemento ferruginoso", description: "Cemento de óxidos de hierro" },
    { term: "Cemento arcilloso", description: "Cemento de minerales arcillosos" },
    { term: "Cemento fosfático", description: "Cemento de fosfatos" },
    { term: "Cemento dolomítico", description: "Cemento de dolomita" },
    { term: "Cemento evaporítico", description: "Cemento de evaporitas" },
    { term: "Cemento zeolítico", description: "Cemento de zeolitas" }
  ],

  tipos_porosidad: [
    { term: "Porosidad primaria", description: "Formada durante deposición" },
    { term: "Porosidad secundaria", description: "Formada por diagénesis" },
    { term: "Porosidad intergranular", description: "Entre granos" },
    { term: "Porosidad intragranular", description: "Dentro de granos" },
    { term: "Porosidad intercristalina", description: "Entre cristales" },
    { term: "Porosidad móldica", description: "Por disolución de granos" },
    { term: "Porosidad vugular", description: "Cavidades irregulares grandes" },
    { term: "Porosidad fenestral", description: "Huecos tipo ventana" },
    { term: "Porosidad de fractura", description: "En fracturas y fisuras" }
  ],

  estructuras_sedimentarias: [
    { term: "Estratificación paralela", description: "Capas horizontales paralelas" },
    { term: "Estratificación cruzada", description: "Láminas inclinadas" },
    { term: "Estratificación gradada", description: "Gradación vertical de tamaño" },
    { term: "Laminación", description: "Capas <1cm de espesor" },
    { term: "Ripples", description: "Ondulaciones en superficie" },
    { term: "Hummocky", description: "Estratificación monticular" },
    { term: "Slumping", description: "Deformación sinsedimentaria" },
    { term: "Load casts", description: "Estructuras de hundimiento" },
    { term: "Flame structures", description: "Estructuras en llama" },
    { term: "Bioturbación", description: "Perturbación por organismos" }
  ],

  alteraciones_diageneticas: [
    { term: "Compactación", description: "Reducción de porosidad por presión" },
    { term: "Cementación", description: "Precipitación de cemento" },
    { term: "Disolución", description: "Pérdida de material por solución" },
    { term: "Neomorfismo", description: "Recristalización" },
    { term: "Reemplazamiento", description: "Sustitución mineral" },
    { term: "Silicificación", description: "Reemplazamiento por sílice" },
    { term: "Dolomitización", description: "Reemplazamiento por dolomita" },
    { term: "Piritización", description: "Formación de pirita" },
    { term: "Glauconitización", description: "Formación de glauconita" },
    { term: "Fosfatización", description: "Impregnación fosfática" }
  ]
};

export const COUNTER_COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
];

export interface GrainSizeTerm {
  term: string;
  description: string;
}

export const GRAIN_SIZE_DATABASE: Record<string, GrainSizeTerm[]> = {
  tamano_de_grano_sedimentarias: [
    { term: "Arcilla", description: "< 0.002 mm (< 2 μm)" },
    { term: "Limo muy fino", description: "0.002 - 0.004 mm (2 - 4 μm)" },
    { term: "Limo fino", description: "0.004 - 0.008 mm (4 - 8 μm)" },
    { term: "Limo medio", description: "0.008 - 0.016 mm (8 - 16 μm)" },
    { term: "Limo grueso", description: "0.016 - 0.031 mm (16 - 31 μm)" },
    { term: "Limo muy grueso", description: "0.031 - 0.062 mm (31 - 62 μm)" },
    { term: "Arena muy fina", description: "0.062 - 0.125 mm (62 - 125 μm)" },
    { term: "Arena fina", description: "0.125 - 0.25 mm (125 - 250 μm)" },
    { term: "Arena media", description: "0.25 - 0.5 mm (250 - 500 μm)" },
    { term: "Arena gruesa", description: "0.5 - 1 mm (500 - 1000 μm)" },
    { term: "Arena muy gruesa", description: "1 - 2 mm (1000 - 2000 μm)" },
    { term: "Gránulo", description: "2 - 4 mm" },
    { term: "Guijarro fino", description: "4 - 8 mm" },
    { term: "Guijarro medio", description: "8 - 16 mm" },
    { term: "Guijarro grueso", description: "16 - 32 mm" },
    { term: "Guijarro muy grueso", description: "32 - 64 mm" },
    { term: "Guijarro pequeño (general)", description: "4 - 64 mm" },
    { term: "Guijarro grande", description: "64 - 128 mm" },
    { term: "Canto rodado pequeño", description: "128 - 256 mm" },
    { term: "Canto rodado medio", description: "256 - 512 mm" },
    { term: "Canto rodado grande", description: "512 - 1024 mm" },
    { term: "Bloque muy grande", description: "> 1024 mm" }
  ],

  tamano_de_grano_igneas: [
    { term: "Microcristal", description: "0.01 - 0.40 mm (10 - 400 μm)" },
    { term: "Microfenocristal", description: "0.50 - 1.0 mm (500 - 1000 μm)" },
    { term: "Fenocristal", description: "2.0 - 10.0 mm (2000 - 10000 μm)" },
    { term: "Afanítico", description: "< 0.1 mm (< 100 μm) - Cristales no visibles a simple vista" },
    { term: "Fanerítico fino", description: "0.1 - 1 mm (100 - 1000 μm) - Cristales pequeños visibles" },
    { term: "Fanerítico medio", description: "1 - 5 mm - Cristales de tamaño medio" },
    { term: "Fanerítico grueso", description: "5 - 30 mm - Cristales grandes" },
    { term: "Pegmatítico", description: "> 30 mm - Cristales muy grandes" },
    { term: "Vítreo", description: "Sin cristales - Textura vítrea" },
    { term: "Porfídico", description: "Fenocristales > 2 mm en matriz afanítica" },
    { term: "Ceniza extremadamente fina", description: "< 0.004 mm (< 4 μm)" },
    { term: "Ceniza muy fina", description: "0.062 - 0.125 mm (62 - 125 μm)" },
    { term: "Ceniza fina", description: "0.125 - 0.25 mm (125 - 250 μm)" },
    { term: "Ceniza media", description: "0.25 - 0.5 mm (250 - 500 μm)" },
    { term: "Ceniza gruesa", description: "0.5 - 1 mm (500 - 1000 μm)" },
    { term: "Ceniza muy gruesa", description: "1 - 2 mm (1000 - 2000 μm)" },
    { term: "Lapilli fino", description: "2 - 4 mm" },
    { term: "Lapilli medio", description: "4 - 8 mm" },
    { term: "Lapilli grueso", description: "8 - 32 mm" },
    { term: "Bloque/Bomba fino", description: "32 - 128 mm" },
    { term: "Bloque/Bomba medio", description: "128 - 512 mm" },
    { term: "Bloque/Bomba grueso", description: "> 512 mm" }
  ]
};

export interface SphericityTerm {
  term: string;
  description: string;
}

export const SPHERICITY_DATABASE: Record<string, SphericityTerm[]> = {
  esfericidad: [
    { term: "Muy alta", description: "0.9 - 1.0 - Forma casi perfectamente esférica" },
    { term: "Alta", description: "0.7 - 0.9 - Forma aproximadamente esférica" },
    { term: "Media", description: "0.5 - 0.7 - Forma moderadamente esférica" },
    { term: "Baja", description: "0.3 - 0.5 - Forma alargada o aplanada" },
    { term: "Muy baja", description: "< 0.3 - Forma muy alargada o muy aplanada" }
  ]
};

export interface RoundnessTerm {
  term: string;
  description: string;
}

export const ROUNDNESS_DATABASE: Record<string, RoundnessTerm[]> = {
  redondez: [
    { term: "Muy angular", description: "0.0 - 0.17 - Bordes y esquinas muy agudos" },
    { term: "Angular", description: "0.17 - 0.25 - Bordes agudos con algunas esquinas redondeadas" },
    { term: "Subangular", description: "0.25 - 0.35 - Esquinas moderadamente redondeadas" },
    { term: "Subredondeado", description: "0.35 - 0.49 - Esquinas bien redondeadas, algunos bordes rectos" },
    { term: "Redondeado", description: "0.49 - 0.70 - Bordes y esquinas bien redondeadas" },
    { term: "Bien redondeado", description: "0.70 - 1.0 - Contorno suave y curvo" }
  ]
};

export interface ContactsTerm {
  term: string;
  description: string;
}

export const CONTACTS_DATABASE: Record<string, ContactsTerm[]> = {
  contactos: [
    { term: "Flotante", description: "Sin contacto entre granos - Porosidad muy alta" },
    { term: "Puntual", description: "Contacto en puntos aislados - Porosidad alta" },
    { term: "Tangencial", description: "Contacto a lo largo de líneas cortas - Porosidad moderada" },
    { term: "Largo", description: "Contacto a lo largo de superficies extensas - Porosidad baja" },
    { term: "Cóncavo-convexo", description: "Deformación plástica en puntos de contacto - Porosidad muy baja" },
    { term: "Suturado", description: "Interpenetración de granos por disolución - Porosidad mínima" },
    { term: "Imbricado", description: "Granos orientados por flujo - Estructura direccional" }
  ]
};

export interface SortingTerm {
  term: string;
  description: string;
}

export const SORTING_DATABASE: Record<string, SortingTerm[]> = {
  sorteo: [
    { term: "Muy bien sorteado", description: "σ < 0.35 - Granos muy uniformes en tamaño" },
    { term: "Bien sorteado", description: "σ 0.35 - 0.50 - Granos uniformes" },
    { term: "Moderadamente bien sorteado", description: "σ 0.50 - 0.71 - Ligera variación en tamaños" },
    { term: "Moderadamente sorteado", description: "σ 0.71 - 1.0 - Variación moderada en tamaños" },
    { term: "Pobremente sorteado", description: "σ 1.0 - 2.0 - Gran variación en tamaños" },
    { term: "Muy pobremente sorteado", description: "σ 2.0 - 4.0 - Muy gran variación en tamaños" },
    { term: "Extremadamente mal sorteado", description: "σ > 4.0 - Variación extrema en tamaños" }
  ]
};

export interface MaturityTerm {
  term: string;
  description: string;
}

export const MATURITY_DATABASE: Record<string, MaturityTerm[]> = {
  madurez_textural: [
    { term: "Inmaduro", description: "< 5% matriz arcillosa, granos angulares, mal sorteado" },
    { term: "Submaduro", description: "< 5% matriz, granos subangulares a subredondeados, moderadamente sorteado" },
    { term: "Maduro", description: "< 5% matriz, granos subredondeados a redondeados, bien sorteado" },
    { term: "Supermaduro", description: "< 5% matriz, granos bien redondeados, muy bien sorteado" }
  ]
};

export interface PackingTerm {
  term: string;
  description: string;
}

export const PACKING_DATABASE: Record<string, PackingTerm[]> = {
  madurez_textural: [
    { term: "Inmaduro", description: "< 5% matriz arcillosa, granos angulares, mal sorteado" },
    { term: "Submaduro", description: "< 5% matriz, granos subangulares a subredondeados, moderadamente sorteado" },
    { term: "Maduro", description: "< 5% matriz, granos subredondeados a redondeados, bien sorteado" },
    { term: "Supermaduro", description: "< 5% matriz, granos bien redondeados, muy bien sorteado" }
  ]
};