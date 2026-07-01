var EMAILJS_PUBLIC_KEY  = "TU_EMAILJS_PUBLIC_KEY";
var EMAILJS_SERVICE_ID  = "TU_EMAILJS_SERVICE_ID";
var EMAILJS_TEMPLATE_ID = "TU_EMAILJS_TEMPLATE_ID";

var CODIGOS_PROMO = {
  "PROMO10": 10,
  "PROMO15": 15,
  "VIP20":   20
};

var productos = [
  { id:  1, nombre: "BIG CHIEF DUO 2G",      precio: "$72.500", precioNum:  72500, imgSrc: "./img/BIGCHIEFDUO2G.png",      tipo: "thc" },
  { id:  2, nombre: "BOUTIQUE TRIPLE 2G",     precio: "$69.600", precioNum:  69600, imgSrc: "./img/BOUTIQUETRIPLE2G.png",   tipo: "thc" },
  { id:  3, nombre: "CAPSULA BIG CHIEF 1G",   precio: "$49.300", precioNum:  49300, imgSrc: "./img/CAPSULABIGCHIEF.png",    tipo: "thc" },
  { id:  4, nombre: "DOZO 2.5G",              precio: "$75.400", precioNum:  75400, imgSrc: "./img/DOZO25G.png",            tipo: "thc" },
  { id:  5, nombre: "ELF THC 5.5G",           precio: "$63.800", precioNum:  63800, imgSrc: "./img/ELFTHC55G.png",          tipo: "thc" },
  {
    id:  6, nombre: "ELF BAR 3G",             precio: "$55.000", precioNum:  55000, imgSrc: "./img/ELFBAR3G.png",
    tipo: "nicotina",
    sabores: ["Mango Ice","Watermelon","Blueberry","Strawberry","Peach Ice","Grape","Lemon Mint"]
  },
  {
    id:  7, nombre: "ELF BAR ICE KING 40000", precio: "$52.200", precioNum:  52200, imgSrc: "./img/ELFBARICEKING40000.png",
    tipo: "nicotina",
    sabores: ["Mango Ice","Watermelon Ice","Blueberry Ice","Strawberry Kiwi","Triple Mango"]
  },
  { id:  8, nombre: "GHOST 7G",               precio: "$75.400", precioNum:  75400, imgSrc: "./img/GHOST7G.png",            tipo: "thc" },
  { id:  9, nombre: "HALF BAKED 3G",          precio: "$58.000", precioNum:  58000, imgSrc: "./img/HALFBAKED3G.png",        tipo: "thc" },
  { id: 11, nombre: "JUNGLE BOYS 2G",         precio: "$60.900", precioNum:  60900, imgSrc: "./img/JUNGLEBOYS2G.png",       tipo: "thc" },
  { id: 12, nombre: "MUHAMEDS 2G",            precio: "$66.700", precioNum:  66700, imgSrc: "./img/MUHAMEDS2G.png",         tipo: "thc" },
  { id: 13, nombre: "PACKMAN 2G",             precio: "$63.800", precioNum:  63800, imgSrc: "./img/PACKMAN2G.png",          tipo: "thc" },
  { id: 14, nombre: "PACKMAN DUAL 2G",        precio: "$69.600", precioNum:  69600, imgSrc: "./img/PACKMANDUAL2G.png",      tipo: "thc" },
  { id: 15, nombre: "PEN AIRIS",              precio: "$34.800", precioNum:  34800, imgSrc: "./img/PENAIRIS.png",           tipo: "thc" },
  {
    id: 16, nombre: "PEN ELF",                precio: "$37.700", precioNum:  37700, imgSrc: "./img/PENELF.png",
    tipo: "nicotina",
    sabores: ["Mango","Blueberry","Strawberry Ice","Watermelon Ice"]
  },
  { id: 17, nombre: "PHENOM 8.0",             precio: "$78.300", precioNum:  78300, imgSrc: "./img/PHENOM80.png",           tipo: "thc" },
  { id: 18, nombre: "PULSE 5G",               precio: "$69.600", precioNum:  69600, imgSrc: "./img/PULSE5G.png",            tipo: "thc" },
  { id: 19, nombre: "SLUGGERS HITT 2G",       precio: "$78.300", precioNum:  78300, imgSrc: "./img/SLUGGERSHITT2G.png",     tipo: "thc" },
  { id: 20, nombre: "SLUGGERS SWITCH 2G",     precio: "$78.300", precioNum:  78300, imgSrc: "./img/SLUGGERSSWITCH2G.png",   tipo: "thc" },
  { id: 21, nombre: "TORCH 5G",               precio: "$69.600", precioNum:  69600, imgSrc: "./img/TORCH5G.png",            tipo: "thc" },
  { id: 22, nombre: "UNIVERSITY 2G",          precio: "$60.900", precioNum:  60900, imgSrc: "./img/UNIVERSITY2G.png",       tipo: "thc" },
  { id: 23, nombre: "VIVA LA HEMP 3.5G",      precio: "$58.000", precioNum:  58000, imgSrc: "./img/VIVALAHEMP35G.png",      tipo: "thc" }
];

