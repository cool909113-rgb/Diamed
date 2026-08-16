const fs = require('fs');
let data = fs.readFileSync('c:/Eurolab/data.txt', 'utf8');

// Strip any text before "export interface AnalysisItem"
const startIndex = data.indexOf('export interface AnalysisItem');
if (startIndex !== -1) {
  data = data.substring(startIndex);
}

// Remove any trailing markdown ``` if it exists at the very end
data = data.replace(/```[\s\n]*$/, '');

// Replace ANALYSES_DATA with mockAnalyses
data = data.replace('export const ANALYSES_DATA', 'export const mockAnalyses');

// Add Checkups
const checkups = `

export interface Checkup {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  analysesIncluded: string[];
}

export const mockCheckups: Checkup[] = [
  {
    id: "c1",
    title: "Ежегодный базовый чек-ап",
    description: "Оптимальный набор анализов для профилактической оценки здоровья.",
    price: 250,
    oldPrice: 350,
    analysesIncluded: ["ОАК развернутый", "Глюкоза", "Холестерин", "АЛАТ", "АСАТ", "ТТГ"]
  },
  {
    id: "c2",
    title: "Здоровая печень и почки",
    description: "Оценка функции основных фильтрующих органов организма.",
    price: 180,
    oldPrice: 220,
    analysesIncluded: ["АЛАТ", "АСАТ", "Билирубин", "Креатинин", "Мочевина", "Общий белок"]
  }
];
`;

data += checkups;

fs.writeFileSync('c:/Eurolab/src/data/mockData.ts', data.trim());
console.log('File successfully written.');
