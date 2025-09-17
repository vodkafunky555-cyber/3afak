export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  bannerImage: string;
  size: string;
  rating: number;
  downloads: string;
  tags: string[];
  category: 'game' | 'app';
  featured?: boolean;
  downloadUrl: string;
}

export interface Tab {
  id: string;
  name: string;
  icon: any;
}