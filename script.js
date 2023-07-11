document.addEventListener("DOMContentLoaded", function() {
  const apiUrl = "http://20.127.99.192/index.php";

  const form = document.getElementById("form");
  const table = document.getElementById("table");

// Función para obtener los datos de la API
// Función para obtener los datos de la API
function getData() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Verificar si la respuesta es un objeto único
      if (Array.isArray(data.data)) {
        // Limpiar la tabla antes de agregar los nuevos datos
        table.innerHTML = `
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Membresía</th>
            <th>Acciones</th>
          </tr>
        `;

        data.data.forEach(item => {
          const row = document.createElement("tr");
          row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.membership}</td>
          <td>
            <button onclick="editData(${item.id})">Editar</button>
            <button onclick="deleteData(${item.id})">Eliminar</button>
          </td>
        `;
        table.appendChild(row);
      });
      } 
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

// Realizar una consulta inicial al cargar la página
getData();

// Realizar una consulta cada 5 segundos
setInterval(getData, 5000);

});

// Función para agregar nuevos datos a la API
function addData(name, membership) {
  const apiUrl = "http://20.127.99.192/index.php";
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      membership: membership
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log("Nuevo registro agregado:", data);
      getData();
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const membershipInput = document.getElementById("membership");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = nameInput.value;
  const membership = membershipInput.value;

  addData(name, membership);

  // Limpiar los campos del formulario después de agregar los datos
  nameInput.value = "";
  membershipInput.value = "";
});


// Función para editar datos existentes en la API
function editData(id) {
  apiUrl = "http://20.127.99.192/index.php";
  const newName = prompt("Ingrese el nuevo nombre:");
  const newMembership = prompt("Ingrese la nueva membresía:");

  // Verificar si se ha proporcionado un nuevo nombre y membresía
  if (newName !== null && newMembership !== null) {
    fetch(`${apiUrl}?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newName,
        membership: newMembership
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Registro editado:", data);
        getData();
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }
}

// Función para eliminar datos existentes en la API
function deleteData(id) {
  apiUrl = "http://20.127.99.192/index.php";

  // Confirmación antes de eliminar el registro
  if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
    fetch(`${apiUrl}?id=${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        console.log("Registro eliminado:", data);
        getData();
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }
}
