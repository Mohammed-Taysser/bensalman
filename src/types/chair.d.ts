interface ChairCardProps {
  seat: Chair;
  onChairClick?: (id: string) => Promise<void>;
}

interface Chair {
  name: string;
  number: number;
  code: string;
}

interface ReservationState {
  chairs: ChairReservation[];
  products: Product[];
}

interface ChairReservation {
  chair: string;
  invite: 0 | 1;
}

interface ReReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
