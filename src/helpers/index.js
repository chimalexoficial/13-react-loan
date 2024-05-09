const formatMoney = (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return formatter.format(value);
}

const totalToPay = (quantity, term) => {
    let total;

    // while greater money to loan, less interest
    if (quantity < 5000) {
        total = quantity * 1.5; // 50% interest
    } else if (quantity >= 5000 && quantity < 1000) {
        total = quantity * 1.4;
    } else if (quantity >= 10000 && quantity < 15000) {
        total = quantity * 1.3;
    } else { //15000 -> 20000
        total = quantity * 1.2;
    }

    // more time, more interest
    if(term === 6) {
        total *= 1.1;
    } else if (term === 12) {
        total *= 1.2;
    } else { // 24
        total *= 1.3;
    }
    return total;
}

const monthlyPayment = (total, term) => {
    const totalTerm = total/term;
    return totalTerm;
}

export {
    formatMoney,
    totalToPay,
    monthlyPayment
}