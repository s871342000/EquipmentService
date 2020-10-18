import { TargetUrl } from "../models/DirectUrl";

export const doPost = () => {
    fetch(TargetUrl("Default", "DeviceDetail"), {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ Uid: "", Pwd: "" })
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }).then((result) => {

    }).catch((error) => {
        console.error(error);
    });

    return;
}