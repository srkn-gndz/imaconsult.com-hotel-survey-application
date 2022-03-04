export interface IUser {
    id: number;
    hotel_id: number;
    first_name: string;
    last_name: string;
    profile_pic_url: string;
    locale: string;
    room_no: string;
    entry_date: string;
    release_date: string;
    phone_no: string;
    booking_date: string;
    date_of_birth: string;
    e_mail: string;
    wedding_anniversary: string;
    loyalty_info: {
        points_earned: number;
        points_spend: number;
        remaining_point: number;
        overnight_stay: number;
        target_night_stay: number;
        earned_night_stay: number;
        room_type: string;
        menu_item_id: number;
    };
    pillow_type: string;
    bed_type: string;
    token_val: string;
  }