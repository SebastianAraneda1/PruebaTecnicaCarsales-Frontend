# Prueba Técnica Carsales - Frontend

Aplicación frontend desarrollada en Angular 19 para visualizar episodios y personajes de Rick and Morty.

El objetivo del frontend es presentar la información de forma clara, ordenada y atractiva, utilizando buenas prácticas de Angular moderno, separación de responsabilidades, componentes reutilizables, tipado con TypeScript, filtros, paginación, manejo visual de errores y modo oscuro.

---

## Descripción general

Este proyecto corresponde a la parte visual de la aplicación.

La interfaz permite navegar entre dos secciones principales:

- Episodios.
- Personajes.

Cada sección cuenta con filtros de búsqueda, paginación, estados de carga y manejo visual de errores.

La aplicación fue desarrollada como SPA, es decir, una Single Page Application. Esto significa que Angular se ejecuta en el navegador, administra las rutas internas y actualiza la interfaz sin recargar completamente la página.

---

## Tecnologías utilizadas

- Angular 19.
- TypeScript.
- SCSS.
- Angular Router.
- Angular HttpClient.
- Standalone Components.
- Signals.
- computed.
- input.
- output.
- inject.
- Control flow moderno con @if y @for.
- Lazy loading con loadComponent.
- Variables CSS.
- LocalStorage.
- Diseño responsive sin framework CSS.

---

## Funcionalidades implementadas

La aplicación incluye:

- Listado de episodios.
- Listado de personajes.
- Filtros para episodios.
- Filtros para personajes.
- Paginación reutilizable.
- Manejo visual de errores.
- Estado visual de carga.
- Modo claro y modo oscuro.
- Persistencia del tema seleccionado.
- Navegación entre secciones.
- Lazy loading en rutas.
- Tipado de modelos.
- Diseño responsive.
- Componentes reutilizables.

## Estructura general del proyecto

```txt
src/
  app/
    core/
      models/
      services/

    features/
      episodes/
        pages/
        services/

      characters/
        pages/
        services/

    shared/
      components/
      utils/

    app.component.html
    app.component.scss
    app.component.ts
    app.config.ts
    app.routes.ts

  environments/
    environment.ts
    environment.development.ts

  styles.scss
```

## Organización por carpetas

El proyecto se organizó en tres carpetas principales dentro de app:

- core.
- features.
- shared.

Esta separación ayuda a mantener el código más limpio y fácil de entender.

---

## Carpeta core

La carpeta core contiene elementos globales de la aplicación.

En este proyecto se usa principalmente para:

- Modelos TypeScript.
- Servicios globales.

Ejemplos:

core/models/
core/services/

---

### Modelos en core

Los modelos definen la forma que tienen los datos dentro del frontend.

Esto permite trabajar con TypeScript de forma segura y evitar el uso de any.

Modelos principales:

- Episode.
- Character.
- PaginatedResponse.

---

### Episode

Representa un episodio dentro del frontend.

Ejemplo:

export interface Episode {
  id: number;
  name: string;
  airDate: string;
  episode: string;
}

Campos:

- id: identificador del episodio.
- name: nombre del episodio.
- airDate: fecha de estreno.
- episode: código del episodio, por ejemplo S01E01.

---

### Character

Representa un personaje dentro del frontend.

Ejemplo:

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

Campos:

- id: identificador del personaje.
- name: nombre del personaje.
- status: estado del personaje.
- species: especie.
- type: tipo específico, cuando existe.
- gender: género.
- image: URL de la imagen del personaje.

---

### PaginatedResponse

Representa una respuesta paginada.

Ejemplo:

export interface PaginatedResponse<T> {
  count: number;
  pages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  results: T[];
}

Este modelo es genérico. Eso significa que puede usarse tanto para episodios como para personajes.

Ejemplos:

PaginatedResponse<Episode>
PaginatedResponse<Character>

Esto evita duplicar modelos de paginación para cada pantalla.

---

## Carpeta features

La carpeta features contiene las funcionalidades principales de la aplicación.

En este proyecto existen dos features:

- episodes.
- characters.

Cada feature contiene su propia página y su propio servicio.

