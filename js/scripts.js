$(document).ready(function(){
	var imageData;
	$("form select").change(function(){
	   switch($("form select option:selected").val()){
		   case "decode":
			   $("#image_coded").hide("fast");
			   $("#image_normal").prop("src","images/image_search.png");
			   $("#head_coded").hide("fast");
			   $("#head_normal").html("Image to Decode");
			   $("#btn_sub").html("DECODE");
			   $("#btn_down").hide("fast");
			   $("#file_image").val(null);
			   $("#txt_message").prop("required",false)
			   .prop("placeholder","Decoded message will show here")
			   .prop("readonly",true)
			   .prop("value","");
			   break;
		   case "encode":
			   $("#image_normal").prop("src","images/image_search.png");
			   $("#image_coded").show("fast").prop("src","images/image_search.png");
			   $("#head_coded").show("fast");
			   $("#btn_sub").html("ENCODE");
			   $("#head_normal").html("Normal Image");
			   $("#txt_message").prop("required",true)
			   .prop("placeholder","Enter your message")
			   .prop("readonly",false)
			   .prop("value","");
			   $("#file_image").val(null);
			   break;
	   }
	});
	$("#file_image").change(function(e){
		var reader=new FileReader();
		reader.onloadend=function(){
			imageData=reader.result;
			$("#image_normal").attr("src",reader.result);
			$("#btn_down").hide("fast");
		};
		reader.readAsDataURL(e.target.files[0]);
	});
	$("form").submit(function(e){
		e.preventDefault();
		//showLoad();
		switch($("form select option:selected").val()){
			case "encode":
			    $("#image_coded").prop("src",steg.encode($("#txt_message").val(),imageData));
				$("#btn_down").show("fast");
				//closeLoad();
				break;
			case "decode":
				var data=steg.decode(imageData);
				$("#txt_message").val(data==""?"no data found :-(":data.includes("讶￡")?data.replace("讶￡",""):data);
				//closeLoad();
				break;
		}
	});
	$("#btn_down").click(function(){
		try{
		var a=document.createElement("a");
			a.setAttribute('href',$("#image_coded").attr("src"));
			a.setAttribute('download',"decoded_image.png");
			$("#pan_main").append(a);
			a.style.display='none';
			a.click();
			$("#pan_main").remove(a);
		}catch(e){
			alert(e);
		}
	});
	function showLoad(){
		$("#pan_load").show("fast");
	}
	function closeLoad(){
		$("#pan_load").hide("fast");
	}
});
