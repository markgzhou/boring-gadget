const ledTime = (function () {
    // will display time in hh:mm:ss format
    // need 6 block of led numbers and 2 for :
    // every block is 5*7 cell

    const wrapper = document.getElementsByClassName("led")[0];
    const blocks = [];

    const block = document.createElement("div");
    block.classList.add("block");

    const cell = document.createElement("div");
    cell.classList.add("cell");

    for (let i = 0; i < 5 * 7; i++) {
        const _cell = cell.cloneNode();
        block.appendChild(_cell);
    }
    // generic block element created
    // clone and append to wrapper

    for (let i = 0; i < 15; i++) {
        const _block = block.cloneNode(true);
        _block.classList.add("block-" + i);

        wrapper.appendChild(_block);
        blocks[i] = {
            'element': _block,
            'value': null
        };
    }

    blocks[3].element.classList.add("dot");
    blocks[3].value = "dot";
    blocks[7].element.classList.add("dot");
    blocks[7].value = "dot";
    blocks[11].element.classList.add("dot");
    blocks[11].value = "dot";

    parts = getIPAddress().split(".");
    values = getValues(parts);
    refreshValues(values, blocks);

    var timer_interval = 100
    var set1 = setInterval(fn, timer_interval);

    function fn() {
        clearInterval(set1);
        if (timer_interval >= 1000) {
            set1 = setInterval(fn, timer_interval);
            timer_interval = 100;
        } else if (timer_interval > 80) {
            set1 = setInterval(fn, timer_interval);
            values = getValues(
                [
                    Math.floor(Math.random() * 1000),
                    Math.floor(Math.random() * 1000),
                    Math.floor(Math.random() * 1000),
                    Math.floor(Math.random() * 1000)
                ]
            )
            timer_interval -= 1;
        } else {
            timer_interval = 2000;
            values = getValues(getIPAddress().split("."));
            set1 = setInterval(fn, timer_interval);
        }
        refreshValues(values, blocks);
    }


})();

function getIPAddress() {
    return document.getElementById("ip").textContent;
};

function getValues(parts) {
    const values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < parts.length; i++) {
        values[0 + i * 4] = Math.floor(parts[i] / 100);
        values[1 + i * 4] = Math.floor(parts[i] / 10) % 10;
        values[2 + i * 4] = parts[i] % 10;
    }
    return values;
}

function refreshValues(values, blocks) {
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (i !== 3 && i !== 7 && i !== 11 && blocks[i].value !== value) {
            blocks[i].element.classList.remove("number-" + blocks[i].value);
            blocks[i].element.classList.add("number-" + value);
            blocks[i].value = value;
        }
    }
};