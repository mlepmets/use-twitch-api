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
// online = document.querySelector('.online');
// offlineFilter.addEventListener('click', () => {
//   hideElements('online');
// });

// const hideElements = elements => {
//   for (index = 0; index < elements.length; index++) {
//     if (!element.classList.contains('hide')) {
//       elements[i].classList.add('hide');
//     }
//   }
// };

// const showElements = elements => {
//   for (index = 0; index < elements.length; index++) {
//     if (element.classList.contains('hide')) {
//       elements[i].classList.remove('hide');
//     }
//   }
// };
