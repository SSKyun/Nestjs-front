import React, { ChangeEvent, useState } from 'react'

const Weather = () => {
  const [city,setCity] = useState('seoul');
const getJSON = function(url:any, callback:any) {
  var XMLHttpRequest = require('xhr2');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    const status = xhr.status;
    if(status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f3ad5409e1dd7023e05cced6b1e0901b&units=metric`,
function Weather (err:any, data:any) {
  if(err !== null) {
    alert("정확한 도시명을 입력해주세요.");
  } else {
    console.log(
      `현재
    ${city}날씨는
    온도는 ${data.main.temp}°
    풍속은 ${data.wind.speed}m/s
    습도는 ${data.main.humidity}%
      입니다.
    오늘의
    최고기온은 ${data.main.temp_max}°
    최저기온은 ${data.main.temp_min}°
    입니다.`
    );
  }
})
const click = (event: React.MouseEvent<HTMLButtonElement>)=>{
  const input = document.getElementById('ip') as HTMLInputElement | null;
  // setCity("daegu")
  if(input != null){
    console.log(input.value);
    setCity(input.value);
  }else{
    alert("값이 없음.");
  }
}

return (
  <>
  <input type="text" placeholder="weather input" id="ip"/>
  <button onClick={click}>입력</button>
</> 

)
}

export default Weather;
