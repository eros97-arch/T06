const populateFilters = (data) => {

    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => d.isActive ? "active" : "")
        .text(d => d.label)

        .on("click", (e, d) => {

            console.log("Clicked filter:", d);
            console.log("Clicked filter data:", d);

            if (!d.isActive) {

                // Make sure only the clicked filter is active
                filters_screen.forEach(filter => {
                    filter.isActive = d.id === filter.id;
                });

                // Update the filter buttons
                d3.selectAll(".filter")
                    .classed("active", filter => filter.id === d.id ? true : false);

            }

            updateHistogram(d.id, data);
        });
};

const updateHistogram = (filterId, data) => {

    const updatedData = filterId === "all"
        ? data
        : data.filter(tv => tv.screenTech === filterId);

    const updatedBins = binGenerator(updatedData);

    d3.select("#histogram rect")
        .data(updatedBins)
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
};