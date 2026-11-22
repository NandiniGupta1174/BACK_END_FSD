//event loop concept
//create one log synchronous task
//call back function f1 and f2

console.log("synchronous task");
const f1=()=>{
console.log("f1");
}
const f2=()=>{
console.log("f2");
}

function main(){
    console.log("this event loop");
    setTimeout(f1,50);
    setTimeout(f2,50);

    new Promise((resolve,reject)=>{
     resolve("I am promise");
    }).then((result)=>{
       console.log(result);
    })
    new Promise((resolve,reject)=>{
     resolve("This is promise2");
    }).then((res)=>{
       console.log(res);
    })
    
}
main();
//sequence
/*synchronous
web api like promise and setTimeout
call back function*/
