document.addEventListener("DOMContentLoaded", () => {
  const bucketForm = document.getElementById("bucketForm")
  const resultDiv = document.getElementById("result")
  const visualizationDiv = document.getElementById("visualization")
  const bucket1 = document.getElementById("bucket1")
  const bucket2 = document.getElementById("bucket2")
  const water1 = document.getElementById("water1")
  const water2 = document.getElementById("water2")
  const bucket1Label = document.getElementById("bucket1-label")
  const bucket2Label = document.getElementById("bucket2-label")
  const prevStepBtn = document.getElementById("prevStep")
  const nextStepBtn = document.getElementById("nextStep")
  const stepDescription = document.getElementById("step-description")

  let steps = []
  let currentStepIndex = 0
  let maxX, maxY

  bucketForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const x = Number.parseInt(document.getElementById("x").value)
    const y = Number.parseInt(document.getElementById("y").value)
    const z = Number.parseInt(document.getElementById("z").value)

    if (x <= 0 || y <= 0 || z <= 0) {
      alert("Los valores deben ser mayores que 0")
      return
    }

    maxX = x
    maxY = y

    const solution = solveBucketProblem(x, y, z)
    displaySolution(solution, x, y)
  })

  prevStepBtn.addEventListener("click", () => {
    if (currentStepIndex > 0) {
      currentStepIndex--
      updateVisualization()
    }
  })

  nextStepBtn.addEventListener("click", () => {
    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++
      updateVisualization()
    }
  })

  function solveBucketProblem(x, y, z) {
    // Inicializar capacidades 
    const maxX = x
    const maxY = y
    let levelX = 0
    let levelY = 0

    // Seguimiento de estados 
    const visited = new Map()

    // Cola para búsqueda 
    const queue = []
    queue.push([0, 0, ""])

    while (queue.length > 0) {
      const current = queue.shift()
      levelX = current[0]
      levelY = current[1]
      const action = current[2]

      // Verificar si se alcanzó el estado z
      if (levelX === z || levelY === z) {
        const steps = []
        let currentAction = action
        let currentX = levelX
        let currentY = levelY

        while (currentAction !== "") {
          steps.push([currentX, currentY, currentAction])
          const hash = `${currentX},${currentY}`
          if (visited.has(hash)) {
            const prev = visited.get(hash)
            currentX = prev[0]
            currentY = prev[1]
            currentAction = prev[2]
          }
        }

        steps.push([0, 0, "Inicio"])
        return { success: true, steps: steps.reverse() }
      }

      // Generar todos los posibles estados siguientes
      const nextStates = [
        [maxX, levelY, "Llenar Cubo 1"], 
        [levelX, maxY, "Llenar Cubo 2"], 
        [0, levelY, "Vaciar Cubo 1"], 
        [levelX, 0, "Vaciar Cubo 2"], 
        [
          levelX - Math.min(levelX, maxY - levelY),
          levelY + Math.min(levelX, maxY - levelY),
          "Transferir de Cubo 1 a Cubo 2",
        ], // Transferir de Cubo 1 a Cubo 2
        [
          levelX + Math.min(levelY, maxX - levelX),
          levelY - Math.min(levelY, maxX - levelX),
          "Transferir de Cubo 2 a Cubo 1",
        ], // Transferir de Cubo 2 a Cubo 1
      ]

      // Añadir estados siguientes a la cola si no han sido visitados antes
      for (const state of nextStates) {
        const hash = `${state[0]},${state[1]}`
        if (!visited.has(hash)) {
          queue.push(state)
          visited.set(hash, [levelX, levelY, action])
        }
      }
    }

    return { success: false }
  }

  function displaySolution(solution, x, y) {
    resultDiv.innerHTML = ""

    if (solution.success) {
      steps = solution.steps
      currentStepIndex = 0

      resultDiv.innerHTML = `
                <div class="solution-found">
                    <h3>¡Solución encontrada!</h3>
                    <p>Se encontró una solución en ${steps.length - 1} pasos.</p>
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Cubo 1</th>
                            <th>Cubo 2</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody id="solution-steps">
                        ${steps
                          .map(
                            (step, index) => `
                            <tr id="step-${index}" class="${index === 0 ? "current-step" : ""}">
                                <td>${step[0]}</td>
                                <td>${step[1]}</td>
                                <td>${step[2]}</td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
            `

      visualizationDiv.classList.remove("d-none")
      updateVisualization()
    } else {
      resultDiv.innerHTML = `
                <div class="no-solution">
                    <h3>No se encontró solución</h3>
                    <p>No es posible medir exactamente la cantidad deseada con los cubos proporcionados.</p>
                </div>
            `
      visualizationDiv.classList.add("d-none")
    }
  }

  function updateVisualization() {
    if (steps.length === 0) return

    const step = steps[currentStepIndex]
    const levelX = step[0]
    const levelY = step[1]

    const percentX = (levelX / maxX) * 100
    const percentY = (levelY / maxY) * 100

    water1.style.height = `${percentX}%`
    water2.style.height = `${percentY}%`

    bucket1Label.textContent = `Cubo 1: ${levelX}/${maxX}`
    bucket2Label.textContent = `Cubo 2: ${levelY}/${maxY}`

    stepDescription.textContent = step[2]

    prevStepBtn.disabled = currentStepIndex === 0
    nextStepBtn.disabled = currentStepIndex === steps.length - 1

    const rows = document.querySelectorAll("#solution-steps tr")
    rows.forEach((row, index) => {
      if (index === currentStepIndex) {
        row.classList.add("current-step")
      } else {
        row.classList.remove("current-step")
      }
    })
  }
})

