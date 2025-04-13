import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import MotionWrapperDelay from "./components/FramerMotion/MotionWrapperDelay";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24 gradient-background2 space-y-4">
      <Image
        src="/logo2.jpg"
        alt="Logo"
        width={500}
        height={500}
        className="rounded-lg"
      />

      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
      > <h1 className="text-4xl text-white font-bold text-center">Welcome To Jones In The Fast Lane</h1> </MotionWrapperDelay>

      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
      >   <Link href="/JonesGame">
          <Button variant="sex2">Welcome Play Screen</Button>
        </Link>   </MotionWrapperDelay>

    </div>
  );
}
