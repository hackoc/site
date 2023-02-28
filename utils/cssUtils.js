export const styles = {
    noselect: {
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none'
    },

    nodrag: {
        userDrag: 'none',
        MozUserDrag: 'none',
        WebkitUserDrag: 'none',
        msUserDrag: 'none'
    }
};

export const noselect = styles.noselect;
export const nodrag = styles.nodrag;

export function with$ (...args) {
    let last = args[args.length - 1];

    for (let i = 0; i < args.length - 1; i++) {
        const arg = args[i];
        if (typeof arg === 'string') {
            last = {
                ...last,
                ...styles[arg]
            };
        } else {
            last = {
                ...last,
                ...arg
            };
        }
    }

    return last;
}

export function withNoselect (styles) {
    return with$('noselect', styles);
}

export function withNodrag (styles) {
    return with$('nodrag', styles);
}

export default with$;