var carrito = [];
var pedidoConfirmado = false;
var catalogoMemoria = [];
var descuentoAplicado = 0;
var codigoAplicado = "";

function agregarItem(nombre, precioStr, precioNum, variante) {
  carrito.push({ nombre: nombre, variante: variante || "", precio: precioStr, precioNum: precioNum });
  actualizarContadorCarrito();
}

function agregarVariedades(nombre, precioStr, precioNum, variedades) {
  variedades.forEach(function(v) {
    carrito.push({ nombre: nombre, variante: v, precio: precioStr, precioNum: precioNum });
  });
  actualizarContadorCarrito();
}

function quitarDelCarrito(idx) {
  carrito.splice(idx, 1);
  actualizarContadorCarrito();
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  descuentoAplicado = 0;
  codigoAplicado = "";
  actualizarContadorCarrito();
  renderizarCarrito();
}

function actualizarContadorCarrito() {
  var el = document.getElementById("carrito-count");
  if (el) el.textContent = carrito.length;
}

function calcularTotal() {
  var subtotal = carrito.reduce(function(acc, item) { return acc + item.precioNum; }, 0);
  if (descuentoAplicado > 0) {
    return Math.round(subtotal * (1 - descuentoAplicado / 100));
  }
  return subtotal;
}

function calcularSubtotal() {
  return carrito.reduce(function(acc, item) { return acc + item.precioNum; }, 0);
}

function formatoPrecio(num) {
  return "$" + num.toLocaleString("es-AR");
}

function aplicarCodigoPromo(codigo) {
  var upper = (codigo || "").trim().toUpperCase();
  if (!upper) return { ok: false, msg: "Ingresá un código." };
  if (codigoAplicado === upper) return { ok: false, msg: "Este código ya fue aplicado." };
  if (CODIGOS_PROMO[upper] !== undefined) {
    descuentoAplicado = CODIGOS_PROMO[upper];
    codigoAplicado = upper;
    return { ok: true, msg: "Código aplicado: " + descuentoAplicado + "% de descuento." };
  }
  return { ok: false, msg: "Código inválido." };
}

function mostrarToast(texto) {
  var viejo = document.getElementById("toast-agregado");
  if (viejo) { viejo.remove(); }
  var toast = document.createElement("div");
  toast.id = "toast-agregado";
  toast.innerHTML =
    '<span class="toast__icono">✓</span>' +
    '<span class="toast__texto">' + texto + '</span>' +
    '<button class="toast__ver" id="toast-ver-carrito">Ver carrito</button>';
  document.body.appendChild(toast);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { toast.classList.add("toast--visible"); });
  });
  var toastVerCarrito = document.getElementById("toast-ver-carrito");
  if (toastVerCarrito) {
    toastVerCarrito.addEventListener("click", function() {
      ocultarToast();
      renderizarCarrito();
      abrirOverlay("carrito-section");
    });
  }
  setTimeout(ocultarToast, 3500);
}

function ocultarToast() {
  var t = document.getElementById("toast-agregado");
  if (!t) return;
  t.classList.remove("toast--visible");
  setTimeout(function() { if (t.parentNode) t.remove(); }, 300);
}

function abrirOverlay(id) {
  cerrarTodosLosOverlays();
  document.getElementById(id).classList.add("activo");
  document.body.classList.add("popup-abierto");
}

function cerrarOverlay(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove("activo");
  if (!document.querySelector(".carrito-overlay.activo, .modal-overlay.activo")) {
    document.body.classList.remove("popup-abierto");
  }
}

function cerrarTodosLosOverlays() {
  ["carrito-section", "modal-pago", "modal-datos", "modal-confirmacion"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove("activo");
  });
  document.body.classList.remove("popup-abierto");
}

/* =====================================================
   CARRUSELES — Motor de render por categoría
   ===================================================== */

function crearTarjetaProducto(p) {
  var card = document.createElement("article");
  card.className = "producto";
  var imagenHTML = p.imgSrc
    ? '<img src="' + p.imgSrc + '" alt="' + p.nombre + '" loading="lazy"' +
      ' onerror="this.style.display=\'none\';this.parentElement.querySelector(\'.producto__imagen--placeholder\').style.display=\'flex\'" />' +
      '<span class="producto__imagen--placeholder" style="display:none">sin imagen</span>'
    : '<span class="producto__imagen--placeholder">sin imagen</span>';
  card.innerHTML =
    '<div class="producto__imagen">' +
      imagenHTML +
      '<div class="producto__imagen-overlay">' +
        '<button class="producto__overlay-btn producto__overlay-btn--carrito">+ Agregar al carrito</button>' +
        '<button class="producto__overlay-btn producto__overlay-btn--ver">Ver producto</button>' +
      '</div>' +
    '</div>' +
    '<div class="producto__info">' +
      '<h3 class="producto__nombre">' + p.nombre + '</h3>' +
      '<p class="producto__precio">' + p.precio + '</p>' +
    '</div>';
  var abrirFn = function() { abrirPopup(p); };
  card.addEventListener("click", function(e) {
    if (e.target.classList.contains("producto__overlay-btn--carrito")) return;
    abrirFn();
  });
  card.querySelector(".producto__overlay-btn--carrito").addEventListener("click", function(e) {
    e.stopPropagation();
    abrirFn();
  });
  card.querySelector(".producto__overlay-btn--ver").addEventListener("click", function(e) {
    e.stopPropagation();
    abrirFn();
  });
  return card;
}

