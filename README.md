# Inicio del Proyecto

- npm create vite@latest: para instalar React + Vite.
    - Project name: ExamenIntegrador
    - Package name: examen-integrador
    - Select Framework: React
    - Select a variant: JavaScript
- Accedemos a la carpeta con cd ExamenIntegrador
- npm init: para modificar el package.json con las configuraciones inicales del proyecto (se puede hacer manual).
- npm install: para instalar las dependencias de vite y react en el proyecto
- npm run dev: para probar que todo funcione correctamente.
- npm i react-router-dom: para el manejo de las rutas

---

# Librerias

## Tailwind

Pasos para instalarlo y comenzar a usar

- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p
- Añadir todas las extensiones de archivos a usar en tailwind.config.js
    - content: [ "./src/**/*.{js,jsx}" ]
- Añadir las siguientes directivas de tailwind al css principal index.css:
    - @tailwind base
    - @tailwind components
    - @tailwind utilities
    
- Ejecutar la herramienta de CLI de tailwind para generar el css
    - npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
