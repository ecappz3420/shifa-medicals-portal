'use client'

import { useSelector } from "react-redux";

const Page = () => {
  const user = useSelector(state => state.user.user);
  return (
    <div className="h-full">
      <iframe
        height="100%"
        width="100%"
        src={`https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/Delivered_Orders/KKUVs0Brsq5NGqEUDqX563AqUqP82vKNEn5F3FTPddG9WuVyaWuB2syVdrUkFYZNNU0PwYbOAH4yCd3pETMCKYjnPJ5GEWGzsWBj?zc_AddRec=false&Sales_Order.Branch=${user.Branch.zc_display_value}`}
      ></iframe>
    </div>
  );
};

export default Page;
