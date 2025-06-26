// MUI components
import { Typography, Tooltip, Link, Box } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// Types/interfaces
import type { TextData } from "@/types";

interface TextCompProps {
  data: string | TextData;
  defaultType?: "body1" | "body2" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * TextComp renders text based on the JSON data structure provided.
 * It supports different typography variants and can apply Tailwind CSS classes.
 *
 * @param {string | TextData} data - The text data to render. It can be a string or an object containing text, spans, and other properties.
 * @param {string} defaultType - The default typography variant to use if the type is not specified in the data. It can be one of "body1",
 * @returns {JSX.Element} The rendered text component.
 */
export const TextComp = ({ data, defaultType = "body1" }: TextCompProps) => {
  const obj: TextData = typeof data === "string" ? { text: data } : data ?? {};

  const { text, spans, helpText, type = defaultType, tailwindClasses } = obj;

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
        {helpText && (
          <Tooltip title={helpText}>
            <HelpOutlineIcon
              sx={{
                ml: 1,
                verticalAlign: "top",
                cursor: "pointer",
                fontSize: "inherit",
                color: "text.secondary",
              }}
            />
          </Tooltip>
        )}
      </Typography>
    </Box>
  );
};

export default TextComp;

// *** Title and Subtitle Components ***

interface Props {
  data: string | TextData;
}

/** TitleComp renders the TextComp component with h1.
 * @param {string | TextData} data - The text data to render as a title. It can be a string or an object containing text, spans, and other properties.
 * @returns {JSX.Element} The rendered title component.
 */
export const TitleComp = ({ data }: Props) => {
  return <TextComp data={data} defaultType="h1" />;
};

/** PageTitleComp renders the TextComp component with h2.
 * @param {string | TextData} data - The text data to render as a subtitle. It can be a string or an object containing text, spans, and other properties.
 * @returns {JSX.Element} The rendered subtitle component.
 */
export const PageTitleComp = ({ data }: Props) => {
  return <TextComp data={data} defaultType="h2" />;
};

/** GroupTitleComp renders the TextComp component with h3.
 * @param {string | TextData} data - The text data to render as a group title. It can be a string or an object containing text, spans, and other properties.
 * @returns {JSX.Element} The rendered group title component.
 */
export const GroupTitleComp = ({ data }: Props) => {
  return <TextComp data={data} defaultType="h4" />;
};

/** FieldTitleComp renders the TextComp component with h4.
 * @param {string | TextData} data - The text data to render as a field title. It can be a string or an object containing text, spans, and other properties.
 * @returns {JSX.Element} The rendered field title component.
 */
export const FieldTitleComp = ({ data }: Props) => {
  return <TextComp data={data} defaultType="h5" />;
};

/** SubTextComp renders the TextComp component with body2.
 * @param {string | TextData} data - The text data to render as subtext. It can be a string or an object containing text, spans, and other properties.
 * @returns {JSX.Element} The rendered subtext component.
 */
export const SubTextComp = ({ data }: Props) => {
  return <TextComp data={data} defaultType="body2" />;
};
