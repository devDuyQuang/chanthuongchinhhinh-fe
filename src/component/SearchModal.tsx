"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type SearchModalProps = {
  show: boolean;
  onClose: () => void;
};

export default function SearchModal({ show, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return createPortal(
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(4px)",
        zIndex: 99999,
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered w-100"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "800px", margin: "auto" }}
      >
        <div className="modal-content border-0 bg-transparent">
          <div className="modal-header border-0 p-0 justify-content-end mb-3">
             <button
              type="button"
              onClick={onClose}
              className="btn-close btn-close-white"
              style={{ fontSize: "20px" }}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-0">
            <form onSubmit={handleSubmit} className="w-100">
              <div className="input-group" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.2)", borderRadius: "30px" }}>
                <input
                  type="text"
                  className="form-control form-control-lg bg-white border-0"
                  placeholder="Nhập từ khóa tìm kiếm..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ borderRadius: "30px 0 0 30px", padding: "15px 25px", fontSize: "18px" }}
                  autoFocus
                />
                <button
                  className="btn btn-primary px-4"
                  type="submit"
                  style={{ borderRadius: "0 30px 30px 0" }}
                >
                  <i className="fas fa-search" style={{ fontSize: "20px" }}></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
