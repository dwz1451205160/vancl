$("#tags").find("li").eq(0).on("click",function(){
    $("#phone").css("display","none");
    $("#duanxin").css("display","none");
    $("#YZM1").css("display","none");
    $("#YZM2").css("display","none");
    $(".look").css("display","none");
    $("#phone-yzm").css("display","none");
    $("#tags").find("li").eq(1).attr('class','');
    $(this).attr('class','on');
    $("#vanclUname").css("display","block");
    $("#vanclPword").css("display","block");
    $(".findPword").css("display","block");
})
$("#tags").find("li").eq(1).on("click",function(){
    $(this).attr('class','on');
    $("#tags").find("li").eq(0).attr('class','');
    $("#vanclUname").css("display","none");
    $("#vanclPword").css("display","none");
    $(".findPword").css("display","none");
    $("#phone").css("display","block");
    $("#duanxin").css("display","block");
    $("#YZM1").css("display","block");
    $("#YZM2").css("display","block");
    $(".look").css("display","block");
    $("#phone-yzm").css("display","block");
    $(".passError").css("display","none");
    $(".userError").css("display","none");
    $("#gantanhao1").css("display","none");
    $("#gantanhao2").css("display","none");
})
$("#formInp").find("input").eq(0).on("blur",function(){
    if(this.value == '') {
        $(".userError").css("display","block");
        $("#gantanhao1").css("display","block");
        $(".userError").html("&ensp;&ensp;&ensp;&ensp;&ensp;用户名不能为空")
    }
})
$("#formInp").find("input").eq(1).on("blur",function(){
    if(this.value == '') {
        $(".passError").css("display","block");
        $("#gantanhao2").css("display","block");
        $(".passError").html("&ensp;&ensp;&ensp;&ensp;&ensp;密码不能为空")
    }
})