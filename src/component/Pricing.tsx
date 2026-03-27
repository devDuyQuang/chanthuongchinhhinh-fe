// bang gia dich vu 

// import Link from "next/link";
// import { pricingdata1, pricingdata2 } from "../constant/alldata";

// function Pricing() {
//     return (
//         <>
//             <div className="row">
//                 <div className="col-xl-3 col-md-6 m-b30 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
//                     <div className="pricingtable-wrapper style-3 pricingtable-detail">
//                         <div className="pricing-content-box">
//                             <div className="pricingtable-price">
//                                 <h2 className="pricingtable-bx">Service Plan <span className="badge">20% Off</span></h2>
//                                 <p className="text">Choose your workspace plan according to your organisational plan</p>
//                             </div>
//                         </div>
//                         <div className="pricingtable-list">
//                             <ul className="pricingtable-features">
//                                 {pricingdata1.map((item, i) => (
//                                     <li key={i}>{item.title}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 {pricingdata2.map((item, i) => (
//                     <div className="col-xl-3 col-md-6 m-b30 wow fadeInUp" data-wow-delay={item.delay} data-wow-duration="0.8s" key={i}>
//                         <div className={`pricingtable-wrapper style-3 ${item.coloumnstand}`}>
//                             <div className="pricing-content-box">
//                                 <div className="pricingtable-price">
//                                     {item.title}
//                                 </div>
//                                 <div className="pricingtable-button">
//                                     <Link href={"#"} scroll={false} className="btn btn-primary btn-hover1 w-100"><span>Choose This Plan</span></Link>
//                                 </div>
//                             </div>
//                             <div className="pricingtable-list">
//                                 {item.feature}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }
// export default Pricing;

import Link from "next/link";
import { pricingdata1, pricingdata2 } from "../constant/alldata";

type PricingItem = {
    name?: string;
    price?: string;
    period?: string;
    btn_text?: string;
    btn_link?: string;
    features?: string[];
};

type PricingData = {
    title?: string;
    description?: string;
    features_pool?: string[];
    items?: PricingItem[];
};

type PricingProps = {
    data?: PricingData;
};

function Pricing({ data }: PricingProps) {
    const hasAdminPricing = !!data?.items && data.items.length > 0;

    if (!hasAdminPricing) {
        return (
            <>
                <div className="row">
                    <div className="col-xl-3 col-md-6 m-b30 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                        <div className="pricingtable-wrapper style-3 pricingtable-detail">
                            <div className="pricing-content-box">
                                <div className="pricingtable-price">
                                    <h2 className="pricingtable-bx">Service Plan <span className="badge">20% Off</span></h2>
                                    <p className="text">Choose your workspace plan according to your organisational plan</p>
                                </div>
                            </div>
                            <div className="pricingtable-list">
                                <ul className="pricingtable-features">
                                    {pricingdata1.map((item, i) => (
                                        <li key={i}>{item.title}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {pricingdata2.map((item, i) => (
                        <div className="col-xl-3 col-md-6 m-b30 wow fadeInUp" data-wow-delay={item.delay} data-wow-duration="0.8s" key={i}>
                            <div className={`pricingtable-wrapper style-3 ${item.coloumnstand}`}>
                                <div className="pricing-content-box">
                                    <div className="pricingtable-price">
                                        {item.title}
                                    </div>
                                    <div className="pricingtable-button">
                                        <Link href={"#"} scroll={false} className="btn btn-primary btn-hover1 w-100">
                                            <span>Choose This Plan</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="pricingtable-list">
                                    {item.feature}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <div className="row">
            <div className="col-xl-3 col-md-6 m-b30 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                <div className="pricingtable-wrapper style-3 pricingtable-detail">
                    <div className="pricing-content-box">
                        <div className="pricingtable-price">
                            <h2 className="pricingtable-bx">{data?.title || "Bảng giá dịch vụ"}</h2>
                            <p className="text">
                                {data?.description || "Lựa chọn gói dịch vụ phù hợp với nhu cầu của bạn."}
                            </p>
                        </div>
                    </div>
                    <div className="pricingtable-list">
                        <ul className="pricingtable-features">
                            {(data?.features_pool || []).map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {data!.items!.map((item, i) => (
                <div className="col-xl-3 col-md-6 m-b30 wow fadeInUp" data-wow-delay={`${0.2 * (i + 2)}s`} data-wow-duration="0.8s" key={i}>
                    <div className="pricingtable-wrapper style-3">
                        <div className="pricing-content-box">
                            <div className="pricingtable-price">
                                <h2 className="pricingtable-bx">{item.name || "Gói dịch vụ"}</h2>
                                <p className="text">
                                    <strong>{item.price || "0"}</strong>
                                    {item.period ? ` / ${item.period}` : ""}
                                </p>
                            </div>
                            <div className="pricingtable-button">
                                <Link href={item.btn_link || "#"} className="btn btn-primary btn-hover1 w-100">
                                    <span>{item.btn_text || "Chọn gói này"}</span>
                                </Link>
                            </div>
                        </div>
                        <div className="pricingtable-list">
                            <ul className="pricingtable-features">
                                {(item.features || []).map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Pricing;