# Plan: Corregir riesgos legales en copy del landing

## Archivos a modificar (3)

### 1. `src/sections/landing/components/metrics-section.tsx`

Reemplazar el array `METRICS` completo:

**Actual:**
```ts
const METRICS = [
  {
    value: ">95%",
    label: "Precisión",
    description: "En clasificación arancelaria automatizada",
  },
  {
    value: "<3 min",
    label: "Por factura",
    description: "Tiempo de procesamiento y dictamen",
  },
  {
    value: "15K+",
    label: "Clasificaciones",
    description: "Procesadas y validadas",
  },
  {
    value: "100%",
    label: "Trazabilidad",
    description: "Trazabilidad normativa garantizada",
  },
]
```

**Nuevo:**
```ts
const METRICS = [
  {
    value: ">95%",
    label: "Precisión Predictiva",
    description: "Sugerida",
  },
  {
    value: "<3 min",
    label: "Por factura",
    description: "Tiempo de procesamiento y dictamen",
  },
  {
    value: "Grafo Activo",
    label: "Cobertura",
    description: "Arancelaria Matriz",
  },
  {
    value: "0%",
    label: "Alucinación",
    description: "Legal Controlada",
  },
]
```

---

### 2. `src/sections/landing/components/landing-hero.tsx`

**oldString:**
```
            al instante la partida exacta, el impacto fiscal real y un dictamen
            auditable con respaldo normativo.
```

**newString:**
```
            en minutos la partida de mayor probabilidad fiscal, el impacto
            impositivo proyectado y un dictamen técnico auditable con respaldo
            y trazabilidad de la normativa vigente.
```

---

### 3. `src/sections/landing/components/how-it-works-section.tsx`

**3a. Paso 2 — descripción:**

**oldString:**
```
      "El agente aplica las Reglas Generales Interpretativas del Sistema Armonizado, cruza con el Grafo Jurídico de reformas vigentes y simula el costo real de importación según el Incoterm de tu operación.",
```

**newString:**
```
      "El agente aplica las Reglas Generales Interpretativas del Sistema Armonizado, cruza las especificaciones técnicas con el Grafo Jurídico de reformas vigentes y simula el costo de importación proyectado según el Incoterm de tu operación.",
```

**3b. Paso 3 — título y descripción completos:**

**oldString:**
```
    title: "Recibe tu dictamen con respaldo normativo",
    description:
      "Descarga un dictamen auditable con la partida exacta, el impacto fiscal proyectado, alertas de permisología y la trazabilidad normativa completa para respaldar tu carga ante aduanas.",
```

**newString:**
```
    title: "Recibe tu dictamen de auditoría preventiva",
    description:
      "Descarga un informe técnico con las partidas sugeridas de alta precisión, el impacto fiscal estimado, alertas de permisología y la trazabilidad normativa completa (Gacetas y Decretos) para respaldar la toma de decisiones de tu equipo antes de la declaración aduanera.",
```

---

## Post-ejecución

```bash
pnpm build   # debe compilar sin errores
pnpm typecheck   # debe pasar
```
