import { memo } from "react";
import { TextAnimate } from "@/components/ui/text-animate";

interface TextContentProps {
  t: {
    helloImEdinson: string;
    yearsBuildingSolutions: string;
  };
}

const TextContent = memo(({ t }: TextContentProps) => (
  <>
    <h1 className="pointer-events-none font-bold leading-tight tracking-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2b59c3] max-w-[28ch]">
      <TextAnimate
        animation="slideLeft"
        by="character"
        as={"h1"}
        className="pointer-events-none font-bold text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-center md:text-left text-[#2b59c3]"
        once={true}
      >
        {t.helloImEdinson}
      </TextAnimate>
    </h1>

    <p className="pointer-events-none text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-[36ch] text-gray-800">
      <TextAnimate
        animation="slideRight"
        by="word"
        as={"p"}
        className="pointer-events-none text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-[36ch] text-gray-800"
        once={true}
      >
        FrontEnd Engineer
      </TextAnimate>
    </p>

    <p className="pointer-events-none text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed max-w-[60ch] text-black hidden md:block">
      {t.yearsBuildingSolutions}
    </p>
  </>
));

TextContent.displayName = "TextContent";

export default TextContent;
