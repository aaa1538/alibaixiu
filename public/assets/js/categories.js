//显示库中数据在表单中
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    var html = template('categoryBox',{data:result});
    $('#categoryList').html(html);
  }
})

//添加
$('#categoryFormBox').on('submit','#categoryForm',function () {
  var formData = $(this).serialize();
  $.ajax({
    type:'post',//get或post
    url:'/categories',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      console.log(result)
      location.reload();
    },
    error:function(err){
      alert('添加失败')
    }
  })
})

//删除
$('#categoryList').on('click','.delete',function () { 
  if(confirm('确定删除吗？')){
    var id = $(this).attr('data-id');
    $.ajax({
    type:'delete',//get或post
    url:'/categories/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload()
    }
  })
  }
})

//点击编辑显示编辑信息
$('#categoryList').on('click','.edit',function () {
  var id = $(this).attr('data-id');
  $.ajax({
    type:'get',//get或post
    url:'/categories/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      var html = template('categoryModifyBox',result);
      $('#categoryFormBox').html(html);
    }
  })
})

//点击保存，让页面刷新显示修改后的表单
$('#categoryFormBox').on('submit','#categoryForm',function () {
  var formData = $(this).serialize();
  var id = $(this).attr('data-id')
  $.ajax({
    type:'put',//get或post
    url:'/categories/+id',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      console.log(result)
      location.reload()
    }
  })
})

//点击全选让其它input也跟着改变状态
$('#categoryXuanAll').on('change',function () {
  var categotyZT = $(this).prop('checked')
  $('#categoryList').find('.categoryXuan').prop('checked',categotyZT)
})

//当其它input选中，全选也被选中
$('#categoryList').on('change','.categoryXuan',function () {
  if($('#categoryList').find('.categoryXuan').length == $('#categoryList').find('.categoryXuan').filter(':checked').length){
    $('#categoryXuanAll').prop('checked',true)
  } else {
    $('#categoryXuanAll').prop('checked',false)
  }
})