const users = ['ESL_SC2', 'FreeCodeCamp', 'thijshs'];
const userAPI =
  'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/users/';
const streamsAPI =
  'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/';

const container = document.querySelector('.main');
let onlineFilter = document.querySelector('.on-button');
let offlineFilter = document.querySelector('.off-button');
let allFilter = document.querySelector('.all-button');

function get(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.onload = () => {
      console.log('success');
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(Error(xhr.statusText));
    };
    xhr.send();
  });
}
function hideElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    if (!elements[i].classList.contains('hide')) {
      elements[i].classList.add('hide');
    }
  }
}
function showElements(elements) {
  for (i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains('hide')) {
      elements[i].classList.remove('hide');
    }
  }
}
users.forEach((value, index, array) => {
  let status = '';
  let name = value;
  logo = '';
  let url = `https://www.twitch.tv/${value}`;
  container.innerHTML += ``;

  get(userAPI + value).then(result => (logo = result.logo));

  get(streamsAPI + value)
    .then(result => {
      if (result.stream === null) {
        status = 'offline';
      } else {
        status = result.stream.channel.status;
      }
    })
    .then(() => {
      container.innerHTML += `<a href="${url}" class="${status !== 'offline'
        ? 'online'
        : status}">
      <div class="logo">
      <img src="${logo}" alt="channel logo">
      </div>
      <div>
      <div class="name">${name}</div>
      <div class="status">${status}</div>
      </div>
      </a>`;
    });
});
offlineUsers = document.getElementsByClassName('offline');
onlineUsers = document.getElementsByClassName('online');

onlineFilter.addEventListener('click', function() {
  showElements(document.getElementsByClassName('online'));
  hideElements(document.getElementsByClassName('offline'));
});

offlineFilter.addEventListener('click', function() {
  hideElements(onlineUsers);
  showElements(offlineUsers);
});
allFilter.addEventListener('click', function() {
  showElements(onlineUsers);
  showElements(offlineUsers);
});
