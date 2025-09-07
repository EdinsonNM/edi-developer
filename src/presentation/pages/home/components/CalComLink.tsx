import { memo } from "react";

interface CalComLinkProps {
  t: {
    scheduleOnCalCom: string;
  };
}

const CalComLink = memo(({ t }: CalComLinkProps) => (
  <div className="w-full flex justify-center md:justify-start px-2 md:px-0">
    <a
      href="https://cal.com/edinson-nunez-more"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm xs:text-base md:text-base max-w-xs pointer-events-auto text-black hover:underline"
    >
      {t.scheduleOnCalCom}
    </a>
  </div>
));

CalComLink.displayName = "CalComLink";

export default CalComLink;
