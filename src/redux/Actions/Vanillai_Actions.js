import { Vanillai } from "../Types/Vanillai_Types";

export const setWeatherReport = (values) =>{
	return{
		type:Vanillai.SET_WEATHER_REPORT,
		payload:values,
	};
};