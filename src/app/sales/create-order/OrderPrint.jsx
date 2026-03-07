import React, { forwardRef } from "react";
import dayjs from "dayjs";

const OrderPrint = forwardRef(
  ({ orderData, customers, products, salesExecutives, userObj }, ref) => {
    if (!orderData) return null;

    const customerObj = customers.find((c) => c.value === orderData.Customer);
    const customerName =
      customerObj?.label?.split(" - ")[1] || orderData.Customer_Name || "N/A";
    const contactNo = orderData.Customer || "N/A";
    const salesRep =
      salesExecutives.find((s) => s.value === orderData.Sales_Executive)
        ?.label || "N/A";

    // Format: DD/MM/YYYY hh:mm A
    const formatDate = (date) => dayjs(date).format("DD/MM/YYYY hh:mm A");

    return (
      <div
        ref={ref}
        className="bg-white text-black p-0 w-[104mm] mx-auto overflow-hidden font-sans uppercase"
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @media print {
            @page { 
              size: 104mm auto; 
              margin: 0; 
            }
            body { 
              margin: 0; 
              padding: 0; 
              width: 104mm; 
              -webkit-print-color-adjust: exact;
            }
          }
          .custom-underline {
            text-decoration: underline;
            text-underline-offset: 4px;
          }
        `,
          }}
        />

        <div className="px-6 py-6 text-[11px] leading-relaxed tracking-tight">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-4 text-center">
            <img
              src="/logo.png"
              alt="Shifa Logo"
              className="h-12 object-contain mb-2"
            />
            <div className="text-[14px] font-bold custom-underline mb-1">
              SHIFA MEDICAL MART
            </div>
            <div className="font-bold">
              NO 21-A, CHAIRMAN EKAMBARANAR STREET
            </div>
            <div className="font-bold">
              VEDHACHALAM NAGAR, CHENGALPATTU - 603001
            </div>
            <div className="font-bold">CONTACT NO: 04427433035</div>
          </div>

          <div className="border-b border-black w-full mb-4"></div>

          {/* Info Section */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-4">
            <div className="flex flex-col">
              <span className="font-bold">CUSTOMER NAME : {customerName}</span>
              <span className="font-bold">CONTACT NO : {contactNo}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">
                ORDER NO : {orderData.Bill_No || "PENDING"}
              </span>
              <span className="font-bold">
                DATE & TIME : {formatDate(new Date())}
              </span>
            </div>
          </div>

          <div className="border-b border-black w-full mb-4"></div>

          {/* Title Segment */}
          <div className="text-center font-bold text-[14px] custom-underline mb-4">
            DUE PRODUCTS RECEIPT
          </div>

          <div className="border-b border-black w-full mb-4"></div>

          {/* Items Table */}
          <table className="w-full mb-4">
            <thead>
              <tr className="text-left font-bold border-none">
                <th className="py-1 w-2/3">PRODUCT NAME</th>
                <th className="py-1 text-right">QTY.</th>
              </tr>
            </thead>
            <tbody>
              {(orderData.Items || []).map((item, idx) => (
                <tr key={idx} className="font-bold">
                  <td className="py-1 leading-tight">{item.Product}</td>
                  <td className="py-1 text-right align-top">{item.Quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-b border-black w-full mb-4"></div>

          {/* Bottom Info */}
          <div className="grid grid-cols-2 gap-x-2 mb-4">
            <div className="font-bold">SALES EXECUTIVE : {salesRep}</div>
            <div className="font-bold">DESCRIPTION : </div>
          </div>

          <div className="border-b border-black border-dashed w-full mb-4"></div>

          {/* Message Section */}
          <div className="text-center font-bold mb-4 px-2">
            WE WILL UPDATE THE ORDER STATUS THROUGH
            <br />
            WHATSAPP AND CALL
          </div>

          <div className="border-b border-black border-dashed w-full mb-4"></div>

          {/* Footer */}
          <div className="text-center font-bold">
            FOR DOOR DELIVERY, CONTACT: 9600753673.
          </div>
        </div>
      </div>
    );
  },
);

OrderPrint.displayName = "OrderPrint";
export default OrderPrint;
