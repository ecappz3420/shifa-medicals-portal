"use client";
import { Button } from "antd";
import { useSelector } from "react-redux";
const page = () => {
  const user = useSelector((state) => state.user.user);
  const handleClear = (e) => {
    e.preventDefault(); // Prevent full-page reload
    const report = document.querySelector("iframe[name='my-orders']");
    if (report) {
      report.src = `https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/My_Orders/f9RVF0HJZ85rAJ9HOXnGk0QOYKuJQSZMxbu6uUKv8qMEr5kabnFtRYw83VDe7AFCBeQVrRxT2dGy74tdEpg69xa5M9vrUEm04NwB?zc_Header=false&Branch=${user?.Branch?.zc_display_value}&Sales_Order.Added_Time_op=32`;
    }
    const form = document.querySelector("iframe[name='search-phone']");
    if (form) {
      form.src = `https://creatorapp.zohopublic.in/shifaumar421/order-management/form-embed/Search_Phone?privatelink=rbauj691sbRVYCX9vxXJzhzdOBxvswTn7RXbT68mXC986Bkg48kn6XQ41K75dB9406bjDmE9s7dQAwB6hdWC67Fg4p2AKqCCNQz7&zc_Header=false&zc_Footer=false&zc_BdrClr=white&Branch=${user?.Branch?.ID}&Phone_Number=`;
    }
  };
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end items-center">
        <div>
          <Button type="primary" onClick={handleClear}>
            Clear
          </Button>
        </div>
        <iframe
          height="80px"
          width="300px"
          className="border-0 overflow-hidden"
          name="search-phone"
          src={`https://creatorapp.zohopublic.in/shifaumar421/order-management/form-embed/Search_Phone?privatelink=rbauj691sbRVYCX9vxXJzhzdOBxvswTn7RXbT68mXC986Bkg48kn6XQ41K75dB9406bjDmE9s7dQAwB6hdWC67Fg4p2AKqCCNQz7&zc_Header=false&zc_Footer=false&zc_BdrClr=white&Branch=${user?.Branch?.ID}`}
        >
          Loading Form...
        </iframe>
      </div>
      <div className="flex-1">
        <iframe
          name="my-orders"
          height="100%"
          width="100%"
          src={`https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/My_Orders/f9RVF0HJZ85rAJ9HOXnGk0QOYKuJQSZMxbu6uUKv8qMEr5kabnFtRYw83VDe7AFCBeQVrRxT2dGy74tdEpg69xa5M9vrUEm04NwB?zc_Header=false&Branch=${user?.Branch?.zc_display_value}&Sales_Order.Added_Time_op=32`}
        ></iframe>
      </div>
    </div>
  );
};

export default page;
