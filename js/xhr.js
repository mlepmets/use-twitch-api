const users = ['ESL_SC2', 'FreeCodeCamp', 'thijshs'];
const userAPI =
  'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/users/';
const streamsAPI =
  'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/';

const container = document.querySelector('.main');
const onlineFilter = document.querySelector('.on-button');
const offlineFilter = document.querySelector('.off-button');
const allFilter = document.querySelector('.all-button');

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

users.forEach((value, index, array) => {
  let status = '';
  let name = value;
  let logo = '';
  let url = `https://www.twitch.tv/${value}`;
  container.innerHTML += ``;
  get(userAPI + value)
    .then(result => {
      logo = result.logo;
    })
    .then(() => {
      get(streamsAPI + value)
        .then(result => {
          if (result.stream === null) {
            status = 'offline';
          } else {
            status = result.stream.channel.status;
          }
        }) // callback hell ???
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
        })
        .then(() => {
          offlineElements = document.getElementsByClassName('offline');
          onlineElements = document.getElementsByClassName('online');

          onlineFilter.addEventListener('click', e => {
            showElements(onlineElements);
            hideElements(offlineElements);
          });
          offlineFilter.addEventListener('click', e => {
            showElements(onlineElements);
            hideElements(offlineElements);
          });
          allFilter.addEventListener('click', e => {
            showElements(onlineElements);
            showElements(offlineElements);
          });
        });
    });
});

const hideElements = elements => {
  for (index = 0; index < elements.length; index++) {
    if (!element.classList.contains('hide')) {
      elements[i].classList.add('hide');
    }
  }
};

const showElements = elements => {
  for (index = 0; index < elements.length; index++) {
    if (element.classList.contains('hide')) {
      elements[i].classList.remove('hide');
    }
  }
};
