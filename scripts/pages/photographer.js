//Mettre le code JavaScript lié à la page photographer.html
async function init() {
  const id = new GetParamId(window.location.search).getId();
  console.log(id);
}

init();
