'use client'
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="h-full">
      <iframe
        height="100%"
        width="100%"
        src={`https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/Sales_Order_Items_Report/zvENVm4KmYk4rXWODZaEDfAgzZ16kRCgev363Ht4YesHvpCVsUsNXuuFhWhfT9XWD4TnRZPMr9ZSep5fG3KZ3Je6K8NFgBx1vXBf?zc_AddRec=false&Sales_Order.Branch=${user.Branch.zc_display_value}`}
      ></iframe>
    </div>
  );
};

export default page;