Esto ayuda a que la lógica de episodios no se mezcle con la lógica de personajes.

---

## Feature episodes

La feature de episodios permite listar, buscar y paginar episodios.

Estructura aproximada:

features/episodes/
├── pages/
│   └── episode-list/
└── services/
    └── episode.service.ts

---

### EpisodeListComponent

Es el componente principal de la sección de episodios.

Responsabilidades:

- Mostrar los episodios.
- Administrar filtros de búsqueda.
- Solicitar información al servicio.
- Manejar estado de carga.
- Manejar errores.
- Administrar la página actual.
- Enviar datos al componente de paginación.

Este componente no debería encargarse de construir directamente la llamada HTTP. Esa responsabilidad corresponde al servicio.

---

### EpisodeService

Es el servicio encargado de obtener episodios.

Responsabilidades:

- Preparar parámetros de búsqueda.
- Enviar la petición HTTP.
- Retornar un Observable con la respuesta tipada.

Ejemplo conceptual:

getEpisodes(filters: EpisodeFilters): Observable<PaginatedResponse<Episode>>

El servicio no se suscribe internamente. Solo retorna el Observable.

Esto es importante porque mantiene el servicio simple y evita llamadas innecesarias como next() o complete().

---

### Filtros de episodios

Los filtros usados en episodios son:

- page.
- name.
- episode.

Ejemplo:

export interface EpisodeFilters {
  page: number;
  name: string;
  episode: string;
}

Esto permite buscar por nombre o por código de episodio.

---

## Feature characters

La feature de personajes permite listar, buscar, filtrar y paginar personajes.

Estructura aproximada:

features/characters/
├── pages/
│   └── character-list/
└── services/
    └── character.service.ts

---

### CharacterListComponent

Es el componente principal de la sección de personajes.

Responsabilidades:

- Mostrar personajes.
- Mostrar la imagen de cada personaje.
- Administrar filtros.
- Manejar estado de carga.
- Manejar errores.
- Administrar paginación.
- Enviar datos al componente de paginación.

---

### CharacterService

Es el servicio encargado de obtener personajes.

Responsabilidades:

- Preparar los parámetros de búsqueda.
- Enviar la petición HTTP.
- Retornar la respuesta tipada.

Ejemplo conceptual:

getCharacters(filters: CharacterFilters): Observable<PaginatedResponse<Character>>

---

### Filtros de personajes

Los filtros usados en personajes son:

- page.
- name.
- status.
- species.
- gender.

Ejemplo:

export interface CharacterFilters {
  page: number;
  name: string;
  status: string;
  species: string;
  gender: string;
}

Esto permite buscar personajes por nombre, estado, especie o género.

---

## Carpeta shared

La carpeta shared contiene componentes y utilidades reutilizables.

En este proyecto contiene:

- PaginationComponent.
- ErrorMessageComponent.
- LoadingStateComponent.
- Utilidad para mensajes de error.

La idea de shared es evitar duplicar código.

Por ejemplo, episodios y personajes necesitan paginación. En vez de crear dos paginadores distintos, se creó un solo componente reutilizable.

---

## PaginationComponent

El componente de paginación permite navegar entre páginas.

Recibe como entrada:

- currentPage.
- totalPages.
- hasNextPage.
- hasPreviousPage.

Emite como salida:

- pageChange.

Cuando el usuario presiona "Anterior" o "Siguiente", el componente emite el número de página correspondiente.

Este componente no sabe si está paginando episodios o personajes. Solo sabe manejar páginas.

Eso lo hace reutilizable.

---

## ErrorMessageComponent

El componente de error muestra mensajes al usuario cuando ocurre un problema.

Responsabilidades:

- Presentar un mensaje visible.
- Evitar que el error quede solo en consola.
- Mejorar la experiencia de usuario.

Ejemplo de uso:

<app-error-message [message]="errorMessage()" />

---

## LoadingStateComponent

El componente de carga muestra un estado visual mientras la aplicación obtiene datos.

Responsabilidades:

- Indicar al usuario que hay una operación en progreso.
- Evitar que la pantalla parezca congelada.
- Reutilizar el mismo estado de carga en distintas secciones.

