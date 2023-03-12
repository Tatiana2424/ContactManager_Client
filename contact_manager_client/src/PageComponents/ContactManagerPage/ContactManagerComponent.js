import "./ContactManagerPage.css";
import React, { useEffect, useState } from "react";
import { Table, Input, Button, Modal, DatePicker, Select } from "antd";
import UploadFileCSV from "./UploadFileCSV";

export const ContactManagerComponent = () => {
  const [contactData, setContactData] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleOk = () => {
    updateContactData(selectedRecord.id, updatedData);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    fetch("https://localhost:5001/api/contactData/GetAll")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setContactData(data);
      });
  }, []);
  function deleteContactData(id) {
    fetch(`https://localhost:5001/api/contactData/Delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(`ContactData with ID ${id} deleted successfully.`);
        setContactData(contactData.filter((record) => record.id !== id)); // update state
      })
      .catch((error) => {
        console.error(`Error while deleting ContactData with ID ${id}:`, error);
      });
  }

  function updateContactData(id, updatedData) {
    console.log(updatedData);
    fetch(`https://localhost:5001/api/contactData/Update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(`ContactData with ID ${id} updated successfully.`);
        const updatedContactData = contactData.map((contact) => {
          if (contact.id === id) {
            return { ...contact, ...updatedData };
          } else {
            return contact;
          }
        });
        setContactData(updatedContactData);
      })
      .catch((error) => {
        console.error(`Error while updating ContactData with ID ${id}:`, error);
      });
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1,
      },
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
      sorter: {
        compare: (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth),
        multiple: 1,
      },
    },
    {
      title: "Married",
      dataIndex: "married",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: {
        compare: (a, b) => a.phone - b.phone,
        multiple: 1,
      },
    },
    {
      title: "Salary",
      dataIndex: "salary",
      sorter: {
        compare: (a, b) => a.salary - b.salary,
        multiple: 1,
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div id={`record-${record.id}`}>
          <a
            className="action"
            onClick={() => {
              setSelectedRecord(record);
              setUpdatedData(record);
              setIsModalVisible(true);
            }}
          >
            Update
          </a>
          <a onClick={() => deleteContactData(record.id)}>Delete</a>
        </div>
      ),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <div className="header_container">
        <div className="header_title">Contact Manager</div>
        <UploadFileCSV />
      </div>
      <div className="table_component">
        <Table columns={columns} dataSource={contactData} onChange={onChange} />
      </div>

      <Modal
        title="Update Contact Data"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <p className="input">Enter a name</p>
        <Input
          placeholder="Name"
          value={updatedData.name}
          onChange={(e) => {
            setUpdatedData({ ...updatedData, name: e.target.value });
            console.log(e.target.value);
          }}
        />
        <p className="input">Enter your date of birth</p>
        <DatePicker
          onChange={(date, dateString) => {
            console.log(date, dateString);
            setUpdatedData({ ...updatedData, dateOfBirth: dateString });
          }}
        />
        <p className="input">You are married?</p>
        <Select
          defaultValue={updatedData.married}
          style={{ width: 120 }}
          allowClear
          onChange={(e) => {
            setUpdatedData({ ...updatedData, married: e.target.value });
            console.log(e.target.value);
          }}
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
        />
        <p className="input">Enter a phone number</p>
        <Input
          placeholder="Phone"
          value={updatedData.phone}
          onChange={(e) => {
            setUpdatedData({ ...updatedData, phone: e.target.value });
            console.log(e.target.value);
          }}
        />
        <p className="input">Enter your salary</p>
        <Input
          placeholder="Salary"
          value={updatedData.salary}
          onChange={(e) => {
            setUpdatedData({ ...updatedData, salary: e.target.value });
            console.log(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};
