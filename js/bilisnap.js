// 页面主逻辑js

// 加载jQuery
window.$ = window.jQuery = require('./js/vendor/jquery-2.1.4.min.js');

var bilidown = require('bilidown');

// 初始化
$(function(){
  // 面上的选择下载目录按钮
  $('#saveDirBtn').on('click', function(e){
    e.preventDefault();
    $('#saveDir').click();
  });

  // 选择下载目录按钮（页面上隐藏）
  $('#saveDir').on('change', function(e){
    var dirPath = e.target.files[0].path;
    $(this).data('dirPath', dirPath);

    $('#saveDirPreview').text(dirPath);
  });

  // 下载按钮
  $('#download').on('click', function(e){
    e.preventDefault();

    var pageUrl = $('#pageUrl').val();
    var pageNumber = $('#pageNumber').val();
    var saveDir = $('#saveDir').data('dirPath');

    downloadVideo(pageUrl, pageNumber, saveDir, function(err){
      if(err) return console.error(err);
    });
  });
});

// 下载视频
function downloadVideo(pageUrl, pageNumber, saveDir, callback){
  // 调用bilidown模块下载视频
  bilidown.downloadPageVideo(pageUrl, pageNumber, saveDir, function(err){
    if(err) return callback(err);

    callback(null);
  });
}
