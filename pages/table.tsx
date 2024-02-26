import { Table, Pagination } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [passengers, setPassengers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    fetchPassengers();
  }, [page, pageSize]);

  const fetchAllPassengers = async () => {
    try {
      const response = await axios.get(
        `https://api.instantwebtools.net/v1/passenger?page=0&size=${100}`
      );
      const { data } = response;
      const items = data.data;

      const allKey = items.map((item) => item._id);

      return allKey;
    } catch (error) {
      console.error("Error fetching airlines:", error);
    }
  };

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

  const handlePageChange = (page, pageSize) => {
    setPage(page - 1);
    setPageSize(pageSize);
  };

  const handleSelectChange = (selectedRowKeys, selected) => {
    console.log(selectedRowKeys);

    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    type: "checkbox",
    preserveSelectedRowKeys: true,
    selectedRowKeys,
    onChange: handleSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "all data",
        text: "Select All Data",
        onSelect: async () => {
          const data = await fetchAllPassengers();

          setSelectedRowKeys(data);
        },
      },
    ],
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Trips",
      dataIndex: "trips",
      key: "trips",
      sorter: true,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={passengers}
        pagination={false}
        rowKey="_id"
        rowSelection={rowSelection}
      />
      <Pagination
        current={page + 1}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
      />
    </>
  );
}
