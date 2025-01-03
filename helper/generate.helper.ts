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

// GENERATE RANDOM STRING NUMBER
export const randomStrNumber = (length: number): string => {
    let result = '';
    const characters = '0123456789';

    for(let index = 0 ; index < length ; index++){
        result += characters.charAt(
            Math.floor(
                Math.random() * characters.length
            )
        );
    }
    
    return result;
}