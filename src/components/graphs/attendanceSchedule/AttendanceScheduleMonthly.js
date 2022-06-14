import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  getAttendanceReportMonthlyCottage,
  getAttendanceReportMonthlyShip,
  getAttendanceReportMonthlyAdventure,
} from "../../../services/ReservationService";
import { useState, useEffect } from "react";
import { getRoleFromToken } from "../../../app/jwtTokenUtils";
import { userType } from "../../../app/Enum";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Attendance report weekly",
    },
  },
};

const backgroundColor = [
  "#E9D5CA",
  "#99C4C8",
  "#F4BFBF",
  "#FAF0D7",
  "#827397",
  "#C2DED1",
  "#C4DDFF",
  "#F47C7C",
  "#FFF2F2",
  "#e3cab5",
];
const borderColor = [
  "#d9b7a5",
  "#6aa9af",
  "#ed9292",
  "#f4dda4",
  "#706284",
  "#acd2c1",
  "#99c3ff",
  "#f25a5a",
  "#FAD4D4",
  "#d6af8f",
];

export default function AttendanceReportMonthly({ value }) {
  const [offerData, setOffereData] = React.useState();
  let data = {};
  let getReportData = {
    [userType.COTTAGE_OWNER]: getAttendanceReportMonthlyCottage,
    [userType.SHIP_OWNER]: getAttendanceReportMonthlyShip,
    [userType.INSTRUCTOR]: getAttendanceReportMonthlyAdventure,
  };
  useEffect(() => {
    async function setData() {
      let role = getRoleFromToken();
      const dataForReport = await getReportData[role](value);
      setOffereData(dataForReport ? dataForReport.data : {});
      return dataForReport;
    }
    setData();
  }, []);

  if (!!offerData) {
    let set = [];
    let i = 0;
    offerData.map((report) => {
      set.push({
        label: report.offerName,
        data: report.vales,
        borderColor: borderColor[i],
        backgroundColor: backgroundColor[i],
      });
      i += 1;
    });
    let labels = offerData.map((report) => report.dates)[0];
    data = {
      labels,
      datasets: set,
    };
    return (<Bar options={options} data={data} />);
  }else return null;
}
