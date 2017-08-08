var dataArray = [[7948,"/"], [2862,"/dataset"], [1096,"/dataset/usgs-national-elevation-dataset-ned-1-meter-downloadable-data-collection-from-the-national-map-"], [871,"/education/"], [789,"/health/"], [722,"/consumer/"], [674,"/dataset/uscis-my-case-status"], [648,"/finance/	"], [605,"/climate/"], [586,"/dataset/zip-code-data"], [558,"/dataset?res_format=CSV"], [551,"/applications"], [507,"/food/"], [507,"/developers/apis"], [473,"/dataset/national-stock-number-extract"]];

var barChart = function(dataArray, title, yAxis, chart, links=false) {
	dataArray = dataArray.sort(function(a, b){return b[0] - a[0];});

	if(links){
		dataArray.map(function(element) {
			if(element[1] === "/") {
				element[1] = "data.gov/";
				return element;
			} else {
				var requestUrl = "https://catalog.data.gov" + element[1];
				var xhr = new XMLHttpRequest();
				xhr.open('GET', requestUrl, true)
				xhr.send()
				xhr.onreadystatechange = processRequest;

				function processRequest(e) {
					if(xhr.readyState == 4 && xhr.status == 200){
						element[1] = "catalog.data.gov" + element[1];
						return element;
					} else if (xhr.readyState == 4 && xhr.status != 200){
						element[1] = "data.gov" + element[1];
						return element;
					}
				}
			}
		})
	}

	window.setTimeout(function(){
		var div = d3.select(chart).append("div")
		.attr("class", "barchart-tooltip")
		.style("opacity", 0);

		var margin = {top: 60, right: 20, bottom: 350, left: 80},
			width = 700 - margin.left - margin.right,
			height = 900 - margin.top - margin.bottom;

		var x = d3.scaleBand().range([0, dataArray.length * (width/dataArray.length) + 10]);
		var y = d3.scaleLinear().range([height, 0]);

		var maxValue = d3.max(dataArray, function(d) { return d[0]; })
		maxValue = maxValue + maxValue/15
		y.domain([0, maxValue]);
		x.domain(dataArray.map(function(d) { return d[1]; }));

		var svg = d3.select(chart).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.selectAll("rect")
		    .data(dataArray)
		    .enter().append("rect")
		    .attr("class", "bar")
		    .attr("height", function(d, i) {return (d[0] * (height/maxValue))})
		    .attr("width","30")
			.attr("x", function(d) {return x(d[1]) + 5;})
			.attr("y", function(d, i) {return height - (d[0] * (height/maxValue))})
			.style("opacity", function(d, i) {return ((2)*d[0]/maxValue);})
			.on("mouseover", function(d) {
				div.transition()
				.duration(200)
				.style("opacity", 1)
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px")
				.style("width", d[1].length)

				div.html(d[1])

			})
			.on("mouseout", function(d) {
				div.transition()
				.duration(500)
				.style("opacity", 0);
			})
			.on("click", function(d) {
				window.open("https://" + d[1], "_blank")
			})

		svg.selectAll("text")
		    .data(dataArray)
		    .enter().append("text")
		    .text(function(d) {return d[0];})
		    .style("font-size", "12px")
		    .style("fill", "rgb(168, 78, 0)")
		    .style("font-weight", "600")
		    .attr("x", function(d) {return x(d[1]) + 35/(d[0].toString().length);})
			.attr("y", function(d, i) {return height - 5 - (d[0] * (height/maxValue))});

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
			.style("font-size", "12px")
			.attr("dx", ".8em")
			.attr("dy", "-.45em")
			.attr("transform", "rotate(90)")

		// AXIS LABLE
		// svg.append("text")
		// 	.attr("x", width/2)
		// 	.attr("y", height + 170 )
		// 	.style("text-anchor", "middle")
		// 	.text(xAxis)

		svg.append("text")
			.attr("x", -height/2)
			.attr("y", -margin.left/1.5)
			.style("text-anchor", "middle")
			.text(yAxis)
			.attr("transform", "rotate(-90)")

		// TITLE
		svg.append("text")
			.attr("x", (width / 2) + 60)
			.attr("y", 20 - (margin.top / 2))
			.attr("text-anchor", "middle")
			.style("font-size", "30px")
			.style('font', 'sans-serif')
			.text(title);

	}, 600);
}

barChart(dataArray, 'Most Popular Pages by Views', 'Views', "#chart", true);
// barChart(dataArray, 'Popular Pages', 'Views', 'Pages');
