let $form = document.querySelector('#form')

let formClose = document.querySelector('#formClose')
let formDate = document.querySelector('#formDate')
let formTime = document.querySelector('#formTime')
let formCoord = document.querySelector('#formCoord')
let formSnow = document.querySelector('#formSnow')
let formLed = document.querySelector('#formLed')
let formCars = document.querySelector('#formCars')
let formStages = document.querySelector('#formStages')
let formSave = document.querySelector('#formSave')

function timeTransform(time) {
  if (time < 10) {
    return `0${time}`
  } else {
    return time
  }
}

formClose.addEventListener('click', () => {
  closeForm()
})

formSave.addEventListener('click', (event) => {
  event.preventDefault()
  $form.classList.add('hide')

  command = {
    func: 'insertPoint',
    body: {
      coord: formCoord.value,
      snow: getTypeSnow(formSnow.value),
      ice: getIce(formLed.checked),
      carsCount: formCars.value,
    },
  }

  sendToApi(command)
})

function getTypeSnow(val) {
  switch (val) {
    case 'Тип 1':
      return 1
    case 'Тип 2':
      return 2
    case 'Тип 3':
      return 3
  }
}

function getIce(val) {
  if (val) return 1
  else return 0
}

async function sendToApi(data) {
  const url = '/php/api.php'

  try {
    const response = await fetch(url, {
      method: 'POST', // или 'PUT'
      body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.text()
    console.log('Успех:', json)
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

//<Работа с картой>
// ymaps.ready(init)

// async function init() {
//   let newPlacemark

//   const myMap = new ymaps.Map('map', {
//     center: [55.975553, 37.387598],
//     zoom: 14,
//   })

//   myMap.setType('yandex#hybrid')

//   //нажатие на карту
//   myMap.events.add('click', function (e) {
//     $form.classList.remove('hide')

//     var coords = e.get('coords')

//     setDateTime()

//     // Если метка уже создана – просто передвигаем ее.
//     if (newPlacemark) {
//       newPlacemark.geometry.setCoordinates(coords)
//     }
//     // Если нет – создаем.
//     else {
//       newPlacemark = createPlacemark(coords)
//       myMap.geoObjects.add(newPlacemark)
//     }

//     formCoord.value = coords
//   })

//   // const objectManager = new ymaps.ObjectManager({
//   //   gridSize: 32, //размер сетки кластеризации
//   // })

//   // myMap.geoObjects.add(objectManager)

//   //setPlacemarks(objectManager)
// }

// function createPlacemark(coords) {
//   return new ymaps.Placemark(coords)
// }

// //функция устанавливает метки на карту
// function setPlacemarks(objectManager) {
//   let checkFileCreate = setDataPlacemarks()

//   if (checkFileCreate) {
//     let url = '/js/dataPlacemarks.json?' + new Date().getSeconds()
//     // let response = await fetch(url)
//     // let data = await response.json()
//     console.log('Рисование меток на карту')
//     //console.log(data)

//     //await objectManager.add(data)

//     fetch(url).then(function (response) {
//       response.json().then(function (data) {
//         objectManager.add(data)
//       })
//     })
//   }
// }

const $map = document.querySelector('#map')
let numberImg = 1

const coordX = ['14', '15', '16', '17', '18', '19']
const coordYeng = ['zh', 'z', 'i', 'k', 'l']
const coordY = ['Ж', 'З', 'И', 'К', 'Л']

for (let i = 0; i < coordX.length; i++) {
  for (let j = 0; j < coordY.length; j++) {
    $map.insertAdjacentHTML('beforeend', setMapImg(numberImg, coordY[j], coordX[i]))
    numberImg++
  }
}

$map.addEventListener('click', (event) => {
  imgId = event.target.getAttribute('id')

  setDateTime()
  setCoord(imgId)

  openForm()
})

function setMapImg(num, x, y) {
  return `
    <img src="../img/map/image_part_${getNumberImg(num)}.jpg" id="${x + y}">
  `
}
function getNumberImg(num) {
  if (num < 10) {
    return `00${num}`
  } else if (num < 100) {
    return `0${num}`
  } else {
    return num
  }
}

function setDateTime() {
  let yearNow = new Date().getFullYear()
  let monthNow = timeTransform(new Date().getMonth() + 1)
  let dayNow = timeTransform(new Date().getDate())
  let dateNow = yearNow + '-' + monthNow + '-' + dayNow

  let hourNow = timeTransform(new Date().getHours())
  let minutNow = timeTransform(new Date().getMinutes())
  let timeNow = hourNow + ':' + minutNow

  formDate.value = dateNow
  formTime.value = timeNow
}

function setCoord(coord) {
  formCoord.value = coord
}

function openForm() {
  $form.classList.remove('hide')
}

function closeForm() {
  $form.classList.add('hide')
}
