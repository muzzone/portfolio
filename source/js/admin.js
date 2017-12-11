import fileUpload from './upload';
import prepareSend from './prepareSend';

const formUpload = document.querySelector('#upload');
const formBlog = document.querySelector('#blog');

// formUpload.addEventListener('submit', prepareSendFile);
formBlog.addEventListener('submit', prepareSendPost);

// function prepareSendFile(e) {
//   e.preventDefault();
//   let resultContainer = formUpload.querySelector('.status');
//   let formData = new FormData();
//   let file = document
//     .querySelector('#file-select')
//     .files[0];
//   let name = document
//     .querySelector('#file-desc')
//     .value;

//   formData.append('photo', file, file.name);
//   formData.append('name', name);

//   resultContainer.innerHTML = 'Uploading...';
//   fileUpload('/admin/upload', formData, function (data) {
//     resultContainer.innerHTML = data;
//     formUpload.reset();
//   });
// }

function prepareSendPost(e) {
  e.preventDefault();
  let data = {
    title: formBlog.title.value,
    date: formBlog.date.value,
    text: formBlog.text.value
  };
  prepareSend('/admin/addpost', formBlog, data);
};

//////////////////NAV/////////////////////

var selected_A = $('#adminNav a');
var tab;
var href;
selected_A = selected_A[0];

var nav = document.getElementById('adminNav');
nav.onclick = function(event) {
  event.preventDefault();
  var target = event.target; // где был клик?
  if (target.tagName != 'A') return;

  changeTab(target);
};

function changeTab(node) {
  if (selected_A) {
  	href = selected_A.getAttribute('href')
  	tab = document.getElementsByClassName(href)
  	tab[0].classList.remove('activeTab');
    selected_A.classList.remove('active');
  }
  selected_A = node;
  href = selected_A.getAttribute('href')
  tab = document.getElementsByClassName(href)
  tab[0].classList.add('activeTab');
  selected_A.classList.add('active');
}

////////////////////////////////////////////
var windowHeight = window.innerHeight;
windowHeight = windowHeight - 140;
$('.tab').css('min-height', windowHeight);
$('.tabs').css('height', $('.tab').css('min-height'));
