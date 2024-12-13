import Layout from "@/components/layout";
import { Table, Space, Dropdown } from "antd/lib";
import type { TableColumnsType, TableProps } from "antd/lib";
import { SlOptions } from "react-icons/sl";
import Link from "next/link";
import { CiShare1 } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { useGetAllClass } from "./api";
import { capitalCase } from "change-case";
import { useState } from "react";

interface DataType {
  id: React.Key;
  title: string;
  materials_total: number;
  modules_total: number;
  desc: string;
  tags: string[] | null;
  status: string;
  studentCount: number;
}

const Class = () => {
  const items = [
    { key: "1", label: "View" },
    { key: "2", label: "Edit" },
    { key: "3", label: "Change Visibility" },
    { key: "4", label: "Delete" },
  ];

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const onExpand = (expanded: boolean, record: DataType) => {
    setExpandedRowKeys(expanded ? [record.id] : []);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend"],
      render: (text, record) => (
        <div className="flex flex-col gap-1 w-full">
          <Link
            href={`/dashboard/class/${record.id}`}
            className="text-blue-500 flex text-base items-center gap-2"
          >
            {text}
            <CiShare1 />
          </Link>
          <div className="flex gap-4 text-[12px] text-gray-500 items-center">
            <div>Materials: {record.materials_total}</div>
            <FaCircle className="w-[6px]" />
            <div>Modules: {record.modules_total}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (tags: string[] | null) => (
        <>
          {tags
            ? tags.map((tag, index) => (
                <span
                  key={index}
                  className="tag p-2 m-1 rounded-md border border-blue-500 bg-blue-100"
                >
                  {tag}
                </span>
              ))
            : "No tags"}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Public",
          value: "public",
        },
        {
          text: "Draf",
          value: "draf",
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text: string) => (
        <div
          className={`py-1 px-4 rounded-full text-center border ${
            text === "public"
              ? "bg-green-200 border-green-500"
              : "bg-red-200 border-red-500"
          }`}
        >
          {capitalCase(text)}
        </div>
      ),
    },
    {
      title: "Jumlah Student",
      dataIndex: "studentCount",
      sorter: (a, b) => a.studentCount - b.studentCount,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: () => (
        <Space size="middle">
          <Dropdown menu={{ items }}>
            <a>
              <SlOptions className="text-blue-400" />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const { data: classes } = useGetAllClass();

  const processedData: DataType[] =
    classes?.map((cls: any) => ({
      id: cls.id,
      title: cls.title,
      materials_total: parseInt(cls.materials_total, 10),
      modules_total: parseInt(cls.modules_total, 10),
      desc: cls.desc,
      tags: cls.tags,
      status: cls.status,
      studentCount: parseInt(cls.student_enrolled_total, 10),
    })) || [];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Layout>
      <div className="pt-4 pb-8">
        <h2 className="text-xl font-bold">Manage Class</h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-md shadow">
        <Table<DataType>
          columns={columns}
          dataSource={processedData}
          onChange={onChange}
          expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.desc}</p>,
            rowExpandable: (record) => record.title !== "Not Expandable",
            onExpand,
          }}
        //   expandedRowKeys={expandedRowKeys}
          className="min-w-full"
        />
      </div>
    </Layout>
  );
};

export default Class;
