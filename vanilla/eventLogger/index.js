import {eventLogger} from "./eventLogger";

// get all DOMs with class "square"
const cells = document.querySelectorAll(".square");

// add event listener to each cell
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        eventLogger.logEvent("click", {
            // get the background color of the cell and pass it as data to eventLogger
            color: getComputedStyle(cell).backgroundColor,
        });
    });
});
