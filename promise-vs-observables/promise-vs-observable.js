let ACTIVE_DEMO_CONTAINER = '';

const log = (msg) => {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = '> ' + msg;
    const parent = document.getElementById(ACTIVE_DEMO_CONTAINER);
    parent.appendChild(msgDiv);
    parent.scrollTop = parent.scrollHeight;
}

const execute = (fn) => {
    const ctx = fn();
    ACTIVE_DEMO_CONTAINER = ctx.id;
    log(`===== Starting to Execute =====`);
    ctx.exec();
}

function runDemo1() {
    return {
        id: 'demo1',
        exec: () => {
            const greetingPoster = new Promise((resolve, reject) => {
                log('Inside Promise (proof of being eager)');
                resolve('Welcome! Nice to meet you.');
            });

            log('Before calling then on Promise');

            greetingPoster.then(res =>
                log(`Greeting from promise: ${res}`)
            );
        }
    }
}

function runDemo2() {
    return {
        id: 'demo2',
        exec: () => {
            const greetingLady$ = new rxjs.Observable(observer => {
                log('Inside Observable (proof of being lazy)');
                observer.next('Hello! I am glad to get to know you.');
            });

            log('Before calling subscribe on Observable');

            greetingLady$.subscribe({
                next: (msg) => {
                    log(msg)
                }
            });
        }
    }
}

function runDemo3() {
    return {
        id: 'demo3',
        exec: () => {
            const getTimePromise = new Promise((resolve, reject) => {
                interval = setInterval(() => {
                    log('Fetching Time');
                    resolve(new Date().toLocaleTimeString());
                }, 1000);

                setTimeout(() => {
                    log('Timer stopped');
                    clearInterval(interval)
                }, 5000);
            });

            getTimePromise.then(res =>
                log(`Time: ${res}`)
            );
        }
    }
}

function runDemo4() {
    return {
        id: 'demo4',
        exec: () => {
            const getTimeObservable = new rxjs.Observable(observer => {
                let interval = setInterval(() => {
                    log('Fetching Time');
                    observer.next(new Date().toLocaleTimeString());
                }, 1000);
                return () => {
                    clearInterval(interval);
                }
            });

            const subscription = getTimeObservable.subscribe(res =>
                log(`Time: ${res}`)
            );

            setTimeout(() => {
                subscription.unsubscribe();
                log('Timer stopped')
            }, 5000);
        }
    }
}

function runDemo5() {
    return {
        id: 'demo5',
        exec: () => {
            const asynchronousPromise = new Promise((resolve, reject) => {
                resolve('I am Asynchronous')
            });

            log(`This will be printed First`)

            asynchronousPromise.then(res => {
                log(`This will be printed Last`)
                log(res);
            });

            log(`This will be printed Second`)
        }
    }
}

function runDemo6() {
    return {
        id: 'demo6',
        exec: () => {
            const synchronousObservable = new rxjs.Observable(observer => {
                observer.next('I am Synchronous');
            });
            synchronousObservable.subscribe(res => {
                log(res);
            });
            log(`This will be printed Second`)

            log(`Asynchronous Demo`)
            const asynchronousObservable = new rxjs.Observable(observer => {
                observer.next('I am Asynchronous');
            });
            asynchronousObservable.subscribe(res => {
                setTimeout(() => {
                    log(res);
                }, 1);
            });
            log(`This will be printed before async subscription`)
        }
    }
}

function runDemo7() {
    return {
        id: 'demo7',
        exec: () => {
            const Observable = rxjs.Observable;
            const map = rxjs.operators.map;
            const timer = rxjs.timer;
            const takeUntil = rxjs.operators.takeUntil;

            const msgs = ['Hey There', 'Whatsup!', 'Long Time', 'BuhBye'];
            const interval$ = timer(0, 1000);
            const timer$ = timer(msgs.length * 1000);
            const notificationObs = new Observable(observer => {
                interval$.pipe(takeUntil(timer$)).subscribe(val => {
                    observer.next(msgs[val]);
                });
            })
            const enhancedObs = notificationObs.pipe(
                map(msg => `${msg} ${new Date().toLocaleTimeString()}`)
            );
            enhancedObs.subscribe(res => {
                log(res)
            })
        }
    }
}