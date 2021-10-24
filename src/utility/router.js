import {writable} from 'svelte/store';

const handler = f => function() {
    let result = f.apply(this, arguments);
    let e = new Event('popstate');

    e.state = arguments[0];
    window.dispatchEvent(e);

    return result;
};
const router = writable(window.location.pathname);

history.pushState = handler(history.pushState);
history.replaceState = handler(history.replaceState);

window.addEventListener('popstate', event => {
    window.dispatchEvent(new CustomEvent('locationchange', {
        detail: {
            state: event.state
        }
    }));
});

export {router};
