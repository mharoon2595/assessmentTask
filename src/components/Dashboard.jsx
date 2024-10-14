import React, { useState, useEffect, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { fetchUsers, fetchWeatherData } from "./utils/api";
import UserTable from "./UserTable";
import WeatherChart from "./WeatherChart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import LoadingSpinner from "./utils/LoadingSpinner";
import { LocationContext } from "./utils/Context";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { location } = useContext(LocationContext);
  const [users, setUsers] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersData, weatherData] = await Promise.all([
          fetchUsers(),
          fetchWeatherData(location),
        ]);
        setUsers(usersData);
        setWeatherData(weatherData);
      } catch (err) {
        console.log(err);
        setError("Please enter the name of a valid city and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Dashboard Report", 14, 22);

    // Add user table
    doc.autoTable({
      head: [["ID", "Name", "Email"]],
      body: users.map((user) => [user.id, user.name, user.email]),
      startY: 30,
    });

    // Add weather chart
    const canvas = document.getElementById("weather-chart");
    if (canvas) {
      const chartImg = canvas.toDataURL("image/png");
      doc.addImage(
        chartImg,
        "PNG",
        14,
        doc.lastAutoTable.finalY + 10,
        180,
        100
      );
    }

    // Save the PDF
    doc.save(`${location}-forecast.pdf`);
  };

  if (loading)
    return (
      <div className=" relative flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  if (error) {
    return (
      <>
        <main className="h-[90vh] flex flex-col justify-center items-center gap-2">
          <div className="text-red-500 text-lg text-center">{error}</div>
          <button
            className="bg-yellow-500 p-3 rounded-md"
            onClick={() => navigate("/")}
          >
            Go back
          </button>
        </main>
      </>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Data</CardTitle>
          </CardHeader>
          <CardContent>
            <UserTable users={users} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Weather trends for{" "}
              <span className="font-extrabold">{location}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WeatherChart data={weatherData} />
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <button
          className="bg-blue-600 p-3 rounded-md text-white"
          onClick={handleExportPDF}
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
}
