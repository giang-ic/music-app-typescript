// Submit form change permissions
const buttonSubmitPermissions = document.querySelector("[button-submit-permissions]");
const formChangePermissions = document.querySelector("[form-change-permissions]");
const tablePermissions = document.querySelector("[table-permissions]");

if(buttonSubmitPermissions && formChangePermissions && tablePermissions){
    buttonSubmitPermissions.addEventListener("click", (event) => {
        // array contain permissions
        const permissions = [];

        // get row contain [data-name]
        const rows = tablePermissions.querySelectorAll("[data-name]");
        
        rows.forEach(row => {
            // get column contain value 
            const columns = row.querySelectorAll("input");
            
            const name = row.getAttribute("data-name");

            columns.forEach((column, index) => {
                if(name === "id"){
                    const id = column.value;
                    permissions.push({
                        id: id,
                        permissions: []
                    });
                }
                else{
                    if(column.checked){
                        permissions[index].permissions.push(name);
                    }
                }
            });
        });

        if(permissions.length > 0){
            const inputSubmitPermissions = formChangePermissions.querySelector("input");
            const permissionsJSON = JSON.stringify(permissions); // convert JS to JSON
            inputSubmitPermissions.value = permissionsJSON;

            formChangePermissions.submit(); //submit form
        }
    });
}
// End Submit form change permissions

// Preview checked permissions
const dataRolesElement = document.querySelector("[data-roles]");
if(dataRolesElement){
    const dataRolesJSON = dataRolesElement.getAttribute("data-roles");
    const dataRolesJS = JSON.parse(dataRolesJSON); // convert JSON to JS
    
    // [Xác định hàng của quyền] => [Checked Cột]
    dataRolesJS.forEach((item, index) => {
        const permissionsArray = item.permissions;
        permissionsArray.forEach(permission => {
            const elementContainNamePermissions = tablePermissions.querySelector(`[data-name="${permission}"]`);
            
            const elementCheckedPermissions = elementContainNamePermissions.querySelectorAll("input")[index];

            elementCheckedPermissions.checked = true;
        });
    });
}
// End Preview checked permissions