const deviceDetail = ({
    customer: "",
    sn: "",
    model: "",
    version: "",
    purchaseDate: "",
    warrantyStart: "",
    warrantyEnd: "",
    leaseStart: "",
    leaseEnd: "",
    maintenanceStart: "",
    maintenanceEnd: "",
    maintenance: [{ date: Date, items: [] }],
    repair: [{ date: Date, comment: "" }],
    revision: [{ date: Date, version: "" }],
});

const reducer = (state = deviceDetail) => {
    return state;
}

export default reducer;