var dataArray = [[23,"one"], [13,"two"], [21,"three"], [14,"four"], [37,"five"], [15,"six"], [18,"seven"], [34,"eight"], [30,"nine"], [32, "ten"], [22, "eleven"], [12, "twelve"], [22, "thirteen"], [8, "fourteen"], [32, "fifteen"]];

dataArray = dataArray.sort(function(a, b){return b[0] - a[0];});

var margin = {top: 60, right: 20, bottom: 200, left: 80},
	width = 900 - margin.left - margin.right,
	height = 700 - margin.top - margin.bottom;

var parseTime = d3.timeParse("%d-%b-%y");


var x = d3.scaleBand().range([0, dataArray.length * (width/dataArray.length) + 10]);
var y = d3.scaleLinear().range([height, 0]);

var maxValue = d3.max(dataArray, function(d) { return d[0]; }) + 10
y.domain([0, maxValue]);
x.domain(dataArray.map(function(d) { return d[1]; }));

var svg = d3.select("body").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.selectAll("rect")
    .data(dataArray)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("height", function(d, i) {return (d[0] * (height/maxValue))})
    .attr("width","40")
	// .attr("x", function(d, i) {return i * (width/dataArray.length) + 10;})
	.attr("x", function(d) {return x(d[1]) + 10;})
	.attr("y", function(d, i) {return height - (d[0] * (height/maxValue))})
	.style("opacity", function(d, i) {return 2/(maxValue/d[0]);});

svg.selectAll("text")
    .data(dataArray)
    .enter().append("text")
    .text(function(d) {return d[0];})
    .attr("x", function(d) {return x(d[1]) + 22;})
	.attr("y", function(d, i) {return height - 8 - (d[0] * (height/maxValue))});

// AXIS
svg.append("g")
	.attr("class", 'y-axis')
	.call(d3.axisLeft(y));

svg.append("g")
	.attr("class", 'x-axis')
	.call(d3.axisBottom(x))
	.attr("transform", "translate(0," + height + ")")
	.selectAll("text")
	.style("text-anchor", "start")
	.style("font-size", "15px")
	.attr("dx", ".8em")
	.attr("dy", "-.4em")
	.attr("transform", "rotate(90)")

// AXIS LABLE
svg.append("text")
	.attr("x", width/2)
	.attr("y", height + 170 )
	.style("text-anchor", "middle")
	.text("x-axis")

svg.append("text")
	.attr("x", -height/2)
	.attr("y", -margin.left/2)
	.style("text-anchor", "middle")
	.text("y-axis")
	.attr("transform", "rotate(-90)")

// TITLE
svg.append("text")
	.attr("x", (width / 2))
	.attr("y", 20 - (margin.top / 2))
	.attr("text-anchor", "middle")
	.style("font-size", "20px")
	.style("text-decoration", "underline")
	.text("Blank by blank");
