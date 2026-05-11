"use client";

import Link from "next/link";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function MedicalFloaters() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.getElapsedTime();
        group.current.rotation.x = Math.cos(t / 4) / 8;
        group.current.rotation.y = Math.sin(t / 4) / 8;
        group.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });

    return (
        <group ref={group}>
            {/* Main Floating Glass Panel */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[0, 0, -1]}>
                    <boxGeometry args={[4, 6, 0.1]} />
                    <meshPhysicalMaterial
                        color="#00bde0"
                        metalness={0.1}
                        roughness={0.05}
                        transmission={0.9}
                        thickness={0.5}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </Float>

            {/* Orbiting Elements */}
            {[...Array(5)].map((_, i) => (
                <Float
                    key={i}
                    speed={1 + Math.random()}
                    rotationIntensity={2}
                    floatIntensity={2}
                    position={[
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 2
                    ]}
                >
                    <mesh>
                        <octahedronGeometry args={[0.2, 0]} />
                        <meshStandardMaterial color="#00bde0" emissive="#00bde0" emissiveIntensity={2} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

export default function BacSiDuong() {
    const specialties = [
        "Điều trị thoát vị đĩa đệm",
        "Điều trị thoái hóa khớp",
        "Phục hồi chức năng sau chấn thương",
        "Phẫu thuật nội soi khớp"
    ];

    const qualifications = [
        { icon: "🎓", text: "Tiến sĩ Y khoa (PhD)" },
        { icon: "📜", text: "Bác sĩ Chuyên khoa II" },
        { icon: "🇻🇳", text: "Thành viên Hội Chấn thương Chỉnh hình Việt Nam" },
        { icon: "🌏", text: "Tu nghiệp chuyên sâu tại Singapore & Hàn Quốc" }
    ];

    return (
        <main className="doctor-3d-page">
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center min-vh-100 py-5">

                        {/* LEFT CONTENT */}
                        <div className="col-xl-6 col-lg-6 order-lg-1 order-2">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="badge-medical">
                                    Chuyên khoa Chấn thương Chỉnh hình
                                </span>

                                <h1 className="doctor-title">
                                    <div className="title-label">Bác Sĩ</div>
                                    <div className="title-name">TS.BS Vi Văn Dương</div>
                                </h1>

                                <p className="doctor-desc">
                                    Bác sĩ chuyên khoa chấn thương chỉnh hình với hơn 20 năm 
                                    kinh nghiệm điều trị các bệnh lý xương khớp.
                                </p>

                                <div className="doctor-stats d-flex gap-4">
                                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, #0a2540 0%, #1a365d 100%)', flex: 1 }}>
                                        <h3>20+</h3>
                                        <span>Năm kinh nghiệm</span>
                                    </div>
                                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, #00bde0 0%, #0088a3 100%)', flex: 1 }}>
                                        <h3 style={{ color: '#fff' }}>8000+</h3>
                                        <span style={{ color: '#fff' }}>Ca thành công</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <h4 className="mb-3" style={{ color: '#0a2540', fontWeight: 700 }}>Chuyên môn</h4>
                                        <div className="specialties-grid">
                                            {specialties.map((spec, index) => (
                                                <motion.div 
                                                    key={index}
                                                    className="spec-item"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 + index * 0.1 }}
                                                >
                                                    <div className="medical-check"></div>
                                                    <span>{spec}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h4 className="mb-3" style={{ color: '#0a2540', fontWeight: 700 }}>Bằng cấp</h4>
                                        <ul className="qualifications-list">
                                            {qualifications.map((qual, index) => (
                                                <motion.li 
                                                    key={index}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.5 + index * 0.1 }}
                                                >
                                                    <span className="icon-degree">{qual.icon}</span>
                                                    <span>{qual.text}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <motion.div 
                                    className="certification-card"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    <div className="who-logo">
                                        <Image 
                                            src="/assets/images/icons/who-logo.png"
                                            alt="WHO"
                                            width={80}
                                            height={80}
                                            style={{ objectFit: 'contain' }}
                                            onError={(e) => {
                                                e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/2830/2830284.png";
                                            }}
                                        />
                                    </div>
                                    <div className="cert-info">
                                        <h4>Chứng nhận WHO</h4>
                                        <p>Viện Chất lượng và Kiểm định</p>
                                        <div className="cert-highlight">
                                            Bác sĩ chuyên khoa chấn thương chỉnh hình giỏi nhất năm 2025
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="hero-buttons d-flex gap-3">
                                    <Link
                                        href="/appointment"
                                        className="btn btn-primary px-4 py-3 rounded-pill"
                                        style={{ backgroundColor: '#00bde0', border: 'none', fontWeight: 600 }}
                                    >
                                        Đặt lịch khám ngay
                                    </Link>

                                    <Link
                                        href="/about"
                                        className="btn btn-outline-dark px-4 py-3 rounded-pill"
                                        style={{ fontWeight: 600 }}
                                    >
                                        Xem hồ sơ chi tiết
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT 3D */}
                        <div className="col-xl-6 col-lg-6 order-lg-2 order-1">
                            <div className="doctor-3d-wrapper">
                                {/* MAIN DOCTOR IMAGE */}
                                <motion.div
                                    className="doctor-image-main"
                                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                >
                                    <Image
                                        src="/assets/images/team/doctor.png"
                                        alt="TS.BS Vi Văn Dương"
                                        width={600}
                                        height={800}
                                        priority
                                        className="img-fluid"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600&h=800";
                                        }}
                                    />
                                </motion.div>

                                {/* DEMO IMAGE CARD */}
                                <motion.div
                                    className="demo-image-card"
                                    initial={{ opacity: 0, x: 100, rotate: 10 }}
                                    animate={{ opacity: 1, x: 0, rotate: -5 }}
                                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                                    whileHover={{ scale: 1.1, rotate: 0 }}
                                    style={{ 
                                        top: '40%',
                                        right: '-15%',
                                        width: '350px',
                                        height: '350px'
                                    }}
                                >
                                    <Image 
                                        src="/assets/images/demo/knee-3d.png"
                                        alt="3D Demo"
                                        width={350}
                                        height={350}
                                        className="img-fluid"
                                    />
                                    <div className="label">Mô phỏng 3D Khớp gối</div>
                                </motion.div>

                                {/* 3D SCENE BACKGROUND */}
                                <Canvas
                                    camera={{
                                        position: [0, 0, 10],
                                        fov: 35,
                                    }}
                                    style={{ background: 'transparent' }}
                                >
                                    <ambientLight intensity={0.5} />
                                    <pointLight position={[10, 10, 10]} intensity={1} />
                                    <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
                                    
                                    <MedicalFloaters />

                                    <Environment preset="city" />
                                </Canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}