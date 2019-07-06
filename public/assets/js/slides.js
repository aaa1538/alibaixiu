$('#slideForm').on('change','#myfile',function () {
  var formData = new FormData();
  formData.append('avatar',this.files[0]);
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    contentType:false,
    processData:false,
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      console.log(result);
      $('#preview').attr('src',result[0].avatar).show();
      $('#hiddenImg').val(result[0].avatar);
    }
  })
})

//添加
$('#slideForm').on('submit',function () {
  console.log($(this).serialize());
  
  var formData = $(this).serialize();//自动收集表单数据
  $.ajax({
    type:'post',//get或post
    url:'/slides',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload();
    },
    error:function () {
      alert('用户添加失败')
    }
  })
  return false;//阻止默认行为
})

//显示
$.ajax({
  type:'get',//get或post
  url:'/slides',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    var html = template('slideBox',{data:result})
    $('#slideList').html(html)
  }
})

//删除
$('#slideList').on('click','.delete',function () {
  var id = $(this).attr('data-id')
  $.ajax({
    type:'delete',//get或post
    url:'/slides/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      location.reload()
    }
  })
})