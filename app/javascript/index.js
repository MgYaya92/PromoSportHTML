$(document).ready(function(){
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
	
	$("#transition").fadeOut(1000);	
	$(".control #left").click(function(){
		if($("#area").val()=="menu")
		{
			if($("ul").children(".selected").prev().length!=0)
			{
				$("#sectionInfo").animate({"top":"-17%"},300);
				$("ul").children(".selected").removeClass("selected").prev().addClass("selected");
				$("ul").animate({"right":"-=30%"},300,function(){
					$("#sectionInfo").children("span").html($(".selected").children("input").val());
					$("#sectionInfo").animate({"top":"0%"},300);
				});
			}
			else
			{
				$("#sectionInfo").animate({"top":"-17%"},300);
				$("ul").children(".selected").removeClass("selected").parent().children("li").last().addClass("selected");
				$("ul").animate({"right":"90%"},600,function(){
					$("#sectionInfo").children("span").html($(".selected").children("input").val());
					$("#sectionInfo").animate({"top":"0%"},300);
				});
			}
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
	$(".control #right").click(function(){
		if($("#area").val()=="menu")
		{
			if($("ul").children(".selected").next().length!=0)
			{
				$("#sectionInfo").animate({"top":"-17%"},300);
				$("ul").children(".selected").removeClass("selected").next().addClass("selected");
				$("ul").animate({"right":"+=30%"},600,function(){
					$("#sectionInfo").children("span").html($(".selected").children("input").val());
					$("#sectionInfo").animate({"top":"0%"},300);
				});
			}
			else
			{
				$("#sectionInfo").animate({"top":"-17%"},300);
				$("ul").children(".selected").removeClass("selected").parent().children("li").first().addClass("selected");
				$("ul").animate({"right":"0%"},600,function(){
					$("#sectionInfo").children("span").html($(".selected").children("input").val());
					$("#sectionInfo").animate({"top":"0%"},300);
				});
			}
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
			}
			else alert("exit");
		}else if($("#area").val()=="menu")
		{
			$("#transition").fadeIn(500,function(){
				window.location.replace($("ul .selected").children("h1").html().toLowerCase()+".html");
			});
		}
	});
	$(".control #about").click(function(){
		if($("#area").val()=="menu")
		{
			$("#return").parent().removeClass("off");
			$("#Cexit").parent().addClass("off");
			$("#left").parent().addClass("off");
			$("#right").parent().addClass("off");
			$("#enter").parent().addClass("off");
			$("#about").parent().addClass("off");
			$("#aboutContainer").fadeIn();
		}
	});
	$(".control #return").click(function(){
		$("#return").parent().addClass("off");
		$("#Cexit").parent().removeClass("off");
		$("#left").parent().removeClass("off");
		$("#right").parent().removeClass("off");
		$("#enter").parent().removeClass("off");
		$("#about").parent().removeClass("off");
		$("#aboutContainer").fadeOut();
	});
	$(".control #Cexit").click(function(){
		$("#area").val("exit");
		$("#return").parent().addClass("off");
		$("#Cexit").parent().addClass("off");
		$("#about").parent().addClass("off");
		$("#exit").fadeIn();
	});
});