class Finder {
    constructor() {}

    // Find the specific element with given color
    find(color) {
        // query all elements with class .square
        const squares = document.querySelectorAll(".square");
        //filtered out the one with specific bg color
        let targets = [];
        for (let square of squares) {
            if (window.getComputedStyle(square).backgroundColor === color) {
                targets.push(square);
            }
        }
        // return the filtered result
        return targets;
    }

    // Change the background color of the given element
    setColor(ele, newColor) {
        ele.style.backgroundColor = newColor;
        //debugger;
    }

    // shiftdown
    shiftDown(ele) {
        const parent = ele.parentNode;
        const nextSilibing = ele.nextElementSibling;
        //ele.remove();
        //debugger;
        if (!nextSilibing) {
            parent.insertBefore(ele, parent.firstChild);
        } else if (!nextSilibing.nextSilibing) {
            parent.appendChild(ele);
        } else {
            parent.insertBefore(ele, nextSilibing.nextSilibing);
        }
    }
}

// printout the cell clicksed
const printoutClickCell = () => {
    const cells = document.querySelectorAll(".square");
    cells.forEach((cell) =>
        cell.addEventListener("click", () => {
            console.log(
                "clicked: ",
                window.getComputedStyle(cell).backgroundColor
            );
        })
    );
};

printoutClickCell();

// test: turn the red color to black and then shiftdown
const finder = new Finder();
const redSqure = finder.find("rgb(255, 80, 0)")[0];
finder.setColor(redSqure, "#000000");
finder.shiftDown(redSqure);
