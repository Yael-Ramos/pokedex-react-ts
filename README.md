# React + TypeScript + Vite - Pokémon API

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules, configured for consuming the Pokémon API.

## API Integration

Este proyecto consume la **PokéAPI** para mostrar información de Pokémon. A continuación se detallan los endpoints utilizados:

### Endpoints

#### Lista de Pokémon
- **URL**: `https://pokeapi.co/api/v2/pokemon`
- **Método**: GET
- **Headers**: No requiere headers adicionales
- **Descripción**: Obtiene una lista paginada de Pokémon

#### Detalle de Pokémon
- **URL**: `https://pokeapi.co/api/v2/pokemon/{id}`
- **Método**: GET  
- **Headers**: No requiere headers adicionales
- **Parámetros**:
  - `id`: ID numérico del Pokémon (ej: 1, 2, 3...)
- **Ejemplos**:
  - `https://pokeapi.co/api/v2/pokemon/1` (Bulbasaur)
  - `https://pokeapi.co/api/v2/pokemon/2` (Ivysaur)

## Modelos TypeScript

### 📝 Importante: Generación de Modelos

Para crear los modelos TypeScript correctamente:

1. **Copia la respuesta JSON** del endpoint correspondiente
2. **Usa "Paste JSON as Code"** en tu editor (VS Code, etc.)
3. **Guarda los archivos con extensión `.ts`**

### Estructura de Modelos Requeridos

#### Para Lista de Pokémon (`/pokemon`)
```typescript
// src/types/pokemon-list.ts
// Usar "Paste JSON as Code" con la respuesta de:
// GET https://pokeapi.co/api/v2/pokemon
```

#### Para Detalle de Pokémon (`/pokemon/{id}`)
```typescript
// src/types/pokemon-detail.ts  
// Usar "Paste JSON as Code" con la respuesta de:
// GET https://pokeapi.co/api/v2/pokemon/1
```



## Configuración del Proyecto

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## 🚀 Pasos Siguientes

1. Prueba los endpoints en tu navegador o Postman
2. Copia las respuestas JSON completas
3. Usa "Paste JSON as Code" para generar los tipos TypeScript
4. Guarda los archivos con extensión `.ts` en `src/types/`
5. Implementa los componentes React para mostrar la lista y cards de Pokémon