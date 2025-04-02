# Desafío de los Cubos de Agua

## Descripción del Proyecto

Este proyecto implementa una solución interactiva al clásico problema de los "Cubos de Agua" (Water Jug Challenge). El desafío consiste en medir exactamente Z galones de agua utilizando únicamente dos cubos con capacidades X e Y, donde solo se permiten las operaciones de llenar, vaciar y transferir agua entre los cubos.

## Características

- Visualización interactiva del estado de los cubos en cada paso
- Navegación paso a paso a través de la solución
- Detección automática de casos sin solución
- Algoritmo optimizado para encontrar la solución más eficiente

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript 
- Bootstrap 5

## Enfoque Algorítmico

El algoritmo utiliza una búsqueda en amplitud (BFS - Breadth-First Search) para encontrar la solución más eficiente al problema. Este enfoque garantiza que la primera solución encontrada será la que requiera el menor número de pasos.

El algoritmo funciona de la siguiente manera:

1. Comienza con ambos cubos vacíos.
2. Explora todas las posibles acciones en cada estado (llenar, vaciar, transferir).
3. Mantiene un registro de los estados ya visitados para evitar ciclos infinitos.
4. Cuando encuentra un estado donde uno de los cubos contiene exactamente Z galones, reconstruye la secuencia de pasos que llevaron a ese estado.

La complejidad temporal del algoritmo es O(X * Y), donde X e Y son las capacidades de los cubos, ya que en el peor caso necesitaríamos explorar todos los posibles estados de llenado de ambos cubos.

## Cómo Usar

1. Abra el archivo `index.html` en su navegador web.
2. Ingrese las capacidades de los cubos (X e Y) y la cantidad objetivo (Z).
3. Haga clic en "Resolver" para encontrar la solución.
4. Utilice los botones "Anterior" y "Siguiente" para navegar a través de los pasos de la solución.
5. Observe la visualización de los cubos y la descripción de cada acción.

## Casos de Prueba

### Caso 1: Solución Simple
- Cubo X: 2
- Cubo Y: 10
- Objetivo Z: 4
- Resultado Esperado: Solución encontrada en 4 pasos

### Caso 2: Solución Eficiente
- Cubo X: 2
- Cubo Y: 100
- Objetivo Z: 96
- Resultado Esperado: Solución encontrada en 4 pasos

### Caso 3: Sin Solución
- Cubo X: 2
- Cubo Y: 6
- Objetivo Z: 5
- Resultado Esperado: "No se encontró solución"

## Limitaciones

- Solo se permiten las acciones de llenar, vaciar y transferir entre los dos cubos.
- X, Y y Z deben ser números enteros mayores que 0.
- No se pueden utilizar mediciones parciales o aproximadas.
