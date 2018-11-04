interface CftSys {
  type: string;
  id: string;
  revision: number;
  createdAt: Date;
  updatedAt: Date;
  locale: string;
}

interface CftItem<T> {
  sys: CftSys;
  fields: T;
}

interface CtfCollection<T> {
  sys: CftSys;
  skip: number;
  limit: number;
  total: number;
  items: CftItem<T>[];
}
