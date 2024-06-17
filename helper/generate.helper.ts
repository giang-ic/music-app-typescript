// GENERATE RANDOM STRING 
export const randomString = (length: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(let index = 0 ; index < length ; index++){
        result += characters.charAt(
            Math.floor(
                Math.random() * characters.length
            )
        );
    }
    
    return result;
}