'use client'

import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector(state => state.user.user);
  return (
    <div className="h-full">
      <iframe
        height="100%"
        width="100%"
        src={`https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/Waiting_for_Home_Delivery/PYYHV5FRKWxVsq4U46UTuwvg1yY9RKreu2aFF3w73hJArH47GhWfqQQAjpg0j5BNf18bBw1BjWzMB93KH6QXEJ7WwpEHuMQePnHO?zc_AddRec=false&Sales_Order.Branch=${user.Branch.zc_display_value}`}
      ></iframe>
    </div>
  );
};

export default page;
