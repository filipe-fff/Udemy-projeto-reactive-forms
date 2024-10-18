export const convertStringToDate = (date: string): Date => {

    const [day, month, year] = date.split("/").map(Number);

    if (day && month && year) return new Date(year, month + 1, day);

    return new Date;
}