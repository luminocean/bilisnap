// 页面主逻辑js

// 加载jQuery
window.$ = window.jQuery = require('./js/vendor/jquery-2.1.4.min.js');

var bilidown = require('bilidown');
var biliass = require('biliass');

// 页面元素初始化
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
    var downloadBtn = $('#download');
    e.preventDefault();

    var pageUrl = $('#pageUrl').val();
    var pageNumber = parseInt($('#pageNumber').val());
    var saveDir = $('#saveDir').data('dirPath');

    // 下载过程中下载按钮禁用
    downloadBtn.attr('disabled','disabled');

    // 下载视频
    downloadVideo(pageUrl, pageNumber, saveDir, function(err){
      if(err) return console.error(err);
      // 下载弹幕
      downloadAss(pageUrl, pageNumber, saveDir, function(err){
        if(err) return console.error(err);

        // 下载完成，恢复下载按钮
        downloadBtn.removeAttr('disabled');
      });
    });
  });
});

// 下载弹幕
function downloadAss(pageUrl, pageNumber, saveDir, callback){
  biliass.downloadAss(pageUrl, pageNumber, saveDir, function(err){
    if(err) return console.error(err);
    displayStatus('字幕下载完成');

    callback(null);
  });
}

// 下载视频
function downloadVideo(pageUrl, pageNumber, saveDir, callback){
  // 调用bilidown模块下载视频

  // 要显示的文字
  var sentence = '';
  // 调用bilidown模块下载视频
  bilidown.downloadPageVideo(pageUrl, pageNumber, saveDir)
    .on('downloading', function(progress){
      var current = progress.current;
      var total = progress.total;

      // 显示新的进度语句
      sentence = '视频已下载：'+(current/total*100).toFixed(2)+'%';
      displayStatus(sentence);
    })
    .on('end', function(){
      sentence = '视频下载完成';
      displayStatus(sentence);

      callback(null);
    })
    .on('error', function(err){
      callback(err);
    });
}

function displayStatus(statusMsg){
  $('#status').text(statusMsg);
}
