interface ReservationRequest {
  accommodationName: string;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  peopleCount: number;
  petCount: number;
  reserverName: string;
  reserverPhoneNumber: string;
  hasVehicle: boolean;
  totalPrice: number;
}

interface ReservationInfo {
  merchantUid: string;
  impUid: string;
  reservationRequest: ReservationRequest;
}

interface IamportPaymentParams {
  pg: 'html5_inicis';
  pay_method?: 'card';
  merchant_uid: string;
  amount: number;
  name: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_email?: string;
}

interface IamportPaymentResponse {
  success: boolean;
  imp_uid?: string;
  merchant_uid?: string;
  error_msg?: string;
}

export {
  ReservationRequest,
  ReservationInfo,
  IamportPaymentParams,
  IamportPaymentResponse,
};
