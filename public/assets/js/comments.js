$.ajax({
  type:'get',//get或post
  url:'/comments',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType:'json',
  success:function(result){//成功的回调函数
    console.log(result);
    
    var html = template('commentBox',result);
    $('#commentList').html(html)
  }
})

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

//实现批准
$('#commentList').on('click','.status',function () {
  var id = $(this).attr('data-id')
  var status = $(this).attr('data-status')
  $.ajax({
    type:'put',//get或post
    url:'/comments/'+id,//请求的地址
    data:{state:status == 1 ? 0 : 1},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result);
      location.reload()
    }
  })
  return false;
})
