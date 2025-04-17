// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import MotionWrapperDelay from "./components/FramerMotion/MotionWrapperDelay";

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-24 gradient-background2 space-y-4">
//       <Image
//         src="/logo2.jpg"
//         alt="Logo"
//         width={500}
//         height={500}
//         className="rounded-lg"
//       />

//       <MotionWrapperDelay
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.7 }}
//         transition={{ duration: 0.9, delay: 0.8 }}
//         variants={{
//           hidden: { opacity: 0, y: -100 },
//           visible: { opacity: 1, y: 0 },
//         }}
//       > <h1 className="text-4xl text-white font-bold text-center">Welcome To Jones In The Fast Lane</h1> </MotionWrapperDelay>

//       <MotionWrapperDelay
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.5 }}
//         transition={{ duration: 0.5, delay: 0.5 }}
//         variants={{
//           hidden: { opacity: 0, y: 100 },
//           visible: { opacity: 1, y: 0 },
//         }}
//       >   <Link href="/JonesGame">
//           <Button variant="sex2">Welcome Play Screen</Button>
//         </Link>   </MotionWrapperDelay>

//     </div>
//   );
// }


'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import MotionWrapperDelay from "./components/FramerMotion/MotionWrapperDelay";

export default function Home() {
  // Add the reset function to clear local storage
  const handleResetGame = () => {
    // Clear the autosave from localStorage
    localStorage.removeItem('jonesGameAutoSave');
    // Also clear any saved games
    localStorage.removeItem('jonesInTheFactLane_saveGame');
    sessionStorage.removeItem('jonesInTheFactLane_hasFileHandle');

    // Show confirmation to the user
    alert('Game data has been reset successfully!');
  };

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
      >
        <h1 className="text-4xl text-white font-bold text-center">Welcome To Jones In The Fast Lane</h1>
      </MotionWrapperDelay>

      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="flex space-x-4">
          <Link href="/JonesGame">
            <Button variant="sex2">Welcome Play Screen</Button>
          </Link>

          {/* Add the new reset button */}
          <Button variant="sex2" onClick={handleResetGame}>Reset Game Data</Button>
        </div>
      </MotionWrapperDelay>
    </div>
  );
}