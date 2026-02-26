import React, { forwardRef } from "react";
import dayjs from "dayjs";

const OrderPrint = forwardRef(
  ({ orderData, customers, products, salesExecutives, userObj }, ref) => {
    if (!orderData) return null;

    const customerObj = customers.find((c) => c.value === orderData.Customer);
    const customerName =
      customerObj?.label?.split(" - ")[1] || orderData.Customer_Name || "N/A";
    const customerId = customerObj?.Customer_ID || "N/A";

    // Standardized to 12-hour format for thermal readability
    const formatDate = (date) => dayjs(date).format("DD/MM/YYYY hh:mm A");

    return (
      <div
        ref={ref}
        className="bg-white text-black p-0 w-[104mm] mx-auto overflow-hidden"
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
            /* Hide browser headers/footers */
            @page { margin: 0; }
          }
        `,
          }}
        />

        <div className="px-4 py-2 font-sans">
          {/* Shop Header [cite: 3, 4, 5, 6] */}
          <div className="flex flex-col items-center mb-4 border-b-2 border-black pb-2 text-center">
            <img
              src="/logo.png"
              alt="Shifa Logo"
              className="h-12 object-contain mb-1"
            />
            <div className="text-[10px] font-bold uppercase leading-tight">
              NO:21-A, CHAIRMAN EKAMBARANAR STREET, CHENGALPATTU-603001 [cite:
              3]
            </div>
            <div className="text-[10px] mt-1">
              Phone : 044-27433035 | www.shifaonline.in [cite: 4]
            </div>
            <div className="text-[9px] mt-1 leading-tight">
              DL: TN-06-216/20-21, 166/308-21B [cite: 5]
              <br />
              GST: 33AEAFS2B39B1ZG | FSSAI: 12421008003897 [cite: 6]
            </div>
          </div>

          <div className="text-center font-bold text-2xl mb-4 tracking-tighter">
            INVOICE [cite: 14]
          </div>

          {/* Info Section [cite: 7, 8, 9, 10] */}
          <div className="flex flex-col gap-1 mb-4 text-xs border border-black p-2">
            <div className="flex justify-between">
              <span className="font-bold">No:</span>
              <span className="font-bold">
                {orderData.Bill_No || "SO-007925"} [cite: 19]
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Date:</span>
              <span>{formatDate(new Date())} </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Customer:</span>
              <span className="text-right font-bold">
                {customerName.toUpperCase()} [cite: 24]
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">ID:</span>
              <span>{customerId} [cite: 25]</span>
            </div>
          </div>

          {/* Items Table - Dynamic Mapping [cite: 11] */}
          <table className="w-full mb-6 text-sm">
            <thead>
              <tr className="border-b-2 border-black text-xs font-bold uppercase">
                <th className="text-left py-1 w-12">QTY [cite: 11]</th>
                <th className="text-left py-1">DESCRIPTION [cite: 11]</th>
              </tr>
            </thead>
            <tbody>
              {(orderData.Items || []).map((item, idx) => (
                <tr key={idx} className="border-b border-black border-dashed">
                  <td className="py-2 font-bold align-top">
                    {item.Quantity || 1} [cite: 12]
                  </td>
                  <td className="py-2 font-bold leading-tight">
                    {item.Product || "WALKER BUSH"} [cite: 13]
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Kind Request Section [cite: 15, 16, 17, 18] */}
          <div className="mt-2 border-t-2 border-dashed border-black pt-4 text-[11px]">
            <div className="font-bold text-center mb-2">
              KIND REQUEST [cite: 15]
            </div>
            <div className="space-y-1 font-medium">
              <p>
                1. மருந்துகளை சரிபார்த்து பின் வாங்கிச் செல்லவும். [cite: 16]
              </p>
              <p>2. மருத்துவர் ஆலோசனையுடன் சாப்பிடவும். [cite: 17]</p>
              <p>3. பொருட்கள் திரும்ப பெற இயலாது. [cite: 18]</p>
            </div>

            {/* Barcode / Bill Number [cite: 19, 22] */}
            <div className="mt-4 flex flex-col items-center">
              <div className="bg-black w-3/4 h-10 mb-1"></div>
              <div className="font-mono text-sm font-bold">
                {orderData.Bill_No || "SO-007925"}
              </div>
            </div>

            <div className="text-center mt-4">
              <div className="text-[10px] uppercase font-bold">
                Door Delivery [cite: 20]
              </div>
              <div className="font-black text-xl">9600753673 [cite: 21]</div>
            </div>
          </div>

          {/* Footer [cite: 26, 27] */}
          <div className="text-center text-[10px] mt-8 border-t border-black pt-2 italic">
            E&O.E. [cite: 26]
            <br />
            <span className="font-bold uppercase not-italic">
              for SHIFA MEDICAL MART [cite: 27]
            </span>
          </div>
        </div>
      </div>
    );
  },
);

OrderPrint.displayName = "OrderPrint";
export default OrderPrint;
