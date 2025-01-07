"use client";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { Form, Input, Button, Alert } from "antd";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
    const [form] = Form.useForm();
    const router = useRouter();

  const onFinish = async (values) => {
    try {
      const res = await createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      console.log("User Created:", res);
      sessionStorage.setItem("user", JSON.stringify(res.user));
      form.resetFields();
      router.push("/sales-order-report");
    } catch (error) {
      console.error("Sign Up Failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form Submission Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>

        {/* Display Firebase error message if exists */}
        {error && (
          <Alert
            message={error.message}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Form
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          className="space-y-7 py-10"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input className="h-10" placeholder="Email" />
          </Form.Item>

          {/* Manually display email errors */}
          {error && error.message.includes("email") && (
            <Alert
              message="Invalid email or email already in use"
              type="error"
              showIcon
              className="mb-4"
            />
          )}

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password className="h-10" placeholder="Password" />
          </Form.Item>

          {/* Manually display password errors */}
          {error && error.message.includes("password") && (
            <Alert
              message="Password is too weak or not valid"
              type="error"
              showIcon
              className="mb-4"
            />
          )}

          <Form.Item>
            <div className="flex gap-2 flex-col">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-10 bg-blue-600 hover:bg-blue-700"
              loading={loading}
            >
              Sign Up
            </Button>
            <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
