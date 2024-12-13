import { useState } from "react";
import Layout from "@/components/layout";
import { Input, Button, Select, Form, message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { useCreateClass } from "../../../../api/class/api";
import { CreateClassPayload } from "../../../../api/class/api";

const { TextArea } = Input;
const { Option } = Select;

const CreateClass = () => {
  const { mutate, isLoading, isError } = useCreateClass();

  const onFinish = (values: CreateClassPayload) => {
    const payload = {
      title: values.title,
      description: values.description,
      status: values.status,
      image: values.image,
      video: values.video,
    };
    mutate(payload);
  };

  return (
    <Layout>
      <div className="pt-4 pb-8">
        <h2 className="text-xl font-bold">Create New Class</h2>
      </div>
      <div className="bg-white p-6 rounded-md shadow">
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ status: "draf" }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input the class title!" },
            ]}
          >
            <Input placeholder="Enter class title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the class description!",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Enter class description" />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item
            label="Video URL"
            name="video"
            rules={[{ required: true, message: "Please input the video URL!" }]}
          >
            <Input placeholder="Enter video URL" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select>
              <Option value="draf">Draf</Option>
              <Option value="public">Public</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Create Class
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateClass;