function crearCarrusel(titulo, lista, idPrefix) {
  var VISIBLE = 9;
  var estaExpandido = false;

  var seccion = document.createElement("section");
  seccion.className = "carrusel-seccion";
  seccion.id = "sec-" + idPrefix;

  // Header
  var header = document.createElement("div");
  header.className = "carrusel-header";
  header.innerHTML =
    '<div class="carrusel-header__izq">' +
      '<p class="carrusel__titulo">Colección</p>' +
      '<h2 class="carrusel__heading">' + titulo + '</h2>' +
    '</div>' +
    '<div class="carrusel-header__acciones">' +
      '<button class="carrusel__flecha carrusel__flecha--izq" aria-label="Anterior">&#8592;</button>' +
      '<button class="carrusel__flecha carrusel__flecha--der" aria-label="Siguiente">&#8594;</button>' +
      '<button class="carrusel__ver-todos">Ver todos (' + lista.length + ')</button>' +
    '</div>';

  // Track
  var trackWrap = document.createElement("div");
  trackWrap.className = "carrusel-wrap";

  var track = document.createElement("div");
  track.className = "carrusel-track";
  trackWrap.appendChild(track);

  // Grid expandido (oculto por defecto)
  var gridTodos = document.createElement("div");
  gridTodos.className = "catalogo__grid carrusel-grid-todos";
  gridTodos.style.display = "none";

  seccion.appendChild(header);
  seccion.appendChild(trackWrap);
  seccion.appendChild(gridTodos);

  // Render inicial: primeros VISIBLE productos en carrusel
  lista.slice(0, VISIBLE).forEach(function(p) {
    track.appendChild(crearTarjetaProducto(p));
  });

  // Render completo en grid
  lista.forEach(function(p) {
    gridTodos.appendChild(crearTarjetaProducto(p));
  });

  // Flechas
  var btnIzq = header.querySelector(".carrusel__flecha--izq");
  var btnDer = header.querySelector(".carrusel__flecha--der");
  var SCROLL_PX = 280;

  btnIzq.addEventListener("click", function() {
    trackWrap.scrollBy({ left: -SCROLL_PX, behavior: "smooth" });
  });
  btnDer.addEventListener("click", function() {
    trackWrap.scrollBy({ left: SCROLL_PX, behavior: "smooth" });
  });

  // Ocultar flechas cuando grid está expandido
  function actualizarFlechas() {
    var visible = !estaExpandido;
    btnIzq.style.display = visible ? "" : "none";
    btnDer.style.display = visible ? "" : "none";
  }

  // Ver todos
  var btnVerTodos = header.querySelector(".carrusel__ver-todos");
  btnVerTodos.addEventListener("click", function() {
    estaExpandido = !estaExpandido;
    if (estaExpandido) {
      trackWrap.style.display = "none";
      gridTodos.style.display = "grid";
      btnVerTodos.textContent = "← Ver menos";
    } else {
      trackWrap.style.display = "";
      gridTodos.style.display = "none";
      btnVerTodos.textContent = "Ver todos (" + lista.length + ")";
      seccion.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    actualizarFlechas();
  });

  actualizarFlechas();
  return seccion;
}

function renderizarCarruseles(lista) {
  var container = document.getElementById("carruseles-container");
  if (!container) return;
  container.innerHTML = "";

  // Agrupar por categoría, solo productos con mostrar_home = true
  var categorias = {};
  lista.forEach(function(p) {
    if (!p.mostrarHome) return;
    var cat = (p.tipo || "Sin categoría").trim();
    if (!categorias[cat]) categorias[cat] = [];
    categorias[cat].push(p);
  });

  Object.keys(categorias).forEach(function(cat) {
    var idSafe = cat.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    container.appendChild(crearCarrusel(cat, categorias[cat], idSafe));
  });
}

// Mantener compatibilidad: si algo llama renderizarProductos, no rompe
function renderizarProductos(lista) {
  renderizarCarruseles(lista);
}

var productoActual  = null;
var seleccionActual = "";

function abrirPopup(producto) {
  productoActual  = producto;
  seleccionActual = "";
  geneticaTipo      = "";
  geneticaSeleccion = [];
  document.getElementById("popup-nombre").textContent = producto.nombre;
  document.getElementById("popup-precio").textContent = producto.precio;
  document.getElementById("popup-seleccion-actual").textContent = "";
  document.getElementById("popup-sabores").style.display   = "none";
  document.getElementById("popup-geneticas").style.display = "none";
  var imgContainer = document.getElementById("popup-imagen");
  imgContainer.innerHTML = producto.imgSrc
    ? '<img src="' + producto.imgSrc + '" alt="' + producto.nombre + '" loading="lazy" />'
    : "";
  if (producto.tipo === "nicotina" && producto.sabores && producto.sabores.length) {
    var container = document.getElementById("popup-opciones-sabores");
    container.innerHTML = "";
    producto.sabores.forEach(function(sab) {
      var btn = document.createElement("button");
      btn.className = "opcion-btn";
      btn.textContent = sab;
      btn.addEventListener("click", function() {
        container.querySelectorAll(".opcion-btn").forEach(function(b) { b.classList.remove("activo"); });
        btn.classList.add("activo");
        seleccionActual = sab;
        document.getElementById("popup-seleccion-actual").textContent = "Sabor: " + sab;
      });
      container.appendChild(btn);
    });
    document.getElementById("popup-sabores").style.display = "block";
  } else if (producto.geneticas && producto.geneticas.length) {
    renderizarPasoGenetica(1);
    document.getElementById("popup-geneticas").style.display = "block";
  }
  document.getElementById("popup-overlay").classList.add("activo");
  document.body.classList.add("popup-abierto");
}

function cerrarPopup() {
  document.getElementById("popup-overlay").classList.remove("activo");
  if (!document.querySelector(".carrito-overlay.activo, .modal-overlay.activo")) {
    document.body.classList.remove("popup-abierto");
  }
  productoActual    = null;
  seleccionActual   = "";
  geneticaTipo      = "";
  geneticaSeleccion = [];
}

var geneticaTipo      = "";
var geneticaSeleccion = [];

function buildGeneticaMap(geneticas) {
  var map = {};
  if (!geneticas || !geneticas.length) return map;
  geneticas.forEach(function(g) {
    var lower = g.toLowerCase();
    var tipo = lower.indexOf("indica") !== -1 ? "Indica"
             : lower.indexOf("sativa") !== -1 ? "Sativa"
             : lower.indexOf("h\u00edbrida") !== -1 || lower.indexOf("hibrida") !== -1 ? "H\u00edbrida"
             : null;
    if (tipo) {
      if (!map[tipo]) map[tipo] = [];
      var variedad = g.replace(/^(indica|sativa|h\u00edbrida|hibrida)\s*[:\-]?\s*/i, "").trim();
      if (variedad) map[tipo].push(variedad);
    }
  });
  return map;
}

function renderizarPasoGenetica(paso) {
  var container = document.getElementById("popup-geneticas");
  container.innerHTML = "";
  var geneticaMap = productoActual && productoActual.geneticas ? buildGeneticaMap(productoActual.geneticas) : {};
  var tiposDisponibles = Object.keys(geneticaMap).length ? Object.keys(geneticaMap) : ["Indica", "Sativa", "H\u00edbrida"];
  if (paso === 1) {
    var label = document.createElement("p");
    label.className = "popup__label";
    label.textContent = "Eleg\u00ed el tipo:";
    container.appendChild(label);
    var btns = document.createElement("div");
    btns.className = "popup__opciones";
    tiposDisponibles.forEach(function(tipo) {
      var btn = document.createElement("button");
      btn.className = "opcion-btn";
      btn.textContent = tipo;
      btn.addEventListener("click", function() {
        geneticaTipo      = tipo;
        geneticaSeleccion = [];
        document.getElementById("popup-seleccion-actual").textContent = "Tipo: " + tipo;
        renderizarPasoGenetica(2);
      });
      btns.appendChild(btn);
    });
    container.appendChild(btns);
  } else if (paso === 2) {
    var labelTipo = document.createElement("p");
    labelTipo.className = "popup__label";
    labelTipo.textContent = geneticaTipo + " \u2014 Eleg\u00ed variedad(es):";
    container.appendChild(labelTipo);
    var variedades = (geneticaMap[geneticaTipo] && geneticaMap[geneticaTipo].length) ? geneticaMap[geneticaTipo] : [];
    if (variedades.length === 0) {
      var noVar = document.createElement("p");
      noVar.style.cssText = "font-size:0.8rem;color:var(--color-muted);margin:0.5rem 0;";
      noVar.textContent = "Sin variedades disponibles para este tipo.";
      container.appendChild(noVar);
    } else {
      var btnsVar = document.createElement("div");
      btnsVar.className = "popup__opciones";
      variedades.forEach(function(v) {
        var btn = document.createElement("button");
        btn.className = "opcion-btn";
        btn.textContent = v;
        btn.addEventListener("click", function() {
          var idx = geneticaSeleccion.indexOf(v);
          if (idx === -1) {
            geneticaSeleccion.push(v);
            btn.classList.add("activo");
          } else {
            geneticaSeleccion.splice(idx, 1);
            btn.classList.remove("activo");
          }
          if (geneticaSeleccion.length === 0) {
            document.getElementById("popup-seleccion-actual").textContent = "Tipo: " + geneticaTipo;
          } else {
            document.getElementById("popup-seleccion-actual").textContent =
              geneticaSeleccion.length + " elegida(s): " + geneticaSeleccion.join(", ");
          }
        });
        btnsVar.appendChild(btn);
      });
      container.appendChild(btnsVar);
    }
    var btnVolver = document.createElement("button");
    btnVolver.className = "opcion-btn";
    btnVolver.textContent = "\u2190 Cambiar tipo";
    btnVolver.style.marginTop = "0.5rem";
    btnVolver.addEventListener("click", function() {
      geneticaTipo      = "";
      geneticaSeleccion = [];
      document.getElementById("popup-seleccion-actual").textContent = "";
      renderizarPasoGenetica(1);
    });
    container.appendChild(btnVolver);
  }
}

function renderizarCarrito() {
  var lista   = document.getElementById("carrito-lista");
  var totalEl = document.getElementById("carrito-total");
  if (!lista) return;
  if (carrito.length === 0) {
    lista.innerHTML = '<p style="color:var(--color-muted);font-size:0.85rem;padding:1rem 0;">El carrito está vacío.</p>';
    totalEl.textContent = "";
    return;
  }
  lista.innerHTML = "";
  carrito.forEach(function(item, idx) {
    var div = document.createElement("div");
    div.className = "carrito-item";
    div.innerHTML =
      '<div>' +
        '<p class="carrito-item__nombre">' + item.nombre + '</p>' +
        (item.variante ? '<p class="carrito-item__sel">' + item.variante + '</p>' : '') +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:0.5rem;">' +
        '<span class="carrito-item__precio">' + item.precio + '</span>' +
        '<button class="carrito-item__quitar" data-idx="' + idx + '">✕</button>' +
      '</div>';
    lista.appendChild(div);
  });
  lista.querySelectorAll(".carrito-item__quitar").forEach(function(btn) {
    btn.addEventListener("click", function() {
      quitarDelCarrito(parseInt(btn.dataset.idx));
    });
  });

  var subtotal = calcularSubtotal();
  var total    = calcularTotal();
  var html = "";
  if (descuentoAplicado > 0) {
    html += '<div class="carrito-descuento-row"><span>Subtotal</span><span>' + formatoPrecio(subtotal) + '</span></div>';
    html += '<div class="carrito-descuento-row carrito-descuento-badge"><span>Descuento ' + codigoAplicado + ' (' + descuentoAplicado + '%)</span><span>-' + formatoPrecio(subtotal - total) + '</span></div>';
  }
  html += '<div class="carrito-total-final">Total: ' + formatoPrecio(total) + '</div>';
  totalEl.innerHTML = html;

  var promoSection = document.getElementById("carrito-promo-section");
  if (!promoSection) {
    promoSection = document.createElement("div");
    promoSection.id = "carrito-promo-section";
    promoSection.className = "carrito-promo";
    promoSection.innerHTML =
      '<div class="promo-input-row">' +
        '<input type="text" id="promo-input" placeholder="Código promocional" autocomplete="off" />' +
        '<button id="btn-aplicar-promo" class="btn-promo">Aplicar</button>' +
      '</div>' +
      '<p class="promo-msg" id="promo-msg"></p>';
    totalEl.parentNode.insertBefore(promoSection, totalEl);
    document.getElementById("btn-aplicar-promo").addEventListener("click", function() {
      var codigo = document.getElementById("promo-input").value;
      var result = aplicarCodigoPromo(codigo);
      var msg = document.getElementById("promo-msg");
      msg.textContent = result.msg;
      msg.className = "promo-msg " + (result.ok ? "promo-msg--ok" : "promo-msg--err");
      if (result.ok) renderizarCarrito();
    });
    document.getElementById("promo-input").addEventListener("keydown", function(e) {
      if (e.key === "Enter") document.getElementById("btn-aplicar-promo").click();
    });
  } else {
    if (descuentoAplicado > 0) {
      var inp = document.getElementById("promo-input");
      if (inp) inp.value = codigoAplicado;
    }
  }
}

function renderizarResumenPago() {
  var res = document.getElementById("modal-pago-resumen");
  if (!res) return;
  res.innerHTML = "";
  carrito.forEach(function(item) {
    var row = document.createElement("div");
    row.className = "modal-resumen__item";
    row.innerHTML =
      '<div>' +
        '<span class="modal-resumen__nombre">' + item.nombre + '</span>' +
        (item.variante ? '<span class="modal-resumen__variante"> — ' + item.variante + '</span>' : '') +
      '</div>' +
      '<span class="modal-resumen__precio">' + item.precio + '</span>';
    res.appendChild(row);
  });

  if (descuentoAplicado > 0) {
    var subtotal = calcularSubtotal();
    var total    = calcularTotal();
    var descRow  = document.createElement("div");
    descRow.className = "modal-resumen__item";
    descRow.innerHTML =
      '<span class="modal-resumen__variante">Descuento ' + codigoAplicado + ' (' + descuentoAplicado + '%)</span>' +
      '<span class="modal-resumen__precio" style="color:var(--color-accent);">-' + formatoPrecio(subtotal - total) + '</span>';
    res.appendChild(descRow);
  }

  var totalRow = document.createElement("div");
  totalRow.className = "modal-resumen__total";
  totalRow.innerHTML = '<span>Total</span><span>' + formatoPrecio(calcularTotal()) + '</span>';
  res.appendChild(totalRow);
}

/* =====================================================
   MERCADO PAGO — preferencia de pago
   ===================================================== */
function createMercadoPagoPreference(data) {
  return new Promise(function(resolve, reject) {
    var controller = new AbortController();
    var timeout = setTimeout(function() {
      controller.abort();
      reject(new Error("Tiempo de espera agotado. Intent\u00E1 de nuevo."));
    }, 20000);

    var payload = JSON.stringify(Object.assign({ _method: "CREATE_MP_PREFERENCE" }, data));
    var url = APPS_SCRIPT_URL + "?payload=" + encodeURIComponent(payload);

    fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal
    })
    .then(function(res) {
      clearTimeout(timeout);
      if (!res.ok) throw new Error("Error HTTP " + res.status);
      return res.json();
    })
    .then(function(json) {
      if (json.success === false) {
        reject(new Error(json.message || "El servidor rechaz\u00F3 la solicitud."));
      } else {
        var ip = json.init_point || json.initPoint || json.sandbox_init_point;
        if (!ip) {
          reject(new Error("No se recibi\u00F3 el link de pago. Respuesta: " + JSON.stringify(json)));
        } else {
          resolve({ preferenceId: json.preferenceId || json.id, initPoint: ip });
        }
      }
    })
    .catch(function(err) {
      clearTimeout(timeout);
      if (err.name === "AbortError") {
        reject(new Error("Tiempo de espera agotado. Intent\u00E1 de nuevo."));
      } else {
        reject(err);
      }
    });
  });
}

