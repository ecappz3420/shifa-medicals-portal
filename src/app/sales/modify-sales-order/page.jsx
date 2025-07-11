"use client";

import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="h-full">
      <iframe
        width="100%"
        height="100%"
        src={`https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/Sales_Order_Report/4jG2yaTK14G5tGGqbCNGmMv4sNjQ65Wqp4Q03n6Ge39JFerEes7zSsxWYNd0DCE9HGkwrkn0H6KzpDrkKmU6uxYQjrWOkX2Rm7VA?zc_DelRec=false&zc_AddRec=false&Branch=${user.Branch.zc_display_value}`}
      ></iframe>
    </div>
  );
};

export default page;
