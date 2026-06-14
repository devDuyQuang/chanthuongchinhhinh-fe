import React from 'react';

const LoadingModal = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
      }}
    >
      <div
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '32px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            border: '6px solid #f3f3f3',
            borderTop: '6px solid #00bde0',
            borderRadius: '50%',
            animation: 'loading-spin 1s linear infinite',
            marginBottom: '20px',
          }}
        ></div>
        <style>{`
          @keyframes loading-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <h4 style={{ margin: 0, color: '#fff', fontSize: '20px', fontWeight: '500' }}>
          Đang tải trang...
        </h4>
      </div>
    </div>
  );
};

export default LoadingModal;
