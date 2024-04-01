---
title: "Los arrays en JavaScript"
description: "This post describes the process of adding webmentions to your own site"
publishDate: "11 Oct 2023"
tags: ["webmentions", "astro", "social"]
---
# Los arrays en JavaScript

En [[JavaScript]]]], los arrays son [[Estructuras_de_datos_en_Javascript]] listas de elementos en una sola variable. Estos, pueden ser de cualquier tipo:  números, cadenas, objetos, funciones, etc.
Se escriben entre corchetes, separados por comas.

Ejemplo:
```
const unArray = [1, 2 , 3, "Caramba"]
```

#### Acceder a los elementos de un array

Para ello, se puede utilizar su `indice`, que es el número de su posición empezando desde cero.
```javascript
let colores = ['rojo', 'verde', 'azul'];

console.log(colores[0]); // 'rojo'
console.log(colores[1]); // 'verde'
console.log(colores[2]); // 'azul'
```

Para modificarlos:
```javascript
let colores = ['rojo', 'verde', 'azul'];

colores[0] = 'blanco';
console.log(colores); // ['rojo', 'amarillo', 'azul']

```

#### Propiedades y métodos
Tienen múltiples propiedades y métodos.
###### Propiedades
- **length**: `array.length` devuelve la cantidad de elementos  del array
###### Métodos

Hay infinidad de métodos, [aquí una nota sobre el tema](metodos_para_arrays_en_JavaScript)

[aquí un cheatsheet](https://array-methods.github.io/) y [aquí la documentación oficial de Mozilla](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/)

Etiquetas: #JavaScript #Estructuras_de_datos
