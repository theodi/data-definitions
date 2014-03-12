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
    circle_data = [{'color' : '#E6007C', 'x' : x_buffer, 'y' : y_buffer, 'id' : 'bigdata' , 'delay' : circle_delay },
                   {'color' : '#2254F4', 'x' : w - x_buffer, 'y' : y_buffer, 'id' : 'opendata', 'delay' : circle_delay * 2},
                   {'color' : '#1DD3A7', 'x' : w / 2, 'y' : h - y_buffer, 'id' : 'personaldata', 'delay' : text_delay}],
    
    // Create an object that contains all of the data for diagram's text
    text_data = [
                  [ {'text' : 'Big Data', 'transform' : 'rotate(-45 ' + (x_buffer - 30) + ' ' + (y_buffer - 10) + ')', 
                    'x' : x_buffer - 30, 'y' : y_buffer - 10, 'id' : 'bigdata', 'class' : 'venn_text_big'}],
                  [ {'text' : 'Open Data', 'transform' : 'rotate(45 ' + (w - (x_buffer - 45)) + ' '+ (y_buffer - 30) +')', 
                    'x' : w - (x_buffer - 45), 'y' : (y_buffer - 30), 'id' : 'opendata', 'class' : 'venn_text_big'}],
                  [ {'text' : 'Personal', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 
                    'y' : h - (y_buffer - 40), 'id' : 'personaldata', 'class' : 'venn_text_big'},
                    {'text' : 'Data', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 
                    'y' : h - (y_buffer - 75), 'id' : 'personaldata', 'class' : 'venn_text_big'}],
                // Intersection text
                  [ {'text' : 'Big +', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 'y' : (y_buffer - 30), 
                    'id' : 'b_o', 'class' : 'venn_text_small'},
                    {'text' : 'Open', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 'y' : (y_buffer - 10), 
                    'id' : 'b_o', 'class' : 'venn_text_small'}],
                  [ {'text' : 'Big +', 'transform' : 'rotate(-30 '+ ((x_buffer + (w / 2)) / 2.2) + ' ' + ((h / 2) + 20) + ')', 
                    'x' : ((x_buffer + (w / 2)) / 2.2), 'y' : (h / 2) + 20, 'id' : 'b_p', 'class' : 'venn_text_small'},
                    {'text' : 'Personal', 'transform' : 'rotate(-30 '+ ((x_buffer + (w / 2)) / 2.15) + ' ' + ((h / 2) + 40) + ')', 
                    'x' : ((x_buffer + (w / 2)) / 2.15), 'y' : (h / 2) + 40, 'id' : 'b_p', 'class' : 'venn_text_small'}],
                  [ {'text' : 'Open +', 'transform' : 'rotate(30 '+ (w - (w * .40)) + ' ' + ((h / 2) + 20) + ')', 
                    'x' : w - (w * .39), 'y' : (h / 2) + 20, 'id' : 'o_p', 'class' : 'venn_text_small'},
                    {'text' : 'Personal', 'transform' : 'rotate(30 '+ (w - (w * .41)) + ' ' + ((h / 2) + 40) + ')', 
                    'x' : w - (w * .40), 'y' : (h / 2) + 40, 'id' : 'o_p', 'class' : 'venn_text_small'}],
                  [ {'text' : '?', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 'y' : (h / 2) - 25, 
                    'id' : 'b_o_p', 'class' : 'venn_text_small'}]
                ]

				// , {'text' : '(BOP)', 'transform' : 'rotate(0 0 0)', 'x' : w / 2, 'y' : (h / 2) - 20, 
				//                     'id' : 'b_o_p', 'class' : 'venn_text_small'}

    context_data = {"bigdata" : "Big Data is (i) data that cannot be handled with conventional tools and/or (ii) the idea that large, granular amounts of data create value almost automatically. More formal: There is no formal definition of Big Data – though many have tried.",
                    "opendata" : "Open Data is data that anyone can use; without legal, technical or financial barriers. – More formal – The Open Knowledge Foundation writes: A piece of data or content is open if anyone is free to use, reuse, and redistribute it — subject only, at most, to the requirement to attribute and/or share-alike.",
                    "personaldata" : "Personal Data is data derived from people, where you can distinguish a person from other people in the group. – More formal – A technical definition of personally identifiable information (PII) from the ISO 29100 standard (privacy framework): any information that (a) can be used to identify the PII principal to whom such information relates, or (b) is or might be directly or indirectly linked to a PII principal.",
                    "b_o" : "We can think of it in two ways: (1) Big Data that is made available as Open Data (see our Big Data Publishing guide) or (2) Open Data that combined with other information achieve Big Data status. Governments around the world are excited about this because they see its potential for transparency and economic growth. However, at the moment most of it is just data, not information, and even more of it is not open.",
                    "b_p" : "This is the intersection where big business gets excited. Enhanced selling, geo-targeted advertising, personalised recommendations all derive from algorithms mining customer (= people) data. The few examples where individuals benefit from Big Data do not balance this asymmetry. The public are passive when it comes to Big Data. With more algorithm shaping our lives than ever before (take credit scoring for example), combining Big and Personal Data will continue to create tensions.",
                    "o_p" : "Personal Data is not Open Data without explicit and informed consent from the individual. There are only a few exceptions such as the Law requiring you to publish Personal Data or an individual opening up her own data. However, Personal Data can be published if it is sufficiently anonymised because then it is no longer Personal Data. 'Sufficiently' is of course a subjective term, but modern techniques have proven to be very effective at minimising the risk of anonymised data.",
					"b_o_p": "Does it exist? It would require a special type of data nudist to be willing to share large amounts of his/her personal life. Some have hopes in people voluntarily contributing to large open scientific dataset that have the potential to advance medicine for example. Combining your available online activities such as social media data may be getting close to a combination of all three. It is essentially a flavour with more than an acquired taste; for many not acceptable."
                    },
    
    chart = d3.select('#venn')
        .append('svg:svg')
        .attr('height', h)
        .attr('width', w)
		.attr("xlink:href", "http://theodi.github.io/data-definitions")
        
    // Add heading
    title = chart.append('svg:text')
        .attr('class', 'heading')
        .attr('x', 10)
        .attr('y', 20)
        .text('A Colloquial Definition of Big, Open, and Personal Data'), 


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
        clicks += 1;
    }
}

window.setInterval(nextText, 1200)


