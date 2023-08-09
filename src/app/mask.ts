import { MaskitoOptions } from "@maskito/core";

const MaskitoOptions: MaskitoOptions = {
    mask: /^\d{0,3}$/,
    plugins: [
        (element) => {
            const listener = (): void => {
                const value = element.value;

                element.addEventListener(
                    'beforinput',
                    (event) => {
                        if (event.defaultPrevented && value == element.value) {
                            element.dispatchEvent(
                                new CustomEvent('maskitoReject', { bubbles: true })
                            );
                        }
                    },
                    { once: true }
                );
            };

            element.addEventListener('beforeinput', listener, true);
            return () => element.removeEventListener('beforeinput', listener, true);
        },
    ],
};
export default MaskitoOptions;