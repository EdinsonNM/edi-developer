"use client";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useContext } from "react";
import LayoutContext from "@presentation/layout/layout.context";
import { CardPoster, ResourceItem } from "./CardPoster";

interface RowSectionProps {
  title: string;
  items: ResourceItem[];
}

export const RowSection = ({ title, items }: RowSectionProps) => {
  const { isDark } = useContext(LayoutContext);

  return (
    <section className="relative mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 xs:gap-2 sm:gap-3 mb-2 xs:mb-3 sm:mb-4 md:mb-6">
        <h2
          className={`text-base xs:text-lg sm:text-xl md:text-2xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h2>
        <Badge
          variant="secondary"
          className="hidden sm:inline-flex w-fit text-xs"
        >
          {items.length} {items.length === 1 ? "elemento" : "elementos"}
        </Badge>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: false,
          skipSnaps: false,
          dragFree: true,
          containScroll: "keepSnaps",
        }}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-1.5 xs:mb-2 sm:mb-3 md:mb-4">
          <div className="flex-1" />
          <div className="flex gap-0.5 xs:gap-1 sm:gap-2">
            <CarouselPrevious
              className={`static translate-y-0 h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 ${
                isDark
                  ? "border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700"
                  : "border-gray-300 bg-white text-slate-700 hover:bg-gray-50"
              }`}
            />
            <CarouselNext
              className={`static translate-y-0 h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 ${
                isDark
                  ? "border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700"
                  : "border-gray-300 bg-white text-slate-700 hover:bg-gray-50"
              }`}
            />
          </div>
        </div>
        <CarouselContent className="-ml-4">
          {items.map((item, idx) => (
            <CarouselItem
              key={`${item.title}-${idx}`}
              className="pl-4 basis-auto"
            >
              <CardPoster item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