---

## Utilidad para manejo de errores

El archivo error-message.util.ts contiene una función encargada de transformar errores técnicos en mensajes más simples para el usuario.

Ejemplo de mensaje:

No fue posible conectar con el servidor. Verifica que la API esté en ejecución.

Esto separa la lógica de interpretación del error de la lógica visual.

---

## Rutas de la aplicación

La aplicación tiene rutas principales:

- /episodes.
- /characters.

La raíz redirige a episodios.

Ejemplo:

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'episodes',
    pathMatch: 'full'
  },
  {
    path: 'episodes',
    loadComponent: () =>
      import('./features/episodes/pages/episode-list/episode-list.component')
        .then(component => component.EpisodeListComponent),
    title: 'Episodios'
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./features/characters/pages/character-list/character-list.component')
        .then(component => component.CharacterListComponent),
    title: 'Personajes'
  },
  {
    path: '**',
    redirectTo: 'episodes'
  }
];

---

## Lazy loading

El proyecto utiliza lazy loading mediante loadComponent.

Esto significa que Angular no carga todas las pantallas al inicio. Cada pantalla se carga solo cuando el usuario entra a su ruta.

Ejemplo:

- Si el usuario entra a /episodes, se carga EpisodeListComponent.
- Si el usuario entra a /characters, se carga CharacterListComponent.

Esto ayuda a mejorar la carga inicial de la aplicación y demuestra el uso de funcionalidades modernas de Angular con componentes standalone.

---

## Standalone Components

Angular 19 trabaja muy bien con componentes standalone.

Un componente standalone no necesita declararse dentro de un NgModule tradicional.

Ejemplo conceptual:

