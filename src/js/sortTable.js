// /**
//  * Sorts a HTML table.
//  *
//  * @param {HTMLTableElement} table The table to sort
//  * @param {number} column The index of the column to sort
//  * @param {boolean} asc Determines if the sorting will be in ascending
//  */

// function sortTableByColumn(table, column, asc = true) {
// 	const dirModifier = asc ? 1 : -1;
// 	const tBody = table.tBodies[0];
// 	const rows = Array.from(tBody.querySelectorAll("tr"));

// 	// Sort each row
// 	const sortedRows = rows.sort((a, b) => {
// 		const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
// 		const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
// 		return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
// 	});

// 	// Remove all existing TRs from the table
// 	while (tBody.firstChild) {
// 		tBody.removeChild(tBody.firstChild);
// 	}

// 	// Re-add the newly sorted rows
// 	tBody.append(...sortedRows);

// 	// Remember how the column is currently sorted
// 	table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
// 	table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
// 	table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
// }

// document.querySelectorAll(".table-sortable th").forEach((headerCell, index) => {
// 	headerCell.addEventListener("click", () => {
// 		const tableElement = headerCell.closest("#academyTable");
// 		const headerIndex = index;
// 		const currentIsAscending = headerCell.classList.contains("th-sort-asc");

// 		sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
// 	});
// });


function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("academyTable");
	switching = true;
	//Set the sorting direction to ascending:
	dir = "asc";
	/*Make a loop that will continue until
	no switching has been done:*/
	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/*Loop through all table rows (except the
		first, which contains table headers):*/
		for (i = 1; i < (rows.length - 1); i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare,
			one from current row and one from the next:*/
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			/*check if the two rows should switch place,
			based on the direction, asc or desc:*/
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
			and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			//Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/*If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again.*/
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

function sortTableByNumber() {
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("academyTable");
	switching = true;
	/*Make a loop that will continue until
	no switching has been done:*/
	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/*Loop through all table rows (except the
		first, which contains table headers):*/
		for (i = 1; i < (rows.length - 1); i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare,
			one from current row and one from the next:*/
			x = rows[i].getElementsByTagName("TD")[0];
			y = rows[i + 1].getElementsByTagName("TD")[0];
			//check if the two rows should switch place:
			if (Number(x.innerHTML) > Number(y.innerHTML)) {
				//if so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
			and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}