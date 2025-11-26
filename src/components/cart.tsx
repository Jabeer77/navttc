import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { RootState } from '@/store';
import type { CartItem } from '@/store/features/cart/cartSlice';

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  const handleGoToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          <img src="/src/assets/cart.svg" alt="Cart" className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {totalItems}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center justify-between">
          <h4 className="font-bold">Your Cart ({totalItems} items)</h4>
          <Button variant="link" size="sm" onClick={handleGoToCheckout}>
            View all
          </Button>
        </div>
        <Separator className="my-2" />
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {cartItems.map((item: CartItem) => (
              <div key={item.product._id} className="flex items-center gap-4">
                <img
                  src={item.product.images?.[0] || '/public/image.png'}
                  alt={item.product.title}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ${item.product.price.toFixed(2)}
                    {item.color && `, Color: ${item.color}`}
                    {item.size && `, Size: ${item.size}`}
                  </p>
                </div>
                <p className="font-medium">${(item.quantity * item.product.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <Button className="mt-4 w-full" onClick={handleGoToCheckout}>
          Go to Checkout
        </Button>
      </PopoverContent>
    </Popover>
  );
}
