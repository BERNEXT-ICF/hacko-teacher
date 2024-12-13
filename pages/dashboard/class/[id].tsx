import { useEffect, useState } from "react";
import { useGetDetailsClass, useUpdateClass } from "../../../api/class/api";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { FaSave } from "react-icons/fa";
import type { RadioChangeEvent } from "antd/lib";
import { Radio, Space } from "antd/lib";
import { Image } from "antd/lib";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const DetailsClass = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [statusVisibility, setStatusVisibility] = useState<string>("");
  const router = useRouter();
  const { id } = router.query;

  const { data: classDetails } = useGetDetailsClass(id ?? "");
  const {mutate, isLoading, isError} = useUpdateClass(id)

  useEffect(() => {
    if (classDetails) {
      setTitle(classDetails?.title ?? "");
      setDesc(classDetails?.desc ?? "");
      setImage(classDetails?.image ?? "");
      setVideo(classDetails?.video ?? "");
      setStatusVisibility(classDetails?.status ?? "public");
    }
  }, [classDetails]);

  console.log(classDetails);

  const onChangeVisibility = (e: RadioChangeEvent) => {
    setStatusVisibility(e.target.value);
  };

  const handleUpdateClass = () => {
    mutate({
      title,
      desc,
      image,
      video,
      status: statusVisibility,
    });
  };

  const convertToEmbedUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (
        urlObj.hostname === "www.youtube.com" &&
        urlObj.searchParams.has("v")
      ) {
        const videoId = urlObj.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (urlObj.hostname === "youtu.be") {
        const videoId = urlObj.pathname.substring(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    } catch (error) {
      console.error("Invalid URL:", error);
      return url;
    }
  };

  return (
    <Layout>
      <div className="header flex flex-col gap-3">
        <div>Breadcrumb</div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Details Class</h1>
          <button
            onClick={handleUpdateClass}
            className="bg-blue-500 border border-blue-600 text-white py-2 px-4 font-semibold flex items-center gap-2 rounded"
          >
            <FaSave />
            Update Class
          </button>
        </div>
      </div>
      <div>
        <div>
          <div className="body flex flex-col md:flex-row mt-6">
            <div className="left body flex flex-col gap-4 bg-white w-full p-4 border border-gray-200 rounded">
              <h2 className="font-semibold border-b border-gray-300 pb-4 text-lg">
                Description Class
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Title Class
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded py-2 px-4"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="font-semibold">
                    Description Class
                  </label>
                  <ReactQuill
                    value={desc}
                    onChange={(value) => setDesc(value)}
                    theme="snow"
                    className="border rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="body flex flex-col md:flex-row mt-6">
            <div className="left body flex flex-col gap-4 bg-white w-full p-4 border border-gray-200 rounded">
              <h2 className="font-semibold border-b border-gray-300 pb-4 text-lg">
                Overview Media
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Link Image Thumbnail Class
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="border rounded py-2 px-4"
                  />
                  {image && (
                    <Image
                      src={image}
                      alt="Preview Thumbnail"
                      className="mt-4 w-full h-auto rounded border border-gray-300"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Link Video Class
                  </label>
                  <input
                    type="text"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                    className="border rounded py-2 px-4"
                  />
                  {video && (
                    <iframe
                      width="100%"
                      height="315"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      src={convertToEmbedUrl(video)}
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="body flex flex-col md:flex-row mt-6">
          <div className="left body flex flex-col gap-4 bg-white w-full p-4 border border-gray-200 rounded">
            <h2 className="font-semibold border-b border-gray-300 pb-4 text-lg">
              Details Class
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Visibility
                </label>
                <Radio.Group
                  onChange={onChangeVisibility}
                  value={statusVisibility}
                >
                  <Space direction="vertical">
                    <Radio value="public">Public</Radio>
                    <Radio value="draf">Draf</Radio>
                  </Space>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailsClass;
