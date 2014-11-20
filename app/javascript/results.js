function putPrices(type,prices)
{
	if(type.toLowerCase()=="national")
	{
		$("#prices").html("<tr><td>Premium allocated to the winners</td><td>"+prices.national.Premium+"</td></tr><tr><td>Number of winners newsletters</td><td>"+prices.national.Wnewsletters+"</td></tr><tr><td>Number of winning columns</td><td>"+prices.national.Wcolumns+"</td></tr><tr><td>Winner from each column</td><td>"+prices.national.Weach+"</td></tr>");
	}
	if(type.toLowerCase()=="international")
	{
		$("#prices").html("<tr><td>Premium allocated to the winners</td><td>"+prices.international.Premium+"</td></tr><tr><td>Number of winners newsletters</td><td>"+prices.international.Wnewsletters+"</td></tr><tr><td>Number of winning columns</td><td>"+prices.international.Wcolumns+"</td></tr><tr><td>Winner from each column</td><td>"+prices.international.Weach+"</td></tr>");	
	}
}

$(document).ready(function(){
	var 
	nationalXML,
	internationalXML="",
	prices = {
		"national":{
			"Premium":"",
			"Wnewsletters":"",
			"Wcolumns":"",
			"Weach":""
		},
		"international":{
			"Premium":"",
			"Wnewsletters":"",
			"Wcolumns":"",
			"Weach":""
		}
	};
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
		url: "http://localhost/PromoSportRSS/XML/prices.xml",
		dataType: "xml",
		success: function(xml) {
			$(xml).find('national').each(function(){
				prices.national.Premium=$(this).find('Premium').text();
				prices.national.Wnewsletters=$(this).find('Wnewsletters').text();
				prices.national.Wcolumns=$(this).find('Wcolumns').text();
				prices.national.Weach=$(this).find('Weach').text();
			});
			$(xml).find('international').each(function(){
				prices.international.Premium=$(this).find('Premium').text();
				prices.international.Wnewsletters=$(this).find('Wnewsletters').text();
				prices.international.Wcolumns=$(this).find('Wcolumns').text();
				prices.international.Weach=$(this).find('Weach').text();
			});
			//console.log(prices);
			putPrices("international",prices);
		},
		error: function(error) {
			alert("The XML File could not be processed correctly : ");
			console.log(error.responseText);
		}
	});
	$.ajax({
		type: "GET",
		url: "http://localhost/PromoSportRSS/XML/resultatInternational.xml",
		dataType: "xml",
		success: function(xml) {
			$(xml).find('result').each(function(){
				var number=$(this).find('number').text();
				var team1=$(this).find('team1').text();
				var team2=$(this).find('team2').text();
				var resultMatch=$(this).find('resultMatch').text();
				
				internationalXML += '<div class="item">';
					internationalXML += '<div class="x01"><span>'+resultMatch+'</span></div>';
					internationalXML += '<span class="teamTitle">'+team1+'</span>'; //images/logos/'+team1+'.png
					internationalXML += '<span> - </span>';
					internationalXML += '<span class="teamTitle">'+team2+'</span>'; //images/logos/'+team2+'.png
				internationalXML += '</div>';
				// console.log(internationalXML);	
				$("#left").html(internationalXML);
				$("#left").children(".item").first().addClass("selected");
			});
		},
		error: function(error) {
			alert("The XML File could not be processed correctly : ");
			console.log(error.responseText);
		}
	});
	$.ajax({
		type: "GET",
		url: "http://localhost/PromoSportRSS/XML/resultatNational.xml",
		dataType: "xml",
		success: function(xml) {
			nationalXML ="";
			$(xml).find('result').each(function(){
				var number=$(this).find('number').text();
				var team1=$(this).find('team1').text();
				var team2=$(this).find('team2').text();
				var resultMatch=$(this).find('resultMatch').text();
				
				nationalXML += '<div class="item">';
					nationalXML += '<div class="x01"><span>'+resultMatch+'</span></div>';
					nationalXML += '<span class="teamTitle">'+team1+'</span>'; //images/logos/'+team1+'.png
					nationalXML += '<span> - </span>';
					nationalXML += '<span class="teamTitle">'+team2+'</span>'; //images/logos/'+team2+'.png
				nationalXML += '</div>';
				// console.log(nationalXML);	
			});
		},
		error: function(error) {
			alert("The XML File could not be processed correctly : ");
			console.log(error.responseText);
		}
	});
	$("#transition").stop(true,false).fadeOut(500);
	$(".control #down").click(function(){
		console.log($("#left").children(".selected").index(),$("#left").children(".item").length);
		if($("#left").children(".selected").index()<$("#left").children(".item").length-1)
		{
			$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected").next().addClass("selected").children(".x01").addClass("hover");
			var dis = $(".selected").offset().top - $("#left").offset().top;
			if(dis>300)$(".item").animate({"top":"-="+(dis-300)},300);
			if(dis<0)$(".item").animate({"top":"0"},300);
		}else{
			$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected");
			$("#left").children(".item").first().addClass("selected").children(".x01").addClass("hover");
			$(".item").animate({"top":"0"},300);
		}
	});
	$(".control #up").click(function(){
		if($("#left").children(".selected").index()>1)
		{
			$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected").prev().addClass("selected").children(".x01").addClass("hover");
			var dis = $(".selected").offset().top - $("#left").offset().top;
			if(dis<0)$(".item").animate({"top":"+="+(-dis)},300);
			if(dis>400)$(".item").animate({"top":"-="+(dis-400)},300);
		}else{
			var dis = $(".selected").offset().top - $("#left").offset().top;
			$("#left").children(".selected").children(".x01").removeClass("hover").parent().removeClass("selected");
			$("#left").children(".item").last().addClass("selected").children(".x01").addClass("hover");
			$(".item").animate({"top":"+="+(dis-750)},300);
		}
	});
	$(".control #Cleft").click(function(){
		if($("#area").val()=="menu")
		{
			if($("#top").children(".menuSelected").index()>0)
			{
				$("#top").children(".menuSelected").removeClass("menuSelected").prev().addClass("menuSelected");
				if($("#top").children(".menuSelected").text()=="National")
				{
						$("#left").html(nationalXML);
						$("#left").children(".item").first().addClass("selected");
				}
			}else{
				$("#top").children(".menuSelected").removeClass("menuSelected");
				$("#top").children(".menuItem").last().addClass("menuSelected");
				if($("#top").children(".menuSelected").text()=="International")
				{
						$("#left").html(internationalXML);
						$("#left").children(".item").first().addClass("selected");
				}
			}
			putPrices($("#top").children(".menuSelected").text(),prices);
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
				if($("#top").children(".menuSelected").text()=="International")
				{
						$("#left").html(internationalXML);
						$("#left").children(".item").first().addClass("selected");
				}
			}else{
				$("#top").children(".menuSelected").removeClass("menuSelected");
				$("#top").children(".menuItem").first().addClass("menuSelected");
				if($("#top").children(".menuSelected").text()=="National")
				{
						$("#left").html(nationalXML);
						$("#left").children(".item").first().addClass("selected");
				}
			}
			putPrices($("#top").children(".menuSelected").text(),prices);
		}else if($("#area").val()=="exit")
		{
			if($("#exitContainer").children(".buttonSelected").next().length!=0)
			{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").next().addClass("buttonSelected");
			}else{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").parent().children("button").first().addClass("buttonSelected");
			}
		}
	});
	
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
				$("#up").parent().removeClass("off");
				$("#down").parent().removeClass("off");
			}
			else alert("exit");
		}
	});
	$(".control #about").click(function(){
		$("#area").val("about");
		$("#Cleft").parent().addClass("off");
		$("#Cright").parent().addClass("off");
		$("#up").parent().addClass("off");
		$("#down").parent().addClass("off");
		$("#enter").parent().addClass("off");
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
			$("#up").parent().removeClass("off");
			$("#down").parent().removeClass("off");
			$("#enter").parent().removeClass("off");
			$("#about").parent().removeClass("off");
			$("#aboutContainer").fadeOut();
		}
	});
	$(".control #Cexit").click(function(){
		$("#area").val("exit");
		$("#up").parent().addClass("off");
		$("#down").parent().addClass("off");
		$("#return").parent().addClass("off");
		$("#Cexit").parent().addClass("off");
		$("#about").parent().addClass("off");
		$("#enter").parent().removeClass("off");
		$("#exit").fadeIn();
	});
});