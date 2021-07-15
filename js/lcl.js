const saveData = () => {
  localStorage.setItem("ing", ingresos);
  localStorage.setItem("egr", egresos);
  localStorage.setItem("ingrar", JSON.stringify(listadoIngresosArr));
  localStorage.setItem("egrar", JSON.stringify(listadoEgresosArr));
};

const readDataLocal = () => {
  ingresos = localStorage.getItem("ing");
  egresos = localStorage.getItem("egr");
  listadoIngresosArr = JSON.parse(localStorage.getItem("ingrar"));
  listadoEgresosArr = JSON.parse(localStorage.getItem("egrar"));
};
