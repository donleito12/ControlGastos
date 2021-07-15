let presupuesto = 0;
let ingresos = 0;
let egresos = 0;
let k = 0;
let l = 0;

let listadoIngresosArr = [];
let listadoEgresosArr = [];

const presShow = document.getElementById("presupuesto-disponible");
const ingresosShow = document.getElementById("ingresos-head");
const egresosShow = document.getElementById("egresos-head");

const formu = document.getElementById("formulario-datos");
const listadoIngresos = document.getElementById("listado-ingresos");
const listadoEgresos = document.getElementById("listado-egresos");

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

function colorChang(num) {
  if (num > 0) {
    return "rgb(0, 80, 3)";
  } else if (num < 0) {
    return "rgb(94, 8, 8)";
  } else {
    return "black";
  }
}

function fillInfo() {
  presupuesto = ingresos - egresos;
  presShow.style.color = colorChang(presupuesto);
  presShow.innerText = formatter.format(presupuesto);
  ingresosShow.innerText = formatter.format(ingresos);
  egresosShow.innerText = formatter.format(egresos);
}

function fillArrayIng() {
  let listIng = "";
  for (let i = 0; i < listadoIngresosArr.length; i++) {
    listIng += listadoIngresosArr[i].add;
  }
  return listIng;
}

function fillArrayEgr() {
  let listEg = "";
  for (let i = 0; i < listadoEgresosArr.length; i++) {
    listEg += listadoEgresosArr[i].add;
  }
  return listEg;
}

function saveLocalData() {
  localStorage.clear();
  localStorage.setItem("egr", egresos);
  localStorage.setItem("ing", ingresos);
  localStorage.setItem("egrar", JSON.stringify(listadoEgresosArr));
  localStorage.setItem("ingrar", JSON.stringify(listadoIngresosArr));
}

function readLocalData() {
  ingresos = parseInt(localStorage.getItem("ing"));
  egresos = parseInt(localStorage.getItem("egr"));
  listadoIngresosArr = JSON.parse(localStorage.getItem("ingrar"));
  listadoEgresosArr = JSON.parse(localStorage.getItem("egrar"));
}

const secureErase = () => {
  return confirm("¿Está seguro que desea borrar toda la información? ");
};

function deleteLocalData() {
  let cond = secureErase();
  if (cond) {
    localStorage.clear();
    fillInfo();
    presupuesto = 0;
    ingresos = 0;
    egresos = 0;
    k = 0;
    l = 0;
    listadoIngresosArr = [];
    listadoEgresosArr = [];
    listadoIngresos.innerHTML = fillArrayIng();
    listadoEgresos.innerHTML = fillArrayEgr();
    fillInfo();
  }
}

if (localStorage.length != 0) {
  readLocalData();
}

fillInfo();
listadoIngresos.innerHTML = fillArrayIng();
listadoEgresos.innerHTML = fillArrayEgr();

formu.onsubmit = (e) => {
  e.preventDefault();

  fillInfo();
  listadoIngresos.innerHTML = fillArrayIng();
  listadoEgresos.innerHTML = fillArrayEgr();
  const selector = document.getElementById("selector-datos");
  const datosInput = document.getElementById("valor");
  const descripcionInput = document.getElementById("descripcion");

  if (selector.value == "ing") {
    ingresos += parseInt(datosInput.value);
    listadoIngresosArr.push({
      key: k,
      add: `<li class="elemento-listado">
                <span>${descripcionInput.value}</span>
                <span>${formatter.format(parseInt(datosInput.value))}</span>
                <button class="delete-btn" onclick="deleteIngresos(${k})" value="${k}">
                    X
                </button>
             </li>`,
      valor: datosInput.value,
    });
    k++;
  } else if (selector.value == "egr") {
    egresos += parseInt(datosInput.value);
    listadoEgresosArr.push({
      key: l,
      add: `<li class="elemento-listado">
                <span>${descripcionInput.value}</span>
                <span>${formatter.format(parseInt(datosInput.value))}</span>
                <button class="delete-btn" onclick="deleteEgresos(${l})" value="${l}">
                    X
                </button>
             </li>`,
      valor: datosInput.value,
    });
    l++;
  }
  fillInfo();
  selector.value = "def";
  datosInput.value = "";
  descripcionInput.value = "";

  listadoIngresos.innerHTML = fillArrayIng();
  listadoEgresos.innerHTML = fillArrayEgr();
  saveLocalData();
};

const deleteEgresos = (i) => {
  if (listadoEgresosArr.length == 1) {
    egresos -= listadoEgresosArr[0].valor;
    listadoEgresosArr.pop();
  } else {
    for (let j = 0; j < listadoEgresosArr.length; j++) {
      if (listadoEgresosArr[j].key == i) {
        i = j;
      }
    }
    egresos -= listadoEgresosArr[i].valor;
    listadoEgresosArr.splice(i, 1);
  }
  listadoEgresos.innerHTML = fillArrayEgr();
  fillInfo();
  saveLocalData();
};

const deleteIngresos = (i) => {
  if (listadoIngresosArr.length == 1) {
    ingresos -= listadoIngresosArr[0].valor;
    listadoIngresosArr.pop();
  } else {
    for (let j = 0; j < listadoIngresosArr.length; j++) {
      if (listadoIngresosArr[j].key == i) {
        i = j;
      }
    }
    ingresos -= listadoIngresosArr[i].valor;
    listadoIngresosArr.splice(i, 1);
  }

  listadoIngresos.innerHTML = fillArrayIng();
  fillInfo();
  saveLocalData();
};
