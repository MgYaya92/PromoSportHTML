function setOutletData(){
	var id = $(".selected").children(".itemId").val();
	var zone = $(".selected").children(".itemZone").val();
	var status = $(".selected").children(".itemStatus").val();
	var number = $(".selected").children(".itemNumber").val();
	var address = $(".selected").children(".itemAddress").val();
	var city = $(".selected").children(".itemCity").val();
	$("#outletInfoTable tr:nth-child(1) td:nth-child(3)").html(id);
	$("#outletInfoTable tr:nth-child(2) td:nth-child(3)").text(zone);
	$("#outletInfoTable tr:nth-child(3) td:nth-child(3)").html(status);
	$("#outletInfoTable tr:nth-child(4) td:nth-child(3)").html(number);
	$("#outletInfoTable tr:nth-child(5) td:nth-child(3)").html(address);
	$("#outletInfoTable tr:nth-child(6) td:nth-child(3)").html(city);
}

function showList(x){
	$(".item").css("display","none");
	for(var i=(x-10);i<(x+10);i++)
	{
		$(".item").eq(i).css("display","block");
	}
}

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
	$("#transition").fadeOut(500);
	$("#left").children(".item").first().addClass("selected");
	setOutletData();
	showList(0);
	
	$(".control #down").click(function(){
		if($("#left").children(".selected").index()<$("#left").children(".item").length-1)
		{
			$("#left").children(".selected").removeClass("selected").next().addClass("selected");
			setOutletData();
			var dis = $(".selected").offset().top - $("#left").offset().top;
			if(dis>400)$(".item").animate({"top":"-="+(dis-400)},300);
			if(dis<0)$(".item").animate({"top":"0"},300);
		}else{
			$("#left").children(".selected").removeClass("selected");
			$("#left").children(".item").first().addClass("selected");
			setOutletData();
			$(".item").animate({"top":"0"},300);
		}
		showList($("#left").children(".selected").index());
	});
	$(".control #up").click(function(){
		if($("#left").children(".selected").index()>0)
		{
			$("#left").children(".selected").removeClass("selected").prev().addClass("selected");
			setOutletData();
			var dis = $(".selected").offset().top - $("#left").offset().top;
			if(dis<0)$(".item").animate({"top":"+="+(-dis)},300);
			if(dis>400)$(".item").animate({"top":"-="+(dis-400)},300);
		}
		else
		{
			$("#left").children(".selected").removeClass("selected");
			$("#left").children(".item").last().addClass("selected");
			setOutletData();
			var dis = $(".selected").offset().top - $("#left").offset().top;
			$(".item").animate({"top":"-="+(dis-1150)},300);
		}
		showList($("#left").children(".selected").index());
	});
	$(".control #down").click(function(){
		if($("#top").children(".menuSelected").index()>0)
		{
			$("#top").children(".menuSelected").removeClass("menuSelected").prev().addClass("menuSelected");
		}else{
			$("#top").children(".menuSelected").removeClass("menuSelected");
			$("#top").children(".menuItem").last().addClass("menuSelected");
		}
	});
	$(".control #up").click(function(){
		if($("#top").children(".menuSelected").index()+1<$("#top").children(".menuItem").length)
		{
			$("#top").children(".menuSelected").removeClass("menuSelected").next().addClass("menuSelected");
		}else{
			$("#top").children(".menuSelected").removeClass("menuSelected");
			$("#top").children(".menuItem").first().addClass("menuSelected");
		}
	});
	
	$(".control #Cleft").click(function(){
		if($("#exitContainer").children(".buttonSelected").prev("button").length!=0)
			{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").prev().addClass("buttonSelected");
			}else{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").parent().children("button").last().addClass("buttonSelected");
			}
	});
	
	$(".control #Cright").click(function(){
		if($("#exitContainer").children(".buttonSelected").next().length!=0)
			{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").next().addClass("buttonSelected");
			}else{
				$("#exitContainer").children(".buttonSelected").removeClass("buttonSelected").parent().children("button").first().addClass("buttonSelected");
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
				$("#Cleft").parent().addClass("off");
				$("#Cright").parent().addClass("off");
				$("#up").parent().removeClass("off");
				$("#down").parent().removeClass("off");
				$("#enter").parent().addClass("off");
				$("#return").parent().removeClass("off");
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
			// $("#Cleft").parent().removeClass("off");
			// $("#Cright").parent().removeClass("off");
			$("#up").parent().removeClass("off");
			$("#down").parent().removeClass("off");
			// $("#enter").parent().removeClass("off");
			$("#about").parent().removeClass("off");
			$("#aboutContainer").fadeOut();
		}
	});
	$(".control #Cexit").click(function(){
		$("#area").val("exit");
		$("#up").parent().addClass("off");
		$("#down").parent().addClass("off");
		$("#Cleft").parent().removeClass("off");
		$("#Cright").parent().removeClass("off");
		$("#return").parent().addClass("off");
		$("#Cexit").parent().addClass("off");
		$("#about").parent().addClass("off");
		$("#enter").parent().removeClass("off");
		$("#exit").fadeIn();
	});
});