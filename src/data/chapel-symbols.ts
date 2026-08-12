export interface ChapelSymbol {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  historicalMeaning: string;
  illustration: string;
}

export const chapelSymbolsData: ChapelSymbol[] = [
  {
    id: "symbol-cross-mosaic",
    name: "The Cross & Mosaic of Light",
    subtitle: "The Central Altar Feature",
    description: "A prominent cross set above the altar, illuminated by radiant white mosaic tile work that forms a second cross of light around it.",
    historicalMeaning: "Architect Mr. King designed the mosaic light work to visually radiate faith throughout the sanctuary space during morning and evening worship.",
    illustration: "/images/about/symbol_cross_sketch.png"
  },
  {
    id: "symbol-red-lamps",
    name: "The Hanging Red Lamps",
    subtitle: "Sanctuary Remembrance",
    description: "Two hanging red lamps positioned on either side of the main altar cross.",
    historicalMeaning: "As explained by Architect Mr. King at the chapel dedication, these lamps were designed to depict the sacred presence and sacrificial blood of Christ on the altar.",
    illustration: "/images/about/symbol_red_lamps_sketch.png"
  },
  {
    id: "symbol-roman-cross",
    name: "The Balcony Roman Cross",
    subtitle: "Balcony Ramp Architectural Craft",
    description: "A precision cut-out of the classic Roman Cross built directly into the wooden balcony ramp rail.",
    historicalMeaning: "Incorporated into the structural woodwork of the balcony ramp, embedding Christian iconography into the architectural fabric of the building.",
    illustration: "/images/about/symbol_roman_cross_sketch.png"
  },
  {
    id: "symbol-communion-fish",
    name: "The Communion Stand Fish",
    subtitle: "Holy Communion Iconography",
    description: "An intricate cut-out of the early Christian Ichthys (fish) symbol crafted into the Holy Communion stands.",
    historicalMeaning: "Connecting the modern congregation to ancient Christian heritage and Christ's ministry at the Lord's Table.",
    illustration: "/images/about/symbol_fish_sketch.png"
  }
];
