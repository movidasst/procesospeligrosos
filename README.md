# PP · Aplicación del curso IPERC

Aplicación web de La Movida de SST para acompañar el taller **Identificación de Peligros, Evaluación de Riesgos y Diseño de Controles**.

## Recorrido didáctico

**Actividad → Peligro → Exposición / interacción → Evento → Consecuencia → Riesgo → Controles → Riesgo residual**

La aplicación ofrece dos formas de uso:

- **Modo Curso:** guía paso a paso, trabajo prescrito vs. trabajo real, caracterización ampliada de la exposición, sugerencias metodológicas explícitas y análisis opcional de barreras / BowTie.
- **Modo Profesional:** formulario completo para evaluación y gestión de registros sin acompañamiento didáctico paso a paso.

## Módulos que acompaña

1. **Antes de evaluar el riesgo, aprende a mirar el trabajo.**
2. **De la identificación a la caracterización de la exposición.**
3. **Evaluar el riesgo: del razonamiento a la matriz.**
4. **Del riesgo al control: jerarquía, barreras, BowTie y verificación.**

## Métodos disponibles

- Matriz 5×5 La Movida SST: convención configurable de la herramienta.
- William T. Fine: C × E × P.
- GTC 45:2012: NP = ND × NE; NR = NP × NC.
- COVENIN 4004:2000: matriz cualitativa de probabilidad Baja/Media/Alta × consecuencias LD/D/ED, con niveles T/TO/M/I/IN.
- IPERC cualitativo 3×3: convención configurable de apoyo.

Las escalas no se mezclan automáticamente. La frecuencia registrada puede generar una **sugerencia** para GTC 45 o William T. Fine, pero el usuario debe confirmarla según las definiciones propias del método.

## Exposición

La caracterización contempla, según aplique:

- quién se expone;
- frecuencia y duración;
- magnitud, intensidad o concentración;
- vía o forma de exposición;
- patrón y variabilidad;
- fuente de evidencia;
- incertidumbre relevante.

La herramienta no sustituye mediciones higiénicas ni evaluaciones especializadas cuando estas son necesarias.

## Controles y barreras

La aplicación diferencia controles existentes, medidas adicionales y riesgo residual. La reducción residual debe justificarse y una reducción marcada como **verificada** exige evidencia de eficacia.

El constructor BowTie es opcional y permite documentar:

- amenazas;
- Top Event o pérdida de control;
- barreras preventivas;
- barreras mitigadoras;
- consecuencias;
- factores de degradación;
- controles de degradación.

No se obliga a utilizar BowTie en escenarios donde otro enfoque sea más apropiado.

## Datos y compatibilidad

Las evaluaciones definitivas se sincronizan en Supabase por integrante. El navegador conserva caché individual y borradores locales para continuidad y contingencia.

El antiguo campo `proceso_peligroso` se conserva únicamente a nivel de datos para compatibilidad con registros históricos. Ya no forma parte del flujo didáctico ni de la interfaz de nuevas evaluaciones.

## Referencias de apoyo

- ISO 45002:2023, como referencia de gestión para la implementación de ISO 45001.
- GTC 45:2012, segunda actualización.
- William T. Fine, Evaluación matemática para control de riesgos.
- COVENIN 4004:2000, cuando corresponda al contexto venezolano.

La herramienta apoya el juicio profesional y no sustituye requisitos legales, mediciones higiénicas, evaluaciones especializadas ni criterios definidos por la organización.
