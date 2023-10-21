export const setupClassChangeObserver = (step, callback) => {
    const classChangeCallback = function(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const currentClasses = step.classList;
                if (!currentClasses.contains('hidden')) {
                    callback(step)
                }
            }
        }
    };

    const observer = new MutationObserver(classChangeCallback);

    observer.observe(step, { attributes: true, attributeFilter: ['class'] });
};


export default setupClassChangeObserver;