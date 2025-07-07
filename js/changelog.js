document.addEventListener("DOMContentLoaded", async () => {
    const url = 'json/changelog.json';
    const tablaBody = document.querySelector('tbody');

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Ordenar por fecha (formato ISO)
        data.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));

        data.forEach(entrada => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${entrada.Fecha}</td>
                <td><div class="descripcion-truncada">${entrada.Descripcion}</div></td>
                <td><span class="status ${estadoClase(entrada.Estado)}">${entrada.Estado}</span></td>
            `;

            tablaBody.appendChild(fila);
        });

        // Expandir/cerrar descripciones
        document.querySelectorAll('.descripcion-truncada').forEach(el => {
            el.addEventListener('click', () => el.classList.toggle('expandido'));
        });

        // Actualizar la fecha más reciente en el encabezado
        if (data.length > 0) {
            document.querySelector('.last-update .date').textContent = data[0].Fecha;
        }

    } catch (error) {
        console.error("Error al cargar el changelog:", error);
        tablaBody.innerHTML = '<tr><td colspan="3">No se pudo cargar el changelog.</td></tr>';
    }
});

function estadoClase(estado) {
    switch (estado.toLowerCase()) {
        case 'completado': return 'completado';
        case 'en progreso': return 'en-progreso';
        case 'pendiente': return 'pendiente';
        default: return '';
    }
}
