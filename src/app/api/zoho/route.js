import {
  addRecord,
  getRecords,
  refreshAccessToken,
  updateRecord,
} from "@/controllers/zohoConfig";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const access_token = await refreshAccessToken();
    const { searchParams } = new URL(req.url);
    const reportName = searchParams.get("reportName");
    const criteria = searchParams.get("criteria");
    if (!reportName) {
      return NextResponse.json(
        { message: "Report Name is required" },
        { status: 400 }
      );
    }

    const records = await getRecords(reportName, access_token, criteria);
    return NextResponse.json({ records }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error); // Log for debugging
    return NextResponse.json(
      { message: "Error fetching records", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const access_token = await refreshAccessToken();
    const body = await req.json();
    const { formData, formName } = body;
    if (!formName || !formData) {
      return NextResponse.json(
        { message: "Missing 'Form Name' or 'Form Data' in request body" },
        { status: 400 }
      );
    }

    const response = await addRecord(formName, access_token, formData);
    return NextResponse.json(
      { message: "Record Successfully Added", data: response.data },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error); // Log for debugging
    return NextResponse.json(
      { message: "Error adding records", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const access_token = await refreshAccessToken();
    const body = await req.json();
    const { formData, id } = body;

    if (!id || !formData) {
      return NextResponse.json(
        { message: "Missing 'ID' or 'Form Data' in request body" },
        { status: 400 }
      );
    }

    const response = await updateRecord(access_token, formData, id);
    return NextResponse.json({ response }, { status: 204 }); // Use 204 for successful updates with no body
  } catch (error) {
    console.error("PATCH Error:", error); // Log for debugging
    return NextResponse.json(
      { message: "Error updating records", error: error.message },
      { status: 500 }
    );
  }
}
