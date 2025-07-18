"use client";

import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="h-full">
      <iframe
        width="100%"
        height="100%"
        src={`https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/Modify_Sales_Order/Y6pCCbXs82N66rj1ObxrAwk1BaH113wYrGUDm7kAe6yPZAX6Y7SU5QqSZTVAPGEZNvXgZkPmPrBpmOQwNKKATwyzsQBE0KjaXWjD?zc_DelRec=false&zc_AddRec=false&Branch=${user.Branch.zc_display_value}`}
      ></iframe>
    </div>
  );
};

export default page;
