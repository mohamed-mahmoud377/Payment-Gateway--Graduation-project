export const otpGenerator= ()=>{
   while (true){
      const  randomNumber=  Math.ceil(Math.random() *100000);
      const randomNumberString = String(randomNumber);
      if (randomNumberString.length===5){
         return randomNumber;
      }
   }
}