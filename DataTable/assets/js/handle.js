const table = document.querySelector(".table__body");
const pagination = document.querySelector(".pagination");
const filtered = document.querySelector(".filtered");

// parameters
const search = document.querySelector("#search");
const pageSize = document.querySelector("#pageSize");
const sortList = document.querySelectorAll("#sort");

const showPageNumber = document.querySelector("#showPageNumber");
const showPageSize = document.querySelector("#showPageSize");
const showTotalRecords = document.querySelector("#showTotalRecords");

let currentEmployees = [...employees];
var totalPages = Math.ceil(currentEmployees.length / parseInt(pageSize.value));
var currentPage = 1;

renderData = (data) => {
    table.innerHTML = "";
    data.forEach((record) => {
        const row = document.createElement("tr");

        const keys = Object.keys(record);
        keys.forEach((key) => {
            const cell = document.createElement("td");
            cell.textContent = record[key];
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    showPageNumber.innerHTML =
        data.length === 0
            ? 0
            : parseInt(pageSize.value) * (currentPage - 1) + 1;
    showPageSize.innerHTML =
        parseInt(pageSize.value) * (currentPage - 1) + data.length;
    showTotalRecords.innerHTML = currentEmployees.length;
};

createPagination = (totalPages, page) => {
    if (currentPage > totalPages) {
        page = 1;
    }

    let item = "";
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;

    if (page > 1) {
        item += `<li class="btn prev" onclick="createPagination(totalPages, ${
            page - 1
        })"><span><i class="fas fa-angle-left"></i>Prev</span></li>`;
    }

    if (page > 2 && totalPages > 4) {
        item += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
        if (page > 3 && totalPages > 5) {
            item += `<li class="dots"><span>...</span></li>`;
        }
    }

    if (page == totalPages) {
        beforePage = beforePage - 2;
    } else if (page == totalPages - 1) {
        beforePage = beforePage - 1;
    }

    if (page == 1) {
        afterPage = afterPage + 2;
    } else if (page == 2) {
        afterPage = afterPage + 1;
    }

    for (var pageLength = beforePage; pageLength <= afterPage; pageLength++) {
        if (pageLength > totalPages || pageLength < 0) {
            continue;
        }
        if (pageLength == 0) {
            pageLength++;
        }
        if (page == pageLength) {
            active = "active";
        } else {
            active = "";
        }
        item += `<li class="numb ${active}" onclick="createPagination(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
    }

    if (page < totalPages - 1 && totalPages > 4) {
        if (page < totalPages - 2 && totalPages > 5) {
            item += `<li class="dots"><span>...</span></li>`;
        }
        item += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
    }

    if (page < totalPages) {
        item += `<li class="btn next" onclick="createPagination(totalPages, ${
            page + 1
        })"><span>Next<i class="fas fa-angle-right"></i></span></li>`;
    }

    pagination.innerHTML = item;
    currentPage = page;
    renderData(
        paginate(currentEmployees, currentPage, parseInt(pageSize.value))
    );

    currentEmployees.length === employees.length
        ? (filtered.innerHTML = "")
        : (filtered.innerHTML = `(filtered from ${employees.length} total entries)`);
};

createPagination(totalPages, currentPage);

// Listen events
search.addEventListener("input", (event) => {
    const input = event.target.value.trim().toLowerCase();
    currentEmployees = searchEmployee(employees, input);
    totalPages = Math.ceil(currentEmployees.length / parseInt(pageSize.value));
    createPagination(totalPages, currentPage);
});

sortList.forEach((sort) => {
    let isAsc = true;
    sort.addEventListener("click", () => {
        const sortAsc = sort.querySelector(".table__icon-down");
        const sortDesc = sort.querySelector(".table__icon-up");

        if (isAsc) {
            sortAsc.classList.add("active");
            sortDesc.classList.remove("active");
        } else {
            sortAsc.classList.remove("active");
            sortDesc.classList.add("active");
        }
        currentEmployees = sortEmployeesBy(
            currentEmployees,
            sort.getAttribute("name"),
            isAsc
        );
        isAsc = !isAsc;
        totalPages = Math.ceil(
            currentEmployees.length / parseInt(pageSize.value)
        );
        createPagination(totalPages, currentPage);
        sortList.forEach((item) => {
            if (item !== sort) {
                const itemSortAsc = item.querySelector(".table__icon-down");
                const itemSortDesc = item.querySelector(".table__icon-up");
                itemSortAsc.classList.remove("active");
                itemSortDesc.classList.remove("active");
            }
        });
    });
});

pageSize.addEventListener("change", (event) => {
    totalPages = Math.ceil(
        currentEmployees.length / parseInt(event.target.value)
    );
    createPagination(totalPages, currentPage);
});

