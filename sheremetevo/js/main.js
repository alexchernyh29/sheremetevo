//<Работа с картой>
ymaps.ready(init)

async function init() {
  let newPlacemark

  const myMap = new ymaps.Map('map', {
    center: [55.975553, 37.387598],
    zoom: 14,
  })

  myMap.setType('yandex#hybrid')

  myMap.events.add('click', function (e) {
    if (true) {
      var coords = e.get('coords')

      // Если метка уже создана – просто передвигаем ее.
      if (newPlacemark) {
        newPlacemark.geometry.setCoordinates(coords)
      }
      // Если нет – создаем.
      else {
        newPlacemark = createPlacemark(coords)
        myMap.geoObjects.add(newPlacemark)
      }

      inputCoord.value = coords
    }
  })

  // const objectManager = new ymaps.ObjectManager({
  //   gridSize: 32, //размер сетки кластеризации
  // })

  // myMap.geoObjects.add(objectManager)

  //setPlacemarks(objectManager)
}

function createPlacemark(coords) {
  return new ymaps.Placemark(coords)
}

//функция устанавливает метки на карту
function setPlacemarks(objectManager) {
  let checkFileCreate = setDataPlacemarks()

  if (checkFileCreate) {
    let url = '/js/dataPlacemarks.json?' + new Date().getSeconds()
    // let response = await fetch(url)
    // let data = await response.json()
    console.log('Рисование меток на карту')
    //console.log(data)

    //await objectManager.add(data)

    fetch(url).then(function (response) {
      response.json().then(function (data) {
        objectManager.add(data)
      })
    })
  }
}
