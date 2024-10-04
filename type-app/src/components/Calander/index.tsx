import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";

export default function Index() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<StaticDateRangePicker
				slotProps={{
					actionBar: { actions: [] },
				}}
				defaultValue={[dayjs("2022-04-17"), dayjs("2022-04-21")]}
				onChange={e => console.log(e)}
			/>
		</LocalizationProvider>
	);
}
