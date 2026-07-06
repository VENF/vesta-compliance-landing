# Plan: Layout responsive de ClassificationResult + IncotermCard

## Archivo
`src/sections/landing/components/how-it-works-section.tsx`

## Cambio

Reemplazar el bloque actual (lines 80-110) con este:

```tsx
        <div className="mt-16 flex justify-center">
          <div className="relative w-full md:p-10">
            <div className="pointer-events-none absolute inset-0 z-0 hidden flex-col md:flex">
              <div className="flex-1" />
              <StripedPattern
                direction="right"
                className="text-[#DBDBDB] dark:text-[#2E2E2E]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:w-[calc(100%-120px)]"
            >
              <ClassificationResultSection data={MOCK_RESULT} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 md:absolute md:bottom-10 md:right-10 md:z-10 md:mt-0 md:w-80"
            >
              <IncotermSimulationCard />
            </motion.div>
          </div>
        </div>
```

## Comportamiento

| | Mobile (<md) | Desktop (md+) |
|---|---|---|
| ClassificationResult | 100% width | `calc(100%-120px)` — deja espacio a la derecha |
| IncotermCard | Stack vertical debajo con `mt-4` | `absolute bottom-10 right-10` solapando la esquina |
| StripedPattern | Oculto | Visible detrás de los cards |
