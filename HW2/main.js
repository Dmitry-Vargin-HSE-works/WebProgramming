let main_div = null;
let table = null;
let tableArr = [[], [], []];
let lastPin = "0" // 0 X

function createTable() {
    table = document.createElement("table")
    table.id = "main_table";

    for (let i = 0; i < 3; ++i) {
        let row = document.createElement("tr");
        row.className = "table_row"
        for (let j = 0; j < 3; ++j) {
            let cell = document.createElement("td");
            tableArr[i][j] = cell

            cell.className = "table_cell";
            cell.i_c = i; cell.j_c = j;
            cell.value = null;
            cell.addEventListener("click", markCell);

            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    main_div.appendChild(table);
    console.log(main_div.innerHTML);
}

function markCell(event) {
    const i_c = event.target.i_c;
    const j_c = event.target.j_c;
    console.log(i_c, j_c);

    tableArr[i_c][j_c].value = lastPin = lastPin === "0"? "X" : "0";
    tableArr[i_c][j_c].replaceChildren((() => {
        let span = document.createElement("span");
        span.innerText = lastPin
        span.style.fontSize = "100%";
        return span;
    })())
    tableArr[i_c][j_c].removeEventListener("click", markCell);
    if (checkWin()) {
        alert("Win");
        clearTable();
        createTable();
    }
}

function checkWin() {
    // Check by lines
    if (
        tableArr[0][0].value != null && tableArr[0][0].value === tableArr[0][1].value && tableArr[0][1].value === tableArr[0][2].value ||
        tableArr[1][0].value != null && tableArr[1][0].value === tableArr[1][1].value && tableArr[1][1].value === tableArr[1][2].value ||
        tableArr[2][0].value != null && tableArr[2][0].value === tableArr[2][1].value && tableArr[2][1].value === tableArr[2][2].value
    ) {
        return true;
    // Check by columns
    } else if (
        tableArr[0][0].value != null && tableArr[0][0].value === tableArr[1][0].value && tableArr[1][0].value === tableArr[2][0].value ||
        tableArr[0][1].value != null && tableArr[0][1].value === tableArr[1][1].value && tableArr[1][1].value === tableArr[2][1].value ||
        tableArr[0][2].value != null && tableArr[0][2].value === tableArr[1][2].value && tableArr[1][2].value === tableArr[2][2].value
    ) {
        return true;
    // Check by diagonals
    } else if (
        tableArr[0][0].value != null && tableArr[0][0].value === tableArr[1][1].value && tableArr[1][1].value === tableArr[2][2].value ||
        tableArr[0][2].value != null && tableArr[0][2].value === tableArr[1][1].value && tableArr[1][1].value === tableArr[2][0].value
    ) {
        return true;
    } else {
        return false
    }
}

function clearTable() {
    while (table.firstChild) {
        while (table.firstChild.firstChild) {
            table.firstChild.removeChild(table.firstChild.firstChild);
        }
        table.removeChild(table.firstChild);
    }
    table.remove();
}

window.onload = function () {
    main_div = document.getElementById("main_div");

    createTable();
}