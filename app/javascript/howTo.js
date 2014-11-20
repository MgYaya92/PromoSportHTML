$(document).ready(function(){
	$("#transition").stop(true,false).fadeOut(500);
	$(".control #down").mousedown(function(){
		var childPos = $("#innerRight").offset();
		var parentPos = $("#innerRight").parent().offset();
		var childOffset = {
			top: childPos.top - parentPos.top,
			left: childPos.left - parentPos.left
		}
		console.log(childOffset.top);
		if(childOffset.top>-1534)
		$("#innerRight").animate({"top":"-=300px"},10);
	});
	$(".control #up").click(function(){
		var childPos = $("#innerRight").offset();
		var parentPos = $("#innerRight").parent().offset();
		var childOffset = {
			top: childPos.top - parentPos.top,
			left: childPos.left - parentPos.left
		}
		if(childOffset.top<0)
		$("#innerRight").animate({"top":"+=300px"},10);
		else $("#innerRight").animate({"top":"0px"},10);
	});
	$(".control #Cleft").click(function(){
		if($("#area").val()=="exit")
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
		if($("#area").val()=="exit")
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
				$("#exit").fadeOut();
				$("#area").val("menu");
				$("#Cexit").parent().removeClass("off");
				$("#about").parent().removeClass("off");
				$("#return").parent().removeClass("off");
				$("#Cleft").parent().addClass("off");
				$("#Cright").parent().addClass("off");
				$("#up").parent().removeClass("off");
				$("#down").parent().removeClass("off");
				$("#enter").parent().addClass("off");
			}
			else alert("exit");
		}
	});
	$(".control #about").click(function(){
		$("#area").val("about");
		$("#up").parent().addClass("off");
		$("#down").parent().addClass("off");
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
			$("#up").parent().removeClass("off");
			$("#down").parent().removeClass("off");
			$("#about").parent().removeClass("off");
			$("#aboutContainer").fadeOut();
		}
	});
	$(".control #Cexit").click(function(){
		$("#area").val("exit");
		$("#return").parent().addClass("off");
		$("#Cexit").parent().addClass("off");
		$("#about").parent().addClass("off");
		$("#Cleft").parent().removeClass("off");
		$("#Cright").parent().removeClass("off");
		$("#up").parent().addClass("off");
		$("#down").parent().addClass("off");
		$("#enter").parent().removeClass("off");
		$("#exit").fadeIn();
	});
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
});