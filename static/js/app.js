
// from data.js
var tableData = data;

const properties = ["City", "State", "Country", "Shape"];

// Select the submit button
var submit = d3.select("#filter-btn");


// Function to empty the table
function emptyTable() {
	d3.select("#ufo-table > tbody").selectAll('tr').remove();
};


// Function to load data into the table
function loadTable(data) {
	data.forEach((ufo) => {
		var tbody = d3.select("#ufo-table > tbody");
		var row = tbody.append("tr");

		Object.entries(ufo).forEach(([key, value]) => {
			row.append("td").text(value);
			// row.append("td").text(value).attr("id", key);
		});
	});
};


// Find unique Cities, States, Countries, Shapes
// var selectCity = d3.select("#city");
var cities = [];
var states = [];
var countries = [];
var shapes = [];

tableData.forEach(ufo => {
	cities.push(ufo.city);
	states.push(ufo.state);
	countries.push(ufo.country);
	shapes.push(ufo.shape);
});

// get unique values and sort for cities, states, countries, shapes
cities = [...new Set(cities)];
cities.sort().unshift("");

states = [...new Set(states)];
states.sort().unshift("");

countries = [...new Set(countries)];
countries.sort().unshift("");

shapes = [...new Set(shapes)];
shapes.sort().unshift("");


// Create the dropdowns for cities, states, countries, shapes
properties.forEach((p) => {

	switch (p) {
		case "City":
			var select = d3.select("#city");
			cities.forEach(city => {
				select.append("option").text(city).attr("id", city);
			});
			break;
		case "State":
			var select = d3.select("#state");
			states.forEach(state => {
				select.append("option").text(state.toUpperCase()).attr("id", state);
			});
			break;
		case "Country":
			var select = d3.select("#country");
			countries.forEach(country => {
				select.append("option").text(country.toUpperCase()).attr("id", country);
			});
			break;
		case "Shape":
			var select = d3.select("#shape");
			shapes.forEach(shape => {
				select.append("option").text(shape).attr("id", shape);
			});
			break;
		default:
			console.log("Sorry");
	};
});


// Initial data loading
loadTable(tableData);


// Button click handler 
submit.on("click", function() {

	var filteredData = [];

	// Prevent the page from refreshing
	d3.event.preventDefault();

	// Get the input date, city, state, country, shape
	const inputDate = d3.select("#datetime").property("value");
	const inputCity = d3.select('#city option:checked').text();
	const inputState = d3.select('#state option:checked').text().toLowerCase();
	const inputCountry = d3.select('#country option:checked').text().toLowerCase();
	const inputShape = d3.select('#shape option:checked').text();

	emptyTable();

	// Get the data filtered by date
	if (inputDate) {
		filteredData = tableData.filter(u => u.datetime === inputDate);
	} else {
		filteredData = tableData;
	};

	// Get the data filtered by city
	if (inputCity) {
		filteredData = filteredData.filter(u => u.city === inputCity);
	};

	// Get the data filtered by state
	if (inputState) {
		filteredData = filteredData.filter(u => u.state === inputState);
	};

	// Get the data filtered by country
	if (inputCountry) {
		filteredData = filteredData.filter(u => u.country === inputCountry);
	};

	// Get the data filtered by shape
	if (inputShape) {
		filteredData = filteredData.filter(u => u.shape === inputShape);
	};


	// Load the filtered data into the table
	loadTable(filteredData);
});






