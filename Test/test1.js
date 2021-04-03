function getBinary(n){
    let i=0;
   let temp=n;
   let ans=0;
   while(n!=0){
       let rem=n%2;
       ans+=rem*Math.pow(10,i);
       console.log(ans);
       n/=2;
       i++;

   }
   
}

getBinary(12);