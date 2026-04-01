export type SiteCommonData = {
    company?: string | null;
    description?: string | null;
    copyright?: string | null;
    map?: string | null;

    email_icon?: string | null;
    email_title?: string | null;
    email_description?: string | null;
    email_placeholder?: string | null;

    phone_icon?: string | null;
    phone_title?: string | null;
    phone_description?: string | null;

    address_icon?: string | null;
    address_title?: string | null;
    address_description?: string | null;

    time_icon?: string | null;
    time_title?: string | null;
    time_description?: string | null;

    btn_appointment_title?: string | null;
    btn_appointment_link?: string | null;
    btn_register_title?: string | null;

    contact_title?: string | null;
    contact_description?: string | null;

    register_title?: string | null;
    register_description?: string | null;

    sidebar_title_one?: string | null;
    sidebar_title_two?: string | null;
    sidebar_title_three?: string | null;

    label_contact?: string | null;
    label_email?: string | null;
    placeholder_email?: string | null;
    label_follow?: string | null;
};

export type SiteSidebarData = {
    description: string;
    contactTitle: string;
    address: string;
    email: string;
    phone: string;
    newsletterTitle: string;
    emailPlaceholder: string;
    followTitle: string;
};

export type SiteFooterData = {
    company: string;
    description: string;
    contactTitle: string;
    contactDescription: string;
    registerTitle: string;
    registerDescription: string;
    emailPlaceholder: string;
    copyright: string;

    addressTitle: string;
    address: string;
    phoneTitle: string;
    phone: string;
    emailTitle: string;
    email: string;

    addressIcon: string;
    phoneIcon: string;
    emailIcon: string;
};

export type SiteConnectData = {
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
    rating?: {
        score?: string;
        text?: string;
    };
    stats_text?: string;
};