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
    let suite = new Benchmark.Suite;

    // add tests
    suite.add('Split#test', function() {
        "Annuity".split("");
    })
    .add('Array.from#test', function() {
        Array.from("Annuity");
    })
    .add('Spread#test', function() {
        [...'Annuity'];
    })
    // add listeners
    .on('cycle', function(event) {
        log(String(event.target), 'demo4');
    })
    .on('complete', function() {
        log('Fastest is ' + this.filter('fastest').map('name'), 'demo4');
    })
    // run async
    .run({ 'async': true });
}