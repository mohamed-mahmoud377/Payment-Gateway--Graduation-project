const randomNumberGenerator= ()=>{
    // I am doing this because it sometimes returns only 11 number which is not what we want
    while (true){
        const  randomNumber=  Math.ceil(Math.random() *1000000000000);
        const randomNumberString = String(randomNumber);
        if (randomNumberString.length===12){
            return randomNumber;
        }
        }


}

export const generateToken = (lastFourDigit:string)=>{
       return  String(randomNumberGenerator() +lastFourDigit);

}