"use server";
type PostRequestOptions = {
  url: string;
  body: any;
  headers?: Record<string, string>;
};

export async function postRequest({
  url,
  body,
  headers = {
    "Content-Type": "application/json",
  },
}: PostRequestOptions) {
    const isValidUrl = process.env.NEXT_PUBLIC_API_URL + url;
    console.log("Making POST request to:", isValidUrl);
  try {
    const res = await fetch(isValidUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();

    
    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Request failed",
      };
    }

    return {
      success: true,
      data,
    };
    
  } catch (error: any) {
    console.error("POST request error:", error);
    throw new Error(
      error.message || "An unexpected error occurred during the request."
    );
  }
}
