import PatternLock from '@phenax/pattern-lock-js';

export const newLock = (selector: string) => {
    const lock = PatternLock({
        $canvas: document.querySelector(selector),
        width: 300,
        height: 430,
        grid: [ 3, 3 ],
    });
    lock.onComplete(({ hash }) => console.log(hash));
}