@Component({
  selector: 'app-example',
  imports: [],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {}

Esto simplifica la estructura del proyecto y reduce la cantidad de archivos necesarios.

---

## Signals

El proyecto utiliza Signals para manejar estado.

Un Signal permite guardar un valor reactivo.

Ejemplos de estado manejado con Signals:

- Lista de episodios.
- Lista de personajes.
- Página actual.
- Total de páginas.
- Estado de carga.
- Mensaje de error.
- Filtros.
- Tema actual.

Ejemplo:

readonly isLoading = signal(false);
readonly errorMessage = signal<string | null>(null);
readonly currentPage = signal(1);

Para leer un Signal se usa:

isLoading()

Para cambiar su valor se usa:

isLoading.set(true)

---

## computed

computed permite crear valores derivados a partir de otros Signals.

Ejemplo:

readonly hasResults = computed(() => this.episodes().length > 0);

Esto significa que hasResults se recalcula automáticamente cuando cambia la lista de episodios.

---

## input y output

El proyecto utiliza input y output modernos de Angular.

input permite recibir datos desde un componente padre.

Ejemplo:

currentPage = input.required<number>();

output permite emitir eventos hacia el componente padre.

Ejemplo:

pageChange = output<number>();

Esto se usa en el componente de paginación.

---

## inject

inject permite obtener servicios sin necesidad de constructor.

Ejemplo:

private readonly episodeService = inject(EpisodeService);

Esto hace el código más directo y moderno.

---

## Control flow moderno: @if y @for

Angular permite usar una sintaxis moderna para condiciones y ciclos.

Ejemplo con @if:

@if (isLoading()) {
  <app-loading-state />
} @else if (errorMessage()) {
  <app-error-message [message]="errorMessage()!" />
}

Ejemplo con @for:

@for (episode of episodes(); track episode.id) {
  <article>
    {{ episode.name }}
  </article>
}

Esto reemplaza directivas más antiguas como *ngIf y *ngFor.

---

## Manejo de carga

Cada pantalla maneja un Signal llamado isLoading.

Cuando se inicia una petición:

isLoading.set(true)

Cuando la petición termina:

isLoading.set(false)

Mientras isLoading está activo, se muestra el LoadingStateComponent.

Esto mejora la experiencia del usuario porque informa que la aplicación está trabajando.

---

## Manejo de errores

Cada pantalla maneja un Signal llamado errorMessage.

Cuando ocurre un error, se transforma el error con getErrorMessage y se muestra en pantalla mediante ErrorMessageComponent.

Esto evita que los errores se oculten solo en consola y permite que el usuario entienda qué ocurrió.

---

## Paginación

La paginación funciona con los siguientes datos:

- currentPage.
- totalPages.
- hasNextPage.
- hasPreviousPage.

El componente PaginationComponent recibe estos valores y emite un evento cuando el usuario cambia de página.

El componente de página recibe ese evento y vuelve a cargar los datos correspondientes.

Flujo:

Usuario presiona "Siguiente"
  ↓
PaginationComponent emite pageChange
  ↓
EpisodeListComponent o CharacterListComponent recibe la nueva página
  ↓
Se llama al servicio
  ↓
Se actualizan los resultados

---

## Filtros

Cada sección tiene filtros independientes.

Episodios:

- Nombre.
- Código de episodio.

Personajes:

- Nombre.
- Estado.
- Especie.
- Género.

Los filtros se guardan en Signals y se envían al servicio cuando el usuario realiza una búsqueda.

---

## Modo oscuro

El proyecto incluye modo claro y modo oscuro.

El tema se administra mediante ThemeService.

Responsabilidades del ThemeService:

- Obtener el tema inicial.
- Leer una preferencia guardada en localStorage.
- Cambiar entre modo claro y oscuro.
- Aplicar el tema en el documento HTML.
- Guardar la preferencia del usuario.

El tema se aplica usando un atributo en el documento:

<html data-theme="dark">

Los colores se controlan mediante variables CSS.

Esto permite cambiar el diseño completo de la aplicación sin duplicar todos los estilos.

---

## Variables CSS

El proyecto utiliza variables CSS para definir colores, sombras y bordes.

Ejemplo conceptual:

:root {
  --color-page: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #0f172a;
}

:root[data-theme='dark'] {
  --color-page: #020617;
  --color-surface: #0f172a;
  --color-text: #e5e7eb;
}

Gracias a esto, el modo oscuro se controla cambiando variables, no reescribiendo todos los componentes.

---

## Estilos y diseño

El proyecto utiliza SCSS y no utiliza frameworks de CSS.

El diseño incluye:

- Cards.
- Bordes redondeados.
- Sombras suaves.
- Estados visuales.
- Modo oscuro.
- Diseño responsive.
- Fotografías redondas en personajes.
- Navegación clara.
- Colores diferenciados para secciones.

Esto ayuda a que la aplicación se vea más profesional sin depender de Bootstrap, Tailwind u otro framework.

---

## Diseño responsive

La aplicación utiliza media queries para adaptarse a distintos tamaños de pantalla.

Esto permite que se vea correctamente en:

- Escritorio.
- Tablet.
- Celular.

Los formularios, cards y navegación se ajustan cuando el ancho de pantalla es menor.

---

## Configuración por environments

La aplicación utiliza archivos de environment para configurar valores según el ambiente.

Archivos principales:

src/environments/environment.ts
src/environments/environment.development.ts

Ejemplo:

export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7000/api'
};

Esto evita dejar URLs hardcodeadas directamente dentro de los servicios.

Si cambia la URL base de la API, solo se modifica el archivo de environment.

---

## HttpClient

La aplicación utiliza Angular HttpClient para realizar peticiones HTTP.

En app.config.ts se registra HttpClient mediante provideHttpClient.

También se utiliza withFetch, que permite usar la API Fetch como backend de HttpClient.

Ejemplo conceptual:

provideHttpClient(withFetch())

---

## Servicios sin next() ni complete()

Los servicios HTTP del proyecto solo retornan Observables.

No usan llamadas manuales innecesarias como:

next()
complete()

Esto es correcto porque HttpClient ya administra el ciclo del Observable para una petición HTTP.

La suscripción se realiza desde los componentes de página, donde también se actualiza el estado visual.

---

## Tipado y uso de TypeScript

El proyecto evita el uso de any.

Se definieron interfaces para representar los datos:

- Episode.
- Character.
- PaginatedResponse.
- EpisodeFilters.
- CharacterFilters.

Esto ayuda a detectar errores durante el desarrollo y facilita entender qué forma tienen los datos.

---

## Buenas prácticas aplicadas

### Separación de responsabilidades

Cada archivo tiene una responsabilidad clara.

Ejemplos:

- EpisodeService: obtiene episodios.
- CharacterService: obtiene personajes.
- PaginationComponent: maneja la paginación visual.
- ErrorMessageComponent: muestra errores.
- LoadingStateComponent: muestra carga.
- ThemeService: administra el modo claro y oscuro.

---

### Componentes reutilizables

Se crearon componentes compartidos para evitar duplicación.

Componentes reutilizables:

- PaginationComponent.
- ErrorMessageComponent.
- LoadingStateComponent.

---

### Separación por features

La lógica de episodios y personajes está separada.

Esto permite modificar una sección sin afectar innecesariamente la otra.

---

### Configuración externa

La URL base de la API se define mediante environments.

Esto evita hardcodear configuraciones dentro de los servicios.

---

### Código legible

Se usaron nombres claros y estructuras simples.

El código no está sobrecargado con abstracciones innecesarias.

---

## Relación con SOLID

Aunque SOLID se suele mencionar mucho en backend, también puede aplicarse al frontend.

### Single Responsibility Principle

Cada componente o servicio tiene una responsabilidad específica.

Ejemplo:

- PaginationComponent solo se encarga de paginar.
- ThemeService solo se encarga del tema.
- EpisodeService solo se encarga de obtener episodios.

---

### Open/Closed Principle

La aplicación permite agregar nuevas funcionalidades sin modificar todo lo existente.

Por ejemplo, si se quisiera agregar una sección de ubicaciones, se podría crear una nueva feature:

features/locations/

sin romper episodios ni personajes.

---

### Dependency Inversion Principle

Los componentes no crean manualmente sus dependencias.

Usan inyección de dependencias con inject.

Ejemplo:

private readonly characterService = inject(CharacterService);

---

## Consideración sobre hidratación incremental

El proyecto fue desarrollado como una SPA, sin SSR.

Por esta razón no se implementó hidratación incremental.

La hidratación incremental aplica principalmente cuando Angular trabaja con renderizado del lado del servidor. En ese caso, el servidor genera HTML previamente y luego Angular lo vuelve interactivo en el navegador.

En una SPA, Angular crea la interfaz directamente en el navegador, por lo que no existe HTML generado previamente por servidor que necesite ser hidratado.

En este proyecto se priorizaron funcionalidades modernas de Angular 19 que sí aplican directamente a una SPA:

- Standalone Components.
- Signals.
- computed.
- input.
- output.
- inject.
- @if.
- @for.
- Lazy loading con loadComponent.
- Configuración por environments.

---

## Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js.
- npm.
- Angular CLI 19.

Verificar versiones:

node --version
npm --version
ng version

---

## Instalación

Desde la carpeta del proyecto frontend, ejecutar:

npm install

Esto instalará las dependencias definidas en package.json.

---

## Ejecución local

Para levantar la aplicación en desarrollo:

ng serve -o

---

## Compilación

Para compilar el proyecto:

ng build

Los archivos compilados se generan en la carpeta dist.

---

## Archivos que no deben subirse al repositorio

El archivo .gitignore debe evitar subir archivos generados o locales.

Ejemplos:

node_modules/
dist/
.angular/
coverage/
.env
.env.*

El archivo package-lock.json sí puede subirse, ya que ayuda a instalar las mismas versiones de dependencias.

Los archivos environment.ts y environment.development.ts también pueden subirse si no contienen secretos.

---

## Resumen

Este frontend implementa una aplicación Angular 19 moderna y organizada.

Incluye:

- Componentes standalone.
- Lazy loading.
- Signals.
- Tipado con TypeScript.
- Filtros.
- Paginación.
- Manejo visual de errores.
- Estados de carga.
- Modo oscuro.
- Persistencia de tema.
- Diseño responsive.
- SCSS sin frameworks CSS.
- Separación entre core, features y shared.

El proyecto está preparado para ejecutarse localmente, mantenerse de forma ordenada y ampliarse con nuevas funcionalidades en el futuro.
