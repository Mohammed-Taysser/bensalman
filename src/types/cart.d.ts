interface ModifyQuantityRequestBody {
  qty: number;
  item: string;
}

type CartStatus = 'Ordered' | 'Prepare' | 'Completed' | 'On Table';

type CartProduct = Product & { total?: number };
