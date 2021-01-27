const log = (msg, id) => {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = '> ' + msg;
    document.getElementById(id).appendChild(msgDiv);
}

function runDemo1() {
    const greetingPoster = new Promise((resolve, reject) => {
        log('Inside Promise (proof of being eager)', 'demo1');
        resolve('Welcome! Nice to meet you.');
    });
    
    log('Before calling then on Promise', 'demo1');
    
    greetingPoster.then(res => 
        log(`Greeting from promise: ${res}`, 'demo1')
    );
}

function runDemo2() {
    const greetingLady$ = new rxjs.Observable(observer => {
        log('Inside Observable (proof of being lazy)', 'demo2');
        observer.next('Hello! I am glad to get to know you.');
    });
    
    log('Before calling subscribe on Observable', 'demo2');
    
    greetingLady$.subscribe({
        next: (msg) => {
            log(msg, 'demo2')
        }
    });
}

function runDemo3() {
    log('Executing....', 'demo3');
    const getTimePromise = new Promise((resolve, reject) => {
        interval = setInterval(() => {
            log('Fetching Time', 'demo3');
            resolve(new Date().toLocaleTimeString());
        }, 1000);

        setTimeout(() => {
            log ('Timer stopped', 'demo3');
            clearInterval(interval)
        }, 5000);
    });
    
    getTimePromise.then(res => 
        log(`Time: ${res}`, 'demo3')
    );
}

function runDemo4() {
    log('Executing....', 'demo4');
    const getTimeObservable = new rxjs.Observable(observer => {
        let interval = setInterval(() => {
            log('Fetching Time', 'demo4');
            observer.next(new Date().toLocaleTimeString());
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    });
    
    const subscription = getTimeObservable.subscribe(res => 
        log(`Time: ${res}`, 'demo4')
    );

    setTimeout(() => {
        subscription.unsubscribe();
        log ('Timer stopped', 'demo4')
    }, 5000);
}

function runDemo5() {
    const asynchronousPromise = new Promise((resolve, reject) => {
        resolve ('I am Asynchronous')
    });

    log(`This will be printed First`, 'demo5')
    
    asynchronousPromise.then(res => {
        log(`This will be printed Last`, 'demo5')
        log (res, 'demo5');
    });

    log(`This will be printed Second`, 'demo5')
}

function runDemo6() {
    log(`Synchronous Demo`, 'demo6')
    const synchronousObservable = new rxjs.Observable(observer => {
        observer.next('I am Synchronous');
    });
    synchronousObservable.subscribe(res => {
        log (res, 'demo6');
    });
    log(`This will be printed Second`, 'demo6')

    log(`Asynchronous Demo`, 'demo6')
    const asynchronousObservable = new rxjs.Observable(observer => {
        observer.next('I am Asynchronous');
    });
    asynchronousObservable.subscribe(res => {
        setTimeout(() => {
            log (res, 'demo6');
        }, 1);
    });
    log(`This will be printed before async subscription`, 'demo6')
}

function runDemo7() {
    const Observable = rxjs.Observable;
    const map = rxjs.operators.map;
    const timer = rxjs.timer;
    const takeUntil = rxjs.operators.takeUntil;

    const msgs = ['Hey There', 'Whatsup!', 'Long Time', 'BuhBye'];
    const interval$ = timer(0, 1000);
    const timer$ = timer(msgs.length*1000);
    const notificationObs = new Observable(observer => {
        interval$.pipe(takeUntil(timer$)).subscribe(val => {
            observer.next(msgs[val]);
        });
    })
    const enhancedObs = notificationObs.pipe(
        map(msg => `${msg} ${new Date().toLocaleTimeString()}`)
    );
    enhancedObs.subscribe(res => {
        log(res, 'demo7')
    })
}