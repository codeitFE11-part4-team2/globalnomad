export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface Activity {
  id: number;
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImages: SubImage[];
  hostId: number;
  userId: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
