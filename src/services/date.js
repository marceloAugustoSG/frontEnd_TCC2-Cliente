
export default function formatDate(data) {
    const options = {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    const dataObj = new Date(data);
    const dataFormatada = dataObj.toLocaleString('pt-BR', options);
    return dataFormatada;
}