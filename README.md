# NISAR Canopy · Caso de estudio (sitio público)

Página estática del proyecto, pensada para publicarse y para que la abra alguien que no
conoce el trabajo. No tiene backend, no descarga nada y no depende de internet.

- Cuenta **qué es NISAR Canopy** y cómo se usa en una sección de scrollytelling ("Historia").
- Cuenta **dos resultados medidos**: desmonte en el Chaco y en el Este de Paraguay.
- Muestra **cómo se probó**: control pareado, barrido de umbral, ventanas cortas contra
  largas, firma polarimétrica y verificación Sentinel-2.
- Declara **los límites, el impacto y hasta dónde podría llegar**, con las cifras
  reproducibles.
- La estructura sigue los criterios del jurado de Space Apps: impacto, creatividad, validez,
  relevancia y presentación.

Este sitio es el **link de "Project"** del formulario de Space Apps 2026, reto *Dancing with
the SARs*. El link de "Project Demonstration" es aparte: máximo 7 slides o un video de 30
segundos.

## Ver en local

Doble clic en `index.html` alcanza.

O servirlo, que es más parecido a producción:

```powershell
python -m http.server 8788 --bind 127.0.0.1
# abrir http://127.0.0.1:8788/index.html
```

## Publicar

Es estático: no hay build, no hay dependencias, no hay variables de entorno. Las rutas son
relativas, así que funciona igual en la raíz de un dominio que en un subdirectorio.

Cualquiera de estas sirve y ninguna pide tarjeta para un sitio estático:

| Opción | Cómo |
| --- | --- |
| **GitHub Pages** | Subir esta carpeta al repo y activar Pages en Settings → Pages |
| **Cloudflare Pages** | Crear proyecto → "Direct Upload" → arrastrar esta carpeta |
| **Netlify** | app.netlify.com/drop → arrastrar esta carpeta |
| **Vercel** | `vercel` en esta carpeta, o importar el repo y dejar el directorio raíz |

Verificá con una ventana de incógnito que abra sin login. Ese es el requisito del
formulario: el link no puede pedir contraseña, permiso ni registro.

## Qué publicar

Todo lo que está en esta carpeta **excepto** estas cuatro, que son evidencia de trabajo y no
hacen falta para que el sitio funcione:

- `Imagenes/` — los PNG originales de las capturas y de las corridas (30 MB); la página usa
  las versiones WebP que ya están en `img/`.
- `img/_originales/` — los PNG originales, reemplazados por WebP (12,5 MB sin usar).
- `datos/` — recortes y TIFF de origen (6,7 MB sin usar por la página).
- `odd/` — documento de trabajo de la última reescritura.

Publicar sin esas cuatro deja el sitio en unos **4 MB**. Si preferís no excluir nada,
funciona igual: el navegador solo descarga lo que la página referencia.

## Lo que queda

**Botones del repositorio — hecho.** Los cuatro (barra de navegación, sección "La consola",
pie de página y "Versiones") apuntan a `https://github.com/gillopy/nisar-canopy`. Si cambiás
de repo, alcanza con reemplazar esa URL en los **tres** lugares donde aparece `data-repo`:

```html
<a class="btn" href="https://github.com/gillopy/nisar-canopy" data-repo hidden>Ver el repositorio</a>
```

Si la URL vuelve a ser `#`, el botón se oculta solo: nunca queda un link roto.

**1. Deploy en GitHub Pages.** Falta publicarlo: subir la carpeta y activar Pages en
Settings → Pages.

**2. La imagen de las previsualizaciones.** `og:image` necesita una URL absoluta, así que
solo se puede poner después de publicar. Cuando tengas el dominio, agregá en el `<head>`:

```html
<meta property="og:image" content="https://TU-DOMINIO/img/mascara_total.webp">
<meta property="og:url" content="https://TU-DOMINIO/">
```

Sin eso, si pegás el link en Slack, WhatsApp o Discord, aparece el título y el texto pero
sin miniatura.

**3. Decidir si esta página es también el link de "Project"** del formulario. Lo es, salvo
que prefieras mandar el repositorio. El campo "Project Demonstration" —7 slides o video de
30 segundos— va aparte en cualquier caso.

**4. La subpágina óptica.** `optico-2025/` fue un prototipo: el index ya incluye el material
de la reserva y no la referencia. Se puede borrar o dejar afuera del deploy sin romper nada.

**5. Capturas de la consola.** Salen de `Imagenes/` y se publican convertidas a WebP en
`img/`: `consola.webp` (interfaz), `corrida_regional.webp` y `sme2_comparar.webp` (salidas).
La ruta local que aparecía en la captura de la interfaz fue tapada antes de publicar. Si
cambiás alguna, regenerala con el mismo ancho y calidad para no inflar la página.

## Estructura

```
caso-chaco/
  index.html      la página
  styles.css      estilos
  nav.js          navegación, progreso de lectura, carga diferida
  app.js          render de stats, slider, mapa SVG, barras, tabla, histograma
  scrolly.js      cambia el panel de la sección Historia según el paso visible
  data.js         números del caso Chaco (única fuente de verdad)
  tecnico.js      indicadores del Chaco, calculados por tools/tecnico.py
  este.js         segundo caso: Este de Paraguay, 10 m/px
  img/            recortes antes/después, máscaras y capturas de la consola (WebP)
  Imagenes/       PNG originales de las capturas y salidas (no se publica)
  optico-2025/    prototipo óptico, ya no lo usa el index
  datos/          recortes de origen (no hace falta publicar)
  tools/          scripts que regeneran técnico.js y este.js
  odd/tasks/      documento de trabajo de la última reescritura
```

`data.js`, `tecnico.js` y `este.js` son lo único que hay que tocar para cambiar cifras.

## De dónde salen las cifras

Escena NISAR L2 GCOV, track 161 / frame 167, banda HV, 20 m/px, umbral 3 dB, HV mínimo
−15,5 dB. Colección `NISAR_L2_GCOV_PROVISIONAL_V1`.

- Desmonte: `-61.12896,-20.856085,-61.062527,-20.81036`
- Control: `-61.182518,-20.938034,-61.099777,-20.883834`
- Pares de 12 días: 20 de enero al 21 de marzo de 2026.

Segundo caso: track 031 / frame 4005, 10 m/px, `-55.545502,-24.292034,-55.309296,-23.982488`.

Para regenerar `tecnico.js` o `este.js` están los comandos completos en el README del
proyecto original (`climate-3d/demo/caso-chaco/README.md`). Este sitio es una copia
autocontenida: no necesita ese repositorio para verse.

## Reglas que la página respeta

- **Nada inventado.** Cada hectárea y cada porcentaje salen de `data.js` o `tecnico.js`.
- **Misma escala.** Los recortes de cada slider usan el mismo rango en dB.
- **Control declarado.** Aparece en el mapa, en el caso del Chaco y en la corrección.
- **Umbral justificado.** No se elige un umbral: se muestra el barrido completo.
- **Humedad declarada.** La sección 06 dice explícitamente que la retrodispersión también
  responde a humedad, lluvia y geometría, y cómo se controla cada cosa.
- **Limitaciones visibles.** La sección 06 no esconde el sesgo de humedad ni el estado
  provisional del producto.
- **Sin dependencias.** Sin fuentes externas, sin CDN, sin analítica.

## Pendiente

- Validación óptica con Sentinel-2 del 20-ene y del 21-mar (matriz de confusión).
- Exportar el GeoJSON de la máscara para que un tercero pueda verificarla.
- Coherencia interferométrica con GUNW sobre la misma caja.
- Versión completa en inglés (hoy hay un resumen desplegable para el jurado global).
