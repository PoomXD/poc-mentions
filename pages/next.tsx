import { Table, Pagination } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [passengers, setPassengers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPassenger, setCurrentPassenger] = useState(null);

  useEffect(() => {
    fetchPassengers();
  }, [page, pageSize]);

  useEffect(() => {
    if (passengers.length > 0) {
      fetchPassengerDetails(passengers[currentIndex]._id);
    }
  }, [currentIndex, passengers]);

  const fetchPassengers = async () => {
    try {
      const response = await axios.get(
        `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${pageSize}`
      );
      const { data, totalPages, totalPassengers } = response.data;
      setPassengers(data);
      setTotalItems(totalPassengers);
    } catch (error) {
      console.error("Error fetching passengers:", error);
    }
  };

  const fetchPassengerDetails = async (id) => {
    try {
      const response = await axios.get(`https://api.instantwebtools.net/v1/passenger/${id}`);
      const passenger = response.data;
      setCurrentPassenger(passenger);
    } catch (error) {
      console.error("Error fetching passenger details:", error);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page - 1);
    setPageSize(pageSize);
    setCurrentIndex(0); // Reset currentIndex to 0 when changing the page
  };

  const handleNextItem = () => {
    if (currentIndex < passengers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (page < totalItems / pageSize - 1) {
      setPage(page + 1);
      setCurrentIndex(0);
    }
  };

  const handlePreviousItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (page > 0) {
      setPage(page - 1);
      setCurrentIndex(pageSize - 1);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trips",
      dataIndex: "trips",
      key: "trips",
    },
  ];

  const modifiedPassengers = passengers.map((passenger, index) => ({
    ...passenger,
    index: page * pageSize + index + 1, // Adding index property starting from 1
  }));

  return (
    <>
      <div>
        <button onClick={handlePreviousItem} disabled={currentIndex === 0 && page === 0}>
          Previous Item
        </button>
        <button
          onClick={handleNextItem}
          disabled={currentIndex === passengers.length - 1 && page === totalItems / pageSize - 1}
        >
          Next Item
        </button>
      </div>
      {currentPassenger && (
        <div>
          <h2>{currentPassenger.name}</h2>
          <p>Trips: {currentPassenger.trips}</p>
          {/* Display other details of the current passenger */}
        </div>
      )}
      <Table columns={columns} dataSource={modifiedPassengers} pagination={false} rowKey="_id" />
      <Pagination
        current={page + 1}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
      />
    </>
  );
}
