import Navigo from "navigo";
const router = new Navigo("/", { linksSelector: "a", hash: true });

let effects = [];
let currentEffectOrder = 0;

let rootComponent = null;
let rootContainer = null;

let states = [];
let currentStateOrder = 0;

const debounce = (fn, timeout = 100) => {
    let timeId = null;

    return (...rest) => {
        if (timeId) clearTimeout(timeId);

        timeId = setTimeout(() => fn(...rest), timeout);
    };
};

const render = (component, container) => {
    container.innerHTML = component();

    rootComponent = component;
    rootContainer = container;

    effects.forEach((effect) => {
        effect.cb();
    });
};

const rerender = debounce(() => {
    currentStateOrder = 0;
    currentEffectOrder = 0;
    rootContainer.innerHTML = rootComponent();

    effects.forEach((effect) => {
        // shouldRunEffect = true khi không truyền deps hoặc deps khác nhau
        const shouldRunEffect =
            !effect.nextDeps ||
            effect.nextDeps?.some((dep, i) => {
                return dep !== effect?.prevDeps?.[i];
            });

        if (shouldRunEffect) {
            effect.cb();
        }
    });
});

const useState = (initialState) => {
    let state;
    let stateOrder = currentStateOrder;

    if (states[stateOrder] !== undefined) {
        state = states[stateOrder];
    } else {
        state = states[stateOrder] = initialState;
    }

    const updater = (newState) => {
        if (newState === undefined) {
            throw new Error("New state must not be undefined");
        }

        states[stateOrder] =
            typeof newState === "function" ? newState(states[stateOrder]) : newState;

        rerender();
    };

    currentStateOrder++;

    return [state, updater];
};

const useEffect = (cb, deps) => {
    let effectOrder = currentEffectOrder;

    if (!effects[effectOrder]) {
        effects.push({
            cb: cb,
            prevDeps: null,
            nextDeps: deps,
        });
    } else {
        effects[effectOrder] = {
            cb: cb,
            prevDeps: effects[effectOrder].nextDeps,
            nextDeps: deps,
        };
    }

    currentEffectOrder++;
};

router.on("/*", () => {}, {
    before(done, match) {
        states = [];
        currentStateOrder = 0;
        effects = [];
        currentEffectOrder = 0;

        done();
    },
});

// validation
const required = (value, errorId) => {
    const errorEl = document.getElementById(errorId)
    if(value.length === 0) {
        errorEl.innerText = '*Trường này bắt buộc nhập!';
        return false;
    }
    else {
        errorEl.innerText = '';
        return true;
    }
}

const valiFiles = (files, errorId) => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/webp', 'image/jpeg'];
    const maxSize = 1 * 1024 * 1024;
    const errorFile = document.getElementById(errorId);

    if(files.length !== 0 && files.length <= 5) {
        for(let i = 0; i < files.length; i++) {
            const file = files[0];
            if(!allowedTypes.includes(file.type)) {
                errorFile.innerText = 'File Phải có định dạng (png, jpg, jpeg, webp)'
                return false;
            }
            else if (file.size > maxSize) {
                errorFile.innerText = 'File tối đa 1MB'
                return false;
            }
            else {
                errorFile.innerText = "";
                return true;
            }
        }
    }
    else if(files.length > 5) {
        errorFile.innerText = 'Tối đa 5 file!'
        return false
    }
    else {
        errorFile.innerText = 'Vui lòng chọn file!'
        return false
    }
}

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}
const hiddenSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}

export { render, useState, useEffect, router, required, valiFiles, showSpinner, hiddenSpinner};