export interface IAppointment {
    auto_reply_message: string;
    business_id: string;
    client_id: string;
    conversation_id: string;
    created_at: string;
    duration: number;
    id: string;
    payment_status: any;
    service_id: string;
    source_data: {name: string, channel: any, campaign: any, website_url: string};
    staff_id: string;
    start_time: string;
    status: string;
    time_zone: string;
    title: string;
    type: string;
}