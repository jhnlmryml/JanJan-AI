import Image from "next/image";

import { APP } from "@/config/site";

export default function Logo() {
    return (
        <div
            className="
        glass
        glow
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        border
        border-white/10
      "
        >
            <Image
                src="/logo.svg"
                alt={APP.name}
                width={34}
                height={34}
                priority
                className="select-none"
            />
        </div>
    );
}