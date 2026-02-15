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

    // Calculate pricing (mocking based on screenshot logic if not in data)
    // Assuming 315 total, 300 base, 7.5 CGST, 7.5 SGST (5% total GST)
    const totalAmt =
      orderData.Items?.reduce(
        (acc, item) => acc + item.Quantity * (item.Mrp || 0),
        0,
      ) || 0;
    const baseAmt = totalAmt / 1.05;
    const gstAmt = totalAmt - baseAmt;
    const individualGst = gstAmt / 2;

    const formatDate = (date) => dayjs(date).format("DD/MM/YYYY HH:mm A");

    return (
      <div
        ref={ref}
        className="bg-white text-black p-6 w-[210mm] min-h-[297mm] mx-auto overflow-hidden text-base leading-snug flex flex-col pt-6"
        style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
      >
        <style>{`
        @media print {
          @page { size: A4; margin: 0.5cm; }
          body { margin: 0; }
          .print-logo { visibility: visible !important; }
        }
      `}</style>
        {/* Shop Header */}
        <div className="flex justify-between items-start mb-6 border-b border-slate-200 pb-4">
          <div className="flex flex-col items-start">
            <img
              src="/logo.png"
              alt="Shifa Logo"
              className="h-16 object-contain mb-2 print-logo"
            />
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              NO:21-A, CHAIRMAN EKAMBARANAR STREET, CHENGALPATTU-603001
            </div>
          </div>
          <div className="text-right text-[10px] text-slate-500 space-y-0.5">
            <p className="font-bold text-slate-800 text-xs text-right">
              CONTACT DETAILS
            </p>
            <p>Phone : 044-27433035 | Website : www.shifaonline.in</p>
            <div className="mt-2 pt-2 border-t border-slate-100">
              <p>DL: TN-06-216/20-21, 166/308-21B | GST: 33AEAFS2B39B1ZG</p>
              <p>FSSAI: 12421008003897</p>
            </div>
          </div>
        </div>

        <div className="text-center font-bold text-2xl mb-6 text-slate-800 tracking-tight">
          TAX INVOICE
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-6 bg-slate-50 p-4 rounded border border-slate-100">
          <div className="space-y-1">
            <div className="text-slate-500 uppercase text-[9px] font-bold tracking-widest">
              Order Details
            </div>
            <div className="text-lg">
              <span className="text-slate-400 mr-2">No :</span>{" "}
              <span className="font-bold">
                {orderData.Bill_No || "PENDING"}
              </span>
            </div>
            <div className="text-base">
              <span className="text-slate-400 mr-2">Date :</span>{" "}
              <span className="font-bold">{formatDate(new Date())}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-500 uppercase text-[9px] font-bold tracking-widest">
              Customer Info
            </div>
            <div className="text-lg">
              <span className="text-slate-400 mr-2">Name :</span>{" "}
              <span className="font-bold">{customerName.toUpperCase()}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400 mr-2">ID :</span> {customerId}
            </div>
          </div>
        </div>

        {/* Items Table - Removed min-h and condensed rows */}
        <div className="flex-1">
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b-2 border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-600">
                <th className="text-left py-2 w-12">Qty</th>
                <th className="text-left py-2">Description</th>
                <th className="text-center py-2 w-16">Sch</th>
                <th className="text-center py-2 w-16">Loc</th>
                <th className="text-right py-2 w-28">Rate</th>
                <th className="text-right py-2 w-28">Amount</th>
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
                      Mrp: 315,
                      Amt: 315,
                    },
                  ]
              ).map((item, idx) => (
                <React.Fragment key={idx}>
                  <tr className="text-base font-medium">
                    <td className="py-2 text-lg font-bold">{item.Quantity}</td>
                    <td className="py-2 font-bold">
                      {item.Product || "Unknown Product"}
                    </td>
                    <td className="text-center py-2 text-slate-300">-</td>
                    <td className="text-center py-2 text-slate-300">-</td>
                    <td className="text-right py-2 font-medium">
                      {(item.Mrp || totalAmt).toFixed(2)}
                    </td>
                    <td className="text-right py-2 text-lg font-bold">
                      {(item.Quantity * (item.Mrp || totalAmt)).toFixed(2)}
                    </td>
                  </tr>
                  {item.Description && (
                    <tr className="border-none">
                      <td></td>
                      <td
                        colSpan={5}
                        className="pb-2 text-xs text-slate-400 italic -mt-1"
                      >
                        {item.Description}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-between items-start gap-8 mt-4 p-4 bg-slate-50 border-t-2 border-slate-800 rounded-b">
          <div className="flex-1 space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Summary
            </div>
            <div className="text-sm">
              <span className="text-slate-400">Rep:</span>{" "}
              <span className="font-bold uppercase ml-1">{salesRep}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-400">Items:</span>{" "}
              <span className="font-bold ml-1">
                {orderData.Items?.length || 1}
              </span>
            </div>
          </div>

          <div className="w-56 space-y-1 divide-y divide-slate-100">
            <div className="flex justify-between text-base text-slate-600 pb-1">
              <span>Sub Total :</span>
              <span className="font-medium">{totalAmt.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base text-slate-600 py-1">
              <span>BASE :</span>
              <span className="font-medium">{baseAmt.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-400 py-1">
              <span>GST (5%) :</span>
              <span>{gstAmt.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-black text-xl pt-3 text-slate-900">
              <span>TOTAL :</span>
              <span>Rs. {totalAmt.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Kind Request Section - Tighter grid */}
        <div className="mt-4 grid grid-cols-2 gap-4 border p-4 rounded-xl border-slate-100">
          <div className="space-y-2">
            <div className="font-black text-[10px] uppercase tracking-widest text-slate-400 border-b pb-1">
              KIND REQUEST
            </div>
            <div className="text-xs text-slate-700 leading-tight font-medium space-y-1">
              <p>1. மருந்துகளை சரிபார்த்து பின் வாங்கிச் செல்லவும்.</p>
              <p>2. மருந்துகளை மருத்துவர் ஆலோசனையுடன் சாப்பிடவும்.</p>
              <p>3. பொருட்கள் திரும்ப பெற இயலாது.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="bg-white p-2 border border-slate-200 flex flex-col items-center">
              {/* Simple visual barcode */}
              <div className="flex h-10 gap-0.5 items-end px-2 mb-1">
                {[2, 4, 2, 3, 2, 5, 2, 3, 2, 4, 2, 3, 2, 5, 2, 3].map(
                  (w, i) => (
                    <div
                      key={i}
                      className="bg-black"
                      style={{ width: `${w}px`, height: "100%" }}
                    ></div>
                  ),
                )}
              </div>
              <div className="text-xs font-bold tracking-[0.2em]">
                {orderData.Bill_No
                  ? orderData.Bill_No.toString().slice(-6)
                  : "236292"}
              </div>
            </div>
            <div className="text-center leading-none">
              <div className="text-slate-400 text-[8px] font-bold uppercase">
                Door Delivery
              </div>
              <div className="font-black text-xl text-slate-900">
                9600753673
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between text-slate-300 font-bold uppercase text-[9px] tracking-widest">
          <div>E&O.E.</div>
          <div className="text-slate-500 text-right">
            Authorized Signatory
            <br />
            <span className="text-slate-300 font-normal underline decoration-slate-100 decoration-4 underline-offset-8">
              for SHIFA MEDICAL MART
            </span>
          </div>
        </div>
      </div>
    );
  },
);

OrderPrint.displayName = "OrderPrint";

export default OrderPrint;
