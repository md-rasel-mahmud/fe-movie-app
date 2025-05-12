import Banner from "@/features/home/components/Banner";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
  return (
    <div>
      <Banner slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
