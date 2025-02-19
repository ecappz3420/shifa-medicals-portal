"use client";
import { useSelector } from "react-redux";
const page = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="h-full">
      <iframe
        height="100%"
        width="100%"
        src={`https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/All_Products/g3HsXbAwvkqP7V9EbMHMeOr9En8fw5mN8TtyYFB4rT0Cj7fpaW541EVdz0KUFdRBSSHWbJzwsQ1jnu0Z5f5xexxQB60JmphfjSGK`}
      ></iframe>
    </div>
  );
};

export default page;
