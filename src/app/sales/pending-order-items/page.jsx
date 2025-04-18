"use client";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="h-full">
      <iframe
        height="100%"
        width="100%"
        src={`https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/Pending_Sales_Order_Items/Dbbk2WJXPH90C7QpxXaas8qVwHygx3H9Za2GTn6GN8pmaGM3G9hEq9HUemdThUSjvQXzeRRyrr2eea1xshCm6tMkWryfFtM94tCa?zc_AddRec=true&Sales_Order.Branch=${user.Branch.zc_display_value}`}
      ></iframe>
    </div>
  );
};

export default page;
