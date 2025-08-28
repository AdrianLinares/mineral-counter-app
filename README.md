# Contador de Minerales - Petrografía

Una aplicación web especializada para el conteo de minerales en secciones delgadas petrográficas, diseñada específicamente para geólogos y estudiantes de petrografía.

## Características Principales

### 🔬 Especialización Petrográfica
- Base de datos completa de minerales petrográficos organizados por categorías:
  - **Tectosilicatos**: Cuarzo, Microclina, Ortoclasa, Sanidina, Anortoclasa, Plagioclasa
  - **Filosilicatos**: Moscovita, Biotita, Clorita, Sericita
  - **Inosilicatos**: Enstatita, Diópsido, Augita, Jadeíta, Hornblenda, Actinolita, Tremolita
  - **Nesosilicatos**: Olivino, Granate, Andalucita, Sillimanita, Cianita
  - **Carbonatos**: Calcita, Dolomita
  - **Óxidos**: Magnetita, Hematita, Ilmenita

### 📊 Sistema de Contadores Múltiples
- Crea contadores ilimitados para diferentes minerales
- Cada contador muestra fórmula química y sistema cristalino
- Colores personalizables para identificación visual rápida
- Incrementos configurables por contador

### 🎯 Modos de Vista Flexibles
- **Individual**: Vista enfocada en un contador
- **Cuadrícula**: Vista múltiple en tarjetas
- **Lista**: Vista compacta con todos los contadores

### 💾 Gestión de Datos
- Almacenamiento local automático (sin necesidad de servidor)
- Exportación a formato JSON para análisis posterior
- Importación de datos desde archivos existentes
- Función de respaldo completo

### ⚙️ Personalización Avanzada
- Incrementos configurables (1, 5, 10, etc.)
- Límites máximos por contador
- Paleta de colores para organización visual
- Tema claro/oscuro para diferentes condiciones de laboratorio

## Cómo Usar

1. **Agregar Contador**: Haz clic en "Nuevo Contador" y selecciona un mineral de la lista
2. **Contar**: Usa los botones + y - para incrementar/decrementar
3. **Configurar**: Accede a configuraciones de cada contador para personalizar incrementos y límites
4. **Exportar**: Guarda tus datos en formato JSON para análisis posterior
5. **Cambiar Vista**: Alterna entre modos individual, cuadrícula y lista según tus necesidades

## Tecnología

- **Frontend**: React + TypeScript
- **UI**: Shadcn-ui + Tailwind CSS
- **Storage**: LocalStorage (sin servidor requerido)
- **Responsivo**: Optimizado para escritorio y dispositivos móviles

## Instalación y Desarrollo

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm run dev

# Construir para producción
pnpm run build
```

## Casos de Uso

- **Análisis Modal**: Conteo de minerales para determinación de composición porcentual
- **Estudios Texturales**: Registro de diferentes fases minerales
- **Prácticas de Laboratorio**: Herramienta educativa para estudiantes
- **Trabajo de Campo**: Análisis rápido de muestras con microscopio portátil
- **Investigación**: Registro sistemático para publicaciones científicas

---

Desarrollado para facilitar el trabajo de petrografos, investigadores y estudiantes de geología.