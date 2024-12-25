export const getObjectById = (id, data) => {
    
    return data?.find(e => e.id ===  id) ;
}