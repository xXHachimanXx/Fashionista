// Converter string em real
export function stringToReal(value) {
    return parseFloat(value.replace(/[^,0-9]/g, "").replace(',', '.'));
}

// Formatar preço
export function formatPriceToBRL(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}