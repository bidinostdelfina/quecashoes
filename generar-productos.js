// generar-productos.js
// Ejecutar con: node generar-productos.js
// Genera src/data/productos.js con todos los productos

import fs from "fs";

const marcas = [
  { nombre: "Nike",        cantidad: 82,  esNino: false },
  { nombre: "Adidas",      cantidad: 115, esNino: false },
  { nombre: "New Balance", cantidad: 19,  esNino: false },
  { nombre: "Vans",        cantidad: 34,  esNino: false },
  { nombre: "Puma",        cantidad: 11,  esNino: false },
  { nombre: "DC",          cantidad: 3,   esNino: false },
  { nombre: "Straye",      cantidad: 3,   esNino: false },
  { nombre: "Niños",       cantidad: 16,  esNino: true  },
];

const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");

const TALLES_ADULTO = ["36", "37", "38", "39", "40"];
const TALLES_NINO   = ["27", "28", "29", "30", "31", "32", "33", "34"];

const PRECIO_ADULTO = 70000;
const PRECIO_NINO   = 60000;

let id = 1;
const productos = [];

for (const marca of marcas) {
  const slug = slugify(marca.nombre);

  for (let i = 1; i <= marca.cantidad; i++) {
    productos.push({
      id,
      marca: marca.nombre,
      modelo: `Modelo ${i}`,
      categoria: "urbano",     // "urbano" | "deportivo"
      precio: marca.esNino ? PRECIO_NINO : PRECIO_ADULTO,
      imagen: `/productos/${slug}/${i}.jpg`,
      talles: marca.esNino ? [...TALLES_NINO] : [...TALLES_ADULTO],
      destacado: false,
    });
    id++;
  }
}

const contenido = `// Este archivo se generó automáticamente con generar-productos.js
// Total de productos: ${productos.length}
//
// CAMPOS EDITABLES:
//   modelo:     nombre real de la zapatilla (ej: "Air Force 1")
//   categoria:  "urbano" o "deportivo"
//   precio:     70000 (adulto) o 60000 (niños)
//   talles:     ["36"..."40"] para adulto / ["27"..."34"] para niños
//   destacado:  true para aparecer en "Los más pedidos"
//
// CATEGORÍAS DISPONIBLES:
//   categoria: "urbano" | "deportivo"
//   marca:     "Nike" | "Adidas" | "New Balance" | "Vans" | "Puma" | "DC" | "Straye" | "Niños"

const productos = ${JSON.stringify(productos, null, 2)};

export default productos;
`;

fs.writeFileSync("./src/data/productos.js", contenido, "utf-8");

console.log(`✅ Se generaron ${productos.length} productos en src/data/productos.js`);
console.log(`   Marcas: ${marcas.map((m) => `${m.nombre} (${m.cantidad})`).join(", ")}`);