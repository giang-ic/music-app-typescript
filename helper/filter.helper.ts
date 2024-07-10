import { filterStatusInterface } from "../config/interface";

export const status = (query: any): filterStatusInterface [] => {
    const filterStatusArray: filterStatusInterface[] = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]; // nếu đặt mảng này ở ngoài khi bấm lại nút nó sẽ bị dính class active

    const status: string = query.status || "";
    const index: number = filterStatusArray.findIndex(button => {
        return button.status === status;
    });
    
    filterStatusArray[index]["class"] = "active";
    return filterStatusArray;
}