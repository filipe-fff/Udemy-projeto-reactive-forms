export const convertDateToString = (date: Date): string => {

    const day = formatToNumber(date.getDate());
    const month = formatToNumber(date.getMonth()+1);
    const year = date.getFullYear();

    const dateString = `${day}/${month}/${year}`;
    
    return dateString;
}

const formatToNumber = (number: number): string => {
    return number > 10? number.toString() : 0+number.toString();
}