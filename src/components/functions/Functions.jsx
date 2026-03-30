export function formatRate(x) {
// Rate formatting function
        const xValue = Math.round(x * 100) / 100;
        
            if (xValue % 1 !== 0) {
                if (
                    xValue % 1 === 0.1 ||
                    xValue % 1 === 0.2 ||
                    xValue % 1 === 0.3 ||
                    xValue % 1 === 0.4 ||
                    xValue % 1 === 0.5 ||
                    xValue % 1 === 0.6 ||
                    xValue % 1 === 0.7 ||
                    xValue % 1 === 0.8 ||
                    xValue % 1 === 0.9
                ) {
                return `${xValue.toLocaleString("en-US")}0`;
                } else {
                   return xValue.toLocaleString("en-US");
                }
            } else {
                return `${xValue.toLocaleString("en-US")}.00`;
            }
}

export function uniqueYear(arr) {
    const newArray = Array.from(
        new Map(arr.map((mpo) => [mpo.year, mpo])).values()
    );

  return newArray;
}

export function uniqueAgencies(arr) {
    const newArray = Array.from(
        new Map(arr.map((mpo) => [mpo.agency, mpo])).values()
    );

    return newArray;
}

export function uniqueMonths(arr) {    
    const newArray = Array.from(
        new Map(arr.map((mpo) => [mpo.month, mpo])).values()
    );

    return newArray;
} 