const log = (msg, id) => {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = '> ' + msg;
    document.getElementById(id).appendChild(msgDiv);
}

function runDemo1() {
    const str = "Annuity";
    const reverseStr = str.split("").reverse().join('');
    log('Using split method: ' + reverseStr, 'demo1');
}

function runDemo2() {
    const str = "Annuity";
    const reverseStr = Array.from(str).reverse().join('');
    log('Using Array.from method: ' + reverseStr, 'demo2');
}

function runDemo3() {
    const str = "Annuity";
    const reverseStr = [...str].reverse().join('');
    log('Using spread method: ' + reverseStr, 'demo3');
}

function runDemo4() {
    function generateRandomString(length) {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function generateRandomNumberBetween(min, max){
        return Math.floor(Math.random() * max) + min;
    }

    // data contains 100 random strings with lneght between 1 and 1000
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push(generateRandomString(generateRandomNumberBetween(1, 1000)));
    }
    let suite = new Benchmark.Suite;
    // add tests
    suite.add('Split#test', function() {
        for (const str of data) {
            str.split("");
        }
    })
    .add('Array.from#test', function() {
        for (const str of data) {
            Array.from(str);
        }
    })
    .add('Spread#test', function() {
        for (const str of data) {
            [...str]
        }
    })
    // add listeners
    .on('cycle', function(event) {
        log(String(event.target), 'demo4');
    })
    .on('complete', function() {
        log('Fastest is ' + 
            this.filter('fastest').map('name'), 'demo4');
    })
    // run async
    .run({ 'async': true });
}