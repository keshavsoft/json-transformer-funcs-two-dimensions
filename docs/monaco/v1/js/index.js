import initMonaco from "./monacoEditor/index.js";
import initBindings from "./bindings/index.js";

const startFunc = async () => {
    try {
        await initMonaco();
        initBindings();
    } catch (error) {
        console.error("Monaco playground initialization failed:", error);
        const stage = document.getElementById("renderOutput");
        if (stage) stage.textContent = error.message;
    }
};

startFunc();
