// MUI components
import { Typography, Tooltip, Link, Box } from "@mui/material";

// Types/interfaces
import type { TextData } from "@/types";

interface Props {
  data?: string | TextData;
}

const TextComp = ({ data }: Props) => {
  const obj: TextData = typeof data === "string" ? { text: data } : data ?? {};

  const { text, spans, type = "body1", tailwindClasses } = obj;

  return (
    <Box className={tailwindClasses}>
      <Typography variant={type}>
        {spans?.length
          ? spans.map((s, i) =>
              s.link ? (
                <Tooltip key={i} title={s.hoverText ?? ""}>
                  <Link
                    href={s.link}
                    underline={s.underline ? "always" : "hover"}
                    fontWeight={s.bold ? "bold" : "normal"}
                    fontStyle={s.italic ? "italic" : "normal"}
                  >
                    {s.text}
                  </Link>
                </Tooltip>
              ) : (
                <Tooltip key={i} title={s.hoverText ?? ""}>
                  <span
                    style={{
                      fontWeight: s.bold ? "bold" : undefined,
                      fontStyle: s.italic ? "italic" : undefined,
                      textDecoration: s.underline ? "underline" : undefined,
                    }}
                  >
                    {s.text}
                  </span>
                </Tooltip>
              )
            )
          : text ?? ""}
      </Typography>
    </Box>
  );
};

export default TextComp;
