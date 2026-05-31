import React from "react";

export default function Loading() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "60vh",
        flexDirection: "column",
        gap: "15px",
        width: "100%",
      }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Đang tải...</span>
      </div>
      <h5 className="text-primary mt-2" style={{ fontWeight: 600 }}>
        Đang tải trang...
      </h5>
    </div>
  );
}
