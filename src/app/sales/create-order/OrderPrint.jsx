import React, { forwardRef } from "react";
import dayjs from "dayjs";

const OrderPrint = forwardRef(
  ({ orderData, customers, products, salesExecutives, userObj }, ref) => {
    if (!orderData) return null;

    const customerObj = customers.find((c) => c.value === orderData.Customer);
    const customerName =
      customerObj?.label?.split(" - ")[1] || orderData.Customer_Name || "N/A";
    const customerId = customerObj?.Customer_ID || "N/A";
    const salesRep =
      salesExecutives.find((s) => s.value === orderData.Sales_Executive)
        ?.label || "N/A";

    const formatDate = (date) => dayjs(date).format("DD/MM/YYYY HH:mm A");

    return (
      <div
        ref={ref}
        className="bg-white text-black p-2 w-[104mm] mx-auto overflow-hidden text-sm leading-snug flex flex-col pt-2"
        style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
      >
        <style>{`
        @media print {
          @page { margin: 0; }
          body { margin: 0; padding: 0; width: 104mm; }
          .print-logo { visibility: visible !important; }
        }
      `}</style>
        {/* Shop Header */}
        <div className="flex flex-col items-center mb-4 border-b border-slate-200 pb-2 text-center">
          <img
            src="/logo.png"
            alt="Shifa Logo"
            className="h-10 object-contain mb-1 print-logo"
          />
          <div className="text-[9px] font-semibold uppercase text-slate-600 leading-tight">
            NO:21-A, CHAIRMAN EKAMBARANAR STREET, CHENGALPATTU-603001
          </div>
          <div className="text-[9px] text-slate-500 mt-1">
            Phone : 044-27433035 | www.shifaonline.in
          </div>
          <div className="text-[8px] text-slate-500 mt-1 leading-tight">
            DL: TN-06-216/20-21, 166/308-21B
            <br />
            GST: 33AEAFS2B39B1ZG | FSSAI: 12421008003897
          </div>
        </div>

        <div className="text-center font-bold text-lg mb-4 text-slate-800 tracking-tight">
          INVOICE
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-1 mb-4 bg-slate-50 p-2 rounded border border-slate-100 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500 font-bold">No:</span>
            <span className="font-bold">{orderData.Bill_No || "PENDING"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-bold">Date:</span>
            <span className="font-bold">{formatDate(new Date())}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-bold">Customer:</span>
            <span className="font-bold text-right">
              {customerName.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-bold">ID:</span>
            <span>{customerId}</span>
          </div>
        </div>

        {/* Items Table */}
        <div className="flex-1">
          <table className="w-full mb-4 text-xs">
            <thead>
              <tr className="border-b-2 border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-600">
                <th className="text-left py-1 w-8">Qty</th>
                <th className="text-left py-1">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(orderData.Items && orderData.Items.length > 0
                ? orderData.Items
                : [
                    {
                      Quantity: 1,
                      Product: "FLAMINGO CALF SUPPORT M",
                      Description: "HSN : 90211000 S.UNIT : 1",
                    },
                  ]
              ).map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr className="font-medium">
                    <td className="py-1 font-bold align-top">
                      {item.Quantity}
                    </td>
                    <td className="py-1 font-bold">
                      {item.Product || "Unknown Product"}
                    </td>
                  </tr>
                  {item.Description && (
                    <tr className="border-none">
                      <td></td>
                      <td className="pb-1 text-[9px] text-slate-500 italic -mt-1 block">
                        {item.Description}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kind Request Section */}
        <div className="mt-2 border p-2 rounded border-slate-100 text-[9px] text-center mb-2">
          <div className="font-black uppercase tracking-widest text-slate-400 border-b pb-1 mb-1">
            KIND REQUEST
          </div>
          <div className="text-slate-700 leading-tight font-medium space-y-0.5 text-left">
            <p>1. மருந்துகளை சரிபார்த்து பின் வாங்கிச் செல்லவும்.</p>
            <p>2. மருத்துவர் ஆலோசனையுடன் சாப்பிடவும்.</p>
            <p>3. பொருட்கள் திரும்ப பெற இயலாது.</p>
          </div>

          <div className="mt-3 bg-white p-2 border border-slate-200 flex flex-col items-center">
            {/* Simple visual barcode */}
            <div className="flex h-6 gap-0.5 items-end px-2 mb-1">
              {[2, 4, 2, 3, 2, 5, 2, 3, 2, 4, 2, 3, 2, 5, 2, 3].map((w, i) => (
                <div
                  key={i}
                  className="bg-black"
                  style={{ width: `${w / 2}px`, height: "100%" }}
                ></div>
              ))}
            </div>
            <div className="text-[9px] font-bold tracking-[0.2em]">
              {orderData.Bill_No
                ? orderData.Bill_No.toString().slice(-6)
                : "236292"}
            </div>
          </div>
          <div className="text-center leading-none mt-2">
            <div className="text-slate-400 text-[8px] font-bold uppercase">
              Door Delivery
            </div>
            <div className="font-black text-sm text-slate-900">9600753673</div>
          </div>
        </div>

        <div className="text-center text-slate-400 text-[8px] pb-8 pt-2">
          E&O.E. <br />
          <span className="font-semibold text-slate-500">
            for SHIFA MEDICAL MART
          </span>
        </div>
      </div>
    );
  },
);

OrderPrint.displayName = "OrderPrint";

export default OrderPrint;
