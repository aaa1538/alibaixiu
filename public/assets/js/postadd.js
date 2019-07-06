//将分类目录中的目录显示到写文章的所属分类中
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    // console.log(123);
    var html = template('categoryTpl',{data:result})
    $('#category').html(html)
  }
})

//上传作者图片
$('#postaddBigForm').on('change','#feature',function () {
  var formDate = new FormData();
  formDate.append('avatar',this.files[0]);
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    contentType:false,
    processData:false,
    data:formDate,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      $('.thumbnail').attr('src',result[0].avatar).show();
      $('#hiddenImg').val(result[0].avatar);
    }
  })
})



//提交我们的内容传到所有文章页面显示
$('#postaddForm').on('submit',function () {
  // console.log($(this).serialize());
  var chuang = $(this).serialize()
  $.ajax({
    type:'post',//get或post
    url:'/posts',//请求的地址
    data:chuang,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      console.log(result);
      location.href = 'posts.html'
    },
    error:function () {
      alert('用户添加失败')
    }
  })
  return false;
})




//从浏览器的地址栏中获取查询参数
function  getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&')

  for (let i = 0; i < paramsAry.length; i++) {
    const tmp = paramsAry[i].split('=');
    if (tmp[0] == name) {
      return tmp[1];
    }
  }
  return -1;
}
//得到查询获取来的id参数
var id = getUrlParams('id');
//根据id值显示编辑的页面
if(id != -1){
// console.log(id);

//显示编辑的页面
$.ajax({
  type:'get',//get或post
  url:'/posts/'+ id,//请求的地址
  success:function(result){//成功的回调函数
    console.log(result)

    //查询分类
    $.ajax({
      type:'get',//get或post
      url:'/categories',//请求的地址
      data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType:'json',
      success:function(response){//成功的回调函数
        result.categories = response;
        var html = template('categoryModifyTpl',result)
        $('#postaddBigForm').html(html)
      }
    })
  }
})
} 
//将我们编辑修改后的内容显示到posts页面中
$('#postaddBigForm').on('submit','#postModifyForm',function () {
  var formDate = $(this).serialize();
  var id = $(this).attr('data-id');
  $.ajax({
    type:'put',//get或post
    url:'/posts/'+id,//请求的地址
    data:formDate,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      console.log(result);
      location.href = 'posts.html'
    }
  })
  return false;
})