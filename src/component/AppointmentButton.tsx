"use client";

import React, { useState } from "react";
import AppointmentModal from "./AppointmentModal";
import { createPortal } from "react-dom";

type AppointmentButtonProps = {
  text: string;
  className?: string;
  delay?: string;
  duration?: string;
  fullWidthText?: boolean;
};

export default function AppointmentButton({
  text,
  className = "btn btn-lg btn-icon btn-primary m-r20 wow fadeInUp",
  delay = "0.6s",
  duration = "0.8s",
  fullWidthText = false,
}: AppointmentButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={className}
        data-wow-delay={delay}
        data-wow-duration={duration}
        style={{ border: "none" }}
      >
        {fullWidthText ? <span className="w-100">{text}</span> : text}

        <span className="right-icon">
          <i className="feather icon-arrow-right" />
        </span>
      </button>

      <AppointmentModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
