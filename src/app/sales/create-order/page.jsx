"use client";
import {
  Form,
  Select,
  DatePicker,
  Input,
  InputNumber,
  Button,
  Modal,
  Checkbox,
  message,
} from "antd";

import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Customer from "@/app/sales/create-order/Customer";
import dayjs from "dayjs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useSelector } from "react-redux";

const page = () => {
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [salesPersons, setSalesPersons] = useState([]);
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const userObj = useSelector((state) => state.user.user);

  const handleClose = () => {
    setOpenCustomer(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    messageApi.open({ type: "loading", content: "Adding Record..." });
    const formData = {
      ...data,
      Customer: customers.find((i) => i.value === data.Customer)?.id || "",
      Sales_Person:
        salesPersons.find((i) => i.value === data.Sales_Person)?.id || "",
      Branch: branches.find((i) => i.value === data.Branch)?.id || "",
      Order_Date: data.Order_Date?.format("DD-MMM-YYYY"),
      Items:
        data.Items?.map((item) => ({
          Product: products.find((i) => i.value === item.Product)?.id || "",
          Quantity: item?.Quantity || 1,
          Description: item?.Description || "",
          Status: statuses.find((i) => i.value === item.Status)?.id || "",
        })) || "",
    };
    try {
      const response = await fetch("/api/zoho", {
        method: "POST",
        body: JSON.stringify({
          formName: "Sales_Order",
          formData: formData,
        }),
      });
      const result = await response.json();
      console.log(result);
      form.resetFields();
      setLoading(false);
      messageApi.destroy();
      messageApi.success({ content: "Order Created!" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ Order_Date: dayjs(), Home_Delivery: false });
    const startFetch = async () => {
      try {
        const customerResp = await fetchRecords("All_Customers", "(ID != 0)");
        const customerData = customerResp.data.map((record) => ({
          label: `${record.Phone_Number} - ${record.Customer_Name}`,
          value: `${record.Phone_Number} - ${record.Customer_Name}`,
          id: record.ID,
        }));
        setCustomers(customerData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }

      try {
        const salesPersonResp = await fetchRecords("All_Users", "(ID != 0)");
        const salesPersonData = salesPersonResp.data.map((record) => ({
          label: record.Name.zc_display_value,
          value: record.Name.zc_display_value,
          id: record.ID,
        }));
        setSalesPersons(salesPersonData);
      } catch (error) {
        console.error("Error fetching sales persons:", error);
      }

      try {
        const branchResp = await fetchRecords("All_Branches", "(ID != 0)");
        const branchData = branchResp.data.map((record) => ({
          label: record.Branch_Name,
          value: record.Branch_Name,
          id: record.ID,
        }));
        setBranches(branchData);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }

      try {
        const productResp = await fetchRecords("All_Products", "(ID != 0)");
        const productsData = productResp.data.map((record) => ({
          label: record.Product_Name,
          value: record.Product_Name,
          id: record.ID,
          key: record.ID,
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }

      try {
        const statusResp = await fetchRecords("All_Statuses", "(ID != 0)");
        const statusData = statusResp.data.map((record) => ({
          label: record.Status_Name,
          value: record.Status_Name,
          id: record.ID,
        }));
        setStatuses(statusData);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };
    startFetch();
  }, []);

  useEffect(() => {
    if (!userObj.Name) return;
    form.setFieldsValue({
      Sales_Person: userObj.Name.zc_display_value,
      Branch: userObj.Branch.zc_display_value,
    });
  }, [userObj]);

  const fetchRecords = async (reportName, criteria) => {
    try {
      const query = new URLSearchParams({
        reportName,
        criteria: criteria,
      });
      const response = await fetch("/api/zoho?" + query, { method: "GET" });
      const result = await response.json();
      return result.records;
    } catch {
      console.error("Error fetching records:", error);
      return [];
    }
  };

  const addNewCustomer = (data) => {
    setCustomers((prev) => [...prev, data]);
    form.setFieldsValue({ Customer: data });
  };

  const handleKeydown = async (event, fieldName) => {
    if (event.key === "Enter" && productSearch) {
      const exists = products.some((opt) => opt.value === productSearch);
      if (!exists) {
        try {
          const response = await fetch("/api/zoho", {
            method: "POST",
            body: JSON.stringify({
              formName: "Product",
              formData: {
                Product_Name: productSearch,
              },
            }),
          });
          const result = await response.json();
          const newProduct = {
            label: productSearch,
            value: productSearch,
            id: result.data.ID,
            key: result.data.ID,
          };
          setProducts((prev) => [...prev, newProduct]);

          form.setFieldsValue({
            Items: form
              .getFieldValue("Items")
              .map((item, index) =>
                index === fieldName ? { ...item, Product: productSearch } : item
              ),
          });

          console.log(result);
        } catch (error) {
          console.error("Error Adding Product:", error);
        }
      }
    }
  };

  return (
    <div className="p-3">
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <div className="grid grid-cols-2 gap-5">
          {/* Customer Name */}
          <Form.Item
            label="Customer Name"
            name="Customer"
            rules={[{ required: true, message: "Please select a customer" }]}
            className="w-[300px]"
          >
            <Select
              options={customers}
              showSearch
              allowClear
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "4px",
                      borderTop: "1px solid #f0f0f0",
                    }}
                  >
                    <Button type="link" onClick={() => setOpenCustomer(true)}>
                      + Add New Customer
                    </Button>
                  </div>
                </>
              )}
            />
          </Form.Item>
          <Modal
            open={openCustomer}
            onCancel={handleClose}
            onClose={handleClose}
            onOk={handleClose}
            footer={<></>}
          >
            <Customer
              handleClose={handleClose}
              addNewCustomer={addNewCustomer}
            />
          </Modal>

          {/* Order Date */}
          <Form.Item label="Order Date" name="Order_Date" className="w-[300px]">
            <DatePicker format="DD-MMM-YYYY" className="w-[300px]" />
          </Form.Item>

          {/* Sales Person */}
          <Form.Item
            className="w-[300px]"
            label="Sales Person"
            name="Sales_Person"
            rules={[
              { required: true, message: "Please select a sales person" },
            ]}
          >
            <Select options={salesPersons} showSearch allowClear />
          </Form.Item>

          {/* Branch */}
          <Form.Item
            className="w-[300px]"
            label="Branch"
            name="Branch"
            rules={[{ required: true, message: "Please select a branch" }]}
          >
            <Select options={branches} />
          </Form.Item>
          <Form.Item
            layout="horizontal"
            label="Home Delivery"
            name="Home_Delivery"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </div>
        <div className="flex gap-3 p-2 bg-slate-100">
          <div className="w-[300px]">Product Name</div>
          <div className="w-[100px]">Quantity</div>
          <div className="w-[300px]">Description</div>
          <div className="w-[300px]">Status</div>
        </div>
        <Form.List name="Items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex gap-3 border-b p-3">
                  <Form.Item
                    {...restField}
                    name={[name, "Product"]}
                    rules={[{ required: true, message: "Product is required" }]}
                    className="w-[300px]"
                  >
                    <Select
                      options={products}
                      placeholder="Select Product"
                      allowClear
                      showSearch
                      onKeyDown={(event) => handleKeydown(event, name)}
                      onSearch={(value) => setProductSearch(value)}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "Quantity"]}
                    initialValue={1}
                    rules={[
                      { required: true, message: "Quantity is required" },
                      { type: "number", min: 1, message: "Must be at least 1" },
                    ]}
                    className="w-[100px]"
                  >
                    <InputNumber min={1} placeholder="Quantity" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "Description"]}
                    className="w-[300px]"
                  >
                    <Input.TextArea placeholder="Description" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "Status"]}
                    initialValue={"Pending"}
                    rules={[{ required: true, message: "Status is required" }]}
                    className="w-[200px]"
                  >
                    <Select options={statuses} allowClear showSearch />
                  </Form.Item>

                  <Button
                    type="danger"
                    onClick={() => remove(name)}
                    icon={<CloseOutlined />}
                  />
                </div>
              ))}

              <Button type="dashed" onClick={() => add()} className="mt-3">
                + Add Line Item
              </Button>
            </>
          )}
        </Form.List>

        <div className="flex justify-center gap-4 p-3">
          {contextHolder}
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default page;
