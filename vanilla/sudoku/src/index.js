class Finder {
    constructor() {}

    find = (color) => {
        return Array.from(document.querySelectorAll(".square")).find(
            (cell) => window.getComputedStyle(cell).backgroundColor === color
        );
    };

    setColor = (ele, newColor) => {
        if (!ele || !newColor) return;
        ele.style.backgroundColor = newColor;
    };

    shiftDown = (ele) => {
        if (!ele) return;
        const parentNode = ele.parentNode;
        const sibling = ele.nextElementSibling;
        const nextSibling = ele.nextElementSibling?.nextElementSibling;
        if (!sibling) {
            //debugger;
            parentNode.insertBefore(ele, parentNode.firstChild);
        } else if (!nextSibling) {
            parentNode.append(ele);
        } else {
            parentNode.insertBefore(ele, nextSibling);
        }
    };

    printout = () => {
        Array.from(document.querySelectorAll(".square")).forEach((square) => {
            square.addEventListener("click", () => {
                console.log(window.getComputedStyle(square).backgroundColor);
            });
        });
    };

    shiftDownClicking = () => {
        Array.from(document.querySelectorAll(".square")).forEach((square) => {
            square.addEventListener("click", () => {
                this.shiftDown(square);
            });
        });
    };
}

const finder = new Finder();
finder.printout();
const target = finder.find("rgb(179, 145, 11)");
finder.setColor(target, "#000000");
finder.shiftDown(target);
finder.shiftDownClicking();
