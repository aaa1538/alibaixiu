// import { format } from "util";

//设置分页默认为第一页
var page =1;

//显示内容，因与分页调用函数重复,用函数封装调用
function render() {
  $.ajax({
    type:'get',//get或post
    url:'/posts',//请求的地址
    data:{page:page},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      console.log(result);
      
      var html = template('postsTpl',result);
      $('#postsBox').html(html);
  
      //分页效果
      var pageHtml = template('pageTpl',result)
      $('#pageBox').html(pageHtml);
    }
  })
}

//调用显示页面内容
render();

//分页效果实现，加入函数用onclick调用
function changePage(cutterPage) {
  // console.log(cutterPage);
  page = cutterPage;
  render();
}



//修改时间显示格式一
// function formateDate(date) {
//   date = new Date(date);
//   var year = date.getFullYear()
//   var month = date.getFullMonth()+1;
//   var day = date.getFullDate()
//   return year +'-' + month + '-' +day
// }



//修改时间显示格式二
function cutter(data, one) {
  data = data.split(one)
  data = data.join('')
  return data
};
template.defaults.imports.dateformat = function dataFormat (data){
  data = cutter(data, '-')
  data = cutter(data, ':')
  data = cutter(data, '.')
  let year = data.substr(0, 4)
  let month = data.substr(4, 2)
  let day = data.substr(6, 2)
  // let hour = data.substr(9, 2)
  // let minute = data.substr(11, 2)
  // let second = data.substr(13, 2)
  let time = year + '年' + month + '月' + day + '日'
  //  + hour + '时' + minute + '分' + second + '秒';
  return time
}

//筛选中分类渲染
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    var html = template('catetoryTpl',{data:result});
    $('#categoryBox').html(html)
  }
})

//筛选提交后显示筛选内容
$('#filterForm').on('submit',function () {
  // console.log(123);
  var formData = ($(this).serialize());
  console.log($(this).serialize());
  
  $.ajax({
    type:'get',//get或post
    url:'/posts',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      console.log(result)
      var html = template('postsTpl',result);
      $('#postsBox').html(html)

      //分页效果
      var pageHtml = template('pageTpl',result)
      $('#pageBox').html(pageHtml);
    }
  })
  return false;
})






//点击编辑显示修改页面
// $('#postsBox').on('click','.edit',function () {
//   var id = $(this).attr('data-id')
//   var formateDate = $(this).serialize();
//   $.ajax({
//     type:'put',//get或post
//     url:'/posts/'+id,//请求的地址
//     data:formateDate,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
//     dataType:'json',
//     success:function(result){//成功的回调函数
//       var html = template('postsModifyForm',result)
//       $('#postsBigForm').html(html)
//     }
//   })
// })



//删除
$('#postsBox').on('click','.delete',function () {
  if(confirm('确定要删除吗？')){
    var id = $(this).attr('data-id')
  $.ajax({
    type:'delete',//get或post
    url:'/posts/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
  }
})