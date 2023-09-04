const entradaTarea = document.getElementById("entradaTarea")
const botonAgregarTarea = document.getElementById("botonAgregarTarea")
const listaTareas = document.getElementById("listaTareas")
const totalTareas = document.getElementById("totalTareas")
const tareasCompletadas = document.getElementById("tareasCompletadas")

let tareas = [ 
  { id: 1, descripcion: "Crear HTML", completada: false },
  { id: 2, descripcion: "Estilos Css", completada: false },
  { id: 3, descripcion: "Funciones JavaScript", completada: false }
]

function actualizarContadorTareas() {
  totalTareas.textContent = tareas.length
  tareasCompletadas.textContent = tareas.filter(tarea => tarea.completada).length
}
function mostrarTareas() {
  listaTareas.innerHTML = ""
  tareas.forEach(tarea => {
    const elementoTarea = document.createElement("li")
    elementoTarea.innerHTML = `
      <input type="checkbox" class="checkbox-tarea" data-id="${tarea.id}" ${tarea.completada ? "checked" : ""}>
      <span class="${tarea.completada ? "completada" : ""}"> ${tarea.id}: ${tarea.descripcion}</span>
      <button class="boton-eliminar" data-id="${tarea.id}">Eliminar</button>
    `;
    listaTareas.appendChild(elementoTarea);
  })
  actualizarContadorTareas()
}

botonAgregarTarea.addEventListener("click", () => {
  const descripcion = entradaTarea.value
  if (descripcion !== "") {
    const nuevaTarea = { id: tareas.length + 1, descripcion, completada: false };
    tareas.push(nuevaTarea)
    mostrarTareas()
    entradaTarea.value = ""
  }
})


listaTareas.addEventListener("click", event => {
  if (event.target.classList.contains("checkbox-tarea")) {
    const tareaId = parseInt(event.target.getAttribute("data-id"));
    const tarea = tareas.find(tarea => tarea.id === tareaId)
    tarea.completada = event.target.checked
    mostrarTareas()
  } else if (event.target.classList.contains("boton-eliminar")) {
    const tareaId = parseInt(event.target.getAttribute("data-id"));
    tareas = tareas.filter(tarea => tarea.id !== tareaId)
    mostrarTareas()
  }
});

mostrarTareas()
