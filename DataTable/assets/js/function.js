searchEmployee = (data, substring) => {
    const lowerCaseSubstring = substring.toLowerCase();
    return data.filter((employee) =>
        employee.name.toLowerCase().includes(lowerCaseSubstring)
    );
};

sortEmployeesBy = (data, parameter, isAsc) => {
    if (isAsc) {
        return data.sort((a, b) => {
            const valueA =
                typeof a[parameter] === "string"
                    ? parameter === "start_date"
                        ? new Date(a[parameter])
                        : a[parameter].toLowerCase()
                    : a[parameter];
            const valueB =
                typeof b[parameter] === "string"
                    ? parameter === "start_date"
                        ? new Date(b[parameter])
                        : b[parameter].toLowerCase()
                    : b[parameter];

            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
        });
    } else {
        return data.sort((a, b) => {
            const valueA =
                typeof a[parameter] === "string"
                    ? parameter === "start_date"
                        ? new Date(a[parameter])
                        : a[parameter].toLowerCase()
                    : a[parameter];
            const valueB =
                typeof b[parameter] === "string"
                    ? parameter === "start_date"
                        ? new Date(b[parameter])
                        : b[parameter].toLowerCase()
                    : b[parameter];

            if (valueA > valueB) return -1;
            if (valueA < valueB) return 1;
            return 0;
        });
    }
};

paginate = (data, page_number = 1, page_size = 10) => {
    --page_number;
    return data.slice(page_number * page_size, (page_number + 1) * page_size);
};
