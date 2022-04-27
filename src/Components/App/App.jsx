import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react'
import axios from 'axios';

export default class App extends Component {

  state ={
    weather :{
      countryName : '',
      city:'',
      temprature : '',
      weatherDesc :'',
      pressure :'',
      humidity : ''
  }
}
  
   cityname =''
  getRes = async (cityNameEnrted) =>{
    let newObject ={}
    if (this.cityname) {
   let res= await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityNameEnrted}%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44`);
   
   newObject=this.state.weather;
   newObject.city= res.data.name;
   newObject.countryName=res.data.sys.country;
   newObject.temprature = res.data.main.temp_max;
   newObject.pressure = res.data.main.pressure;
   newObject.weatherDesc = res.data.weather[0].description;
   newObject.humidity = res.data.main.humidity;
 }
  else {
         newObject={};
      }
  this.setState({ weather : newObject   })
}
  
SelectedFun = (e) =>{
  this.cityname = e.target.value;
}
  render() {
    return (
      <>
      <div className='p-5 m-auto w-40 form overflow-auto'>
        <div className='text-center text-main-color font-family fw-bold'><h2 className='fs-h2'>Weather App</h2></div>
        <select name="list" className="form-select my-3" aria-label="Default select example" onChange={this.SelectedFun}>
          <option value=''>CHOOSE</option>
          <option value="Cairo">Cairo</option>
          <option value="Èze">Èze</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Beirut">Beirut</option>
          <option value="Riyadh">Riyadh</option>
          <option value="Ankara">Ankara</option>
        </select>
        <button onClick={  () => this.getRes(this.cityname)} className='btn text-uppercase my-3 px-sm-4 py-sm-3 fw-bold '>get Weather</button><br />
  
        {this.cityname ? 
           <div className='text-main-color fs-Rec fw-bold pt-2'>
             <p>Lacation : <span className=' fw-normal'>{this.state.weather.city} , {this.state.weather.countryName}</span></p>
             <p>temprature : <span className=' fw-normal'>{Math.floor(this.state.weather.temprature)} </span></p>
             <p>Description : <span className=' fw-normal'>{this.state.weather.weatherDesc} </span></p>
             <p>Pressure : <span className=' fw-normal'>{this.state.weather.pressure} </span></p>
             <p>humidity : <span className=' fw-normal'>{this.state.weather.humidity} </span></p>
            </div>
            : `` }
      </div>
      </>
    )
  }
}