function enviarPedido() {
  if (carrito.length === 0) { alert("Tu carrito está vacío."); return; }
  var nombre    = document.getElementById("f-nombre").value.trim();
  var telefono  = document.getElementById("f-telefono").value.trim();
  var email     = document.getElementById("f-email").value.trim();
  var provincia = document.getElementById("f-provincia").value.trim();
  var localidad = document.getElementById("f-localidad").value.trim();
  var direccion = document.getElementById("f-direccion").value.trim();
  if (!nombre || !telefono || !email || !provincia || !localidad || !direccion) {
    alert("Por favor completá todos los campos obligatorios.");
    return;
  }
  var productosStr = carrito.map(function(item) {
    return "• " + item.nombre + (item.variante ? " — " + item.variante : "") + "  " + item.precio;
  }).join("\n");
  var params = {
    nombre:    nombre,
    telefono:  telefono,
    email:     email,
    provincia: provincia,
    localidad: localidad,
    direccion: direccion,
    sucursal:  "No especificada",
    productos: productosStr,
    total:     formatoPrecio(calcularTotal()),
    descuento: descuentoAplicado > 0 ? codigoAplicado + " (" + descuentoAplicado + "%)" : "Sin descuento",
    metodo_pago: "Mercado Pago"
  };
  var btnEnviar = document.getElementById("btn-enviar-pedido");
  btnEnviar.textContent = "Enviando...";
  btnEnviar.disabled = true;
  emailjs.init(EMAILJS_PUBLIC_KEY);
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
    .then(function() {
      pedidoConfirmado = true;
      btnEnviar.textContent = "✓ PEDIDO CONFIRMADO";
      btnEnviar.disabled = true;
    })
    .catch(function(err) {
      console.error("EmailJS error:", err);
      btnEnviar.textContent = "CONFIRMAR PEDIDO";
      btnEnviar.disabled = false;
      alert("Error al enviar el pedido. Revisá las claves de EmailJS en main.js.");
    });
}

  // Drag scroll en desktop para carruseles
  document.addEventListener("mousedown", function(e) {
    var wrap = e.target.closest(".carrusel-wrap");
    if (!wrap) return;
    var startX = e.pageX - wrap.offsetLeft;
    var scrollLeft = wrap.scrollLeft;
    wrap.dataset.dragging = "1";
    function onMove(ev) {
      if (!wrap.dataset.dragging) return;
      var x = ev.pageX - wrap.offsetLeft;
      wrap.scrollLeft = scrollLeft - (x - startX);
    }
    function onUp() {
      delete wrap.dataset.dragging;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });

/* =====================================================
   CATÁLOGO EN MEMORIA — fuente única de verdad
   ===================================================== */
var CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMajhBLhdtr0C3cRwvn5GnMvJ4MZEcFBHTQsvnIKXKagF_kkhRRsb5YAS3Sa5G1Q/pub?gid=1501993777&single=true&output=csv";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxdXyhmfJkrj8z4kl4h2F1po7bPQsiEC6u7FhKui39BNJLwLteu1P5kJEj4y6E_IgQg/exec";

function parsearCSV(csv) {
  var lineas = csv.split("\n").slice(1);
  var lista = [];
  lineas.forEach(function(linea, i) {
    if (!linea.trim()) return;
    var cols = linea.split(",");
    var nombreVal    = (cols[0] || "").trim().replace(/^"|"$/g, "");
    var precioBase   = parseFloat((cols[1] || "0").trim().replace(/^"|"$/g, "").replace(/[^\d.]/g, "")) || 0;
    var categoriaVal = (cols[2] || "").trim().replace(/^"|"$/g, "");
    var geneticasVal = (cols[3] || "").trim().replace(/^"|"$/g, "");
    var imagenVal    = (cols[7] || "").trim().replace(/^"|"$/g, "");
    var mostrarHome  = (cols[8] || "").trim().replace(/^"|"$/g, "").toLowerCase() === "true";
    if (!nombreVal) return;
    var obj = {
      id:          i + 1,
      nombre:      nombreVal,
      precio:      "$" + precioBase.toLocaleString("es-AR"),
      precioNum:   precioBase,
      imgSrc:      imagenVal || "",
      tipo:        categoriaVal,
      mostrarHome: mostrarHome
    };
    if (geneticasVal) {
      obj.geneticas = geneticasVal.split("|").map(function(g) { return g.trim(); });
    }
    lista.push(obj);
  });
  return lista;
}

function cargarCatalogo(callback) {
  fetch(CSV_URL)
    .then(function(res) { return res.text(); })
    .then(function(csv) {
      var lista = parsearCSV(csv);
      catalogoMemoria = lista;
      if (typeof callback === "function") callback(lista);
      else renderizarProductos(lista);
    })
    .catch(function() {
      catalogoMemoria = productos;
      renderizarProductos(productos);
    });
}

// Recarga manual desde Google Sheets y re-renderiza
function recargarCatalogo() {
  cargarCatalogo(function(lista) {
    renderizarProductos(lista);
  });
}

  document.addEventListener("DOMContentLoaded", function() {

  // Carga inicial — una sola descarga del CSV
  cargarCatalogo();

  document.getElementById("popup-cerrar").addEventListener("click", cerrarPopup);
  document.getElementById("popup-overlay").addEventListener("click", function(e) {
    if (e.target === this) cerrarPopup();
  });
  document.getElementById("popup-volver").addEventListener("click", cerrarPopup);

  document.getElementById("popup-agregar").addEventListener("click", function() {
    if (!productoActual) return;
    var tipo = productoActual.tipo;
    if (tipo === "nicotina") {
      if (!seleccionActual) { alert("Por favor elegí un sabor antes de agregar."); return; }
      agregarItem(productoActual.nombre, productoActual.precio, productoActual.precioNum, seleccionActual);
      cerrarPopup();
      mostrarToast("<strong>" + productoActual.nombre + " — " + seleccionActual + "</strong> agregado");
      return;
    }
    agregarItem(productoActual.nombre, productoActual.precio, productoActual.precioNum, "");
    cerrarPopup();
    mostrarToast("<strong>" + productoActual.nombre + "</strong> agregado");
  });

  document.getElementById("btn-carrito").addEventListener("click", function() {
    var sec = document.getElementById("carrito-section");
    if (sec.classList.contains("activo")) {
      cerrarTodosLosOverlays();
    } else {
      renderizarCarrito();
      abrirOverlay("carrito-section");
    }
  });

  document.getElementById("btn-cerrar-carrito").addEventListener("click", cerrarTodosLosOverlays);
  document.getElementById("carrito-section").addEventListener("click", function(e) {
    if (e.target === this) cerrarTodosLosOverlays();
  });
  document.getElementById("btn-vaciar-carrito").addEventListener("click", vaciarCarrito);
  document.getElementById("btn-seguir-comprando").addEventListener("click", function() {
    cerrarTodosLosOverlays();
    var cat = document.getElementById("catalogo");
    if (cat) cat.scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("btn-ir-checkout").addEventListener("click", function() {
    if (carrito.length === 0) { alert("Tu carrito está vacío."); return; }
    renderizarResumenPago();
    abrirOverlay("modal-pago");
  });

  document.getElementById("btn-cerrar-modal-pago").addEventListener("click", cerrarTodosLosOverlays);
  document.getElementById("modal-pago").addEventListener("click", function(e) {
    if (e.target === this) cerrarTodosLosOverlays();
  });
  document.getElementById("btn-volver-carrito-desde-pago").addEventListener("click", function() {
    renderizarCarrito();
    abrirOverlay("carrito-section");
  });

  document.getElementById("btn-continuar-datos").addEventListener("click", function() {
    document.getElementById("checkout-mensaje").style.display = "none";
    document.getElementById("checkout-form").style.display    = "flex";
    var btnEnviar = document.getElementById("btn-enviar-pedido");
    if (!pedidoConfirmado) {
      btnEnviar.textContent = "CONFIRMAR PEDIDO";
      btnEnviar.disabled = false;
    }
    abrirOverlay("modal-datos");
  });

  document.getElementById("btn-cerrar-modal-datos").addEventListener("click", cerrarTodosLosOverlays);
  document.getElementById("modal-datos").addEventListener("click", function(e) {
    if (e.target === this) cerrarTodosLosOverlays();
  });
  document.getElementById("btn-volver-modal-pago").addEventListener("click", function() {
    renderizarResumenPago();
    abrirOverlay("modal-pago");
  });
  document.getElementById("btn-enviar-pedido").addEventListener("click", enviarPedido);

  document.getElementById("btn-whatsapp-pedido").addEventListener("click", function() {
    var nombre    = document.getElementById("f-nombre").value.trim()    || "—";
    var telefono  = document.getElementById("f-telefono").value.trim()  || "—";
    var email     = document.getElementById("f-email").value.trim()     || "—";
    var provincia = document.getElementById("f-provincia").value.trim() || "—";
    var localidad = document.getElementById("f-localidad").value.trim() || "—";
    var direccion = document.getElementById("f-direccion").value.trim() || "—";
    var productosStr = carrito.length > 0
      ? carrito.map(function(item) {
          var nombre_item = item.nombre + (item.variante ? " — " + item.variante : "");
          var precio_item = item.precio || formatoPrecio(item.precioUnitario || 0);
          return "\u2022 " + nombre_item + " \u2014 " + precio_item;
        }).join("\n")
      : "\u2022 Sin productos";
    var total = formatoPrecio(calcularTotal());
    var msg  = "\uD83D\uDECD\uFE0F *NUEVO PEDIDO \u2014 TIENDA BUENA CRUZ*\n\n";
    msg += "\uD83D\uDC64 *DATOS DEL CLIENTE*\n\n";
    msg += "\u2022 Nombre: " + nombre + "\n";
    msg += "\u2022 Tel\u00E9fono: " + telefono + "\n";
    msg += "\u2022 Email: " + email + "\n";
    msg += "\u2022 Provincia: " + provincia + "\n";
    msg += "\u2022 Localidad: " + localidad + "\n";
    msg += "\u2022 Direcci\u00F3n: " + direccion + "\n\n";
    msg += "\uD83D\uDCE6 *PRODUCTOS*\n\n";
    msg += productosStr + "\n\n";
    msg += "\uD83D\uDCB0 *TOTAL: " + total + "*\n";
    var numero = "5492236220228";
    window.open("https://wa.me/" + numero + "?text=" + encodeURIComponent(msg), "_blank");
  });

  document.getElementById("btn-cerrar-confirmacion").addEventListener("click", cerrarTodosLosOverlays);
  document.getElementById("modal-confirmacion").addEventListener("click", function(e) {
    if (e.target === this) cerrarTodosLosOverlays();
  });

  var btnCopyWallet = document.getElementById("btn-copy-wallet");
  if (btnCopyWallet) {
    btnCopyWallet.addEventListener("click", function() {
      var wallet = document.getElementById("wallet-addr").textContent;
      navigator.clipboard.writeText(wallet).then(function() {
        var btn = document.getElementById("btn-copy-wallet");
        btn.textContent = "\u2713 Copiado";
        setTimeout(function() { btn.textContent = "Copiar"; }, 2000);
      });
    });
  }

  document.getElementById("btn-pagar-mercadopago").addEventListener("click", function() {
    if (carrito.length === 0) { alert("Tu carrito est\u00E1 vac\u00EDo."); return; }
    var btn = document.getElementById("btn-pagar-mercadopago");
    btn.textContent = "Procesando...";
    btn.disabled = true;

    var items = carrito.map(function(item) {
      return {
        title: item.nombre + (item.variante ? " \u2014 " + item.variante : ""),
        quantity: 1,
        unit_price: item.precioNum
      };
    });

    createMercadoPagoPreference({ items: items, total: calcularTotal() })
      .then(function(result) {
        window.location.href = result.initPoint;
      })
      .catch(function(err) {
        btn.textContent = "PAGAR CON MERCADO PAGO";
        btn.disabled = false;
        alert("No fue posible iniciar el pago. " + (err.message || "Intentá de nuevo."));
      });
  });

  document.addEventListener("keydown", function(e) {
    if (e.key !== "Escape") return;
    var popupOverlay = document.getElementById("popup-overlay");
    if (popupOverlay.classList.contains("activo")) { cerrarPopup(); return; }
    cerrarTodosLosOverlays();
  });

});
