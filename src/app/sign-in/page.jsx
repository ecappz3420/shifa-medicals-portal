"use client";
import React from "react";
import { Form, Input, Button, Alert } from "antd";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const SignInPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const userData = useSelector((state) => state.user);

  const onFinish = async (values) => {
    try {
      const res = await signInWithEmailAndPassword(
        values.email,
        values.password
      );
      if (res?.user) {
        console.log("User Signed In:", res);
        sessionStorage.setItem("user", JSON.stringify(res.user));
        form.resetFields();
        if (userData?.Role === "Admin" || userData?.Role === "Manager") {
          router.push("/sales/sales-order-report");
        } else {
          router.push("/sales/create-order");
        }
      }
    } catch (error) {
      console.error("Sign In Failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form Submission Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>

        {/* Global Error Alert */}
        {error && (
          <Alert
            message="Sign In Failed"
            description={
              error.message || "An unknown error occurred. Please try again."
            }
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Form
          form={form}
          name="signin"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input className="h-10" placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password className="h-10" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700"
                loading={loading} // Show spinner during loading
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/sign-up")}
                className="w-full"
              >
                Sign Up
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
