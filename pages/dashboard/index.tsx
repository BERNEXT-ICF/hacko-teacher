import Layout from "@/components/layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-md hover:shadow-lg">
          <h2 className="text-lg font-semibold">Card Title</h2>
          <p className="mt-2 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow-md hover:shadow-lg">
          <h2 className="text-lg font-semibold">Card Title</h2>
          <p className="mt-2 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow-md hover:shadow-lg">
          <h2 className="text-lg font-semibold">Card Title</h2>
          <p className="mt-2 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </Layout>
  );
}
