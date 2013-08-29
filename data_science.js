var w = 800,
    h = 750,
    buff = 0.35
    x_buffer = w * buff,
    y_buffer = h * buff,
    radius = h * 0.25,
    circle_delay = 350,
    text_delay = circle_delay * 3,
    out_opacity = 0.5,
    over_opacity = 0.85,
    clicks = 0,
    
    // Create an object that contains all of the data needed to draw the Venn Diagram circles
    circle_data = [{'color' : '#FF0000', 'x' : x_buffer, 'y' : y_buffer, 'id' : 'hacking' , 'delay' : circle_delay },
                   {'color' : '#008000', 'x' : w - x_buffer, 'y' : y_buffer, 'id' : 'stats', 'delay' : circle_delay * 2},
                   {'color' : '#0000FF', 'x' : w / 2, 'y' : h - y_buffer, 'id' : 'substance', 'delay' : text_delay}],
    
    // Create an object that contains all of the data for diagram's text
    text_data = [
                  [ {'text' : 'Big Data', 'transform' : 'rotate(-45 ' + (x_buffer - 30) + ' ' + (y_buffer - 10) + ')', 
                    'x' : x_buffer - 30, 'y' : y_buffer - 10, 'id' : 'hacking_skills', 'class' : 'venn_text_big'}],
                  [ {'text' : 'Open Data', 'transform' : 'rotate(45 ' + (w - (x_buffer - 50)) + ' '+ (y_buffer - 30) +')', 
                    'x' : w - (x_buffer - 50), 'y' : (y_buffer - 30), 'id' : 'math_stats', 'class' : 'venn_text_big'}],
                  [ {'text' : 'Personal', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 
                    'y' : h - (y_buffer - 75), 'id' : 'substantive_expertise', 'class' : 'venn_text_big'}, 
                    {'text' : 'Data', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 
                    'y' : h - (y_buffer - 75), 'id' : 'substantive_expertise', 'class' : 'venn_text_big'}],
                // Intersection text
                  [ {'text' : 'Machine', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 'y' : (y_buffer - 30), 
                    'id' : 'machine_learning', 'class' : 'venn_text_small'},
                    {'text' : 'Learning', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 'y' : (y_buffer - 10), 
                    'id' : 'machine_learning', 'class' : 'venn_text_small'}],
                  [ {'text' : 'Danger', 'transform' : 'rotate(-30 '+ ((x_buffer + (w / 2)) / 2.2) + ' ' + ((h / 2) + 20) + ')', 
                    'x' : ((x_buffer + (w / 2)) / 2.2), 'y' : (h / 2) + 20, 'id' : 'danger_zone', 'class' : 'venn_text_small'},
                    {'text' : 'Zone!', 'transform' : 'rotate(-30 '+ ((x_buffer + (w / 2)) / 2.15) + ' ' + ((h / 2) + 40) + ')', 
                    'x' : ((x_buffer + (w / 2)) / 2.15), 'y' : (h / 2) + 40, 'id' : 'danger_zone', 'class' : 'venn_text_small'}],
                  [ {'text' : 'Traditional', 'transform' : 'rotate(30 '+ (w - (w * .40)) + ' ' + ((h / 2) + 20) + ')', 
                    'x' : w - (w * .39), 'y' : (h / 2) + 20, 'id' : 'traditional_research', 'class' : 'venn_text_small'},
                    {'text' : 'Research', 'transform' : 'rotate(30 '+ (w - (w * .41)) + ' ' + ((h / 2) + 40) + ')', 
                    'x' : w - (w * .40), 'y' : (h / 2) + 40, 'id' : 'traditional_research', 'class' : 'venn_text_small'}],
                  [ {'text' : 'Data', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 'y' : (h / 2) - 40, 
                    'id' : 'data_science', 'class' : 'venn_text_small'},
                    {'text' : 'Science', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 'y' : (h / 2) - 20, 
                    'id' : 'data_science', 'class' : 'venn_text_small'}]
                ]

    context_data = {"hacking_skills" : "Hacking Skills: Data is a commodity traded electronically, therefore, in order to be in this market you need to speak hacker. Far from 'black hat' activities, data hackers must be able to manipulate text files at the command-line, thinking algorithmically, and be interested in learning new tools.",
                    "math_stats" : "Math & Statistics Knowledge: Once you have acquired and cleaned the data, the next step is to actually extract insight from it. You need to apply appropriate math and statistics methods, which requires at least a baseline familiarity with these tools.",
                    "substantive_expertise" : "Substantive Expertise: Science is about discovery and building knowledge, which requires some motivating questions about the world and hypotheses that can be brought to data and tested with statistical methods. Questions first, then data.",
                    "machine_learning" : "Machine Learning: Data plus math is machine learning, which is fantastic if that is what you if that is what you are interested in, but not if you are doing data science.",
                    "traditional_research" : "Traditional Research: Substantive expertise plus math and statistics knowledge is where most traditional researcher falls. Doctoral level researchers spend most of their time acquiring expertise in these areas, but very little time learning about technology.",
                    "danger_zone" : "Danger Zone!: This is where I place people who, 'know enough to be dangerous,' and is the most problematic area of the diagram. It is from this part of the diagram that the phrase 'lies, damned lies, and statistics' emanates, because either through ignorance or malice this overlap of skills gives people the ability to create what appears to be a legitimate analysis without any understanding of how they got there or what they have created."
                    },
    
    chart = d3.select('#venn')
        .append('svg:svg')
        .attr('height', h)
        .attr('width', w)
        .attr("xlink:href", "http://drewconway.com/zia/2013/3/26/the-data-science-venn-diagram")
        
    // Add heading
    title = chart.append('svg:text')
        .attr('class', 'heading')
        .attr('x', 10)
        .attr('y', 20)
        .text('The Data Science Venn Diagram'), 


    heading = chart.append('svg:text')
        .attr('class', 'heading')
        .attr('x', 10)
        .attr('y', h - 20)
        .text('Mouseover for context'), 
        
    // Draw circles
    venn_circles = chart.selectAll('circle')
        .data(circle_data)
      .enter().append('svg:circle')
        .attr('id', function(d){ return d.id; })
        .attr('cx', function(d){ return d.x; })
        .attr('cy', function(d){ return d.y; })
        .attr('r', 0)
        .style('fill', '#FFFFFF')
        .style('opacity', 0.0)
        .on('click', function(){ nextText(); })
      .transition()
        .delay(function(d){ return d.delay; })
        .attr('r', radius)
        .style('fill', function(d){ return d.color; })
        .style('opacity', 0.3),

    context = d3.select("#context")
        .attr("class", "context_text")

    context_text = context.append("p")
        .attr("class", "context_text")
        .text("");

