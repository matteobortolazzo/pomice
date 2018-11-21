interface CtfCollection<T> {
  sys: CftSys;
  skip: number;
  limit: number;
  total: number;
  items: CftItem<T>[];
}
