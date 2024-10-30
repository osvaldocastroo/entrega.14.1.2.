// js/space.js
document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value;
    fetch(`https://images-api.nasa.gov/search?q=${query}`)
        .then(response => response.json())
        .then(data => mostrarImagenes(data))
        .catch(error => console.log('Error:', error));
});

function mostrarImagenes(data) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';
    const items = data.collection.items;

    items.forEach(item => {
        const imagen = item.links[0].href;
        const titulo = item.data[0].title;
        const descripcion = item.data[0].description;
        const fecha = new Date(item.data[0].date_created).toLocaleDateString();

        const tarjeta = `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img src="${imagen}" class="bd-placeholder-img card-img-top" alt="${titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text">${descripcion}</p>
                        <p class="card-text"><small class="text-muted">${fecha}</small></p>
                    </div>
                </div>
            </div>
        `;

        contenedor.innerHTML += tarjeta;
    });
}
