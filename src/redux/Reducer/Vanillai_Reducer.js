import { Vanillai } from "../Types/Vanillai_Types";
let weather_report = {
	report: [],
};
export const VanillaiReducer = (values = weather_report, action) => {
	switch (action?.type) {
		case Vanillai.SET_WEATHER_REPORT:
			return { report: action.payload };
		default:
			return { values: values };
	}
};
