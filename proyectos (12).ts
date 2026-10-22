import { sitio } from '../config/sitio';
import { demostraciones, proyectos } from '../content/proyectos';

/** Proyectos visibles: los reales publicados y, solo si se habilita, las demostraciones. */
export const proyectosVisibles = () => [...proyectos.filter((p) => p.publicado && !p.demo), ...(sitio.mostrarDemos ? demostraciones : [])];
