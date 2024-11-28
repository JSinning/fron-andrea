<div style="text-align="justify">

## <p style="text-align:center"> Aplicación de escritorio multiplataforma (producción) </p>

<img style="display:block; margin-left:auto; margin-right:auto;" width="200" height="200" src="https://user-images.githubusercontent.com/9887138/82108788-c33e9080-96f6-11ea-8544-617652871a4b.png"/>

## Acerca de nuestra aplicación

Aplicación de escritorio desarrollada por andrea.com.co, enfocada en frigorificos, te ayuda a llevar el control y organizacion de los datos de tu empresa, software de mas de 15 años en el ambiente laboral, actualizado a tecnologias mas recientes con un diseño mas ameno al usuario, trabajo elogiado por ser rapido y efectivo, ganando incrementos en la produccion y cuidando de la cartera en la parte administrativa de nuestro software.

## Stack

- Electron + Vue 2 + Typescript
- Tailwindcss
- Sentry

## Features

**1. Menú producción**

**2. Modulos producción**

- Pieles
- Canal caliente
- Caida del animal
- Visceras
- Despacho nacional
- Relacion canales

**3. Informes**

- Pieles
- Canal caliente
- Caida del animal
- Visceras
- Despacho nacional
- Relacion canales

## Setup project

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run electron:serve
```

#### Compiles and minifies for production

```
npm run build
```

#### Lints and fixes files

```
npm run lint
```

See [Configuration Reference](https://cli.vuejs.org/config/).

## Container test and production

### Running the production server:

```
// Up server
docker-compose --project-name production__andrea up build -d

// Down server
docker stop production_app
```

### Running dev server:

```
// Up server
docker-compose -f dev-compose.yml up --build -d // remove -d if you are using it to develop

// Down server
docker-compose -f dev-compose down
```

##### <p style="text-align: center"> Copyrigth license in [copyright](https://github.com/andrea-com-co/desktop_multiplatform_andrea/blob/develop/Copyright.md) :heart: </p>

##### <p style="text-align: center"> Written and developed with :heart: by [andrea.com.co](http://andrea.com.co) </p>

</div>
# fron-andrea
