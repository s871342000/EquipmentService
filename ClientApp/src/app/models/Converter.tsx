export const ConvertDateToString = (dateTime?: Date) => {
    if (dateTime) {
        let _dateTime = new Date(dateTime);
        let date = ("0" + _dateTime.getDate()).slice(-2);
        let month = ("0" + (_dateTime.getMonth() + 1)).slice(-2);
        let year = _dateTime.getFullYear();
        return year + "-" + month + "-" + date;
    }
    else {
        return "";
    }
}