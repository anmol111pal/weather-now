import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from './components/Card';
import Footer from "./components/Footer.jsx";

function App() {
	const [city, setCity] = useState("");
	const [data, setData] = useState({});
	const [text, setText] = useState("");
	const [temp, setTemp] = useState(0);
	const [real_temp, set_real_temp] = useState(0)
	const [windSpeed, setWindSpeed] = useState(0);
	const [humidity, setHumidity] = useState(0);
	const [precip, setPrecip] = useState(0);
	const [pressure, setPressure] = useState(0);
	const [UV, setUV] = useState(0)
	const [vis_km, set_vis_km] = useState(0)
	const [imgSrc, setImgSrc] = useState("")
	const [wind_dir, set_wind_dir] = useState("")

	const API_KEY = "0c108ef0a8ac44608d695943212508";
	let URL = "http://api.weatherapi.com/v1/current.json?key=" + API_KEY + "&q=";

	function showPos(pos) {
		const lat = pos.coords.latitude;
		const long = pos.coords.longitude;
		URL = "http://api.weatherapi.com/v1/current.json?key=" + API_KEY + "&q=" + lat + "," + long; // URL with latitude and longitude
		getData(URL);
	}

	useEffect(() => {
		console.log("Fetching data based on current location")
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPos);
		}

	}, []);

	const handleInput = () => {
		if (city !== "") {
			URL = "http://api.weatherapi.com/v1/current.json" + "?key=" + API_KEY + "&q=" + city;
			getData(URL);
		}
		else {
			console.log("Provide a city name first...");
		}
	}

	const handleChange = (e) => {
		setCity(e.target.value);
	}

	async function getData(URL) {
		const res = await axios.get(URL);
		setData(res.data);
	}

	useEffect(() => {
		if (JSON.stringify(data) !== JSON.stringify({})) {
			console.log("City name: ", data.location.name);
			setTemp(data.current.temp_c || NaN)
			setPressure(data.current.pressure_mb || NaN)
			setPrecip(data.current["precip_mm"] || 0)
			setText(data.current.condition.text)
			setHumidity(data.current.humidity || 0)
			setWindSpeed(data.current.wind_kph || 0)
			set_real_temp(data.current.feelslike_c)
			setUV(data.current.uv)
			set_vis_km(data.current.vis_km)

			let icon = (data.current.condition.icon).substring(2)
			icon = "https://" + icon;
			setImgSrc(icon)
			set_wind_dir(data.current.wind_dir)
		}
	}, [data]);

	return (
		<>
			<section className="main">
				<section className="left-sec">
					<h1 className="heading">Weather Now </h1>
				</section>

				<section className="right-sec">
					<input type="text" id="city-name" onChange={handleChange} value={city} />
					<button onClick={handleInput} id="btn">Search</button>
				</section>
			</section>

			<div className="outer">

				<div className="report">
					<img src={imgSrc} alt={text} style={{ "width": "84px", "height": "84px" }} />
					<h2>{text}</h2>


				</div>
				<section className="grid">

					<Card title="Temperature" value={temp} unit="degree C" />

					<Card title="Real Feel Temperature" value={real_temp} unit="degree C" />

					<Card title="Pressure" value={pressure} unit="mm Hg" />

					<Card key="three" title="Humidity" value={humidity} />

					<Card title="Precipitation" value={precip} unit="mm" />

					<Card title="Wind Speed" value={windSpeed} unit="kph" />

					<Card title="Wind Direction" value={wind_dir} unit="" />

					<Card title="UV Index" value={UV} unit="" />
				</section>

				<Footer />

			</div>

		</>
	);
}

export default App;
