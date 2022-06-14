export const otpGenerator= ()=>{
   return Math.floor(Math.random() *100000)

   while (true){
      const  randomNumber=  Math.ceil(Math.random() *100000);
      const randomNumberString = String(randomNumber);
      if (randomNumberString.length===5){
         return randomNumber;
      }
   }
}