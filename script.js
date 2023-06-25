function func(x, y, z) {
    // console.log(arguments);
    // console.log(45);
    console.log(x + y);
}

const obj = {
    x: 45,
    y: 45,
    // func: func,
}

// let x = func.bind(obj, 45, 45, 60, 45)obj.func()
// x();

// obj.func()

function myCall(obj) {
    let parentFunct = this;
    obj.parentFunct = parentFunct
    obj.parentFunct();
}

function myBind() {

    let parentFunct = this;
    arguments[0].parentFunct = parentFunct
    // delete arguments[0]
    // let argsArr = [];
    // for (let key in arguments) {
        //     argsArr.push(arguments[key])
        // }
        
        let argsArr = Array.from(arguments[1]);
    // console.log(arguments[1]);
    return function boundedFunc() {
        obj.parentFunct(...argsArr);
    }
}

Function.prototype.myCall = myCall;
Function.prototype.myBind = myBind;

// func.myCall(obj);
const bd = func.myBind(obj, [1, 2, 4]);
bd();