function nextText() {
    // Add text
    if(clicks < text_data.length) {
        venn_text = chart.selectAll('venn_text'+clicks+'.text')
            .data(text_data[clicks])
          .enter().append('svg:text')
            .attr('class', function(d){ return d.class; })
            .attr('id', function(d){ return d.id; })
            .attr('x', function(d){ return d.x; })
            .attr('y', function(d){ return d.y; })
            .attr('transform', function(d){ return d.transform; })
            .text(function(d){ return d.text; })
            .style('opacity', 0.0)
            .on("mouseover", function(d) {
                context_text.text(context_data[d.id]);
                // d3.select(this).attr("class", function(d){ return d.class+("_over"); });
            })
          .transition()
            .duration(400)
            .style('opacity', function(){ 
                if(clicks < (text_data.length - 1)) {
                    return out_opacity;
                }
                else {
                    return over_opacity;
                }
            });

        // Add clipping around text
        // text_masks = chart.selectAll("clipPath")
        //     .data(text_data[clicks])
        //   .enter().append("svg:clipPath")
        //     .append("svg:rect")
        //         .attr('id', function(d){ return d.id; })
        //         .attr("class", "text_clip")
        //         .attr('x', function(d){ 
        //             if(d.class == "venn_text_big") {
        //                 return d.x - (34 * d.text.length;
        //             }
        //             else {
        //                 return d.x - 20;  
        //             }
        //         })
        //         .attr('y', function(d){ 
        //             if(d.class == "venn_text_big") {
        //                 return d.y - 34;
        //             }
        //             else {
        //                 return d.y - 20;  
        //             }
        //         })
        //         .attr("width", function(d){ 
        //             if(d.class == "venn_text_big") {
        //                 return d.text.length * 10;
        //             }
        //             else {
        //                 return d.text.length * 5; 
        //             }
        //         })
        //         .attr("height", function(d){ 
        //             if(d.class == "venn_text_big") {
        //                 return 34
        //             }
        //             else {
        //                 return 20   
        //             }
        //         })
        //         .attr('transform', function(d){ return d.transform; });
        clicks += 1;
    }
}

window.setInterval(nextText, 1200)


