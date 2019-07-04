
//提交我们输入的用户数据
$('#userForm').on('submit',function () {
  var formData = $(this).serialize();//自动收集表单数据
  
  $.ajax({
    type:'post',//get或post
    url:'/users',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      console.log(result)
      // location.reload();
    },
    error:function () {
      alert('用户添加失败')
    }
  })
  return false;//阻止默认行为
})

//添加头像
$('#formBox').on('change','#avatar',function () { 
  var formData = new FormData();
  formData.append('avatar',this.files[0])
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    contentType:false,
    processData:false,
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      // console.log(result)
      // console.log(result[0].avatar)
      $('#preview').attr('src',result[0].avatar);
      $('#hiddenImg').val(result[0].avatar);
    }
  })
})

// $('#avatar').on('change',function () { 
//   var formData = new FormData();
//   formData.append('avatar',this.files[0])
//   $.ajax({
//     type:'post',//get或post
//     url:'/upload',//请求的地址
//     contentType:false,
//     processData:false,
//     data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
//     success:function(result){//成功的回调函数
//       // console.log(result)
//       // console.log(result[0].avatar)
//       $('#preview').attr('src',result[0].avatar);
//       $('#hiddenImg').val(result[0].avatar);
//     }
//   })
// })

//用户内数据显示在表单中
$.ajax({
  type:'get',//get或post
  url:'/users',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    // console.log(result);
    var html = template('userTpl',{data:result})
    $('#userBox').html(html)
  }
})

//点击编辑内容显示到修改界面
$('#userBox').on('click','.edit',function () {
  var id = $(this).attr('data-id')
  console.log(id);
  $.ajax({
    type:'get',//get或post
    url:'/users/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      var html = template('modifyTpl',result)
      $('#formBox').html(html)
    }
  })
})

//点击修改按钮后刷新显示
$('#formBox').on('submit','#userForm',function () {
  var gai = ($(this).serialize());
  var id = $(this).attr('data-id')
  console.log(id);
  $.ajax({
    type:'put',//get或post
    url:'/users/'+id,//请求的地址
    data:gai,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
  return false;
})

//删除
$('#userBox').on('click','.delete',function () {
  var id = $(this).attr('data-id');
  console.log(id);
  $.ajax({
    type:'delete',//get或post
    url:'/users/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
})


//当选中全选input时候，下面所有input跟着改变状态
$('#selectAll').on('change',function () {
  console.log($(this).prop('checked'));
  var bool = $(this).prop('checked');
  $('#userBox').find('.status').prop('checked',bool);
  if(bool == true){
    $('#deleteMany').show();
  } else {
    $('#deleteMany').hide();
  }
})

//当tbody中的input全部选中，我们也让全选的按钮选中状态
$('#userBox').on('change','.status',function () {
  if($('#userBox').find('.status').length == $('#userBox').find('.status').filter(':checked').length){
    $('#selectAll').prop('checked',true);
  } else {
    $('#selectAll').prop('checked',false);
  }
  if($('#userBox').find('.status').filter(':checked').length >= 2){
    $('#deleteMany').show();
  } else {
    $('#deleteMany').hide();
  }
})

//选中批量删除实现点击事件效果
$('#deleteMany').on('click',function () {
  if(confirm('确定删除？')){
  var selectAll = $('#userBox').find('.status').filter(':checked');
  var arr = [];
  selectAll.each(function (index,element) {
    console.log($(element).attr('data-id'));
    arr.push($(element).attr('data-id'))
  })
  $.ajax({
    type:'delete',//get或post
    url:'/users/'+ arr.join('-'),//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
  }
})