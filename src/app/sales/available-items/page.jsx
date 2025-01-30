"use client";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="h-full">
      <iframe
        height="100%"
        width="100%"
        name="Available_Orders"
        src={`https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/Available_Orders/wXRvssE1syJzhPFFs1nnAbVjyu7xxFDX5Z7RtddMQTq8rGgV4EtgO7wPYFG0urqO9NNuYdpqmGedVKVVR5QTHf06n3D4t20OuBnK?zc_AddRec=false&Sales_Order.Branch=${user.Branch.zc_display_value}`}
      ></iframe>
    </div>
  );
};

export default page;
