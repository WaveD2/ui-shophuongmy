export function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
export function formatPriceVND(value) {
    let stringValue = value.toString();

    let formattedValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return formattedValue + 'đ';
}

export function calculateDiscountedPrice({ price, discount }) {
    if (price < 0 || discount < 0 || discount > 100) {
        throw new Error("Giá trị đầu vào không hợp lệ");
    }

    const discountAmount = (price * discount) / 100;

    const discountedPrice = price - discountAmount;
    return formatPriceVND(discountedPrice);
}
