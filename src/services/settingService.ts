import { SiteCommonData } from "@/types/site";

export type SettingResponse = {
    success: boolean;
    message: string;
    data?: {
        hero_home?: {
            title?: string;
            description?: string;
            button_one_text?: string;
            button_one_link?: string;
            button_two_text?: string;
            button_two_link?: string;
            question_title?: string;
            question_email?: string;
            percent?: string;
            percent_text?: string;
            percent_link?: string;
            patient_title?: string;
            patient_des?: string;
            banner_hero?: string;
        };
        utilities_home?: {
            title?: string;
            description?: string;
            button_text?: string;
            button_link?: string;
            phone?: string;
            image_one?: string;
            image_two?: string;
            open_hours?: {
                day?: string;
                time?: string;
            }[];
            utilities?: string[];
        };
        stats_home?: {
            background_image?: string;
            avatar_title?: string;
            avatars?: string[];
            stats?: {
                number?: string;
                label?: string;
            }[];
        };
        services_home?: {
            title?: string;
            subtitle?: string;
            view_all_link?: string;
            items?: {
                title?: string;
                description?: string;
                doctor_text?: string;
                link?: string;
            }[];
        };
        appointment_home_clinic?: {
            title?: string;
            subtitle?: string;
            appointment_now_text?: string;
            button_text?: string;
            button_link?: string;
            image?: string;
        };
        why_choose_us_home_clinic?: {
            title?: string;
            experience_number?: string;
            experience_label?: string;
            image?: string;
            items?: {
                title?: string;
                description?: string;
            }[];
        };
        specialists_home_clinic?: {
            title?: string;
            view_all_link?: string;
            items?: {
                name?: string;
                specialty?: string;
                button_text?: string;
                button_link?: string;
                image?: string;
                socials?: {
                    linkedin?: string | null;
                    facebook?: string | null;
                    twitter?: string | null;
                    youtube?: string | null;
                };
            }[];
        };

        service_plans_clinic?: {
            title?: string;
            description?: string;
            features_pool?: string[];
            items?: {
                name?: string;
                price?: string;
                period?: string;
                btn_text?: string;
                btn_link?: string;
                features?: string[];
            }[];
        };

        how_it_work_home_clinic?: {
            title?: string;
            description?: string;
            image?: string;
            appointment_btn?: {
                text?: string;
                link?: string;
            };
            features?: {
                title?: string;
                description?: string;
                icon?: string;
            }[];
            stats?: {
                number?: string;
                label?: string;
            }[];
        };
        testimonials_home_clinic?: {
            main_title?: string;
            main_image?: string;
            floating_review?: {
                name?: string;
                rating?: string;
                text?: string;
                avatar?: string;
            };
            achievement?: {
                number?: string;
                text?: string;
                avatars?: string[];
            };
            items?: {
                name?: string;
                role?: string;
                title?: string;
                review?: string;
                video_link?: string;
                image?: string;
            }[];
        };

        doctor_home_clinic?: {
            title?: string;
            doctor_name?: string;
            description?: string;
            skills_header?: string;
            image?: string;
            experience?: {
                number?: string;
                label?: string;
            };
            skills?: string[];
            achievements?: {
                image?: string;
                title?: string;
                subtitle?: string;
                link_text?: string;
            }[];
        };
        faq_home_clinic?: {
            title?: string;
            description?: string;
            image?: string;
            contact?: {
                text?: string;
                phone?: string;
            };
            appointment_btn?: {
                text?: string;
                link?: string;
            };
            items?: {
                question?: string;
                answer?: string;
                title?: string;
                content?: string;
            }[];
            questions?: {
                question?: string;
                answer?: string;
                title?: string;
                content?: string;
            }[];
        };
        awards_home?: {
            title?: string;
            description?: string;
            years?: string[];
            items?: {
                image?: string;
                title?: string;
                subtitle?: string;
                link_text?: string;
                year?: string;
            }[];
        };

        contact_home?: {
            title?: string;
            description?: string;
            address?: {
                label?: string;
                value?: string;
            };
            phone?: {
                label?: string;
                value?: string;
            };
            email?: {
                label?: string;
                value?: string;
            };
            time?: {
                label?: string;
                value?: string;
            };
            appointment_btn?: {
                text?: string;
                link?: string;
            };
            map_iframe?: string;
        };
        site?: SiteCommonData;
        hero_home_clinic?: {
            title?: string;
            description?: string;
            button_one_text?: string;
            button_one_link?: string;
            button_two_text?: string;
            button_two_link?: string;
            question_title?: string;
            question_email?: string;
            percent?: string;
            percent_text?: string;
            percent_link?: string;
            patient_title?: string;
            patient_des?: string;
            banner_hero?: string;
        };
        utilities_home_clinic?: {
            title?: string;
            description?: string;
            button_text?: string;
            button_link?: string;
            phone?: string;
            image_one?: string;
            image_two?: string;
            open_hours?: {
                day?: string;
                time?: string;
            }[];
            utilities?: string[];
        };
    };
};

export async function getSetting(): Promise<SettingResponse | null> {
    try {
        const res = await fetch(`${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.")}/setting`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Fetch setting failed: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Lỗi lấy setting:", error);
        return null;
    }
}
