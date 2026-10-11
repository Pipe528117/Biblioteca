import { UserPort } from '../../domain/ports/UserPort';
import { PrioridadUsuarioInputDTO, PrioridadUsuarioResultadoDTO } from '../dto/PrioridadUsuarioDTO';

export class CalculateUserPriority {
    constructor(private readonly userPort: UserPort) {}

    async execute(userId: number, input: PrioridadUsuarioInputDTO): Promise<PrioridadUsuarioResultadoDTO> {
        const user = await this.userPort.findById(userId);
        if (!user) {
            throw new Error(`Usuario con ID ${userId} no encontrado.`);
        }

        // Lógica de negocio significativa: Cálculo de puntaje para prioridad en préstamos
        let puntaje = 50; // Puntaje base

        // Si es usuario vulnerable (ODS 10 / Inclusión), suma puntos de prioridad
        if (input.es_vulnerable || user.es_vulnerable) {
            puntaje += 30;
        }

        // Si tiene buen promedio académico, suma puntos
        if (input.promedio_academico && input.promedio_academico >= 4.0) {
            puntaje += 20;
        }

        // Si tiene sanciones activas, resta puntos
        if (input.sanciones_activas > 0) {
            puntaje -= input.sanciones_activas * 15;
        }

        // Limitar puntaje entre 0 y 100
        puntaje = Math.max(0, Math.min(100, puntaje));

        return {
            usuario_id: userId,
            puntaje_prioridad: puntaje,
            elegible_prestamo_prioritario: puntaje >= 70,
            criterio_aplicado: puntaje >= 70 
                ? 'Prioridad otorgada por condición de vulnerabilidad o mérito académico' 
                : 'Asignación bajo flujo estándar'
        };
    }
}