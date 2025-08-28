# 🔬 Contador de Minerales en Sección Delgada

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

Una aplicación web profesional especializada para el conteo cuantitativo de minerales y análisis textural en secciones delgadas petrográficas. Diseñada específicamente para geólogos, investigadores, y estudiantes de petrología y mineralogía.

## ✨ Características Principales

### 🗃️ Base de Datos Completa

#### **Minerales (15+ categorías, 250+ minerales)**
- **Tectosilicatos**: Cuarzo, Feldespatos (K-feldespato, Plagioclasas), Zeolitas
- **Filosilicatos**: Micas (Moscovita, Biotita), Arcillas (Caolinita, Illita), Clorita, Serpentina
- **Inosilicatos**: Piroxenos (Augita, Diópsido), Anfíboles (Hornblenda, Actinolita)
- **Nesosilicatos**: Olivino, Granates, Polimorfos de Al₂SiO₅, Circón
- **Sorosilicatos**: Epidota, Zoisita, Prehnita, Lawsonita
- **Ciclosilicatos**: Turmalina, Berilo, Cordierita
- **Carbonatos**: Calcita, Dolomita, Aragonito, Siderita
- **Óxidos**: Magnetita, Hematita, Rutilo, Ilmenita, Cromita
- **Sulfuros**: Pirita, Calcopirita, Galena, Esfalerita
- **Sulfatos**: Yeso, Baritina, Celestina, Alunita
- **Fosfatos**: Apatito, Monazita, Xenotima
- **Haluros**: Halita, Fluorita, Silvita
- **Minerales de Alteración**: Serpentina, Limonita, Goethita
- **Feldespatoides**: Nefelina, Leucita, Sodalita
- **Minerales Autigénicos**: Glauconita, Chamosite
- **Minerales Detríticos**: Cuarzo detrítico, Fragmentos líticos

#### **Texturas y Estructuras (8 categorías, 150+ términos)**
- **Texturas Ígneas**: Holocristalina, Porfídica, Ofítica, Miarmequítica, Vesicular
- **Texturas Sedimentarias**: Clástica, Oolítica, Bioclástica, Gradada, Estratificada
- **Texturas Metamórficas**: Esquistosa, Gnéisica, Granoblástica, Cataclástica, Milonnítica
- **Componentes Sedimentarios**: Ooides, Pellets, Bioclastos, Intraclastos
- **Tipos de Cemento**: Calcítico, Silíceo, Ferruginoso, Arcilloso
- **Tipos de Porosidad**: Primaria, Secundaria, Intergranular, Móldica
- **Estructuras Sedimentarias**: Estratificación, Laminación, Bioturbación
- **Alteraciones Diagenéticas**: Compactación, Cementación, Disolución, Neomorfismo

### 🎛️ Sistema de Contadores Avanzado
- **Contadores Ilimitados**: Crea tantos contadores como necesites
- **Información Detallada**: Fórmula química, sistema cristalino, categoría
- **Colores Personalizables**: 8 colores disponibles para organización visual
- **Configuración Flexible**: Incrementos personalizables (1, 5, 10, etc.)
- **Límites Configurables**: Establece valores máximos por contador
- **Persistencia Automática**: Guardado automático en tiempo real

### 📱 Interfaz de Usuario Moderna
- **Diseño Responsivo**: Optimizado para escritorio, tablet y móvil
- **Tema Dual**: Modo claro y oscuro para diferentes condiciones de laboratorio
- **Búsqueda Avanzada**: Busca por nombre, fórmula química o descripción
- **Navegación Tabbed**: Separación clara entre minerales y texturas
- **Categorías Colapsables**: Organización jerárquica de la base de datos

### 🎯 Modos de Vista Flexibles
- **Vista Cuadrícula**: Visualización múltiple en tarjetas organizadas
- **Vista Lista**: Formato compacto para máxima eficiencia de espacio
- **Estadísticas en Tiempo Real**: Contadores activos y total de conteos

### 💾 Gestión de Datos Profesional
- **Almacenamiento Local**: Sin necesidad de servidor, datos seguros localmente
- **Exportación JSON**: Formato estándar para análisis estadístico posterior
- **Importación de Datos**: Recupera sesiones previas o comparte entre colegas
- **Funciones de Respaldo**: Reinicio y eliminación masiva con confirmación
- **Metadatos Incluidos**: Fecha de exportación e información de sesión

## 🚀 Inicio Rápido

### 🔄 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/mineral-counter-app.git
cd mineral-counter-app

# Instalar dependencias
npm install
# o
pnpm install
# o 
yarn install

# Ejecutar en modo desarrollo
npm run dev
# o
pnpm run dev

# Construir para producción
npm run build
# o
pnpm run build

# Previsualizar build de producción
npm run preview
```

### 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # Análisis de código con ESLint
npm run preview  # Previsualizar build
```

## 📚 Guía de Uso

### 1️⃣ Crear Contador
- Haz clic en **"Nuevo Contador"**
- Selecciona entre las pestañas **"Minerales"** o **"Texturas"**
- Usa la **barra de búsqueda** para encontrar rápidamente elementos específicos
- Expande las **categorías colapsables** para navegar por tipo
- Selecciona un **color** para organización visual
- Haz clic en el elemento deseado para crear el contador

