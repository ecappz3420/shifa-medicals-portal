'use client'

import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector(state => state.user.user);
  return (
    <div className="h-full">
      <iframe
        height="100%"
        width="100%"
        src={`https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/Customer_Not_Reachable/zaJAgavWfVNTxp1AJ9MYfdAa2pQg2T4uQqnGkb0Y0nb2zw8JnRsQwXWfAMK2C3Jvpt6RpxvaHjyW2bUbB0dXEuGmre8kkAkrO1HM?zc_AddRec=false&Sales_Order.Branch=${user.Branch.zc_display_value}`}
      ></iframe>
    </div>
  );
};

export default page;
