import { useState } from "react";
import productos from "./data/productos";

const marcas = [
  "Nike",
  "Adidas",
  "New Balance",
  "Vans",
  "Puma",
  "DC",
  "Straye",
  "Niños",
];

const categorias = ["urbano", "deportivo"];

function App() {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("Todos");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const productosDestacados = productos.filter(
    (producto) => producto.destacado
  );

  const productosFiltrados = productos.filter((producto) => {
    const coincideMarca =
      marcaSeleccionada === "Todos" ||
      producto.marca === marcaSeleccionada;

    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      producto.categoria === categoriaSeleccionada;

    return coincideMarca && coincideCategoria;
  });

  const seleccionarMarca = (marca) => {
    setMarcaSeleccionada(marca);

    document
      .getElementById("catalogo")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const limpiarFiltros = () => {
    setMarcaSeleccionada("Todos");
    setCategoriaSeleccionada("Todas");
  };

  return (
    <div className="app">

      <header className="header">

        <a href="#inicio" className="logo-container">
          <img
            src="/logo.png"
            alt="Queca Shoes"
            className="logo"
          />
        </a>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#pedidos">Más pedidos</a>
          <a href="#marcas">Marcas</a>
          <a href="#catalogo">Catálogo</a>
        </nav>

        <div className="header-actions">

          <button
            className="search-button"
            aria-label="Buscar"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            className="cart-button"
            aria-label="Carrito"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <small>0</small>
          </button>

        </div>

      </header>

      <main id="inicio">

        <section className="hero">

          <div className="hero-content">

            <p className="hero-small">
              QUECA SHOES
            </p>

            <h1>
              Encontrá el par
              <br />
              que estás <em>buscando.</em>
            </h1>

            <p className="hero-text">
              Zapatillas de tus marcas favoritas,
              seleccionadas con amor.
            </p>

            <a
              href="#catalogo"
              className="hero-button"
            >
              VER CATÁLOGO
              <span>→</span>
            </a>

          </div>

          <div className="hero-decoration">
            <img
              src="/logo.png"
              alt=""
              aria-hidden="true"
            />
          </div>

        </section>


        {/* ================= MÁS PEDIDOS ================= */}

        <section
          className="section"
          id="pedidos"
        >

          <div className="section-header">

            <div>

              <p className="section-small">
                LOS FAVORITOS
              </p>

              <h2>
                Los más pedidos
              </h2>

            </div>

            <button
              className="see-more-button"
              onClick={limpiarFiltros}
            >
              Ver todos →
            </button>

          </div>


          <div className="products-grid">

            {productosDestacados.map((producto) => (

              <article
                className="product-card"
                key={producto.id}
              >

                <div className="product-image">

                  <img
                    src={producto.imagen}
                    alt={producto.modelo}
                    loading="lazy"
                  />

                </div>


                <div className="product-info">

                  <p className="product-brand">
                    {producto.marca}
                  </p>

                  <h3>
                    {producto.modelo}
                  </h3>

                  <p className="product-price">
                    ${producto.precio.toLocaleString("es-AR")}
                  </p>

                  <button className="product-button">
                    Ver producto
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* ================= MARCAS ================= */}

        <section
          className="brands-section"
          id="marcas"
        >

          <div className="brands-title">

            <div>

              <p className="section-small">
                ELEGÍ TU FAVORITA
              </p>

              <h2>
                Marcas
              </h2>

              <p>
                Explorá todos los modelos disponibles
                de cada marca.
              </p>

            </div>

          </div>


          <div className="brands-grid">

            {marcas.map((marca) => (

              <button
                className="brand-card"
                key={marca}
                onClick={() => seleccionarMarca(marca)}
              >

                <span>
                  {marca}
                </span>

                <span className="brand-arrow">
                  →
                </span>

              </button>

            ))}

          </div>

        </section>


        {/* ================= CATÁLOGO ================= */}

        <section
          className="catalog-section"
          id="catalogo"
        >

          <div className="section-header">

            <div>

              <p className="section-small">
                TODOS LOS MODELOS
              </p>

              <h2>
                Catálogo
              </h2>

            </div>

          </div>


          {/* Filtros de marca */}
          <div className="catalog-filters">

            <span className="filter-label">Marcas</span>

            <button
              className={
                marcaSeleccionada === "Todos"
                  ? "active"
                  : ""
              }
              onClick={() => setMarcaSeleccionada("Todos")}
            >
              Todas
            </button>

            {marcas.map((marca) => (

              <button
                key={marca}
                className={
                  marcaSeleccionada === marca
                    ? "active"
                    : ""
                }
                onClick={() => setMarcaSeleccionada(marca)}
              >
                {marca}
              </button>

            ))}

          </div>


          {/* Filtros de categoría */}
          <div className="catalog-filters catalog-filters--secondary">

            <span className="filter-label">Categoría</span>

            <button
              className={
                categoriaSeleccionada === "Todas"
                  ? "active"
                  : ""
              }
              onClick={() => setCategoriaSeleccionada("Todas")}
            >
              Todas
            </button>

            {categorias.map((categoria) => (

              <button
                key={categoria}
                className={
                  categoriaSeleccionada === categoria
                    ? "active"
                    : ""
                }
                onClick={() => setCategoriaSeleccionada(categoria)}
              >
                {categoria}
              </button>

            ))}

          </div>


          {/* Contador de resultados */}
          <p className="results-count">
            {productosFiltrados.length}{" "}
            {productosFiltrados.length === 1
              ? "producto"
              : "productos"}
          </p>


          <div className="catalog-grid">

            {productosFiltrados.length > 0 ? (

              productosFiltrados.map((producto) => (

                <article
                  className="product-card"
                  key={producto.id}
                >

                  <div className="product-image">

                    <img
                      src={producto.imagen}
                      alt={producto.modelo}
                      loading="lazy"
                    />

                  </div>


                  <div className="product-info">

                    <p className="product-brand">
                      {producto.marca}
                    </p>

                    <h3>
                      {producto.modelo}
                    </h3>

                    <p className="product-price">
                      ${producto.precio.toLocaleString("es-AR")}
                    </p>

                    <button className="product-button">
                      Ver producto
                    </button>

                  </div>

                </article>

              ))

            ) : (

              <p className="no-products">
                No hay productos con esos filtros.
              </p>

            )}

          </div>

        </section>

      </main>



      <a
        className="whatsapp"
        href="https://wa.me/542281352836"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>



      <footer>

        <img
          src="/logo.png"
          alt="Queca Shoes"
          className="footer-logo"
        />

        <p>
          © 2026 Queca Shoes
        </p>

        <p>
          Instagram · @queca.shoes
        </p>

      </footer>

    </div>
  );
}

export default App;