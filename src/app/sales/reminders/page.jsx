"use client";
import { useSelector } from "react-redux";
const page = () => {
  const user = useSelector((state) => state.user.user);

  if (user.Role == "Manager") {
    return (
      <div className="h-full">
        <iframe
          height="100%"
          width="100%"
          src="https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/All_Reminders/OpJP80JYYeQysakVazCE1JpvrpBTCa1s6dqPXWfmhh5R8twaHxZmWMHUZsAOzaCBKPW7D5s28S1anzmG8ABEtwV62hbs8KdGvW5Z?zc_ReportName=false&zc_AddRec=true&zc_MoreAction=false"
        ></iframe>
      </div>
    );
  }
  return (
    <div className="h-full">
      <iframe
        height="100%"
        width="100%"
        src="https://creatorapp.zohopublic.in/shifaumar421/order-management/report-embed/All_Reminders/OpJP80JYYeQysakVazCE1JpvrpBTCa1s6dqPXWfmhh5R8twaHxZmWMHUZsAOzaCBKPW7D5s28S1anzmG8ABEtwV62hbs8KdGvW5Z?zc_ReportName=false&zc_AddRec=true&zc_MoreAction=false&zc_DelRec=false"
      ></iframe>
    </div>
  );
};

export default page;
