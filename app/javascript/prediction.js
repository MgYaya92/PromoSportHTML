function fillIn(league,matchs)
{
	var header = "<tr><td>Home</td><td>Away</td><td>1</td><td>X</td><td>2</td></tr>";
	var contentHTML =header;
	$(matchs).each(function(){
		if($(this)[0].league==league.toLowerCase())
		{
			
			contentHTML +="<tr>";
				contentHTML +="<td>"+$(this)[0].home+"</td>";
				contentHTML +="<td>"+$(this)[0].away+"</td>";
				contentHTML +="<td>"+$(this)[0].prediction1+"%</td>";
				contentHTML +="<td>"+$(this)[0].predictionX+"%</td>";
				contentHTML +="<td>"+$(this)[0].prediction2+"%</td>";
			contentHTML +="</tr>";
		}
	});
	$("#informations").html(contentHTML);
}
$(document).ready(function(){
	$("#transition").fadeOut(500);
	var predictionXML="";
	var match,matchs = [];
	$.ajax({
		type: "GET",
		url: "http://localhost/promosportHTML/about.txt",
		dataType: "text",
		success: function(text) {
			$("#aboutContainer").html(text);
		},
		error: function(error) {
			alert("The about File could not be processed correctly : ");
			console.log(error.responseText);
		}
	});
	$.ajax({
		type: "GET",
		url: "http://localhost/PromoSportRSS/XML/prediction.xml",
		dataType: "xml",
		success: function(xml) {
			console.log("parsing done.");
			$(xml).find('league').each(function(){
				$(this).find('Match').each(function(){
					match = {};
					match.league 		= $(this).parent().attr('nation');
					match.home 			= $(this).find('HomeTeam').text();
					match.away 			= $(this).find('AwayTeam').text();
					match.prediction1 	= $(this).find('Prediction1').text();
					match.predictionX 	= $(this).find('PredictionX').text();
					match.prediction2 	= $(this).find('Prediction2').text();
					matchs.push(match);
				});
			});
			// console.log(matchs);
			fillIn("england",matchs);
		},
		error: function(error) {
			alert("The XML File could not be processed correctly : ");
			console.log(error.responseText);
		}
	});
	
	
	$(".control #Cleft").click(function(){
		if($("#area").val()=="menu")
		{
			if($("#top").children(".menuSelected").index()>0)
			{
				$("#top").children(".menuSelected").removeClass("menuSelected").prev().addClass("menuSelected");
			}else{
				$("#top").children(".menuSelected").removeClass("menuSelected");
				$("#top").children(".menuItem").last().addClass("menuSelected");
			}
			fillIn($("#top").children(".menuSelected").text(),matchs);
		}else if($("#area").val()=="exit")
		{
			if($("#exitContainer").children(".buttonSelected").prev("button").length!=0)
			{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").prev().addClass("buttonSelected");
			}else{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").parent().children("button").last().addClass("buttonSelected");
			}
		}
	});
	$(".control #Cright").click(function(){
		if($("#area").val()=="menu")
		{
			if($("#top").children(".menuSelected").index()+1<$("#top").children(".menuItem").length)
			{
				$("#top").children(".menuSelected").removeClass("menuSelected").next().addClass("menuSelected");	
			}else{
				$("#top").children(".menuSelected").removeClass("menuSelected");
				$("#top").children(".menuItem").first().addClass("menuSelected");
			}
			fillIn($("#top").children(".menuSelected").text(),matchs);
		}
		else if($("#area").val()=="exit")
		{
			if($("#exitContainer").children(".buttonSelected").next().length!=0)
			{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").next().addClass("buttonSelected");
			}else{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").parent().children("button").first().addClass("buttonSelected");
			}
		}
	});
	
	/*$(".control #down").mousedown(function(){
		$("#informations").animate({"top":"-=100px"},10);
	});
	$(".control #up").click(function(){
		$("#informations").animate({"top":"+=100px"},10);
	});*/
	
	$(".control #enter").click(function(){
		if($("#area").val()=="exit")
		{
			if($(".buttonSelected").html()=="Cancel")
			{
				$("#area").val("menu");
				$("#exit").fadeOut();
				$("#Cexit").parent().removeClass("off");
				$("#about").parent().removeClass("off");
				$("#return").parent().removeClass("off");
				$("#enter").parent().addClass("off");
			}
			else alert("exit");
		}
	});
	$(".control #about").click(function(){
		$("#area").val("about");
		$("#Cleft").parent().addClass("off");
		$("#Cright").parent().addClass("off");
		$("#about").parent().addClass("off");
		$("#Cexit").parent().addClass("off");
		$("#aboutContainer").fadeIn();
	});
	$(".control #return").click(function(){
		if($("#area").val()=="menu")
		{
			$("#transition").fadeIn(500,function(){
				window.location.replace("index.html");
			});
		}else if($("#area").val()=="about")
		{
			$("#area").val("menu");
			$("#Cexit").parent().removeClass("off");
			$("#Cleft").parent().removeClass("off");
			$("#Cright").parent().removeClass("off");
			$("#about").parent().removeClass("off");
			$("#aboutContainer").fadeOut();
		}
	});
	$(".control #Cexit").click(function(){
		$("#area").val("exit");
		$("#return").parent().addClass("off");
		$("#Cexit").parent().addClass("off");
		$("#about").parent().addClass("off");
		$("#enter").parent().removeClass("off");
		$("#exit").fadeIn();
	});
	
});