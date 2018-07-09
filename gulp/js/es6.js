let json1={
    a:1,
    b:'ccc',
    c:[1,2,3]
};

let json2={
    ...json1,
    d:'hehe',
    e(){
        console.log(111)
    }
};

let str='这是文字1';

let str2=`这里组合了${str}`;

