import { Button } from "@/components/ui/button";
import { PACKS } from "@/lib/product";
import { scrollToOrder, useOrder } from "@/lib/order-store";

export function StickyBar() {
  const pack = useOrder((s) => s.pack);
  const status = useOrder((s) => s.status);
  const chosen = PACKS[pack];

  if (status === "success") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/92 px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-label text-primary uppercase">1+1=3</p>
          <p className="truncate text-sm font-semibold tabular-nums text-fg">
            {chosen.price} грн
            {chosen.oldPrice ? (
              <span className="ml-2 text-xs font-medium text-subtle line-through">
                {chosen.oldPrice}
              </span>
            ) : null}
          </p>
        </div>
        <Button className="min-w-40 px-4" onClick={scrollToOrder}>
          Замовити
        </Button>
      </div>
    </div>
  );
}
