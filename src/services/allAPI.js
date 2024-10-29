import commonAPI from "./commonAPI"
import SERVER_URL from "./serverURL"

//addNotesAPI called by home component
export const addNotesAPI =async (notes)=>{
    return await commonAPI("POST",`${SERVER_URL}/notes` ,notes)
}

//getNotesAPi called by home component
export const getNotesAPi =async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/notes` ,{})
}

//deleteNotesAPI called by component
export const deleteNotesAPI =async (id)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/notes/${id}` ,{})
}
//editNotesAPI called by home component
export const editNotesAPI =async (id,notes)=>{
    return await commonAPI("PUT",`${SERVER_URL}/notes/${id}` ,notes)
}


// Save completed task to TaskCompleted
export const saveCompletedTaskAPI = async (notes) => {
    return await commonAPI("POST", `${SERVER_URL}/TaskCompleted`, notes);
};

// Get completed tasks for History component
export const getCompletedTasksAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/TaskCompleted`, {});
};

//deleteTaskAPI called by History component
export const deleteTaskAPI =async (id)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/TaskCompleted/${id} `,{})
}

//getTaskAPI called by Home component
export const getTaskAPI =async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/TaskCompleted/${id}` ,{})
}





