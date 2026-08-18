synchronous and asynchonous
//console.log("task 3");
/*function hello()
{
    console.log("task 1");
}
hello();
console.log("task 2");*/

function hello(){
    console.log("task 1");
    setTimeout(function(){
        console.log("task 2");
    },2000)
}
hello();
console.log("task 3");

function display(){
    console.log("hello FSD");
}