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

    const dateOnly = dayjs(new Date()).format("DD/MM/YYYY");
    const timeOnly = dayjs(new Date()).format("hh:mm A");

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
          <div className="flex justify-between items-start mb-4 border-b-2 border-slate-200 pb-4">
            <div className="w-1/3 flex items-start">
              <img
                src="/logo.png"
                alt="Shifa Logo"
                className="h-16 object-contain"
              />
            </div>
            <div className="w-2/3 flex flex-col items-end text-right">
              <div className="text-[14px] font-bold custom-underline mb-1 whitespace-nowrap">
                SHIFA MEDICAL MART
              </div>
              <div className="font-bold text-[9px] whitespace-nowrap">
                NO 21-A, CHAIRMAN EKAMBARANAR STREET
              </div>
              <div className="font-bold text-[9px] whitespace-nowrap">
                VEDHACHALAM NAGAR, CHENGALPATTU - 603001
              </div>
              <div className="font-bold text-[9px] whitespace-nowrap">
                CONTACT NO: 04427433035
              </div>
            </div>
          </div>

          <div className="border-b border-black w-full mb-1"></div>

          {/* Info Section - Stacked Order/Date/Time on right */}
          <div className="flex justify-between items-start mb-2 gap-2">
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex gap-1 break-words">
                <span className="font-bold whitespace-nowrap">
                  CUSTOMER NAME:
                </span>
                <span className="font-bold break-words">{customerName}</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold whitespace-nowrap">CONTACT NO:</span>
                <span className="font-bold">{contactNo}</span>
              </div>
            </div>
            <div className="flex flex-col items-end text-right whitespace-nowrap">
              <span className="font-bold">
                ORDER NO: {orderData.Bill_No || "PENDING"}
              </span>
              <span className="font-bold">DATE: {dateOnly}</span>
              <span className="font-bold">TIME: {timeOnly}</span>
            </div>
          </div>

          <div className="border-b border-black w-full mb-2"></div>

          {/* Title Segment */}
          <div className="text-center font-bold text-[14px] mb-2">
            DUE PRODUCTS RECEIPT
          </div>

          <div className="border-b border-black w-full mb-2"></div>

          {/* Items Table - Fixed layout for wrapping */}
          <table className="w-full mb-2 table-fixed">
            <thead>
              <tr className="text-left font-bold border-b border-black">
                <th className="py-1 w-[60%]">PRODUCT NAME</th>
                <th className="py-1 w-[12%] text-center">QTY.</th>
                <th className="py-1 w-[28%] text-right">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {(orderData.Items || []).map((item, idx) => (
                <tr key={idx} className="font-bold border-none">
                  <td className="py-1 leading-tight break-words align-top">
                    {products.find((p) => p.id === item.Product)?.label ||
                      item.Product}
                  </td>
                  <td className="py-1 text-center align-top">
                    {item.Quantity}
                  </td>
                  <td className="py-1 text-right align-top break-words leading-tight">
                    {item.Description || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-b border-black w-full mb-2"></div>

          {/* Bottom Info */}
          <div className="grid grid-cols-2 gap-x-2 mb-2">
            <div className="font-bold truncate">
              SALES EXECUTIVE: {salesRep}
            </div>
          </div>

          <div className="border-b border-black border-dashed w-full mb-2"></div>

          {/* Bilingual Message Section */}
          <div className="flex flex-col gap-2 mb-2 leading-tight">
            <div className="text-center">
              <div className="font-bold mb-0.5 text-[9px]">
                WE WILL UPDATE THE ORDER STATUS THROUGH WHATSAPP AND CALL.
              </div>
              <div className="font-bold text-[9px]">
                தங்களது ஆர்டரின் நிலையை WHATSAPP மற்றும் போன் கால் மூலமாக
                நாங்கள் தெரிவிப்போம்.
              </div>
            </div>

            <div className="text-center">
              <div className="font-bold mb-0.5 text-[9px]">
                SHOW THIS RECEIPT TO GET YOUR PRODUCTS. DO NOT MISPLACE IT.
              </div>
              <div className="font-bold text-[9px]">
                இந்த ரசீதை காண்பித்து தங்களது பொருட்களை பெற்றுக்கொள்ளவும்.
                தவறவிட்டு விடாதீர்கள்.
              </div>
            </div>
          </div>

          <div className="border-b border-black border-dashed w-full mb-3"></div>

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
