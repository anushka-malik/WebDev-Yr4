const sumOfTwo = ()=>{
    console.log("this is sum function");
}

const subOfTwo = ()=>{
    console.log("this is sub function");
}
const mulOfTwo = ()=>{
    console.log("this is mul function");
}
const isEven = (num) =>{
    if(num%2==0)
        console.log("even");
}


modules.export(sumOfTwo,subOfTwo,mulOfTwo,isEven)