### 2️⃣ Contar Observaciones
- Usa los **botones +/-** para incrementar/decrementar cada observación
- **Clic izquierdo** en el contador para incrementar rápidamente
- Accede a **configuraciones** para personalizar:
  - Incremento por clic (1, 5, 10, etc.)
  - Valor máximo del contador
  - Color del contador

### 3️⃣ Gestionar Vistas
- **Vista Cuadrícula**: Ideal para monitoreo múltiple simultáneo
- **Vista Lista**: Máximo aprovechamiento del espacio vertical
- **Estadísticas en tiempo real**: Monitoreo de progreso total

### 4️⃣ Exportar y Respaldar
- **Exportar**: Guarda datos en formato JSON con metadatos completos
- **Importar**: Recupera sesiones previas o datos compartidos
- **Reiniciar**: Resetea valores manteniendo configuraciones
- **Eliminar**: Limpieza completa con confirmación de seguridad

## 🎯 Casos de Uso Profesionales

### 🔬 **Análisis Modal Cuantitativo**
- **Objetivo**: Determinación de composición modal porcentual
- **Método**: Conteo de puntos sistemático (Point Counting)
- **Aplicación**: Clasificación petrográfica según IUGS
- **Ventaja**: Registro automático con metadatos temporales

### 📊 **Estudios Petrográficos Detallados**
- **Objetivo**: Análisis textural y estructural cuantitativo
- **Método**: Clasificación simultánea de minerales y texturas
- **Aplicación**: Caracterización petrológica integral
- **Ventaja**: Base de datos unificada con terminología estándar

### 🎓 **Enseñanza y Formación Académica**
- **Objetivo**: Herramienta educativa para reconocimiento mineral
- **Método**: Prácticas guiadas con base de datos estructurada
- **Aplicación**: Laboratorios de Mineralogía y Petrología
- **Ventaja**: Interface intuitiva con información contextual

### ⛏️ **Investigación Científica**
- **Objetivo**: Registro sistemático para publicaciones
- **Método**: Documentación reproducible con exportación estándar
- **Aplicación**: Estudios petrogenéticos y diagnósticos
- **Ventaja**: Formato de datos compatible con software estadístico

### 📱 **Trabajo de Campo**
- **Objetivo**: Análisis rápido in-situ
- **Método**: Interface responsiva para dispositivos móviles
- **Aplicación**: Evaluación preliminar de muestras
- **Ventaja**: Funcionalidad offline con sincronización posterior

## 🛠️ Stack Tecnológico

### Frontend
- **⚙️ React 18.3.1**: Biblioteca de UI con hooks modernos
- **🔷 TypeScript 5.5.3**: Tipado estático para mayor robustez
- **🌀 Vite 5.4.1**: Build tool optimizado y HMR
- **🎨 Tailwind CSS 3.4.11**: Framework CSS utility-first
- **🧾 Shadcn/ui**: Componentes UI accesibles y personalizables

### Herramientas de Desarrollo
- **🔍 ESLint**: Análisis estático de código
- **🔧 TypeScript Compiler**: Verificación de tipos
- **🚀 Vite Dev Server**: Desarrollo con recarga rápida
- **📦 NPM/PNPM**: Gestión de dependencias

### Persistencia y Datos
- **💾 LocalStorage API**: Almacenamiento local del navegador
- **📋 JSON**: Formato de exportación e importación
- **🔄 Auto-sync**: Guardado automático en tiempo real

## 📊 Estructura de Datos

### Formato de Exportación JSON
```json
{
  "exportDate": "2024-01-15T10:30:00.000Z",
  "counters": [
    {
      "mineralName": "Cuarzo",
      "value": 45,
      "increment": 1,
      "maxValue": 100,
      "color": "#3b82f6",
      "createdAt": "2024-01-15T09:00:00.000Z"
    }
  ]
}
```

### Estructura de Minerales
```typescript
interface Mineral {
  name: string;           // Nombre del mineral
  formula: string;        // Fórmula química
  system: string;         // Sistema cristalino
  category: string;       // Categoría mineralógica
}
```

### Estructura de Texturas
```typescript
interface TextureTerm {
  term: string;           // Término textural
  description: string;    // Descripción detallada
}
```

## 🔒 Características de Seguridad

- **💾 Almacenamiento Local**: Datos privados sin transmisión externa
- **⚠️ Confirmaciones**: Diálogos de confirmación para acciones destructivas
- **🔄 Respaldo Automático**: Persistencia automática contra pérdida de datos
- **📋 Exportación**: Respaldos manuales en formato estándar

## 🌍 Compatibilidad

### Navegadores Soportados
- **Chrome/Edge**: ≥ 88
- **Firefox**: ≥ 85
- **Safari**: ≥ 14
- **Mobile Safari**: ≥ 14
- **Chrome Mobile**: ≥ 88

### Dispositivos
- **💻 Escritorio**: Windows, macOS, Linux
- **📱 Móvil**: iOS, Android
- **💺 Tablet**: iPad, Android tablets

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Reconocimientos

- **Shadcn/ui**: Por los componentes de interfaz
- **Lucide Icons**: Por los iconos utilizados
- **Tailwind CSS**: Por el sistema de diseño
- **Comunidad Geológica**: Por la validación de contenido científico

## 📞 Contacto

**Desarrollado por:** [Adrian Linares](https://www.linkedin.com/in/adrianlinares246/)

---

<div align="center">
  <strong>🔬 Desarrollado para facilitar el trabajo de petrógrafos, investigadores y estudiantes de geología 🧪</strong>
</div>
