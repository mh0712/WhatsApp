import React, { useState, useEffect } from "react";
import { Modal, Input, Avatar, Button, Select, ConfigProvider } from "antd";
import "./GroupCreationPopup.css";

const { Option } = Select;

const filterMembers = (memberList, searchTerm) => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return memberList.filter((member) => {
    const lowerCaseName = member.name.toLowerCase();
    const lowerCaseUid = member.uid.toLowerCase();
    return (
      lowerCaseName.includes(lowerCaseSearchTerm) ||
      lowerCaseUid.includes(lowerCaseSearchTerm)
    );
  });
};

const GroupCreationPopup = ({ open, onClose, onCreateGroup, memberList }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (Array.isArray(memberList)) {
      setFilteredMembers(filterMembers(memberList, searchTerm));
    } else {
      console.error("Member list is not an array:", memberList);
      setFilteredMembers([]);
    }
  }, [searchTerm, memberList]);

  const handleCreateGroup = () => {
    if (groupName && selectedMembers.length > 0) {
      onCreateGroup(groupName, selectedMembers);
      onClose();
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadiusLG: 0,
        },
        components: {
          Input: {
            hoverBorderColor: "#128c7e",
            activeBorderColor: "#128c7e",
          },
          Modal: {
            footerBg: "#F5F5F5",
          },
          Select: {
            optionSelectedBg: "rgba(0, 0, 0, 0.1)",
          },
        },
      }}
    >
      <Modal
        visible={open}
        onCancel={onClose}
        centered
        destroyOnClose
        footer={null}
      >
        <div className="GroupCreationPopup">
          <h2 className="GroupCreationPopup-title">Create a New Group</h2>
          <div className="GroupCreationPopup-content">
            <Input
              placeholder="Enter Group Name"
              value={groupName}
              count={{
                show: true,
                max: 25,
              }}
              onChange={(e) => setGroupName(e.target.value)}
              className={`GroupCreationPopup-textarea input-custom`}
              required
            />

            <Select
              mode="multiple"
              className={`GroupCreationPopup-select select-custom`}
              placeholder="Select Members"
              optionLabelProp="label"
              value={selectedMembers}
              onChange={(value) => setSelectedMembers(value)}
              showSearch
              onSearch={(value) => setSearchTerm(value)}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              popupClassName="memberList_style"
              maxTagCount={5}
            >
              {filteredMembers.map((option) => (
                <Option key={option.uid} label={option.name} value={option.uid}>
                  <Avatar size="small" src={option.avatarUrl} /> {option.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="GroupCreationPopup-footer">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={handleCreateGroup}>
              Create Group
            </Button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default GroupCreationPopup;
